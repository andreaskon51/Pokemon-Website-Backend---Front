import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Upload, X, DollarSign, ArrowLeftRight, Gavel,
  ShoppingCart, Info, CheckCircle
} from 'lucide-react'
import type { ListingType, Condition, PokemonType } from '@/types'

const conditions: Condition[] = ['Ungraded', 'PSA 1', 'PSA 2', 'PSA 3', 'PSA 4', 'PSA 5', 'PSA 6', 'PSA 7', 'PSA 8', 'PSA 9', 'PSA 10']
const sets = ['Base Set', 'Jungle', 'Fossil', 'Team Rocket', 'Gym Heroes', 'Gym Challenge', 'Neo Genesis', 'Neo Discovery', 'Neo Revelation', 'Neo Destiny', 'Expedition', 'Aquapolis', 'Skyridge', 'POP Series', 'Other']
const languages = ['English', 'Japanese', 'Korean', 'Chinese', 'German', 'French', 'Italian', 'Spanish', 'Portuguese']
const editions = ['1st Edition', 'Shadowless', 'Unlimited', 'Reverse Holo', 'Promo', 'Other']
const rarities = ['Common', 'Uncommon', 'Rare', 'Rare Holo', 'Ultra Rare', 'Secret Rare', 'Illustration Rare']
const pokemonTypes: PokemonType[] = ['Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Fighting', 'Dark', 'Steel', 'Dragon', 'Fairy', 'Normal', 'Colorless']
const durations = ['1 day', '3 days', '5 days', '7 days', '10 days', '14 days']

// Static Tailwind classes for listing types (avoids Tailwind purge issues with dynamic classes)
const listingTypeStyles = {
  sale: {
    active: 'bg-green-500/10 border-green-500/30 ring-1 ring-green-500/20',
    iconActive: 'text-green-400',
  },
  trade: {
    active: 'bg-blue-500/10 border-blue-500/30 ring-1 ring-blue-500/20',
    iconActive: 'text-blue-400',
  },
  auction: {
    active: 'bg-amber-500/10 border-amber-500/30 ring-1 ring-amber-500/20',
    iconActive: 'text-amber-400',
  },
} as const

interface FormData {
  cardName: string
  set: string
  cardNumber: string
  edition: string
  language: string
  condition: string
  rarity: string
  pokemonType: string
  year: string
  quantity: string
  description: string
  price: string
  tradePreferences: string
  startingBid: string
  reservePrice: string
  buyItNowPrice: string
  auctionDuration: string
}

const initialFormData: FormData = {
  cardName: '',
  set: '',
  cardNumber: '',
  edition: '',
  language: '',
  condition: '',
  rarity: '',
  pokemonType: '',
  year: '',
  quantity: '1',
  description: '',
  price: '',
  tradePreferences: '',
  startingBid: '',
  reservePrice: '',
  buyItNowPrice: '',
  auctionDuration: '7 days',
}

export default function CreateListing() {
  const [listingType, setListingType] = useState<ListingType>('sale')
  const [images, setImages] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleImageUpload = () => {
    // Mock image upload
    const mockImages = [
      'https://images.pokemontcg.io/base1/4.png',
      'https://images.pokemontcg.io/base1/2.png',
      'https://images.pokemontcg.io/base1/10.png',
    ]
    if (images.length < 10) {
      setImages([...images, mockImages[images.length % mockImages.length]])
    }
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    if (!formData.cardName.trim()) newErrors.cardName = 'Card name is required'
    if (!formData.set) newErrors.set = 'Set is required'
    if (!formData.edition) newErrors.edition = 'Edition is required'
    if (!formData.language) newErrors.language = 'Language is required'
    if (!formData.condition) newErrors.condition = 'Condition is required'
    if (images.length === 0) newErrors.cardName = 'At least one photo is required'
    if (listingType === 'sale' && (!formData.price || parseFloat(formData.price) <= 0)) {
      newErrors.price = 'Price is required'
    }
    if (listingType === 'trade' && !formData.tradePreferences.trim()) {
      newErrors.tradePreferences = 'Trade preferences are required'
    }
    if (listingType === 'auction' && (!formData.startingBid || parseFloat(formData.startingBid) <= 0)) {
      newErrors.startingBid = 'Starting bid is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
        </motion.div>
        <h2 className="text-2xl font-black text-white font-display mb-3">Listing Created!</h2>
        <p className="text-gray-500 mb-8">Your card has been listed on PokéMarket. Buyers can now find it in search.</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => { setSubmitted(false); setImages([]); setFormData(initialFormData) }} className="px-6 py-3 bg-white/[0.05] hover:bg-white/[0.1] text-white font-medium rounded-xl transition-colors border border-white/[0.08]">
            Create Another
          </button>
          <Link to="/dashboard" className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors">
            View My Listings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-display mb-2">Create a Listing</h1>
        <p className="text-sm text-gray-500 mb-8">List your Pokémon card for sale, trade, or auction.</p>

        <div className="space-y-8">
          {/* ─── Listing Type ─── */}
          <section>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Listing Type</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { type: 'sale' as ListingType, label: 'For Sale', desc: 'Set a fixed price', icon: ShoppingCart },
                { type: 'trade' as ListingType, label: 'For Trade', desc: 'Trade with others', icon: ArrowLeftRight },
                { type: 'auction' as ListingType, label: 'Auction', desc: 'Let buyers bid', icon: Gavel },
              ].map(item => (
                <button
                  key={item.type}
                  onClick={() => setListingType(item.type)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    listingType === item.type
                      ? listingTypeStyles[item.type].active
                      : 'bg-brand-card border-white/[0.06] hover:border-white/[0.1]'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mb-2 ${listingType === item.type ? listingTypeStyles[item.type].iconActive : 'text-gray-500'}`} />
                  <p className={`text-sm font-semibold ${listingType === item.type ? 'text-white' : 'text-gray-300'}`}>{item.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* ─── Images ─── */}
          <section>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Photos</h2>
            <p className="text-xs text-gray-500 mb-4">Upload up to 10 clear photos of your card (front, back, close-ups)</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-xl overflow-hidden bg-brand-card border border-white/[0.06] group">
                  <img src={img} alt="" className="w-full h-full object-contain p-2" />
                  <button
                    onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {images.length < 10 && (
                <button
                  onClick={handleImageUpload}
                  className="aspect-[3/4] rounded-xl border-2 border-dashed border-white/[0.08] hover:border-red-500/30 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-red-400 transition-all"
                >
                  <Upload className="w-6 h-6" />
                  <span className="text-xs font-medium">Upload</span>
                </button>
              )}
            </div>
          </section>

          {/* ─── Card Details ─── */}
          <section>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Card Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-400 mb-1.5 block">Card Name *</label>
                <input
                  type="text"
                  value={formData.cardName}
                  onChange={e => updateField('cardName', e.target.value)}
                  placeholder="e.g. Charizard"
                  className={`w-full px-4 py-3 bg-brand-card border rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-red-500/40 transition-all ${errors.cardName ? 'border-red-500/50' : 'border-white/[0.08]'}`}
                />
                {errors.cardName && <p className="text-xs text-red-400 mt-1">{errors.cardName}</p>}
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Set *</label>
                <select value={formData.set} onChange={e => updateField('set', e.target.value)} className={`w-full px-4 py-3 bg-brand-card border rounded-xl text-sm text-gray-300 outline-none appearance-none ${errors.set ? 'border-red-500/50' : 'border-white/[0.08]'}`}>
                  <option value="">Select set...</option>
                  {sets.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.set && <p className="text-xs text-red-400 mt-1">{errors.set}</p>}
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Card Number</label>
                <input type="text" value={formData.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} placeholder="e.g. 4/102" className="w-full px-4 py-3 bg-brand-card border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-red-500/40 transition-all" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Edition *</label>
                <select value={formData.edition} onChange={e => updateField('edition', e.target.value)} className={`w-full px-4 py-3 bg-brand-card border rounded-xl text-sm text-gray-300 outline-none appearance-none ${errors.edition ? 'border-red-500/50' : 'border-white/[0.08]'}`}>
                  <option value="">Select edition...</option>
                  {editions.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
                {errors.edition && <p className="text-xs text-red-400 mt-1">{errors.edition}</p>}
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Language *</label>
                <select value={formData.language} onChange={e => updateField('language', e.target.value)} className={`w-full px-4 py-3 bg-brand-card border rounded-xl text-sm text-gray-300 outline-none appearance-none ${errors.language ? 'border-red-500/50' : 'border-white/[0.08]'}`}>
                  <option value="">Select language...</option>
                  {languages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                {errors.language && <p className="text-xs text-red-400 mt-1">{errors.language}</p>}
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Condition *</label>
                <select value={formData.condition} onChange={e => updateField('condition', e.target.value)} className={`w-full px-4 py-3 bg-brand-card border rounded-xl text-sm text-gray-300 outline-none appearance-none ${errors.condition ? 'border-red-500/50' : 'border-white/[0.08]'}`}>
                  <option value="">Select condition...</option>
                  {conditions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.condition && <p className="text-xs text-red-400 mt-1">{errors.condition}</p>}
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Rarity</label>
                <select value={formData.rarity} onChange={e => updateField('rarity', e.target.value)} className="w-full px-4 py-3 bg-brand-card border border-white/[0.08] rounded-xl text-sm text-gray-300 outline-none appearance-none">
                  <option value="">Select rarity...</option>
                  {rarities.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Pokémon Type</label>
                <select value={formData.pokemonType} onChange={e => updateField('pokemonType', e.target.value)} className="w-full px-4 py-3 bg-brand-card border border-white/[0.08] rounded-xl text-sm text-gray-300 outline-none appearance-none">
                  <option value="">Select type...</option>
                  {pokemonTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Year</label>
                <input type="number" value={formData.year} onChange={e => updateField('year', e.target.value)} placeholder="e.g. 1999" className="w-full px-4 py-3 bg-brand-card border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-red-500/40 transition-all" />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Quantity</label>
                <input type="number" value={formData.quantity} onChange={e => updateField('quantity', e.target.value)} placeholder="1" min={1} className="w-full px-4 py-3 bg-brand-card border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-red-500/40 transition-all" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-400 mb-1.5 block">Description</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={e => updateField('description', e.target.value)}
                  placeholder="Describe your card's condition, history, and any notable features..."
                  className="w-full px-4 py-3 bg-brand-card border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-red-500/40 transition-all resize-none"
                />
              </div>
            </div>
          </section>

          {/* ─── Pricing ─── */}
          <section>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {listingType === 'sale' ? 'Pricing' : listingType === 'trade' ? 'Trade Preferences' : 'Auction Settings'}
            </h2>

            {listingType === 'sale' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Price (USD) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="number" value={formData.price} onChange={e => updateField('price', e.target.value)} placeholder="0.00" className={`w-full pl-9 pr-4 py-3 bg-brand-card border rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-red-500/40 transition-all ${errors.price ? 'border-red-500/50' : 'border-white/[0.08]'}`} />
                  </div>
                  {errors.price && <p className="text-xs text-red-400 mt-1">{errors.price}</p>}
                </div>
              </div>
            )}

            {listingType === 'trade' && (
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">What are you looking for? *</label>
                <textarea
                  rows={3}
                  value={formData.tradePreferences}
                  onChange={e => updateField('tradePreferences', e.target.value)}
                  placeholder="Describe the cards you'd accept in trade (e.g., PSA graded holos from Base Set, any Charizard variant, etc.)"
                  className={`w-full px-4 py-3 bg-brand-card border rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-red-500/40 transition-all resize-none ${errors.tradePreferences ? 'border-red-500/50' : 'border-white/[0.08]'}`}
                />
                {errors.tradePreferences && <p className="text-xs text-red-400 mt-1">{errors.tradePreferences}</p>}
              </div>
            )}

            {listingType === 'auction' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Starting Bid (USD) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="number" value={formData.startingBid} onChange={e => updateField('startingBid', e.target.value)} placeholder="0.00" className={`w-full pl-9 pr-4 py-3 bg-brand-card border rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-amber-500/40 transition-all ${errors.startingBid ? 'border-red-500/50' : 'border-white/[0.08]'}`} />
                  </div>
                  {errors.startingBid && <p className="text-xs text-red-400 mt-1">{errors.startingBid}</p>}
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Reserve Price (optional)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="number" value={formData.reservePrice} onChange={e => updateField('reservePrice', e.target.value)} placeholder="0.00" className="w-full pl-9 pr-4 py-3 bg-brand-card border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-amber-500/40 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Buy It Now Price (optional)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input type="number" value={formData.buyItNowPrice} onChange={e => updateField('buyItNowPrice', e.target.value)} placeholder="0.00" className="w-full pl-9 pr-4 py-3 bg-brand-card border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:border-amber-500/40 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block">Auction Duration *</label>
                  <select value={formData.auctionDuration} onChange={e => updateField('auctionDuration', e.target.value)} className="w-full px-4 py-3 bg-brand-card border border-white/[0.08] rounded-xl text-sm text-gray-300 outline-none appearance-none">
                    {durations.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
            )}
          </section>

          {/* ─── Info notice ─── */}
          <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-sm text-gray-400">
              <p className="font-medium text-blue-300 mb-1">Listing Guidelines</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Upload clear front and back photos of your card</li>
                <li>Accurately describe the condition — misrepresentation may result in account suspension</li>
                <li>A 5% marketplace fee applies to all completed sales/auctions</li>
                <li>For trades, both cards are sent to PokéMarket for verification before shipping</li>
              </ul>
            </div>
          </div>

          {/* ─── Submit ─── */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.04]">
            <button className="px-6 py-3 bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 font-medium rounded-xl transition-colors border border-white/[0.06]">
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors"
            >
              Publish Listing
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
