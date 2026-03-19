import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import type { Portfolio, PortfolioItem, Transaction, ChartPoint, Currency } from '@/types'
import { MOCK_PORTFOLIOS, MOCK_TRANSACTIONS } from '@/data/portfolioMockData'

// Mock exchange rates relative to USD
export const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
}

// Generate a simulated 30-day portfolio value history ending at currentValue
function generateHistory(currentValue: number): ChartPoint[] {
  const points: ChartPoint[] = []
  // Start at ~72% of current to simulate growth over time
  let value = currentValue * 0.72
  const now = new Date()

  for (let i = 30; i > 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    // Slight upward bias: -44%..+56% of a 4% swing
    const pct = (Math.random() - 0.44) * 0.04
    value = Math.max(value * (1 + pct), 10)
    points.push({ date: d.toISOString().split('T')[0], value: Math.round(value) })
  }

  // Today exactly matches current value
  points.push({ date: now.toISOString().split('T')[0], value: Math.round(currentValue) })
  return points
}

export function calcPortfolioValue(items: PortfolioItem[]): number {
  return items.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0)
}

export function calcPortfolioInvested(items: PortfolioItem[]): number {
  return items.reduce((sum, item) => sum + item.purchasePrice * item.quantity, 0)
}

interface PortfolioContextValue {
  portfolios: Portfolio[]
  transactions: Transaction[]
  selectedId: string
  selectedPortfolio: Portfolio | undefined
  selectPortfolio: (id: string) => void
  createPortfolio: (name: string, currency: Currency) => void
  deletePortfolio: (id: string) => void
  updatePortfolioCurrency: (id: string, currency: Currency) => void
  addItem: (portfolioId: string, item: Omit<PortfolioItem, 'id' | 'addedAt'>) => void
  updateItem: (portfolioId: string, item: PortfolioItem) => void
  removeItem: (portfolioId: string, itemId: string) => void
  getChartData: (portfolioId: string) => ChartPoint[]
  formatAmount: (usd: number, currency: Currency) => string
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null)

export function usePortfolio() {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider')
  return ctx
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key)
    if (stored) return JSON.parse(stored) as T
  } catch { /* ignore parse errors */ }
  return fallback
}

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(() =>
    loadFromStorage('pm_portfolios', MOCK_PORTFOLIOS)
  )
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadFromStorage('pm_transactions', MOCK_TRANSACTIONS)
  )
  const [selectedId, setSelectedId] = useState<string>(() => {
    const stored = loadFromStorage<Portfolio[]>('pm_portfolios', MOCK_PORTFOLIOS)
    return stored[0]?.id ?? ''
  })

  // Cache chart data per portfolio so it's stable within a session
  const chartCache = useRef<Map<string, ChartPoint[]>>(new Map())

  // Persist to localStorage on changes
  useEffect(() => {
    localStorage.setItem('pm_portfolios', JSON.stringify(portfolios))
  }, [portfolios])

  useEffect(() => {
    localStorage.setItem('pm_transactions', JSON.stringify(transactions))
  }, [transactions])

  const selectedPortfolio = portfolios.find(p => p.id === selectedId)

  const getChartData = useCallback((portfolioId: string): ChartPoint[] => {
    if (chartCache.current.has(portfolioId)) {
      return chartCache.current.get(portfolioId)!
    }
    const portfolio = portfolios.find(p => p.id === portfolioId)
    if (!portfolio || portfolio.items.length === 0) return []
    const data = generateHistory(calcPortfolioValue(portfolio.items))
    chartCache.current.set(portfolioId, data)
    return data
  }, [portfolios])

  const createPortfolio = useCallback((name: string, currency: Currency) => {
    const newPortfolio: Portfolio = {
      id: `portfolio-${Date.now()}`,
      name,
      currency,
      createdAt: new Date().toISOString(),
      items: [],
    }
    setPortfolios(prev => [...prev, newPortfolio])
    setSelectedId(newPortfolio.id)
  }, [])

  const deletePortfolio = useCallback((id: string) => {
    setPortfolios(prev => {
      const remaining = prev.filter(p => p.id !== id)
      if (selectedId === id && remaining.length > 0) {
        setSelectedId(remaining[0].id)
      }
      return remaining
    })
    chartCache.current.delete(id)
  }, [selectedId])

  const updatePortfolioCurrency = useCallback((id: string, currency: Currency) => {
    setPortfolios(prev => prev.map(p => p.id === id ? { ...p, currency } : p))
  }, [])

  const addItem = useCallback((portfolioId: string, itemData: Omit<PortfolioItem, 'id' | 'addedAt'>) => {
    const item: PortfolioItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      addedAt: new Date().toISOString(),
    }
    setPortfolios(prev =>
      prev.map(p => p.id === portfolioId ? { ...p, items: [...p.items, item] } : p)
    )
    const tx: Transaction = {
      id: `tx-${Date.now()}`,
      portfolioId,
      itemId: item.id,
      itemName: item.name,
      type: 'buy',
      price: item.purchasePrice,
      quantity: item.quantity,
      timestamp: new Date().toISOString(),
    }
    setTransactions(prev => [tx, ...prev])
    chartCache.current.delete(portfolioId)
  }, [])

  const updateItem = useCallback((portfolioId: string, updatedItem: PortfolioItem) => {
    setPortfolios(prev =>
      prev.map(p =>
        p.id === portfolioId
          ? { ...p, items: p.items.map(i => i.id === updatedItem.id ? updatedItem : i) }
          : p
      )
    )
    chartCache.current.delete(portfolioId)
  }, [])

  const removeItem = useCallback((portfolioId: string, itemId: string) => {
    setPortfolios(prev =>
      prev.map(p =>
        p.id === portfolioId ? { ...p, items: p.items.filter(i => i.id !== itemId) } : p
      )
    )
    chartCache.current.delete(portfolioId)
  }, [])

  const formatAmount = useCallback((usdAmount: number, currency: Currency): string => {
    const converted = usdAmount * EXCHANGE_RATES[currency]
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(converted)
  }, [])

  return (
    <PortfolioContext.Provider value={{
      portfolios,
      transactions,
      selectedId,
      selectedPortfolio,
      selectPortfolio: setSelectedId,
      createPortfolio,
      deletePortfolio,
      updatePortfolioCurrency,
      addItem,
      updateItem,
      removeItem,
      getChartData,
      formatAmount,
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}
