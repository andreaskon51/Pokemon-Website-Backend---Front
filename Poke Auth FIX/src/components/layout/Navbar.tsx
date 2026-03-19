import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Menu, X, User, Heart, ShoppingCart, Home, Gavel,
  PlusCircle, MessageCircle, Bell, LogIn, LogOut, ChevronDown, BarChart2
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { mockConversations } from '@/data/mockData'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, user, logout, openLogin } = useAuth()
  const unreadMessages = mockConversations.reduce((sum, c) => sum + c.unreadCount, 0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false)
      }
    }
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setMobileOpen(false)
    }
  }

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Browse', path: '/search', icon: Search },
    { name: 'Auctions', path: '/search?type=auction', icon: Gavel },
    { name: 'Sell', path: '/create-listing', icon: PlusCircle },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path.split('?')[0])
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-red-500 rounded-full" />
                <div className="absolute inset-0 bg-white rounded-full" style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-brand-dark z-10" />
                <div className="absolute top-[48%] left-0 right-0 h-[4px] bg-brand-dark" />
              </div>
              <span className="text-white font-black text-lg tracking-tight font-display">
                Poké<span className="text-red-500">Market</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${isActive(link.path)
                      ? 'text-white bg-white/[0.08]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Search + Actions */}
            <div className="hidden md:flex items-center gap-3">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search cards..."
                  className="w-52 lg:w-64 pl-9 pr-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-red-500/40 focus:bg-white/[0.08] transition-all"
                />
              </form>

              {isLoggedIn && user ? (
                <div className="flex items-center gap-2">
                  <Link to="/messages" className="relative p-2 text-gray-400 hover:text-white transition-colors" aria-label="Messages">
                    <MessageCircle className="w-5 h-5" />
                    {unreadMessages > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center">{unreadMessages}</span>
                    )}
                  </Link>
                  <Link to="/dashboard" className="relative p-2 text-gray-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                  </Link>
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-white/[0.05] transition-colors"
                      aria-label="User menu"
                      aria-expanded={showUserMenu}
                    >
                      <img src={user.avatar} alt="" className="w-7 h-7 rounded-full bg-brand-surface" />
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </button>

                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-56 glass rounded-xl border border-white/[0.08] py-2 shadow-2xl"
                        >
                          <div className="px-4 py-2 border-b border-white/[0.06]">
                            <p className="text-sm font-semibold text-white">{user.username}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                          <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.05]" onClick={() => setShowUserMenu(false)}>
                            <User className="w-4 h-4" /> My Profile
                          </Link>
                          <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.05]" onClick={() => setShowUserMenu(false)}>
                            <ShoppingCart className="w-4 h-4" /> Dashboard
                          </Link>
                          <Link to="/portfolio" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.05]" onClick={() => setShowUserMenu(false)}>
                            <BarChart2 className="w-4 h-4" /> Portfolio
                          </Link>
                          <Link to="/dashboard?tab=favorites" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/[0.05]" onClick={() => setShowUserMenu(false)}>
                            <Heart className="w-4 h-4" /> Favorites
                          </Link>
                          <div className="border-t border-white/[0.06] mt-1 pt-1">
                            <button onClick={() => { logout(); setShowUserMenu(false) }} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/[0.05]">
                              <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={openLogin} className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors flex items-center gap-1.5">
                    <LogIn className="w-4 h-4" /> Sign In
                  </button>
                </div>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-40 glass border-b border-white/[0.06] md:hidden"
          >
            <div className="p-4 space-y-2">
              <form onSubmit={handleSearch} className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search cards..."
                  className="w-full pl-9 pr-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-500 outline-none"
                />
              </form>
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${isActive(link.path) ? 'text-white bg-white/[0.08]' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'}`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-white/[0.06] pt-2 mt-2 space-y-1">
                {isLoggedIn && user ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white">
                      <User className="w-5 h-5" /> Profile
                    </Link>
                    <Link to="/messages" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white">
                      <MessageCircle className="w-5 h-5" /> Messages
                      {unreadMessages > 0 && (
                        <span className="ml-auto w-5 h-5 bg-red-500 rounded-full text-[11px] font-bold text-white flex items-center justify-center">{unreadMessages}</span>
                      )}
                    </Link>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white">
                      <ShoppingCart className="w-5 h-5" /> Dashboard
                    </Link>
                    <Link to="/portfolio" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:text-white">
                      <BarChart2 className="w-5 h-5" /> Portfolio
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false) }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:text-red-300"
                    >
                      <LogOut className="w-5 h-5" /> Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { openLogin(); setMobileOpen(false) }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-semibold text-white transition-colors"
                  >
                    <LogIn className="w-5 h-5" /> Sign In
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed nav */}
      <div className="h-16" />
    </>
  )
}
