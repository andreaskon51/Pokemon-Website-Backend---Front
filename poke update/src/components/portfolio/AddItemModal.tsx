import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PortfolioItem } from '@/types'

const CATEGORIES = [
  'Base Set', 'Jungle', 'Fossil', 'Team Rocket', 'Neo', 'EX Series',
  'Diamond & Pearl', 'HeartGold SoulSilver', 'Black & White', 'XY',
  'Sun & Moon', 'Sword & Shield', 'Scarlet & Violet', 'Other',
]

const CONDITIONS = [
  'Raw Poor', 'Raw Fair', 'Raw Good', 'Raw VG', 'Raw EX', 'Raw NM', 'Raw Mint',
  'PSA 1', 'PSA 2', 'PSA 3', 'PSA 4', 'PSA 5', 'PSA 6',
  'PSA 7', 'PSA 8', 'PSA 9', 'PSA 10',
  'BGS 8', 'BGS 9', 'BGS 9.5', 'BGS Black Label',
]

interface FormState {
  name: string
  category: string
  condition: string
  set: string
  purchasePrice: string
  currentPrice: string
  quantity: string
  imageUrl: string
}

const EMPTY_FORM: FormState = {
  name: '', category: 'Base Set', condition: 'Raw NM',
  set: '', purchasePrice: '', currentPrice: '', quantity: '1', imageUrl: '',
}

interface Props {
  isOpen: boolean
  editingItem?: PortfolioItem | null
  onClose: () => void
  onSave: (item: Omit<PortfolioItem, 'id' | 'addedAt'>) => void
}

export default function AddItemModal({ isOpen, editingItem, onClose, onSave }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  // Populate form when editing
  useEffect(() => {
    if (editingItem) {
      setForm({
        name: editingItem.name,
        category: editingItem.category,
        condition: editingItem.condition,
        set: editingItem.set,
        purchasePrice: String(editingItem.purchasePrice),
        currentPrice: String(editingItem.currentPrice),
        quantity: String(editingItem.quantity),
        imageUrl: editingItem.imageUrl ?? '',
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setErrors({})
  }, [editingItem, isOpen])

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }))
    setErrors(prev => { const next = { ...prev }; delete next[key]; return next })
  }

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.set.trim()) e.set = 'Required'
    const pp = parseFloat(form.purchasePrice)
    const cp = parseFloat(form.currentPrice)
    const qty = parseInt(form.quantity)
    if (!form.purchasePrice || isNaN(pp) || pp <= 0) e.purchasePrice = 'Enter a valid price'
    if (!form.currentPrice || isNaN(cp) || cp <= 0) e.currentPrice = 'Enter a valid price'
    if (!form.quantity || isNaN(qty) || qty < 1) e.quantity = 'Min 1'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onSave({
      name: form.name.trim(),
      category: form.category,
      condition: form.condition,
      set: form.set.trim(),
      purchasePrice: parseFloat(form.purchasePrice),
      currentPrice: parseFloat(form.currentPrice),
      quantity: parseInt(form.quantity),
      imageUrl: form.imageUrl.trim(),
    })
  }

  const InputField = ({
    label, field, type = 'text', placeholder = '',
  }: { label: string; field: keyof FormState; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={set(field)}
        placeholder={placeholder}
        min={type === 'number' ? '0' : undefined}
        step={type === 'number' ? 'any' : undefined}
        className={`w-full bg-white/[0.04] border rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors ${
          errors[field] ? 'border-red-500/50' : 'border-white/[0.06]'
        }`}
      />
      {errors[field] && <p className="text-xs text-red-400 mt-1">{errors[field]}</p>}
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="relative bg-[#0f0f2e] border border-white/10 rounded-2xl w-full max-w-md max-h-[92vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] sticky top-0 bg-[#0f0f2e] z-10">
              <h2 className="text-base font-bold text-white">
                {editingItem ? 'Edit Item' : 'Add Item'}
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/[0.06] text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <InputField label="Card / Item Name *" field="name" placeholder="e.g. Charizard Base Set Holo" />
              <InputField label="Set *" field="set" placeholder="e.g. Base Set 1999" />

              {/* Category + Condition */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={set('category')}
                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c} className="bg-[#0f0f2e]">{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Condition</label>
                  <select
                    value={form.condition}
                    onChange={set('condition')}
                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/20"
                  >
                    {CONDITIONS.map(c => (
                      <option key={c} value={c} className="bg-[#0f0f2e]">{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Prices */}
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Purchase Price (USD) *" field="purchasePrice" type="number" placeholder="0" />
                <InputField label="Current Price (USD) *" field="currentPrice" type="number" placeholder="0" />
              </div>

              <InputField label="Quantity *" field="quantity" type="number" placeholder="1" />
              <InputField label="Image URL (optional)" field="imageUrl" type="url" placeholder="https://..." />

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors"
                >
                  {editingItem ? 'Save Changes' : 'Add Item'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
