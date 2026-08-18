'use client'

import React, { useEffect } from 'react'
import { X, Award, ExternalLink, Sparkles, AlertCircle } from 'lucide-react'

interface VotingModalProps {
  isOpen: boolean
  onClose: () => void
  locale: string
}

export function VotingModal({ isOpen, onClose, locale }: VotingModalProps) {
  const isEn = locale === 'en'

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      {/* Backdrop close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-dark-surface border border-gold-primary/30 rounded-3xl p-6 md:p-8 shadow-2xl z-10 flex flex-col gap-6 animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-ivory hover:text-gold-light transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center flex flex-col items-center gap-2 mt-4">
          <div className="w-12 h-12 rounded-full bg-gold-primary/10 text-gold-light flex items-center justify-center border border-gold-primary/20 mb-2">
            <Award size={24} className="animate-pulse" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ivory tracking-tight">
            {isEn ? '11th Edition • Public Choice Vote' : '11ème Édition • Vote du Public'}
          </h2>
          <span className="text-[10px] text-gold-light uppercase tracking-widest font-semibold flex items-center gap-1">
            <Sparkles size={12} />
            Sotigui Awards 2026
          </span>
          <div className="w-12 h-0.5 bg-gold-primary mt-2" />
        </div>

        {/* Instructions */}
        <div className="flex flex-col gap-4 text-sm text-ivory/80 leading-relaxed bg-dark-bg/50 p-5 rounded-2xl border border-border-color/40">
          <h4 className="font-serif font-bold text-gold-light text-xs uppercase tracking-wider">
            {isEn ? 'Instructions for Voting' : 'Instructions pour voter'}
          </h4>
          <ol className="list-decimal pl-4 flex flex-col gap-2.5 text-xs text-gray-text">
            <li>
              {isEn
                ? 'Click on the "Vote Now" button below to open the official Google Form.'
                : 'Cliquez sur le bouton "Voter Maintenant" ci-dessous pour ouvrir le formulaire Google officiel.'}
            </li>
            <li>
              {isEn
                ? 'Select your favorite nominee from the list in each category.'
                : 'Sélectionnez votre acteur ou actrice favori(e) dans les différentes catégories proposées.'}
            </li>
            <li>
              {isEn
                ? 'Submit the form to record your vote. One response per user is allowed.'
                : 'Validez le formulaire pour enregistrer votre vote. Une seule réponse par internaute est autorisée.'}
            </li>
          </ol>
        </div>

        {/* Alert badge */}
        <div className="flex items-start gap-2.5 p-3.5 bg-gold-primary/5 rounded-xl border border-gold-primary/10 text-[11px] text-gold-light leading-snug">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <p>
            {isEn
              ? 'Public voting is completely free and directly influences the selection of the public award winner.'
              : 'Le vote du public est totalement gratuit et détermine directement le lauréat du prix du public.'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-1/3 bg-transparent hover:bg-dark-surface/60 text-ivory border border-border-color/60 hover:border-ivory/40 rounded-full py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
          >
            {isEn ? 'Cancel' : 'Fermer'}
          </button>
          <a
            href="https://forms.gle/e8ANJa7vKQ6944nT8"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full sm:w-2/3 bg-gold-primary hover:bg-gold-light text-black rounded-full py-3 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-gold-primary/10 cursor-pointer"
          >
            <span>{isEn ? 'Vote Now' : 'Voter Maintenant'}</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
