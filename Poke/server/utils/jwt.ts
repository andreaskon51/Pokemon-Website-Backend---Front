import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { config } from '../config.js'

interface TokenPayload {
  userId: string
  email: string
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  })
}

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, config.jwt.accessSecret) as TokenPayload
}

export function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString('hex')
}

export function verifyRefreshTokenJwt(token: string): TokenPayload {
  return jwt.verify(token, config.jwt.refreshSecret) as TokenPayload
}

export function hashRefreshToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}
