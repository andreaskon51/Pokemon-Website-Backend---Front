import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Twitter, MessageCircle, Shield, FileText, HelpCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.04] bg-brand-dark/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-7 h-7">
                <div className="absolute inset-0 bg-red-500 rounded-full" />
                <div className="absolute inset-0 bg-white rounded-full" style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border-2 border-brand-dark z-10" />
                <div className="absolute top-[48%] left-0 right-0 h-[3px] bg-brand-dark" />
              </div>
              <span className="text-white font-black text-base font-display">
                Poké<span className="text-red-500">Market</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              The premier marketplace for buying, selling, trading, and auctioning Pokémon trading cards.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Marketplace</h4>
            <ul className="space-y-2.5">
              <li><Link to="/search" className="text-sm text-gray-500 hover:text-white transition-colors">Browse Cards</Link></li>
              <li><Link to="/search?type=auction" className="text-sm text-gray-500 hover:text-white transition-colors">Live Auctions</Link></li>
              <li><Link to="/create-listing" className="text-sm text-gray-500 hover:text-white transition-colors">Sell a Card</Link></li>
              <li><Link to="/search?type=trade" className="text-sm text-gray-500 hover:text-white transition-colors">Trade Cards</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2.5">
              <li><Link to="/help" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5" />Help Center</Link></li>
              <li><Link to="/help" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" />Buyer Protection</Link></li>
              <li><Link to="/help" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" />Authenticity Guide</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><Link to="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund-policy" className="text-sm text-gray-500 hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} PokéMarket. Not affiliated with Nintendo, The Pokémon Company, or Game Freak.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors"><MessageCircle className="w-4 h-4" /></a>
            <a href="#" className="text-gray-600 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
