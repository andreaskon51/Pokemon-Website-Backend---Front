import React from 'react'
import type { Rarity } from '@/types'

const rarityStyles: Record<string, string> = {
  'Common': 'bg-gray-600/20 text-gray-300 border-gray-500/30',
  'Uncommon': 'bg-green-600/20 text-green-300 border-green-500/30',
  'Rare': 'bg-blue-600/20 text-blue-300 border-blue-500/30',
  'Rare Holo': 'bg-purple-600/20 text-purple-300 border-purple-500/30',
  'Ultra Rare': 'bg-amber-600/20 text-amber-200 border-amber-500/30',
  'Secret Rare': 'bg-pink-600/20 text-pink-200 border-pink-500/30',
  'Illustration Rare': 'bg-gradient-to-r from-yellow-600/20 to-red-600/20 text-yellow-200 border-yellow-500/30',
}

const rarityIcons: Record<string, string> = {
  'Common': '●',
  'Uncommon': '◆',
  'Rare': '★',
  'Rare Holo': '★',
  'Ultra Rare': '✦',
  'Secret Rare': '✧',
  'Illustration Rare': '🎨',
}

export default function RarityBadge({ rarity }: { rarity: Rarity | string }) {
  const style = rarityStyles[rarity] || rarityStyles['Common']
  const icon = rarityIcons[rarity] || '●'
  return (
    <span className={`badge border ${style}`}>
      <span className="text-[10px]">{icon}</span>
      {rarity}
    </span>
  )
}
