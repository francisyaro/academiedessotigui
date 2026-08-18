'use client'

import React, { useState } from 'react'
import { Award, Sparkles } from 'lucide-react'
import { VotingModal } from './VotingModal'

interface VoteCTAButtonProps {
  locale: string
  className?: string
  variant?: 'gold' | 'outline' | 'floating'
}

export function VoteCTAButton({ locale, className = '', variant = 'gold' }: VoteCTAButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isEn = locale === 'en'

  if (variant === 'floating') {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gold-primary hover:bg-gold-light text-black font-black uppercase text-[10px] sm:text-xs tracking-widest px-5 py-3.5 rounded-full flex items-center gap-2 shadow-2xl transition-all duration-300 hover:scale-105 border border-gold-light/20 cursor-pointer animate-pulse-slow"
        >
          <Award size={16} className="fill-black animate-spin-slow" />
          <span>{isEn ? 'Vote Public Choice' : 'Voter - Prix du Public'}</span>
        </button>

        <VotingModal isOpen={isOpen} onClose={() => setIsOpen(false)} locale={locale} />
      </>
    )
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
          variant === 'gold'
            ? 'bg-gold-primary hover:bg-gold-light text-black shadow-gold-primary/10 border border-gold-light/20'
            : 'bg-transparent hover:bg-dark-surface/50 text-gold-light hover:text-gold-primary border border-gold-primary/30 hover:border-gold-primary'
        } ${className}`}
      >
        <Award size={14} className={variant === 'gold' ? 'fill-black' : 'fill-gold-light'} />
        <span>{isEn ? 'Vote Now (11th Edition)' : 'Voter Maintenant (11ème Édition)'}</span>
      </button>

      <VotingModal isOpen={isOpen} onClose={() => setIsOpen(false)} locale={locale} />
    </>
  )
}
