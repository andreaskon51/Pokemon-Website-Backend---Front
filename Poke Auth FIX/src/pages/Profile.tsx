import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Star, Package, DollarSign, Award, Shield, Calendar,
  MessageCircle, CheckCircle, Settings
} from 'lucide-react'
import { mockListings, mockReviews, mockUsers } from '@/data/mockData'
import { formatNumber } from '@/utils'
import StarRating from '@/components/ui/StarRating'
import ListingCard from '@/components/ListingCard'
import { useAuth } from '@/contexts/AuthContext'

export default function Profile() {
  const { id } = useParams()
  const { user: authUser } = useAuth()
  // If viewing another user's profile, find them; otherwise use the logged-in user
  const user = id ? (mockUsers.find(u => u.id === id) || authUser!) : authUser!
  const isOwnProfile = !id || id === authUser?.id

  const userListings = mockListings.filter(l => l.seller.id === user.id)
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews'>('listings')

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Profile Header */}
        <div className="bg-brand-card rounded-2xl border border-white/[0.06] overflow-hidden mb-8">
          {/* Cover */}
          <div className="h-32 sm:h-40 bg-gradient-to-r from-red-600/20 via-brand-surface to-purple-600/20 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-50" />
          </div>

          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-24 h-24 rounded-2xl bg-brand-surface border-4 border-brand-card"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-xl font-black text-white font-display">{user.username}</h1>
                  {user.verified && (
                    <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                      <CheckCircle className="w-3 h-3" /> Verified Seller
                    </span>
                  )}
                </div>
                <StarRating rating={user.rating} totalReviews={user.totalReviews} size="md" />
                <p className="text-sm text-gray-500 mt-2 max-w-xl">{user.bio}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Joined {new Date(user.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {isOwnProfile ? (
                  <Link to="/dashboard" className="px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 text-sm font-medium rounded-xl border border-white/[0.08] flex items-center gap-1.5 transition-colors">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                ) : (
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl flex items-center gap-1.5 transition-colors">
                    <MessageCircle className="w-4 h-4" /> Message
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Package, label: 'Active Listings', value: userListings.length, color: 'text-blue-400 bg-blue-500/10' },
            { icon: DollarSign, label: 'Total Sales', value: user.totalSales, color: 'text-green-400 bg-green-500/10' },
            { icon: Star, label: 'Rating', value: user.rating.toFixed(1), color: 'text-amber-400 bg-amber-500/10' },
            { icon: Award, label: 'Reviews', value: user.totalReviews, color: 'text-purple-400 bg-purple-500/10' },
          ].map(stat => (
            <div key={stat.label} className="bg-brand-card rounded-xl border border-white/[0.06] p-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
              <p className="text-xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-white/[0.06]">
          {(['listings', 'reviews'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-all border-b-2 -mb-px ${
                activeTab === tab
                  ? 'text-white border-red-500'
                  : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              {tab} {tab === 'listings' ? `(${userListings.length})` : `(${mockReviews.length})`}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'listings' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {userListings.map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} index={i} />
            ))}
            {userListings.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500">No listings yet</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {mockReviews.map(review => (
              <div key={review.id} className="bg-brand-card rounded-xl border border-white/[0.06] p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img src={review.reviewer.avatar} alt="" className="w-8 h-8 rounded-full bg-brand-surface" />
                    <div>
                      <p className="text-sm font-semibold text-white">{review.reviewer.name}</p>
                      <StarRating rating={review.rating} showCount={false} size="sm" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
