import React, { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import type { ChartPoint, Currency } from '@/types'
import { EXCHANGE_RATES, CURRENCY_SYMBOLS } from '@/contexts/PortfolioContext'

const RANGES = [
  { label: '7D', days: 7 },
  { label: '14D', days: 14 },
  { label: '30D', days: 30 },
]

interface Props {
  data: ChartPoint[]
  currency: Currency
  formatAmount: (usd: number, currency: Currency) => string
  isProfit: boolean
}

export default function ValueChart({ data, currency, formatAmount, isProfit }: Props) {
  const [rangeIdx, setRangeIdx] = useState(2)

  // Convert USD values to selected currency for display
  const visibleData = data
    .slice(-RANGES[rangeIdx].days)
    .map(p => ({
      date: p.date,
      value: Math.round(p.value * EXCHANGE_RATES[currency]),
    }))

  const chartColor = isProfit ? '#22c55e' : '#ef4444'
  const gradientId = `portfolioGradient-${isProfit ? 'green' : 'red'}`

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  const formatYAxis = (v: number) => {
    const sym = CURRENCY_SYMBOLS[currency]
    if (v >= 1_000_000) return `${sym}${(v / 1_000_000).toFixed(1)}M`
    if (v >= 1_000) return `${sym}${(v / 1_000).toFixed(0)}k`
    return `${sym}${v}`
  }

  // Show every N-th X-axis tick to avoid crowding
  const tickStep = rangeIdx === 0 ? 1 : rangeIdx === 1 ? 2 : 5

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Portfolio Value</h3>
        <div className="flex gap-1">
          {RANGES.map((r, i) => (
            <button
              key={r.label}
              onClick={() => setRangeIdx(i)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                rangeIdx === i
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-48 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visibleData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.25} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={(v, i) => (i % tickStep === 0 ? formatDate(v) : '')}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip
              content={(props) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const { active, payload, label } = props as any
                if (!active || !payload?.length) return null
                return (
                  <div className="bg-[#0a0a1a] border border-white/10 rounded-xl p-3 shadow-xl">
                    <p className="text-xs text-gray-500 mb-1">
                      {new Date(label as string).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </p>
                    <p className="text-sm font-black text-white">
                      {formatAmount((payload[0].value as number) / EXCHANGE_RATES[currency], currency)}
                    </p>
                  </div>
                )
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4, fill: chartColor, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
