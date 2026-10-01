'use client'

import React, { useState, useEffect } from 'react'
import { Lock, KeyRound, ShieldAlert, Sparkles, LogOut, CheckCircle2 } from 'lucide-react'

interface AcademyAuthGateProps {
  children: React.ReactNode
  locale: string
}

const ACADEMY_PASSWORD = 'sotigui@2026'
const STORAGE_KEY = 'sotigui_academy_auth_2026'

export function AcademyAuthGate({ children, locale }: AcademyAuthGateProps) {
  const isEn = locale === 'en'
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const storedAuth = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (storedAuth === 'true') {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.trim() === ACADEMY_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true')
      setIsAuthenticated(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setIsAuthenticated(false)
    setPassword('')
  }

  // Loading state while checking localStorage
  if (isAuthenticated === null) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Render children if authenticated
  if (isAuthenticated) {
    return (
      <div className="w-full flex flex-col gap-6">
        {/* Member Session Banner */}
        <div className="bg-dark-surface/80 border border-gold-primary/30 rounded-2xl px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-gold-primary/10 text-gold-light border border-gold-primary/20">
              <CheckCircle2 size={18} />
            </span>
            <div>
              <p className="text-xs font-bold text-ivory tracking-wide">
                {isEn ? 'Authenticated Academy Member Session' : 'Session Membre de l\'Académie Authentifiée'}
              </p>
              <p className="text-[10px] text-gray-text uppercase tracking-widest font-mono">
                SOTIGUI AWARDS 2026
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-color hover:border-red-500/50 text-gray-text hover:text-red-400 text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer bg-dark-bg/50"
            title={isEn ? 'Lock Session' : 'Fermer la session'}
          >
            <LogOut size={14} />
            <span>{isEn ? 'Lock Session' : 'Verrouiller'}</span>
          </button>
        </div>

        {children}
      </div>
    )
  }

  // Password Entry Form
  return (
    <div className="max-w-md mx-auto w-full py-10 px-4">
      <div className="bg-dark-surface border border-gold-primary/30 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden backdrop-blur-xl animate-fade-in">
        {/* Top Gold Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-primary via-gold-light to-gold-primary" />

        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gold-primary/10 border border-gold-primary/30 text-gold-light flex items-center justify-center shadow-inner">
            <Lock size={28} className="animate-pulse" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-ivory">
            {isEn ? 'Academy Member Area' : 'Espace Membres de l\'Académie'}
          </h2>
          <p className="text-xs text-gray-text leading-relaxed">
            {isEn
              ? 'This voting section is strictly reserved for members of the Academy of SOTIGUI. Please enter your access password.'
              : 'Ce système de vote est strictement réservé aux membres de l\'Académie des SOTIGUI. Veuillez entrer votre mot de passe d\'accès.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gold-light flex items-center gap-1.5">
              <KeyRound size={13} />
              <span>{isEn ? 'Password' : 'Mot de passe'}</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (error) setError(false)
              }}
              placeholder="••••••••••••"
              className={`w-full bg-dark-bg border ${
                error ? 'border-red-500 focus:border-red-500' : 'border-border-color focus:border-gold-primary'
              } rounded-xl px-4 py-3 text-sm text-ivory focus:outline-none transition-all duration-300 font-mono`}
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold animate-shake">
              <ShieldAlert size={16} className="shrink-0" />
              <span>
                {isEn
                  ? 'Incorrect password. Access denied.'
                  : 'Mot de passe incorrect. Accès refusé.'}
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-gold-primary hover:bg-gold-light text-black font-extrabold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-gold-primary/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <Sparkles size={16} />
            <span>{isEn ? 'Access Academy Votes' : 'Accéder aux votes de l\'Académie'}</span>
          </button>
        </form>

        <div className="text-center border-t border-border-color/40 pt-4">
          <p className="text-[10px] text-gray-text uppercase tracking-widest font-mono">
            Académie des Arts Cinématographiques Africains et de la Diaspora
          </p>
        </div>
      </div>
    </div>
  )
}
