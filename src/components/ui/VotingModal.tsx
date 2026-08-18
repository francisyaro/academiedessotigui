'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ExternalLink, Sparkles, Loader2 } from 'lucide-react'

interface VotingModalProps {
  isOpen: boolean
  onClose: () => void
  locale: string
}

export function VotingModal({ isOpen, onClose, locale }: VotingModalProps) {
  const isEn = locale === 'en'
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Wait until mounted on client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setIsLoading(true) // Reset loading state when opened
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !mounted) return null

  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc00TsfO7dL_e4E3_uWAxX8stMc80CoSj-ff8z3-muog8SyPQ/viewform?embedded=true"
  const directLink = "https://forms.gle/e8ANJa7vKQ6944nT8"

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Backdrop close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-[94%] max-w-4xl h-[85vh] md:h-[90vh] bg-dark-surface border border-gold-primary/30 rounded-2xl sm:rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden animate-scale-in">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-dark-bg border-b border-border-color/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-gold-primary/10 text-gold-light border border-gold-primary/20">
              <Sparkles size={14} className="animate-pulse" />
            </span>
            <div>
              <h2 className="font-serif text-sm sm:text-base font-bold text-ivory tracking-tight">
                {isEn ? 'Public Choice Vote' : 'Vote du Public'}
              </h2>
              <p className="text-[9px] text-gray-text uppercase tracking-widest font-semibold">
                Sotigui Awards 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct External Link */}
            <a
              href={directLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-border-color hover:border-gold-primary text-gray-text hover:text-gold-light text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer bg-dark-surface/50"
              title={isEn ? "Open in a new tab" : "Ouvrir dans un nouvel onglet"}
            >
              <span className="hidden sm:inline">{isEn ? 'Full Screen' : 'Plein Écran'}</span>
              <ExternalLink size={12} />
            </a>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-dark-surface border border-border-color hover:border-ivory/40 text-gray-text hover:text-ivory transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="relative flex-grow bg-white w-full overflow-hidden">
          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 bg-dark-bg flex flex-col items-center justify-center gap-3">
              <Loader2 size={32} className="text-gold-primary animate-spin" />
              <p className="text-xs text-gold-light font-mono animate-pulse uppercase tracking-widest">
                {isEn ? 'Loading voting form...' : 'Chargement du formulaire...'}
              </p>
            </div>
          )}

          {/* Embedded Google Form Iframe */}
          <iframe
            src={googleFormUrl}
            className="w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
            title={isEn ? "Sotigui Awards 2026 Vote Form" : "Formulaire de vote des Sotigui Awards 2026"}
          >
            {isEn ? 'Loading...' : 'Chargement...'}
          </iframe>
        </div>
      </div>
    </div>,
    document.body
  )
}
