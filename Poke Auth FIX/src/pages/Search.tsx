import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList,
  ArrowUpDown, Gavel, ShoppingCart, ArrowLeftRight
} from 'lucide-react'
import { mockListings } from '@/data/mockData'
import ListingCard from '@/components/ListingCard'
import type { ListingType, Condition, Rarity, PokemonType } from '@/types'

const conditions: Condition[] = ['PSA 10', 'PSA 9', 'PSA 8', 'PSA 7', 'PSA 6', 'PSA 5', 'PSA 4', 'PSA 3', 'PSA 2', 'PSA 1', 'Ungraded']
const rarities: Rarity[] = ['Secret Rare', 'Illustration Rare', 'Ultra Rare', 'Rare Holo', 'Rare', 'Uncommon', 'Common']
const sets = ['Base Set', 'Fossil', 'Jungle', 'Neo Genesis', 'POP Series 5']
const pokemonTypes: PokemonType[] = ['Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Fighting', 'Dark', 'Steel', 'Dragon', 'Fairy', 'Normal', 'Colorless']
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low → High' },
  { value: 'price-high', label: 'Price: High → Low' },
  { value: 'ending-soon', label: 'Ending Soon' },
  { value: 'most-watched', label: 'Most Watched' },
]

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter state from URL
  const query = searchParams.get('q') || ''
  const typeFilter = searchParams.get('type') as ListingType | null
  const conditionFilter = searchParams.get('condition') || ''
  const rarityFilter = searchParams.get('rarity') || ''
  const setFilter = searchParams.get('set') || ''
  const sortBy = searchParams.get('sort') || 'newest'
  const pokemonTypeFilter = searchParams.get('pokemonType') || ''
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) params.set(key, value)
    else params.delete(key)
    setSearchParams(params)
  }

  const clearFilters = () => {
    setSearchParams(query ? { q: query } : {})
  }

  // Filter + sort logic
  const filteredListings = useMemo(() => {
    let results = [...mockListings]

    if (query) {
      const q = query.toLowerCase()
      results = results.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.cardName.toLowerCase().includes(q) ||
        l.set.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
      )
    }
    if (typeFilter) results = results.filter(l => l.listingType === typeFilter)
    if (conditionFilter) results = results.filter(l => l.condition === conditionFilter)
    if (rarityFilter) results = results.filter(l => l.rarity === rarityFilter)
    if (setFilter) results = results.filter(l => l.set === setFilter)
    if (pokemonTypeFilter) results = results.filter(l => l.pokemonType === pokemonTypeFilter)
    if (minPrice) {
      const min = parseFloat(minPrice)
      results = results.filter(l => (l.price || l.currentBid || 0) >= min)
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice)
      results = results.filter(l => (l.price || l.currentBid || 0) <= max)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => (a.price || a.currentBid || 0) - (b.price || b.currentBid || 0))
        break
      case 'price-high':
        results.sort((a, b) => (b.price || b.currentBid || 0) - (a.price || a.currentBid || 0))
        break
      case 'ending-soon':
        results.sort((a, b) => {
          if (!a.auctionEnd) return 1
          if (!b.auctionEnd) return -1
          return new Date(a.auctionEnd).getTime() - new Date(b.auctionEnd).getTime()
        })
        break
      case 'most-watched':
        results.sort((a, b) => b.watchers - a.watchers)
        break
      default:
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return results
  }, [query, typeFilter, conditionFilter, rarityFilter, setFilter, pokemonTypeFilter, sortBy, minPrice, maxPrice])

  const activeFilterCount = [typeFilter, conditionFilter, rarityFilter, setFilter, pokemonTypeFilter, minPrice, maxPrice].filter(Boolean).length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display mb-2">
          {query ? `Results for "${query}"` : typeFilter ? `${typeFilter === 'auction' ? 'Live Auctions' : typeFilter === 'trade' ? 'Cards for Trade' : 'Cards for Sale'}` : 'Browse All Cards'}
        </h1>
        <p className="text-sm text-gray-500">{filteredListings.length} listings found</p>
      </div>

      {/* Search + Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={e => updateParam('q', e.target.value)}
            placeholder="Search cards, sets, sellers..."
            className="w-full pl-10 pr-4 py-3 bg-brand-card border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-red-500/40 transition-all"
          />
          {query && (
            <button onClick={() => updateParam('q', '')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Type filter pills */}
        <div className="flex items-center gap-2">
          {[
            { type: null, label: 'All', icon: null },
            { type: 'sale' as ListingType, label: 'Buy', icon: ShoppingCart },
            { type: 'trade' as ListingType, label: 'Trade', icon: ArrowLeftRight },
            { type: 'auction' as ListingType, label: 'Auction', icon: Gavel },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => updateParam('type', item.type || '')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all shrink-0
                ${typeFilter === item.type || (!typeFilter && !item.type)
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                  : 'bg-white/[0.04] text-gray-400 hover:text-white border border-white/[0.06]'
                }`}
            >
              {item.icon && <item.icon className="w-3.5 h-3.5" />}
              {item.label}
            </button>
          ))}
        </div>

        {/* Sort + Filter toggles */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => updateParam('sort', e.target.value)}
              className="appearance-none bg-brand-card border border-white/[0.08] rounded-lg text-sm text-gray-300 pl-3 pr-8 py-2 outline-none cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all border
              ${showFilters || activeFilterCount > 0
                ? 'bg-red-500/10 text-red-400 border-red-500/30'
                : 'bg-white/[0.04] text-gray-400 border-white/[0.06]'
              }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="hidden sm:flex items-center border border-white/[0.08] rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-white/[0.08] text-white' : 'text-gray-500 hover:text-white'}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-white/[0.08] text-white' : 'text-gray-500 hover:text-white'}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-brand-card border border-white/[0.06] rounded-2xl p-5 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Condition */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Condition</label>
                  <select
                    value={conditionFilter}
                    onChange={e => updateParam('condition', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-gray-300 px-3 py-2.5 outline-none"
                  >
                    <option value="">All Conditions</option>
                    {conditions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Rarity */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Rarity</label>
                  <select
                    value={rarityFilter}
                    onChange={e => updateParam('rarity', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-gray-300 px-3 py-2.5 outline-none"
                  >
                    <option value="">All Rarities</option>
                    {rarities.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                {/* Set */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Set</label>
                  <select
                    value={setFilter}
                    onChange={e => updateParam('set', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-gray-300 px-3 py-2.5 outline-none"
                  >
                    <option value="">All Sets</option>
                    {sets.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Pokemon Type */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Pokémon Type</label>
                  <select
                    value={pokemonTypeFilter}
                    onChange={e => updateParam('pokemonType', e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-gray-300 px-3 py-2.5 outline-none"
                  >
                    <option value="">All Types</option>
                    {pokemonTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Price Range</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={e => updateParam('minPrice', e.target.value)}
                      placeholder="Min"
                      className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-gray-300 px-3 py-2.5 outline-none w-full"
                    />
                    <span className="text-gray-600">—</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={e => updateParam('maxPrice', e.target.value)}
                      placeholder="Max"
                      className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-gray-300 px-3 py-2.5 outline-none w-full"
                    />
                  </div>
                </div>
              </div>

              {activeFilterCount > 0 && (
                <div className="flex items-center justify-end mt-4 pt-3 border-t border-white/[0.04]">
                  <button onClick={clearFilters} className="text-sm text-red-400 hover:text-red-300 font-medium flex items-center gap-1">
                    <X className="w-3.5 h-3.5" /> Clear all filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-white/[0.04] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No cards found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition-colors">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'
            : 'space-y-4'
        }>
          {filteredListings.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} variant={viewMode} />
          ))}
        </div>
      )}
    </div>
  )
}
