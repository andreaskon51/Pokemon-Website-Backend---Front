import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search, ArrowRight, TrendingUp, Gavel, ShoppingCart, ArrowLeftRight,
  Shield, Star, Zap, Users, ChevronRight, Clock, Flame, Sparkles
} from 'lucide-react'
import { mockListings, trendingSearches, platformStats } from '@/data/mockData'
import { formatPrice, formatNumber, timeRemaining } from '@/utils'
import ListingCard from '@/components/ListingCard'
import ListingTypeBadge from '@/components/badges/ListingTypeBadge'

export default function Home() {
  const navigate = useNavigate()
  const featuredAuctions = mockListings.filter(l => l.listingType === 'auction').slice(0, 3)
  const recentListings = mockListings.slice(0, 8)
  const topCards = mockListings.filter(l => l.listingType === 'sale').slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-red-950/20" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs font-semibold rounded-full border border-red-500/20">
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  #1 Pokemon Card Marketplace
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 font-display">
                Buy, Sell & Trade{' '}
                <span className="gradient-text">Pokémon Cards</span>{' '}
                with Confidence
              </h1>

              <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
                The trusted marketplace for collectors and traders. Auction rare finds,
                trade your duplicates, or buy your next grail card — all with buyer protection.
              </p>

              {/* Search bar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search for any Pokémon card..."
                    className="w-full pl-12 pr-4 py-4 bg-white/[0.06] border border-white/[0.1] rounded-2xl text-white placeholder-gray-500 outline-none focus:border-red-500/40 focus:bg-white/[0.08] transition-all text-base"
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        const val = (e.target as HTMLInputElement).value
                        if (val.trim()) navigate(`/search?q=${encodeURIComponent(val)}`)
                      }
                    }}
                  />
                </div>
                <Link
                  to="/search"
                  className="px-6 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  Browse All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trending */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-500 font-medium flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Trending:</span>
                {trendingSearches.slice(0, 5).map(term => (
                  <Link
                    key={term}
                    to={`/search?q=${encodeURIComponent(term)}`}
                    className="px-3 py-1 bg-white/[0.04] hover:bg-white/[0.08] text-gray-400 hover:text-white text-xs rounded-full border border-white/[0.06] transition-all"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Right: Featured card showcase */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="relative z-10 max-w-xs mx-auto">
                  <Link to={`/listing/${mockListings[0].id}`}>
                    <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-brand-card animate-pulse-glow">
                      <div className="aspect-[3/4] bg-gradient-to-b from-red-950/30 to-brand-dark p-6">
                        <img
                          src={mockListings[0].images[0]}
                          alt={mockListings[0].title}
                          className="w-full h-full object-contain drop-shadow-2xl animate-float"
                        />
                      </div>
                      <div className="p-4 bg-brand-card">
                        <p className="text-sm font-semibold text-white mb-1">{mockListings[0].title}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-black text-amber-400">
                            {formatPrice(mockListings[0].currentBid || mockListings[0].price || 0)}
                          </span>
                          <ListingTypeBadge type={mockListings[0].listingType} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                {/* Background cards */}
                <div className="absolute top-8 -left-8 w-48 h-64 bg-brand-card/50 rounded-2xl border border-white/[0.04] -rotate-12 blur-sm" />
                <div className="absolute top-8 -right-8 w-48 h-64 bg-brand-card/50 rounded-2xl border border-white/[0.04] rotate-12 blur-sm" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="border-y border-white/[0.04] bg-brand-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Listings', value: formatNumber(platformStats.totalListings), icon: ShoppingCart, color: 'text-green-400' },
              { label: 'Collectors', value: formatNumber(platformStats.totalUsers), icon: Users, color: 'text-blue-400' },
              { label: 'Transactions', value: formatNumber(platformStats.totalTransactions), icon: Zap, color: 'text-amber-400' },
              { label: 'Total Volume', value: '$' + formatNumber(platformStats.totalVolume), icon: TrendingUp, color: 'text-purple-400' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-black text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Live Auctions ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Live Now</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">Hot Auctions</h2>
          </div>
          <Link to="/search?type=auction" className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredAuctions.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/listing/${listing.id}`} className="block group">
                <div className="card-hover rounded-2xl overflow-hidden bg-brand-card border border-white/[0.06] hover:border-amber-500/20">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-brand-surface to-brand-dark">
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-3 right-3">
                      <div className="glass rounded-lg px-2.5 py-1 flex items-center gap-1.5 text-xs">
                        <Flame className="w-3 h-3 text-amber-400" />
                        <span className="text-amber-300 font-medium">{listing.bidCount} bids</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors line-clamp-1">
                      {listing.title}
                    </h3>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">Current Bid</p>
                        <p className="text-2xl font-black text-white">{formatPrice(listing.currentBid || 0)}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="text-xs font-semibold">{timeRemaining(listing.auctionEnd!)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="border-y border-white/[0.04] bg-brand-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display mb-3">Three Ways to Collect</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Whether you're buying, trading, or bidding — we've got you covered with secure transactions and buyer protection.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: ShoppingCart,
                title: 'Buy It Now',
                desc: 'Find the card you want and purchase instantly. Secure checkout with Stripe & PayPal.',
                color: 'text-green-400 bg-green-500/10 border-green-500/20',
                link: '/search?type=sale',
              },
              {
                icon: ArrowLeftRight,
                title: 'Trade Cards',
                desc: 'Offer your cards in exchange. We verify both sides before shipping — no scams.',
                color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
                link: '/search?type=trade',
              },
              {
                icon: Gavel,
                title: 'Live Auctions',
                desc: 'Bid on rare cards in real-time. Set max bids and get notified when you\'re outbid.',
                color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
                link: '/search?type=auction',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={item.link} className="block group">
                  <div className="card-hover rounded-2xl p-6 bg-brand-card border border-white/[0.06] hover:border-white/[0.1] h-full">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${item.color}`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Recent Listings Grid ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white font-display">Recently Listed</h2>
          <Link to="/search" className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors">
            See All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {recentListings.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      </section>

      {/* ─── Trust Bar ─── */}
      <section className="border-t border-white/[0.04] bg-brand-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, label: 'Buyer Protection', desc: 'Every purchase is covered', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
              { icon: Star, label: 'Verified Sellers', desc: 'Trusted community members', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
              { icon: Zap, label: 'Instant Payouts', desc: 'Sellers paid within 48h', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
              { icon: Search, label: 'Card Database', desc: 'Auto-fill card details', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
            ].map(item => (
              <div key={item.label} className="text-center">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mx-auto mb-3 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-white mb-1">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-800 p-8 sm:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 font-display">
              Start Selling Your Collection Today
            </h2>
            <p className="text-red-100/80 mb-6">
              List your Pokémon cards in minutes. Reach thousands of collectors and get the best price for your collection.
            </p>
            <Link
              to="/create-listing"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Create a Listing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
