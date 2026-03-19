import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  isLoggedIn: boolean
  loading: boolean
}

interface AuthContextValue extends Omit<AuthState, 'loading'> {
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  showAuthModal: boolean
  setShowAuthModal: (show: boolean) => void
  authModalTab: 'login' | 'register'
  setAuthModalTab: (tab: 'login' | 'register') => void
  openLogin: () => void
  openRegister: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

// Helper to make auth API requests
async function authFetch(url: string, body?: Record<string, string>): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const res = await fetch(url, {
      method: body ? 'POST' : 'GET',
      headers: body ? { 'Content-Type': 'application/json' } : {},
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    })
    const data = await res.json()
    if (!res.ok) {
      return { success: false, error: data.error || 'Something went wrong' }
    }
    return { success: true, user: data.user }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(`[AUTH] Failed to fetch ${url}:`, errorMessage)
    return { success: false, error: 'Network error — please try again' }
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({ user: null, isLoggedIn: false, loading: true })
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login')

  // On mount, try to restore session via /api/auth/me
  useEffect(() => {
    let cancelled = false

    async function restoreSession() {
      const result = await authFetch('/api/auth/me')
      if (cancelled) return

      if (result.success && result.user) {
        setAuthState({ user: result.user, isLoggedIn: true, loading: false })
      } else {
        // Try refreshing the token
        const refreshResult = await authFetch('/api/auth/refresh', {})
        if (!cancelled && refreshResult.success && refreshResult.user) {
          setAuthState({ user: refreshResult.user, isLoggedIn: true, loading: false })
        } else if (!cancelled) {
          setAuthState({ user: null, isLoggedIn: false, loading: false })
        }
      }
    }

    restoreSession()
    return () => { cancelled = true }
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const result = await authFetch('/api/auth/login', { email, password })

    if (result.success && result.user) {
      setAuthState({ user: result.user, isLoggedIn: true, loading: false })
      setShowAuthModal(false)
      return { success: true }
    }

    return { success: false, error: result.error }
  }, [])

  const register = useCallback(async (username: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const result = await authFetch('/api/auth/register', { username, email, password })

    if (result.success && result.user) {
      setAuthState({ user: result.user, isLoggedIn: true, loading: false })
      setShowAuthModal(false)
      return { success: true }
    }

    return { success: false, error: result.error }
  }, [])

  const logout = useCallback(async () => {
    await authFetch('/api/auth/logout', {})
    setAuthState({ user: null, isLoggedIn: false, loading: false })
  }, [])

  const openLogin = useCallback(() => {
    setAuthModalTab('login')
    setShowAuthModal(true)
  }, [])

  const openRegister = useCallback(() => {
    setAuthModalTab('register')
    setShowAuthModal(true)
  }, [])

  return (
    <AuthContext.Provider value={{
      user: authState.user,
      isLoggedIn: authState.isLoggedIn,
      loading: authState.loading,
      login,
      register,
      logout,
      showAuthModal,
      setShowAuthModal,
      authModalTab,
      setAuthModalTab,
      openLogin,
      openRegister,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
