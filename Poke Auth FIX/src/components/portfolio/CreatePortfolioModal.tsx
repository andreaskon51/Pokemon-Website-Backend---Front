import { useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Currency } from '@/types'

const PRESETS = ['Main Collection', 'Investments', 'For Sale', 'Wishlist', 'Vintage Cards']
const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP']

interface Props {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string, currency: Currency) => void
}

export default function CreatePortfolioModal({ isOpen, onClose, onCreate }: Props) {
  const [name, setName] = useState('')
  const [currency, setCurrency] = useState<Currency>('USD')
  const [error, setError] = useState('')

  const reset = () => { setName(''); setCurrency('USD'); setError('') }

  const handleClose = () => { reset(); onClose() }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) { setError('Portfolio name is required'); return }
    if (trimmed.length > 40) { setError('Max 40 characters'); return }
    onCreate(trimmed, currency)
    reset()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-[#0f0f2e] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
              <h2 className="text-base font-bold text-white">New Portfolio</h2>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-white/[0.06] text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Name input */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Portfolio Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => { setName(e.target.value); setError('') }}
                  maxLength={40}
                  placeholder="My Collection"
                  autoFocus
                  className={`w-full bg-white/[0.04] border rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors ${
                    error ? 'border-red-500/50' : 'border-white/[0.06]'
                  }`}
                />
                {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
              </div>

              {/* Quick preset buttons */}
              <div>
                <p className="text-xs text-gray-400 mb-2">Quick presets</p>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => { setName(p); setError('') }}
                      className={`px-3 py-1 rounded-lg text-xs border transition-colors ${
                        name === p
                          ? 'bg-red-500/20 border-red-500/50 text-red-300'
                          : 'border-white/[0.06] text-gray-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency */}
              <div>
                <p className="text-xs text-gray-400 mb-2">Currency</p>
                <div className="flex gap-2">
                  {CURRENCIES.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-colors ${
                        currency === c
                          ? 'bg-red-500/20 border-red-500/50 text-red-300'
                          : 'border-white/[0.06] text-gray-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
