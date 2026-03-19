import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown, Plus, Trash2, BarChart2, ArrowLeftRight,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { CURRENCY_SYMBOLS } from '@/contexts/PortfolioContext'
import type { Currency, PortfolioItem, Transaction } from '@/types'
import SummaryCards from '@/components/portfolio/SummaryCards'
import ValueChart from '@/components/portfolio/ValueChart'
import ItemList from '@/components/portfolio/ItemList'
import AddItemModal from '@/components/portfolio/AddItemModal'
import CreatePortfolioModal from '@/components/portfolio/CreatePortfolioModal'

type Tab = 'overview' | 'transactions'

export default function Portfolio() {
  const { user } = useAuth()
  const {
    portfolios,
    transactions,
    selectedId,
    selectedPortfolio,
    selectPortfolio,
    createPortfolio,
    deletePortfolio,
    updatePortfolioCurrency,
    addItem,
    updateItem,
    removeItem,
    getChartData,
    formatAmount,
  } = usePortfolio()

  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [showPortfolioDropdown, setShowPortfolioDropdown] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAddItemModal, setShowAddItemModal] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)

  const currency: Currency = selectedPortfolio?.currency ?? 'USD'
  const items = selectedPortfolio?.items ?? []
  const chartData = selectedId ? getChartData(selectedId) : []

  const handleCreate = (name: string, curr: Currency) => {
    createPortfolio(name, curr)
    setShowCreateModal(false)
  }

  const handleDelete = () => {
    if (!selectedPortfolio) return
    if (window.confirm(`Delete portfolio "${selectedPortfolio.name}"? This cannot be undone.`)) {
      deletePortfolio(selectedPortfolio.id)
    }
  }

  const handleSaveItem = (data: Omit<PortfolioItem, 'id' | 'addedAt'>) => {
    if (!selectedId) return
    if (editingItem) {
      updateItem(selectedId, { ...data, id: editingItem.id, addedAt: editingItem.addedAt })
    } else {
      addItem(selectedId, data)
    }
    setShowAddItemModal(false)
    setEditingItem(null)
  }

  const handleEditItem = (item: PortfolioItem) => {
    setEditingItem(item)
    setShowAddItemModal(true)
  }

  const handleDeleteItem = (itemId: string) => {
    if (selectedId) removeItem(selectedId, itemId)
  }

  const portfolioTransactions: Transaction[] = transactions.filter(
    t => t.portfolioId === selectedId
  )

  const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP']

  return (
    <div className="min-h-screen bg-[#0a0a1a] px-4 sm:px-6 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-white font-display flex items-center gap-2">
              <BarChart2 className="w-6 h-6 text-red-500" />
              Portfolio Tracker
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Welcome, {user?.username} — track your collection's value
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> New Portfolio
          </button>
        </div>

        {portfolios.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-28 gap-4 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
              <BarChart2 className="w-7 h-7 text-gray-500" />
            </div>
            <h2 className="text-lg font-bold text-white">No portfolios yet</h2>
            <p className="text-sm text-gray-500 max-w-xs">
              Create your first portfolio to start tracking the value of your collection.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-2 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-colors"
            >
              Create Portfolio
            </button>
          </motion.div>
        ) : (
          <>
            {/* Portfolio selector + currency + delete */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Portfolio dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowPortfolioDropdown(!showPortfolioDropdown)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl text-sm font-semibold text-white hover:bg-white/[0.06] transition-colors"
                >
                  {selectedPortfolio?.name ?? 'Select Portfolio'}
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                <AnimatePresence>
                  {showPortfolioDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute left-0 top-full mt-1 w-56 bg-[#12122a] border border-white/[0.08] rounded-xl py-1 shadow-2xl z-20"
                    >
                      {portfolios.map(p => (
                        <button
                          key={p.id}
                          onClick={() => { selectPortfolio(p.id); setShowPortfolioDropdown(false) }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-white/[0.04] transition-colors ${
                            p.id === selectedId ? 'text-white font-semibold' : 'text-gray-300'
                          }`}
                        >
                          <span>{p.name}</span>
                          <span className="text-xs text-gray-500">{CURRENCY_SYMBOLS[p.currency]}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Currency pills */}
              {selectedPortfolio && (
                <div className="flex gap-1">
                  {CURRENCIES.map(c => (
                    <button
                      key={c}
                      onClick={() => updatePortfolioCurrency(selectedPortfolio.id, c)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        currency === c
                          ? 'bg-red-500/20 border-red-500/40 text-red-300'
                          : 'border-white/[0.06] text-gray-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}

              {/* Delete portfolio */}
              {selectedPortfolio && (
                <button
                  onClick={handleDelete}
                  className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 text-xs hover:bg-red-500/10 hover:border-red-500/40 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl w-fit">
              {(['overview', 'transactions'] as Tab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-white/[0.08] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'transactions' ? (
                    <span className="flex items-center gap-1.5">
                      <ArrowLeftRight className="w-3.5 h-3.5" /> Transactions
                    </span>
                  ) : tab}
                </button>
              ))}
            </div>

            {/* Overview tab */}
            {activeTab === 'overview' && selectedPortfolio && (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <SummaryCards
                  items={items}
                  currency={currency}
                  formatAmount={formatAmount}
                />
                <ValueChart
                  data={chartData}
                  currency={currency}
                  formatAmount={formatAmount}
                  isProfit={items.reduce((s, i) => s + i.currentPrice * i.quantity, 0) >= items.reduce((s, i) => s + i.purchasePrice * i.quantity, 0)}
                />
                <ItemList
                  items={items}
                  currency={currency}
                  formatAmount={formatAmount}
                  onAddItem={() => { setEditingItem(null); setShowAddItemModal(true) }}
                  onEditItem={handleEditItem}
                  onDeleteItem={handleDeleteItem}
                />
              </motion.div>
            )}

            {/* Transactions tab */}
            {activeTab === 'transactions' && (
              <motion.div
                key="transactions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#12122a] border border-white/[0.06] rounded-2xl overflow-hidden"
              >
                {portfolioTransactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                    <ArrowLeftRight className="w-8 h-8 text-gray-600" />
                    <p className="text-sm text-gray-500">No transactions recorded for this portfolio.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/[0.04]">
                    {/* Header */}
                    <div className="hidden sm:grid grid-cols-5 px-5 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">
                      <span className="col-span-2">Item</span>
                      <span>Type</span>
                      <span>Qty</span>
                      <span className="text-right">Amount</span>
                    </div>
                    {portfolioTransactions.map(tx => (
                      <div key={tx.id} className="grid grid-cols-2 sm:grid-cols-5 px-5 py-3.5 gap-2 sm:gap-0 items-center hover:bg-white/[0.02] transition-colors">
                        <div className="col-span-2 sm:col-span-2">
                          <p className="text-sm text-white font-medium">{tx.itemName}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {new Date(tx.timestamp).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric',
                            })}
                          </p>
                        </div>
                        <div>
                          <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                            tx.type === 'buy'
                              ? 'bg-blue-500/10 text-blue-400'
                              : 'bg-green-500/10 text-green-400'
                          }`}>
                            {tx.type.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-300">×{tx.quantity}</div>
                        <div className="text-sm text-white font-semibold sm:text-right">
                          {formatAmount(tx.price * tx.quantity, currency)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <CreatePortfolioModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreate}
      />
      <AddItemModal
        isOpen={showAddItemModal}
        editingItem={editingItem}
        onClose={() => { setShowAddItemModal(false); setEditingItem(null) }}
        onSave={handleSaveItem}
      />
    </div>
  )
}
