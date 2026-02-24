# PokéMarket

## Features

- **User Authentication** - Secure JWT-based auth with refresh tokens and httpOnly cookies
- **Card Listings** - Browse, search, and filter Pokémon cards
- **Multiple Listing Types** - Fixed price sales, auctions, and trade offers
- **User Profiles** - Rating system, sales history, and collection management
- **Real-time Updates** - Live auction countdowns and notification system
- **Responsive Design** - Beautiful UI that works on all devices
- **Search & Filters** - Advanced filtering by type, rarity, condition, and more

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tooling and HMR
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Modern icon library

### Backend
- **Node.js + Express** with TypeScript
- **Prisma ORM** - Type-safe database access
- **PostgreSQL** - Primary database
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin security

### Additional Tools
- **Supabase** - Optional auth sync
- **TSX** - TypeScript execution for dev
- **Express Rate Limit** - API protection

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+ (or Supabase account)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Pokemon
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the project root:

```env
# Database (PostgreSQL or Supabase)
DATABASE_URL=postgresql://user:password@localhost:5432/pokemarket

# JWT Secrets (generate with: node -p "require('crypto').randomBytes(32).toString('hex')")
JWT_SECRET=your_access_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here

# Server Config
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:5173

# Optional: Supabase (for auth dashboard integration)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Set up the database**
```bash
npm run db:generate
npm run db:migrate
```

5. **Start development servers**

You need **two terminal windows**:

**Terminal 1 - Backend:**
```bash
npm run server:dev
```
Should display: `[SERVER] PokéMarket API running on http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Should display: `Local: http://localhost:5173/`

6. **Open the app**

Navigate to `http://localhost:5173` in your browser.

## Project Structure

```
Pokemon/
├── src/                     # Frontend source
│   ├── components/          # React components
│   │   ├── auth/           # Auth modal & forms
│   │   ├── badges/         # Condition, rarity, type badges
│   │   ├── layout/         # Navbar, footer
│   │   └── ui/             # Reusable UI components
│   ├── contexts/           # React context providers
│   │   ├── AuthContext.tsx # User authentication state
│   │   └── ToastContext.tsx # Notification system
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Landing page
│   │   ├── Search.tsx      # Card search & filters
│   │   ├── ListingDetail.tsx # Individual card view
│   │   ├── CreateListing.tsx # Create new listing
│   │   ├── Profile.tsx     # User profile
│   │   ├── Dashboard.tsx   # User dashboard
│   │   └── Messages.tsx    # Messaging system
│   ├── data/               # Mock data & constants
│   ├── types.ts            # TypeScript type definitions
│   ├── utils.ts            # Helper functions
│   └── main.tsx            # App entry point
│
├── server/                  # Backend source
│   ├── routes/             # API routes
│   │   └── auth.ts         # Authentication endpoints
│   ├── middleware/         # Express middleware
│   │   └── authenticate.ts # JWT verification
│   ├── utils/              # Helper functions
│   │   ├── jwt.ts          # Token generation/verification
│   │   ├── password.ts     # Password hashing
│   │   ├── validate.ts     # Input validation
│   │   └── supabase.ts     # Supabase integration
│   ├── config.ts           # Server configuration
│   └── index.ts            # Server entry point
│
├── prisma/                  # Database schema & migrations
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Migration history
│
└── public/                  # Static assets
```

## API Documentation

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string (3-30 chars)",
  "email": "string (valid email)",
  "password": "string (min 8 chars, uppercase, lowercase, number)"
}

Response: { success: true, user: User }
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}

Response: { success: true, user: User }
Sets httpOnly cookies: access_token, refresh_token
```

#### Logout
```http
POST /api/auth/logout
Cookie: access_token

Response: { success: true }
```

#### Refresh Token
```http
POST /api/auth/refresh
Cookie: refresh_token

Response: { success: true, user: User }
```

#### Get Current User
```http
GET /api/auth/me
Cookie: access_token

Response: { success: true, user: User }
```

### Database Schema

**users**
- id (uuid, primary key)
- username (unique, 3-30 chars)
- email (unique)
- passwordHash
- avatar (URL)
- bio
- verified (boolean)
- rating (decimal)
- totalReviews (int)
- totalSales (int)
- joinedDate

**refresh_tokens**
- id (uuid, primary key)
- userId (foreign key → users)
- tokenHash (SHA-256)
- expiresAt
- createdAt

## Scripts

```bash
# Development
npm run dev              # Start frontend dev server (Vite)
npm run server:dev       # Start backend dev server (TSX watch)

# Build
npm run build            # Build frontend for production
npm run preview          # Preview production build locally

# Database
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
npm run db:studio        # Open Prisma Studio (DB GUI)
```

## Security Features

- **Password Security** - bcrypt hashing with 12 salt rounds
- **JWT Tokens** - Short-lived access tokens (15min), long-lived refresh tokens (7d)
- **HttpOnly Cookies** - XSS protection
- **Refresh Token Rotation** - Single-use tokens prevent replay attacks
- **Token Hashing** - Refresh tokens stored as SHA-256 hashes
- **Rate Limiting** - Prevents brute force attacks (10 attempts per 15min)
- **Input Validation** - Server-side validation with sanitization
- **CORS** - Configured for specific origin only
- **Helmet** - Security headers middleware

## Development Workflow

### Making Changes

Frontend:
- Hot Module Replacement (HMR) auto-reloads on file save
- Changes appear instantly in browser

Backend:
- TSX watch mode auto-restarts server on file save
- Console shows restart confirmation

### Common Issues

**"Network error" on login**
- Backend server not running → Run `npm run server:dev`
- Check Terminal 1 shows server running on port 3001

**Database connection failed**
- PostgreSQL not running → Start PostgreSQL service
- Wrong DATABASE_URL → Check `.env` file
- Database doesn't exist → Create it or run migrations

**Port already in use**
```bash
# Kill process on port 3001 (backend)
npx kill-port 3001

# Kill process on port 5173 (frontend)
npx kill-port 5173
```
### Code Style

- Use TypeScript for all new files
- Follow existing code formatting
- Run Prettier before committing
- No console.logs in production code
- Add comments for complex logic only

## Acknowledgments

- Pokémon TCG data and card images
- Dicebear for avatar generation
- Lucide for icons
