import React, { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Clock, Eye, Heart, Share2, Shield, Star, MessageCircle,
  ChevronLeft, Gavel, ShoppingCart, ArrowLeftRight, Flag, Truck,
  CheckCircle, AlertTriangle, ChevronRight, User
} from 'lucide-react'
import { mockListings, mockReviews } from '@/data/mockData'
import { formatPrice, timeRemaining, formatNumber, timeAgo } from '@/utils'
import ConditionBadge from '@/components/badges/ConditionBadge'
import RarityBadge from '@/components/badges/RarityBadge'
import ListingTypeBadge from '@/components/badges/ListingTypeBadge'
import TypeBadge from '@/components/badges/TypeBadge'
import StarRating from '@/components/ui/StarRating'
import ListingCard from '@/components/ListingCard'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/contexts/ToastContext'

export default function ListingDetail() {
  const { id } = useParams()
  const listing = mockListings.find(l => l.id === id)
  const [bidAmount, setBidAmount] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [showBidHistory, setShowBidHistory] = useState(false)
  const { isLoggedIn, openLogin } = useAuth()
  const { toast } = useToast()

  const requireAuth = (action: () => void) => {
    if (!isLoggedIn) { openLogin(); return }
    action()
  }

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Listing Not Found</h2>
        <Link to="/search" className="text-red-400 hover:text-red-300">Back to Browse</Link>
      </div>
    )
  }

  const isAuction = listing.listingType === 'auction'
  const isTrade = listing.listingType === 'trade'
  const isSale = listing.listingType === 'sale'
  const relatedListings = mockListings.filter(l => l.id !== listing.id && l.pokemonType === listing.pokemonType).slice(0, 4)

  // Stable mock bid history (generated once, not on every render)
  const mockBids = useMemo(() => {
    if (!isAuction) return []
    const count = Math.min(listing.bidCount || 5, 10)
    const baseBid = listing.currentBid || 0
    return Array.from({ length: count }, (_, i) => ({
      id: `bid-${i}`,
      user: `Trainer${100 + i * 37 + listing.id.charCodeAt(0)}`,
      amount: Math.max(baseBid - i * 150, Math.floor(baseBid * 0.3)),
      time: `${i * 2 + 1}h ago`,
    }))
  }, [isAuction, listing.bidCount, listing.currentBid, listing.id])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/search" className="hover:text-white flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Back</Link>
        <span>/</span>
        <Link to={`/search?set=${encodeURIComponent(listing.set)}`} className="hover:text-white">{listing.set}</Link>
        <span>/</span>
        <span className="text-gray-400">{listing.cardName}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="sticky top-24">
            {/* Main Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-brand-surface to-brand-dark border border-white/[0.06] mb-4">
              <img
                src={listing.images[selectedImage]}
                alt={listing.title}
                className="w-full h-full object-contain p-8"
              />
              {/* Badges overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <ListingTypeBadge type={listing.listingType} size="md" />
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors" aria-label="Save to favorites">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors" aria-label="Share listing">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              {isAuction && listing.auctionEnd && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass rounded-xl px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="text-amber-300 font-semibold text-sm">{timeRemaining(listing.auctionEnd)} remaining</span>
                    </div>
                    <span className="text-gray-400 text-xs">{listing.bidCount} bids</span>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {listing.images.length > 1 && (
              <div className="flex gap-2">
                {listing.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-red-500' : 'border-white/[0.06] hover:border-white/[0.15]'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain bg-brand-card p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div className="space-y-6">
            {/* Title & badges */}
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <ConditionBadge condition={listing.condition} />
                <RarityBadge rarity={listing.rarity} />
                <TypeBadge type={listing.pokemonType} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-display mb-2">{listing.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {formatNumber(listing.views)} views</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {formatNumber(listing.watchers)} watchers</span>
                <span>Listed {timeAgo(listing.createdAt)}</span>
              </div>
            </div>

            <div className="bg-brand-card rounded-2xl border border-white/[0.06] p-6">
              {isAuction ? (
                <div className="space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current Bid</p>
                      <p className="text-3xl font-black text-white">{formatPrice(listing.currentBid || 0)}</p>
                    </div>
                    {listing.buyItNowPrice && (
                      <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Buy It Now</p>
                        <p className="text-xl font-bold text-amber-400">{formatPrice(listing.buyItNowPrice)}</p>
                      </div>
                    )}
                  </div>

                  {/* Bid input */}
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={e => setBidAmount(e.target.value)}
                        placeholder={`${(listing.currentBid || 0) + 100} or more`}
                        className="w-full pl-7 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm outline-none focus:border-amber-500/40 transition-all"
                      />
                    </div>
                    <button onClick={() => requireAuth(() => {
                      if (!bidAmount || parseFloat(bidAmount) <= (listing.currentBid || 0)) {
                        toast('error', `Bid must be higher than ${formatPrice(listing.currentBid || 0)}`)
                        return
                      }
                      toast('success', `Bid of ${formatPrice(parseFloat(bidAmount))} placed successfully!`)
                      setBidAmount('')
                    })} className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl transition-colors flex items-center gap-2 shrink-0">
                      <Gavel className="w-4 h-4" /> Place Bid
                    </button>
                  </div>

                  {listing.buyItNowPrice && (
                    <button onClick={() => requireAuth(() => toast('success', `Purchase confirmed! ${listing.title} is yours.`))} className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                      <ShoppingCart className="w-4 h-4" /> Buy It Now — {formatPrice(listing.buyItNowPrice)}
                    </button>
                  )}

                  {/* Bid history toggle */}
                  <button
                    onClick={() => setShowBidHistory(!showBidHistory)}
                    className="w-full text-left text-sm text-gray-400 hover:text-white flex items-center justify-between py-2 border-t border-white/[0.04]"
                  >
                    <span>Bid History ({listing.bidCount} bids)</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${showBidHistory ? 'rotate-90' : ''}`} />
                  </button>

                  {showBidHistory && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {mockBids.map(bid => (
                        <div key={bid.id} className="flex items-center justify-between py-2 px-3 bg-white/[0.02] rounded-lg text-sm">
                          <span className="text-gray-400">{bid.user}</span>
                          <span className="text-white font-semibold">{formatPrice(bid.amount)}</span>
                          <span className="text-gray-500 text-xs">{bid.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : isTrade ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-400 mb-2">
                    <ArrowLeftRight className="w-5 h-5" />
                    <span className="text-lg font-bold">Open for Trades</span>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.04]">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Looking For</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{listing.tradePreferences}</p>
                  </div>
                  <button onClick={() => requireAuth(() => toast('info', 'Trade offer sent! The seller will be notified.'))} className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                    <ArrowLeftRight className="w-4 h-4" /> Send Trade Offer
                  </button>
                  <button onClick={() => requireAuth(() => toast('info', 'Opening chat with seller...'))} className="w-full py-3 bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 border border-white/[0.06]">
                    <MessageCircle className="w-4 h-4" /> Message Seller
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Price</p>
                    <p className="text-3xl font-black text-white">{formatPrice(listing.price || 0)}</p>
                    {listing.quantity > 1 && (
                      <p className="text-sm text-gray-500 mt-1">{listing.quantity} available</p>
                    )}
                  </div>
                  <button onClick={() => requireAuth(() => toast('success', `Purchase confirmed! ${listing.title} is yours.`))} className="w-full py-3.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 text-base">
                    <ShoppingCart className="w-5 h-5" /> Buy Now
                  </button>
                  <button onClick={() => requireAuth(() => toast('info', 'Offer sent to the seller!'))} className="w-full py-3 bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 border border-white/[0.06]">
                    <MessageCircle className="w-4 h-4" /> Make an Offer
                  </button>
                </div>
              )}
            </div>

            {/* Shipping & Protection */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-brand-card rounded-xl border border-white/[0.06] p-4 flex items-start gap-3">
                <Truck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Free Shipping</p>
                  <p className="text-xs text-gray-500">Insured & tracked</p>
                </div>
              </div>
              <div className="bg-brand-card rounded-xl border border-white/[0.06] p-4 flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-white">Buyer Protection</p>
                  <p className="text-xs text-gray-500">Money-back guarantee</p>
                </div>
              </div>
            </div>

            {/* Card Details */}
            <div className="bg-brand-card rounded-2xl border border-white/[0.06] p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Card Details</h3>
              <div className="grid grid-cols-2 gap-y-3.5 gap-x-6">
                {[
                  { label: 'Card Name', value: listing.cardName },
                  { label: 'Set', value: listing.set },
                  { label: 'Card Number', value: listing.cardNumber },
                  { label: 'Edition', value: listing.edition },
                  { label: 'Language', value: listing.language },
                  { label: 'Year', value: listing.year.toString() },
                  { label: 'Rarity', value: listing.rarity },
                  { label: 'Condition', value: listing.condition },
                  { label: 'Type', value: listing.pokemonType },
                ].map(detail => (
                  <div key={detail.label}>
                    <p className="text-[11px] text-gray-500 uppercase tracking-wider">{detail.label}</p>
                    <p className="text-sm text-white font-medium">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Description</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{listing.description}</p>
            </div>

            {/* Seller card */}
            <div className="bg-brand-card rounded-2xl border border-white/[0.06] p-5">
              <div className="flex items-center gap-4">
                <img src={listing.seller.avatar} alt="" className="w-12 h-12 rounded-full bg-brand-surface" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link to={`/profile/${listing.seller.id}`} className="text-sm font-bold text-white hover:text-red-400 transition-colors">
                      {listing.seller.username}
                    </Link>
                    {listing.seller.verified && (
                      <span className="flex items-center gap-0.5 text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <StarRating rating={listing.seller.rating} totalReviews={listing.seller.totalReviews} size="sm" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{listing.seller.totalSales}</p>
                  <p className="text-[10px] text-gray-500">sales</p>
                </div>
              </div>
            </div>

            {/* Report */}
            <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-400 transition-colors">
              <Flag className="w-3 h-3" /> Report this listing
            </button>
          </div>
        </motion.div>
      </div>

      {/* ─── Related Listings ─── */}
      {relatedListings.length > 0 && (
        <section className="mt-16 pt-8 border-t border-white/[0.04]">
          <h2 className="text-xl font-black text-white font-display mb-6">More Like This</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedListings.map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
