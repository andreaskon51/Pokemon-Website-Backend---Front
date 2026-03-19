export type ListingType = 'sale' | 'trade' | 'auction'
export type Condition = 'Ungraded' | 'PSA 1' | 'PSA 2' | 'PSA 3' | 'PSA 4' | 'PSA 5' | 'PSA 6' | 'PSA 7' | 'PSA 8' | 'PSA 9' | 'PSA 10'
export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Rare Holo' | 'Ultra Rare' | 'Secret Rare' | 'Illustration Rare'
export type PokemonType = 'Fire' | 'Water' | 'Grass' | 'Electric' | 'Psychic' | 'Fighting' | 'Dark' | 'Steel' | 'Dragon' | 'Fairy' | 'Normal' | 'Colorless'

export interface User {
  id: string
  username: string
  email: string
  avatar: string
  rating: number
  totalReviews: number
  totalSales: number
  verified: boolean
  joinedDate: string
  bio: string
}

export interface Listing {
  id: string
  title: string
  cardName: string
  set: string
  cardNumber: string
  edition: string
  language: string
  condition: Condition
  rarity: Rarity
  pokemonType: PokemonType
  year: number
  description: string
  images: string[]
  listingType: ListingType
  price?: number
  tradePreferences?: string
  startingBid?: number
  currentBid?: number
  reservePrice?: number
  buyItNowPrice?: number
  auctionEnd?: string
  bidCount?: number
  quantity: number
  seller: User
  createdAt: string
  views: number
  watchers: number
  status: 'active' | 'sold' | 'ended' | 'traded'
}

export interface Bid {
  id: string
  userId: string
  username: string
  amount: number
  timestamp: string
}

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string
  read: boolean
}

export interface Conversation {
  id: string
  otherUser: User
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  listingTitle: string
}

export interface Review {
  id: string
  reviewer: { name: string; avatar: string }
  rating: number
  comment: string
  date: string
}

export interface TradeOffer {
  id: string
  offeredCards: string[]
  offeredImages: string[]
  message: string
  status: 'pending' | 'accepted' | 'declined' | 'countered'
  from: User
}

// ─── Portfolio Tracking ───────────────────────────────────────────────────────

export type Currency = 'USD' | 'EUR' | 'GBP'

export interface ChartPoint {
  date: string   // YYYY-MM-DD
  value: number  // total portfolio value in USD
}

export interface PortfolioItem {
  id: string
  name: string
  category: string      // e.g. "Base Set", "Sword & Shield"
  condition: string     // e.g. "PSA 10", "Raw NM"
  purchasePrice: number // per unit in USD
  currentPrice: number  // per unit in USD
  quantity: number
  imageUrl: string
  set: string
  addedAt: string       // ISO datetime
}

export interface Portfolio {
  id: string
  name: string
  currency: Currency
  createdAt: string
  items: PortfolioItem[]
}

export interface Transaction {
  id: string
  portfolioId: string
  itemId: string
  itemName: string
  type: 'buy' | 'sell'
  price: number    // USD per unit
  quantity: number
  timestamp: string
}
