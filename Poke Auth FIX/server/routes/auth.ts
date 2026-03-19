import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { hashPassword, comparePassword } from '../utils/password.js'
import {
  generateAccessToken,
  generateRefreshToken,
  hashRefreshToken,
} from '../utils/jwt.js'
import {
  validateRegistration,
  validateLogin,
  sanitizeEmail,
  sanitizeUsername,
} from '../utils/validate.js'
import { authenticate } from '../middleware/authenticate.js'
import { config } from '../config.js'
import { syncUserToSupabaseAuth } from '../utils/supabase.js'

const prisma = new PrismaClient()
const router = Router()

function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  res.cookie('access_token', accessToken, {
    ...config.cookie,
    maxAge: 15 * 60 * 1000,
  })

  res.cookie('refresh_token', refreshToken, {
    ...config.cookie,
    path: '/api/auth',
    maxAge: config.jwt.refreshExpiresMs,
  })
}

function formatUser(user: {
  id: string
  username: string
  email: string
  avatar: string
  bio: string
  verified: boolean
  rating: number
  totalReviews: number
  totalSales: number
  joinedDate: string
}) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    verified: user.verified,
    rating: user.rating,
    totalReviews: user.totalReviews,
    totalSales: user.totalSales,
    joinedDate: user.joinedDate,
  }
}

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body

    const errors = validateRegistration(username, email, password)
    if (errors.length > 0) {
      res.status(400).json({ error: errors[0].message, errors })
      return
    }

    const cleanEmail = sanitizeEmail(email)
    const cleanUsername = sanitizeUsername(username)

    const existingEmail = await prisma.user.findUnique({ where: { email: cleanEmail } })
    if (existingEmail) {
      res.status(409).json({ error: 'An account with this email already exists' })
      return
    }

    const existingUsername = await prisma.user.findUnique({ where: { username: cleanUsername } })
    if (existingUsername) {
      res.status(409).json({ error: 'This username is already taken' })
      return
    }

    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        username: cleanUsername,
        email: cleanEmail,
        passwordHash,
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(cleanUsername)}`,
        joinedDate: new Date().toISOString().split('T')[0],
      },
    })

    await syncUserToSupabaseAuth(cleanEmail, password, cleanUsername)

    const accessToken = generateAccessToken({ userId: user.id, email: user.email })
    const refreshToken = generateRefreshToken()

    await prisma.refreshToken.create({
      data: {
        tokenHash: hashRefreshToken(refreshToken),
        userId: user.id,
        expiresAt: new Date(Date.now() + config.jwt.refreshExpiresMs),
      },
    })

    setAuthCookies(res, accessToken, refreshToken)

    res.status(201).json({
      success: true,
      user: formatUser(user),
    })
  } catch (error) {
    console.error('[AUTH] Register error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const errors = validateLogin(email, password)
    if (errors.length > 0) {
      res.status(400).json({ error: errors[0].message, errors })
      return
    }

    const cleanEmail = sanitizeEmail(email)

    const user = await prisma.user.findUnique({ where: { email: cleanEmail } })
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const passwordValid = await comparePassword(password, user.passwordHash)
    if (!passwordValid) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    await prisma.refreshToken.deleteMany({
      where: {
        userId: user.id,
        expiresAt: { lt: new Date() },
      },
    })

    const accessToken = generateAccessToken({ userId: user.id, email: user.email })
    const refreshToken = generateRefreshToken()

    await prisma.refreshToken.create({
      data: {
        tokenHash: hashRefreshToken(refreshToken),
        userId: user.id,
        expiresAt: new Date(Date.now() + config.jwt.refreshExpiresMs),
      },
    })

    setAuthCookies(res, accessToken, refreshToken)

    res.json({
      success: true,
      user: formatUser(user),
    })
  } catch (error) {
    console.error('[AUTH] Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})


router.post('/logout', async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refresh_token

    // Best-effort: delete the specific refresh token from DB
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: { tokenHash: hashRefreshToken(refreshToken) },
      }).catch(() => {})
    }

    res.clearCookie('access_token', { ...config.cookie })
    res.clearCookie('refresh_token', { ...config.cookie, path: '/api/auth' })

    res.json({ success: true })
  } catch (error) {
    console.error('[AUTH] Logout error:', error)
    // Always clear cookies even on error
    res.clearCookie('access_token', { ...config.cookie })
    res.clearCookie('refresh_token', { ...config.cookie, path: '/api/auth' })
    res.json({ success: true })
  }
})


router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const oldToken = req.cookies?.refresh_token

    if (!oldToken) {
      res.status(401).json({ error: 'No refresh token' })
      return
    }

    const tokenHash = hashRefreshToken(oldToken)
    const storedToken = await prisma.refreshToken.findFirst({
      where: { tokenHash },
      include: { user: true },
    })

    if (!storedToken) {
      res.clearCookie('access_token', { ...config.cookie })
      res.clearCookie('refresh_token', { ...config.cookie, path: '/api/auth' })
      res.status(401).json({ error: 'Invalid refresh token' })
      return
    }

    if (storedToken.expiresAt < new Date()) {
      await prisma.refreshToken.delete({ where: { id: storedToken.id } })
      res.clearCookie('access_token', { ...config.cookie })
      res.clearCookie('refresh_token', { ...config.cookie, path: '/api/auth' })
      res.status(401).json({ error: 'Refresh token expired' })
      return
    }

    await prisma.refreshToken.delete({ where: { id: storedToken.id } })

    const user = storedToken.user
    const newAccessToken = generateAccessToken({ userId: user.id, email: user.email })
    const newRefreshToken = generateRefreshToken()

    await prisma.refreshToken.create({
      data: {
        tokenHash: hashRefreshToken(newRefreshToken),
        userId: user.id,
        expiresAt: new Date(Date.now() + config.jwt.refreshExpiresMs),
      },
    })

    setAuthCookies(res, newAccessToken, newRefreshToken)

    res.json({
      success: true,
      user: formatUser(user),
    })
  } catch (error) {
    console.error('[AUTH] Refresh error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})


router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
    })

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.json({
      success: true,
      user: formatUser(user),
    })
  } catch (error) {
    console.error('[AUTH] Me error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
