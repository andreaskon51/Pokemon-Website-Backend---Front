import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, SlidersHorizontal, Plus, Pencil, Trash2,
  TrendingUp, TrendingDown, ChevronUp, ChevronDown,
} from 'lucide-react'
import type { PortfolioItem, Currency } from '@/types'

type SortKey = 'value' | 'gain' | 'gain_pct' | 'name' | 'category'
type SortDir = 'asc' | 'desc'

interface EnrichedItem extends PortfolioItem {
  totalValue: number
  totalCost: number
  gain: number
  gainPct: number
}

interface Props {
  items: PortfolioItem[]
  currency: Currency
  formatAmount: (usd: number, currency: Currency) => string
  onAddItem: () => void
  onEditItem: (item: PortfolioItem) => void
  onDeleteItem: (itemId: string) => void
}

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'value', label: 'Value' },
  { key: 'gain', label: 'Gain ($)' },
  { key: 'gain_pct', label: 'Gain (%)' },
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
]

export default function ItemList({
  items, currency, formatAmount, onAddItem, onEditItem, onDeleteItem,
}: Props) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortKey, setSortKey] = useState<SortKey>('value')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [showSortMenu, setShowSortMenu] = useState(false)

  // Enrich items with calculated fields
  const enriched: EnrichedItem[] = useMemo(() => items.map(item => {
    const totalValue = item.currentPrice * item.quantity
    const totalCost = item.purchasePrice * item.quantity
    const gain = totalValue - totalCost
    const gainPct = totalCost > 0 ? (gain / totalCost) * 100 : 0
    return { ...item, totalValue, totalCost, gain, gainPct }
  }), [items])

  // Unique categories for filter pills
  const categories = useMemo(() => {
    const cats = [...new Set(items.map(i => i.category))]
    return ['All', ...cats.sort()]
  }, [items])

  // Filter + sort
  const filtered = useMemo(() => {
    return enriched
      .filter(item => {
        const q = search.toLowerCase()
        const matchSearch = !q ||
          item.name.toLowerCase().includes(q) ||
          item.set.toLowerCase().includes(q) ||
          item.condition.toLowerCase().includes(q)
        const matchCat = selectedCategory === 'All' || item.category === selectedCategory
        return matchSearch && matchCat
      })
      .sort((a, b) => {
        let diff = 0
        if (sortKey === 'value') diff = a.totalValue - b.totalValue
        else if (sortKey === 'gain') diff = a.gain - b.gain
        else if (sortKey === 'gain_pct') diff = a.gainPct - b.gainPct
        else if (sortKey === 'name') diff = a.name.localeCompare(b.name)
        else if (sortKey === 'category') diff = a.category.localeCompare(b.category)
        return sortDir === 'desc' ? -diff : diff
      })
  }, [enriched, search, selectedCategory, sortKey, sortDir])

  // Top gainer / loser for the highlight bar
  const topGainer = enriched.length > 0
    ? enriched.reduce((a, b) => a.gainPct > b.gainPct ? a : b)
    : null
  const topLoser = enriched.length > 1
    ? enriched.reduce((a, b) => a.gainPct < b.gainPct ? a : b)
    : null

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortKey(key); setSortDir('desc') }
    setShowSortMenu(false)
  }

  return (
    <div className="space-y-4">
      {/* Top movers */}
      {enriched.length >= 2 && (
        <div className="grid grid-cols-2 gap-3">
          {topGainer && (
            <div className="rounded-xl border border-green-500/20 bg-green-500/[0.06] p-3">
              <p className="text-[11px] text-gray-500 mb-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-400" /> Top Gainer
              </p>
              <p className="text-sm font-bold text-white truncate">{topGainer.name}</p>
              <p className="text-sm font-black text-green-400">+{topGainer.gainPct.toFixed(1)}%</p>
            </div>
          )}
          {topLoser && topLoser.id !== topGainer?.id && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/[0.06] p-3">
              <p className="text-[11px] text-gray-500 mb-1 flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-red-400" /> Underperformer
              </p>
              <p className="text-sm font-bold text-white truncate">{topLoser.name}</p>
              <p className="text-sm font-black text-red-400">{topLoser.gainPct.toFixed(1)}%</p>
            </div>
          )}
        </div>
      )}

      {/* Controls row */}
      <div className="flex flex-wrap gap-2">
        {/* Search */}
        <div className="relative flex-1 min-w-[160px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search items..."
            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-8 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
          />
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(v => !v)}
            className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sort</span>
            {sortDir === 'desc' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
          {showSortMenu && (
            <div className="absolute right-0 top-full mt-1 z-20 bg-[#0f0f2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden min-w-[140px]">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => handleSort(opt.key)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs hover:bg-white/5 transition-colors ${
                    sortKey === opt.key ? 'text-white font-bold' : 'text-gray-400'
                  }`}
                >
                  {opt.label}
                  {sortKey === opt.key && (
                    <span className="text-gray-500">{sortDir === 'desc' ? '↓' : '↑'}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add item */}
        <button
          onClick={onAddItem}
          className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl px-3 py-2 text-sm font-bold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Item</span>
        </button>
      </div>

      {/* Category filter pills */}
      {categories.length > 2 && (
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-white/[0.04] text-gray-400 border border-white/[0.04] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Item cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          {items.length === 0 ? (
            <div>
              <p className="text-sm mb-3">No items in this portfolio yet.</p>
              <button
                onClick={onAddItem}
                className="text-red-400 hover:text-red-300 text-sm font-medium"
              >
                + Add your first item
              </button>
            </div>
          ) : (
            <p className="text-sm">No items match your search.</p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const isGain = item.gain >= 0
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: Math.min(i * 0.03, 0.15) }}
                  className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 hover:bg-white/[0.04] group transition-colors"
                >
                  {/* Card image */}
                  <div className="w-10 h-14 sm:w-12 sm:h-16 rounded-lg overflow-hidden bg-white/[0.04] shrink-0 flex items-center justify-center">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={e => {
                          const el = e.target as HTMLImageElement
                          el.style.display = 'none'
                          el.parentElement!.innerHTML = '<span class="text-gray-600 text-lg">🃏</span>'
                        }}
                      />
                    ) : (
                      <span className="text-gray-600 text-lg">🃏</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate leading-tight">{item.name}</p>
                    <p className="text-xs text-gray-500 truncate">{item.set}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{item.condition} · qty {item.quantity}</p>
                  </div>

                  {/* Price + P&L */}
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-white">
                      {formatAmount(item.currentPrice * item.quantity, currency)}
                    </p>
                    <p className={`text-xs font-bold ${isGain ? 'text-green-400' : 'text-red-400'}`}>
                      {isGain ? '+' : ''}{formatAmount(item.gain, currency)}
                    </p>
                    <p className={`text-xs ${isGain ? 'text-green-500/80' : 'text-red-500/80'}`}>
                      {isGain ? '+' : ''}{item.gainPct.toFixed(1)}%
                    </p>
                  </div>

                  {/* Action buttons (visible on hover) */}
                  <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button
                      onClick={() => onEditItem(item)}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                      title="Edit item"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
