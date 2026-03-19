import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Eye, Heart, Gavel } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Listing } from '@/types'
import { formatPrice, timeRemaining, formatNumber } from '@/utils'
import ConditionBadge from '@/components/badges/ConditionBadge'
import ListingTypeBadge from '@/components/badges/ListingTypeBadge'

export default function ListingCard({ listing, index = 0, variant = 'grid' }: { listing: Listing; index?: number; variant?: 'grid' | 'list' }) {
  const isAuction = listing.listingType === 'auction'
  const isTrade = listing.listingType === 'trade'
  const [isSaved, setIsSaved] = useState(false)

  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.03 }}
      >
        <Link to={`/listing/${listing.id}`} className="block group">
          <div className="card-hover rounded-2xl overflow-hidden bg-brand-card border border-white/[0.06] hover:border-red-500/20 flex">
            {/* Image */}
            <div className="relative w-36 sm:w-48 shrink-0 overflow-hidden bg-gradient-to-b from-brand-surface to-brand-dark">
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-2 left-2">
                <ListingTypeBadge type={listing.listingType} />
              </div>
            </div>
            {/* Details */}
            <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-white leading-tight line-clamp-1 group-hover:text-red-400 transition-colors mb-2">
                  {listing.title}
                </h3>
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <ConditionBadge condition={listing.condition} />
                  <span className="text-[11px] text-gray-500">{listing.set}</span>
                  <span className="text-[11px] text-gray-500">·</span>
                  <span className="text-[11px] text-gray-500">{listing.edition}</span>
                  <span className="text-[11px] text-gray-500">·</span>
                  <span className="text-[11px] text-gray-500">{listing.pokemonType}</span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 hidden sm:block">{listing.description}</p>
              </div>
              <div className="flex items-end justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <img src={listing.seller.avatar} alt="" className="w-4 h-4 rounded-full bg-brand-surface" />
                  <span>{listing.seller.username}</span>
                  {listing.seller.verified && <span className="text-blue-400 text-[10px]">✓</span>}
                  <span className="mx-1">·</span>
                  <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{formatNumber(listing.views)}</span>
                  <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" />{formatNumber(listing.watchers)}</span>
                </div>
                <div className="text-right shrink-0">
                  {isAuction ? (
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase">Current Bid</p>
                      <p className="text-lg font-black text-white">{formatPrice(listing.currentBid || 0)}</p>
                      {listing.auctionEnd && (
                        <p className="text-[10px] text-amber-400 flex items-center gap-1 justify-end"><Clock className="w-3 h-3" />{timeRemaining(listing.auctionEnd)}</p>
                      )}
                    </div>
                  ) : isTrade ? (
                    <span className="text-sm font-semibold text-blue-400">Open to Trades</span>
                  ) : (
                    <p className="text-lg font-black text-white">{formatPrice(listing.price || 0)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/listing/${listing.id}`} className="block group">
        <div className="card-hover rounded-2xl overflow-hidden bg-brand-card border border-white/[0.06] hover:border-red-500/20">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-brand-surface to-brand-dark">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Overlay badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <ListingTypeBadge type={listing.listingType} />
            </div>
            {/* Watchers */}
            <div className="absolute top-3 right-3">
              <button
                className={`w-8 h-8 rounded-full glass flex items-center justify-center transition-colors ${
                  isSaved ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                }`}
                aria-label="Save to favorites"
                onClick={e => { e.preventDefault(); e.stopPropagation(); setIsSaved(s => !s) }}>
                <Heart className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
              </button>
            </div>
            {/* Auction timer */}
            {isAuction && listing.auctionEnd && (
              <div className="absolute bottom-3 left-3 right-3">
                <div className="glass rounded-lg px-3 py-1.5 flex items-center gap-1.5 text-xs">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300 font-medium">{timeRemaining(listing.auctionEnd)} left</span>
                  <span className="ml-auto text-gray-400">{listing.bidCount} bids</span>
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4 space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
                {listing.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <ConditionBadge condition={listing.condition} />
              <span className="text-[11px] text-gray-500">{listing.set}</span>
            </div>

            {/* Price section */}
            <div className="pt-1 border-t border-white/[0.04]">
              {isAuction ? (
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Current Bid</p>
                    <p className="text-lg font-black text-white">{formatPrice(listing.currentBid || 0)}</p>
                  </div>
                  {listing.buyItNowPrice && (
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider">Buy Now</p>
                      <p className="text-sm font-bold text-amber-400">{formatPrice(listing.buyItNowPrice)}</p>
                    </div>
                  )}
                </div>
              ) : isTrade ? (
                <div className="flex items-center gap-1.5 text-blue-400">
                  <Gavel className="w-3.5 h-3.5" />
                  <span className="text-sm font-semibold">Open to Trades</span>
                </div>
              ) : (
                <p className="text-lg font-black text-white">{formatPrice(listing.price || 0)}</p>
              )}
            </div>

            {/* Seller + stats */}
            <div className="flex items-center justify-between text-[11px] text-gray-500">
              <div className="flex items-center gap-1.5">
                <img src={listing.seller.avatar} alt="" className="w-4 h-4 rounded-full bg-brand-surface" />
                <span>{listing.seller.username}</span>
                {listing.seller.verified && <span className="text-blue-400 text-[10px]">✓</span>}
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" />{formatNumber(listing.views)}</span>
              </div>
            </div>

            {/* Hover CTA */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pt-1">
              <div className={`w-full py-2 rounded-xl text-center text-xs font-bold border ${
                isAuction
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  : isTrade
                  ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {isAuction ? 'Place Bid →' : isTrade ? 'Make Offer →' : 'Buy Now →'}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
