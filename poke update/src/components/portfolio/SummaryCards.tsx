import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, BarChart2, PieChart } from 'lucide-react'
import type { PortfolioItem, Currency } from '@/types'
import { calcPortfolioValue, calcPortfolioInvested } from '@/contexts/PortfolioContext'

interface Props {
  items: PortfolioItem[]
  currency: Currency
  formatAmount: (usd: number, currency: Currency) => string
}

export default function SummaryCards({ items, currency, formatAmount }: Props) {
  const totalValue = calcPortfolioValue(items)
  const totalInvested = calcPortfolioInvested(items)
  const pnl = totalValue - totalInvested
  const pnlPct = totalInvested > 0 ? (pnl / totalInvested) * 100 : 0
  const isProfit = pnl >= 0

  const cards = [
    {
      title: 'Total Value',
      value: formatAmount(totalValue, currency),
      sub: `${items.length} item${items.length !== 1 ? 's' : ''}`,
      icon: PieChart,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      title: 'Invested',
      value: formatAmount(totalInvested, currency),
      sub: 'Total cost basis',
      icon: DollarSign,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/20',
    },
    {
      title: 'Profit / Loss',
      value: (isProfit ? '+' : '') + formatAmount(pnl, currency),
      sub: `${isProfit ? '+' : ''}${pnlPct.toFixed(1)}% overall`,
      icon: isProfit ? TrendingUp : TrendingDown,
      color: isProfit ? 'text-green-400' : 'text-red-400',
      bg: isProfit ? 'bg-green-500/10' : 'bg-red-500/10',
      border: isProfit ? 'border-green-500/20' : 'border-red-500/20',
    },
    {
      title: '% Return',
      value: `${isProfit ? '+' : ''}${pnlPct.toFixed(2)}%`,
      sub: 'Since purchase',
      icon: BarChart2,
      color: isProfit ? 'text-green-400' : 'text-red-400',
      bg: isProfit ? 'bg-green-500/10' : 'bg-red-500/10',
      border: isProfit ? 'border-green-500/20' : 'border-red-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className={`rounded-2xl border ${card.border} ${card.bg} p-4 sm:p-5`}
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider leading-tight">
              {card.title}
            </span>
            <div className={`p-1.5 rounded-lg ${card.bg}`}>
              <card.icon className={`w-3.5 h-3.5 ${card.color}`} />
            </div>
          </div>
          <p className={`text-base sm:text-xl font-black ${card.color} leading-tight`}>
            {card.value}
          </p>
          <p className="text-xs text-gray-500 mt-1">{card.sub}</p>
        </motion.div>
      ))}
    </div>
  )
}
