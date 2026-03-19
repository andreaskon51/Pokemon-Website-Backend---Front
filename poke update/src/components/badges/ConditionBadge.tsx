import React from 'react'
import type { Condition } from '@/types'

const conditionColors: Record<string, string> = {
  'PSA 10': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'PSA 9': 'bg-green-500/20 text-green-300 border-green-500/30',
  'PSA 8': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'PSA 7': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'PSA 6': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  'PSA 5': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'PSA 4': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'PSA 3': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'PSA 2': 'bg-red-500/20 text-red-300 border-red-500/30',
  'PSA 1': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  'Ungraded': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
}

export default function ConditionBadge({ condition }: { condition: Condition | string }) {
  const colors = conditionColors[condition] || conditionColors['Ungraded']
  return (
    <span className={`badge border ${colors}`}>
      {condition === 'PSA 10' && <span className="text-[10px]">💎</span>}
      {condition}
    </span>
  )
}
