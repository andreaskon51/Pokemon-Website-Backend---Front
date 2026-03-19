import React from 'react'
import type { ListingType } from '@/types'
import { ShoppingCart, ArrowLeftRight, Gavel } from 'lucide-react'

const typeConfig: Record<ListingType, { label: string; colors: string; Icon: React.FC<any> }> = {
  sale: { label: 'For Sale', colors: 'bg-green-500/20 text-green-300 border-green-500/30', Icon: ShoppingCart },
  trade: { label: 'For Trade', colors: 'bg-blue-500/20 text-blue-300 border-blue-500/30', Icon: ArrowLeftRight },
  auction: { label: 'Auction', colors: 'bg-amber-500/20 text-amber-300 border-amber-500/30', Icon: Gavel },
}

export default function ListingTypeBadge({ type, size = 'sm' }: { type: ListingType; size?: 'sm' | 'md' }) {
  const cfg = typeConfig[type]
  return (
    <span className={`badge border ${cfg.colors} ${size === 'md' ? 'px-3 py-1.5 text-sm' : ''}`}>
      <cfg.Icon className={size === 'md' ? 'w-4 h-4' : 'w-3 h-3'} />
      {cfg.label}
    </span>
  )
}
