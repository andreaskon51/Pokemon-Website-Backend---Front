import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Package, ShoppingCart, Gavel, ArrowLeftRight, Heart, Clock,
  Plus, TrendingUp, DollarSign, Eye, Truck,
  CheckCircle, Pencil, Trash2
} from 'lucide-react'
import { mockListings } from '@/data/mockData'
import { formatPrice, timeRemaining, formatNumber } from '@/utils'
import ListingTypeBadge from '@/components/badges/ListingTypeBadge'
import ConditionBadge from '@/components/badges/ConditionBadge'
import ListingCard from '@/components/ListingCard'
import { useAuth } from '@/contexts/AuthContext'

const tabs = [
  { id: 'overview', label: 'Overview', icon: TrendingUp },
  { id: 'listings', label: 'My Listings', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'auctions', label: 'My Auctions', icon: Gavel },
  { id: 'trades', label: 'My Trades', icon: ArrowLeftRight },
  { id: 'favorites', label: 'Favorites', icon: Heart },
] as const

type TabId = typeof tabs[number]['id']

// Mock orders
const mockOrders = [
  { id: 'o1', listing: mockListings[5], status: 'shipped', tracking: '1Z999AA10123456784', buyer: 'TrainerRed', date: '2026-02-18' },
  { id: 'o2', listing: mockListings[6], status: 'delivered', tracking: '1Z999AA10123456785', buyer: 'ProfOak', date: '2026-02-15' },
  { id: 'o3', listing: mockListings[9], status: 'pending', tracking: '', buyer: 'MistyWaterflower', date: '2026-02-20' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabId>('overview')
  const myListings = mockListings.filter(l => l.seller.id === user?.id)
  const myAuctions = myListings.filter(l => l.listingType === 'auction')
  const myTrades = myListings.filter(l => l.listingType === 'trade')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">Dashboard</h1>
          <p className="text-sm text-gray-500">Manage your listings, orders, and trades</p>
        </div>
        <Link to="/create-listing" className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> New Listing
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-px mb-6 border-b border-white/[0.06] scrollbar-none">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 -mb-px shrink-0 ${
              activeTab === tab.id
                ? 'text-white border-red-500'
                : 'text-gray-500 border-transparent hover:text-gray-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── Overview Tab ─── */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Package, label: 'Active Listings', value: myListings.length, change: '+3 this week', color: 'text-blue-400 bg-blue-500/10' },
              { icon: DollarSign, label: 'Revenue', value: '$12,450', change: '+$1,200 this month', color: 'text-green-400 bg-green-500/10' },
              { icon: Eye, label: 'Total Views', value: formatNumber(myListings.reduce((s, l) => s + l.views, 0)), change: '+2.4K today', color: 'text-amber-400 bg-amber-500/10' },
              { icon: Heart, label: 'Total Watchers', value: formatNumber(myListings.reduce((s, l) => s + l.watchers, 0)), change: '+89 this week', color: 'text-red-400 bg-red-500/10' },
            ].map(stat => (
              <div key={stat.label} className="bg-brand-card rounded-xl border border-white/[0.06] p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                <p className="text-[10px] text-green-400 mt-1">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Recent activity */}
          <div className="bg-brand-card rounded-2xl border border-white/[0.06] p-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { icon: Gavel, text: 'New bid of $24,000 on your Charizard auction', time: '2h ago', color: 'text-amber-400' },
                { icon: Eye, text: 'Your Mew listing reached 4,500 views', time: '5h ago', color: 'text-blue-400' },
                { icon: ShoppingCart, text: 'TrainerRed purchased your Gyarados Holo', time: '1d ago', color: 'text-green-400' },
                { icon: ArrowLeftRight, text: 'New trade offer received for Mewtwo Holo', time: '2d ago', color: 'text-purple-400' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/[0.03] last:border-0">
                  <div className={`w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0 ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <p className="text-sm text-gray-300 flex-1">{activity.text}</p>
                  <span className="text-xs text-gray-500 shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── Listings Tab ─── */}
      {activeTab === 'listings' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="space-y-3">
            {myListings.map(listing => (
              <div key={listing.id} className="group bg-brand-card rounded-xl border border-white/[0.06] hover:border-white/[0.1] p-4 flex items-center gap-4 transition-all">
                <Link to={`/listing/${listing.id}`} className="shrink-0">
                  <img src={listing.images[0]} alt="" className="w-16 h-20 object-contain bg-brand-surface rounded-lg p-1 hover:opacity-80 transition-opacity" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/listing/${listing.id}`}>
                    <h3 className="text-sm font-semibold text-white truncate hover:text-red-400 transition-colors">{listing.title}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <ListingTypeBadge type={listing.listingType} />
                    <ConditionBadge condition={listing.condition} />
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-white">
                    {listing.price ? formatPrice(listing.price) : listing.currentBid ? formatPrice(listing.currentBid) : 'Trade'}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 justify-end"><Eye className="w-3 h-3" />{formatNumber(listing.views)}</p>
                </div>
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button className="p-2 rounded-lg bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors" title="Edit listing">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors" title="Delete listing">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── Orders Tab ─── */}
      {activeTab === 'orders' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="space-y-3">
            {mockOrders.map(order => (
              <div key={order.id} className="bg-brand-card rounded-xl border border-white/[0.06] p-4 flex items-center gap-4">
                <img src={order.listing.images[0]} alt="" className="w-16 h-20 object-contain bg-brand-surface rounded-lg p-1 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">{order.listing.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Buyer: {order.buyer} &bull; {order.date}</p>
                  {order.tracking && <p className="text-xs text-gray-600 mt-0.5">Tracking: {order.tracking}</p>}
                </div>
                <div className="shrink-0">
                  <span className={`badge border ${
                    order.status === 'delivered' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                    order.status === 'shipped' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                    'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {order.status === 'delivered' ? <CheckCircle className="w-3 h-3" /> :
                     order.status === 'shipped' ? <Truck className="w-3 h-3" /> :
                     <Clock className="w-3 h-3" />}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── Auctions Tab ─── */}
      {activeTab === 'auctions' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {myAuctions.length > 0 ? (
            <div className="space-y-3">
              {myAuctions.map(listing => (
                <Link key={listing.id} to={`/listing/${listing.id}`} className="block">
                  <div className="bg-brand-card rounded-xl border border-white/[0.06] hover:border-amber-500/20 p-4 flex items-center gap-4 transition-all">
                    <img src={listing.images[0]} alt="" className="w-16 h-20 object-contain bg-brand-surface rounded-lg p-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">{listing.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span>{listing.bidCount} bids</span>
                        <span className="flex items-center gap-1 text-amber-400"><Clock className="w-3 h-3" />{timeRemaining(listing.auctionEnd!)}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-500">Current Bid</p>
                      <p className="text-lg font-black text-white">{formatPrice(listing.currentBid || 0)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Gavel className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No active auctions</p>
              <Link to="/create-listing" className="text-red-400 hover:text-red-300 text-sm font-medium">Create an auction</Link>
            </div>
          )}
        </motion.div>
      )}

      {/* ─── Trades Tab ─── */}
      {activeTab === 'trades' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {myTrades.length > 0 ? (
            <div className="space-y-3">
              {myTrades.map(listing => (
                <Link key={listing.id} to={`/listing/${listing.id}`} className="block">
                  <div className="bg-brand-card rounded-xl border border-white/[0.06] hover:border-blue-500/20 p-4 flex items-center gap-4 transition-all">
                    <img src={listing.images[0]} alt="" className="w-16 h-20 object-contain bg-brand-surface rounded-lg p-1 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">{listing.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 truncate">Looking for: {listing.tradePreferences}</p>
                    </div>
                    <span className="badge border bg-blue-500/20 text-blue-300 border-blue-500/30 shrink-0">
                      <ArrowLeftRight className="w-3 h-3" /> Open
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ArrowLeftRight className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No active trades</p>
              <Link to="/create-listing" className="text-red-400 hover:text-red-300 text-sm font-medium">Create a trade listing</Link>
            </div>
          )}
        </motion.div>
      )}

      {/* ─── Favorites Tab ─── */}
      {activeTab === 'favorites' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {mockListings.slice(0, 4).map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
