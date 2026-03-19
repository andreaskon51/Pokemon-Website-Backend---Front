import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HelpCircle, Shield, FileText, CreditCard, Truck, RefreshCw,
  AlertTriangle, ChevronDown, Search, Mail
} from 'lucide-react'

const faqCategories = [
  {
    title: 'Buying',
    icon: CreditCard,
    color: 'text-green-400 bg-green-500/10',
    faqs: [
      { q: 'How do I buy a card?', a: 'Browse listings, click "Buy Now" on any For Sale listing, and complete checkout with Stripe or PayPal. Your payment is held securely until you confirm delivery.' },
      { q: 'Is there buyer protection?', a: 'Yes! Every purchase on PokéMarket is covered by our Buyer Protection program. If the card doesn\'t match the listing description, you can open a dispute within 7 days of delivery.' },
      { q: 'How does Buy It Now work on auctions?', a: 'Some auctions have a "Buy It Now" price. Click it to purchase immediately at the listed price, ending the auction.' },
    ]
  },
  {
    title: 'Selling',
    icon: FileText,
    color: 'text-blue-400 bg-blue-500/10',
    faqs: [
      { q: 'How do I list a card?', a: 'Go to "Sell" in the navigation, upload clear photos of your card (front and back), fill in the card details, choose your listing type (Sale, Trade, or Auction), and publish.' },
      { q: 'What are the seller fees?', a: 'PokéMarket charges a 5% marketplace fee on completed sales and auctions. There are no fees for trade listings.' },
      { q: 'When do I get paid?', a: 'Sellers are paid within 48 hours after the buyer confirms delivery, or automatically 7 days after the tracking shows delivery.' },
    ]
  },
  {
    title: 'Trading',
    icon: RefreshCw,
    color: 'text-purple-400 bg-purple-500/10',
    faqs: [
      { q: 'How does trading work?', a: 'List your card as "For Trade" and specify what you\'re looking for. Interested traders can send offers with their cards. Once both parties agree, you each ship your cards to PokéMarket for verification.' },
      { q: 'Is trading safe?', a: 'Absolutely. Both cards are sent to us for verification. We inspect condition and authenticity. Once both cards are verified, we ship them to the new owners.' },
      { q: 'What if a traded card is counterfeit?', a: 'If our verification team identifies a counterfeit card, the trade is cancelled and the authentic card is returned to its owner.' },
    ]
  },
  {
    title: 'Shipping & Returns',
    icon: Truck,
    color: 'text-amber-400 bg-amber-500/10',
    faqs: [
      { q: 'How should I ship cards?', a: 'Use a top loader and team bag, placed in a bubble mailer or small box. Always use tracked shipping. We recommend USPS First Class for cards under $100 and Priority Mail with insurance for higher-value cards.' },
      { q: 'What is the return policy?', a: 'Buyers can request a return within 7 days of delivery if the card significantly differs from the listing description. The seller pays return shipping in dispute cases.' },
    ]
  },
]

export default function Help() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    faqs: cat.faqs.filter(faq =>
      !searchQuery || faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.faqs.length > 0)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-3xl font-black text-white font-display mb-3">Help Center</h1>
          <p className="text-gray-500 max-w-md mx-auto">Find answers to common questions about buying, selling, trading, and earning on PokéMarket.</p>

          {/* Search */}
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-11 pr-4 py-3 bg-brand-card border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-red-500/40 transition-all"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map(category => (
            <div key={category.title}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${category.color}`}>
                  <category.icon className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-bold text-white">{category.title}</h2>
              </div>

              <div className="space-y-2">
                {category.faqs.map(faq => {
                  const isOpen = openFaq === faq.q
                  return (
                    <div key={faq.q} className="bg-brand-card rounded-xl border border-white/[0.06] overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : faq.q)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="text-sm font-medium text-white">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="px-5 pb-4"
                        >
                          <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Policies */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            { title: 'Terms of Service', desc: 'Read our marketplace terms and conditions.', icon: FileText },
            { title: 'Privacy Policy', desc: 'How we handle your data and information.', icon: Shield },
            { title: 'Authenticity Policy', desc: 'Our policy on counterfeit cards and verification.', icon: AlertTriangle },
          ].map(item => (
            <button key={item.title} className="bg-brand-card rounded-xl border border-white/[0.06] hover:border-white/[0.1] p-5 text-left transition-all group">
              <item.icon className="w-5 h-5 text-gray-500 mb-3 group-hover:text-red-400 transition-colors" />
              <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </button>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 bg-brand-card rounded-2xl border border-white/[0.06] p-8 text-center">
          <Mail className="w-8 h-8 text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Still need help?</h3>
          <p className="text-sm text-gray-500 mb-4">Our support team is available 24/7 to assist you.</p>
          <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors">
            Contact Support
          </button>
        </div>
      </motion.div>
    </div>
  )
}
