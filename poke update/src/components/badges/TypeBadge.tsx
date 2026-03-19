import React from 'react'
import type { PokemonType } from '@/types'

const typeStyles: Record<PokemonType, { bg: string; text: string; border: string }> = {
  Fire:      { bg: 'bg-orange-600/20',  text: 'text-orange-300',  border: 'border-orange-500/30' },
  Water:     { bg: 'bg-blue-600/20',    text: 'text-blue-300',    border: 'border-blue-500/30' },
  Grass:     { bg: 'bg-green-600/20',   text: 'text-green-300',   border: 'border-green-500/30' },
  Electric:  { bg: 'bg-yellow-500/20',  text: 'text-yellow-300',  border: 'border-yellow-500/30' },
  Psychic:   { bg: 'bg-pink-600/20',    text: 'text-pink-300',    border: 'border-pink-500/30' },
  Fighting:  { bg: 'bg-red-700/20',     text: 'text-red-400',     border: 'border-red-500/30' },
  Dark:      { bg: 'bg-purple-900/30',  text: 'text-purple-300',  border: 'border-purple-500/30' },
  Steel:     { bg: 'bg-gray-500/20',    text: 'text-gray-300',    border: 'border-gray-400/30' },
  Dragon:    { bg: 'bg-indigo-600/20',  text: 'text-indigo-300',  border: 'border-indigo-500/30' },
  Fairy:     { bg: 'bg-pink-400/20',    text: 'text-pink-200',    border: 'border-pink-400/30' },
  Normal:    { bg: 'bg-stone-600/20',   text: 'text-stone-300',   border: 'border-stone-500/30' },
  Colorless: { bg: 'bg-slate-500/20',   text: 'text-slate-300',   border: 'border-slate-400/30' },
}

const typeIcons: Record<PokemonType, string> = {
  Fire: '🔥', Water: '💧', Grass: '🌿', Electric: '⚡',
  Psychic: '🔮', Fighting: '👊', Dark: '🌑', Steel: '⚙️',
  Dragon: '🐉', Fairy: '✨', Normal: '⭐', Colorless: '◎',
}

export default function TypeBadge({ type }: { type: PokemonType | string }) {
  const style = typeStyles[type as PokemonType] || typeStyles.Normal
  const icon = typeIcons[type as PokemonType] || '⭐'
  return (
    <span className={`badge border ${style.bg} ${style.text} ${style.border}`}>
      <span className="text-[10px]">{icon}</span>
      {type}
    </span>
  )
}
