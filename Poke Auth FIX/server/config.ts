import dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',

  jwt: {
    accessSecret: process.env.JWT_SECRET || 'fallback-access-secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret',
    accessExpiresIn: '15m',
    refreshExpiresIn: '7d',
    refreshExpiresMs: 7 * 24 * 60 * 60 * 1000,
  },

  bcrypt: {
    saltRounds: 12,
  },

  rateLimit: {
    windowMs: 15 * 60 * 1000,
    maxAttempts: 10,
  },

  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  },

  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  },
} as const
