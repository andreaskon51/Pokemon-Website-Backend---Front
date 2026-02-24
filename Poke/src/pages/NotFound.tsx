import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* Pokéball icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
          <div className="absolute inset-2 bg-brand-card rounded-full border-2 border-white/[0.08] flex items-center justify-center">
            <span className="text-4xl font-black text-gray-600 font-display">404</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white font-display mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved. Maybe the Pokémon escaped!
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/"
            className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            to="/search"
            className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 font-medium rounded-xl transition-colors flex items-center gap-2 border border-white/[0.08]"
          >
            <Search className="w-4 h-4" /> Browse Cards
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 font-medium rounded-xl transition-colors flex items-center gap-2 border border-white/[0.08]"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  )
}
