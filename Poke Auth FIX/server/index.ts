import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { config } from './config.js'
import authRoutes from './routes/auth.js'

const app = express()

app.use(helmet())

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true)
      // In development, allow any localhost port
      if (config.nodeEnv !== 'production' && origin.startsWith('http://localhost:')) {
        return callback(null, true)
      }
      // In production, only allow the configured origin
      if (origin === config.corsOrigin) {
        return callback(null, true)
      }
      callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  })
)

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const authLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxAttempts,
  message: { error: 'Too many attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/auth/login', authLimiter)
app.use('/api/auth/register', authLimiter)
app.use('/api/auth/refresh', authLimiter)

app.use('/api/auth', authRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error('[SERVER] Unhandled error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
)

app.listen(config.port, () => {
  console.log(`[SERVER] PokéMarket API running on http://localhost:${config.port}`)
  console.log(`[SERVER] Environment: ${config.nodeEnv}`)
})

export default app
