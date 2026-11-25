'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Globe, Award } from 'lucide-react'
import { EVENT_CONFIG } from '@/lib/eventConfig'
import { VotingModal } from '../ui/VotingModal'

interface NavbarProps {
  locale: string
}

export function Navbar({ locale }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVotingModalOpen, setIsVotingModalOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const isEn = locale === 'en'

  // Navigation Links definition (Dynamically filtered based on event lifecycle)
  const links = [
    { href: `/${locale}/academie/presentation`, label: isEn ? 'The Academy' : "L'Académie" },
    { href: `/${locale}/nomines`, label: isEn ? 'Nominees' : 'Nominés' },
    { href: `/${locale}/films`, label: isEn ? 'Films' : 'Films' },
    ...(EVENT_CONFIG.isPublicVotingOpen
      ? [{ href: `/${locale}/vote`, label: isEn ? 'Public Vote' : 'Vote du Public' }]
      : []),
    ...(EVENT_CONFIG.isAcademyVotingOpen
      ? [{ href: `/${locale}/vote-academie`, label: isEn ? 'Academy Vote' : 'Vote Académie' }]
      : []),
    { href: `/${locale}/palmares`, label: isEn ? 'Winners' : 'Palmarès' },
    { href: `/${locale}/actualites`, label: isEn ? 'News' : 'Actualités' }
  ]

  // Switch locale FR <-> EN preserving paths
  const handleLanguageChange = () => {
    const targetLocale = locale === 'fr' ? 'en' : 'fr'
    const newPath = pathname.replace(`/${locale}`, `/${targetLocale}`)
    router.push(newPath)
  }

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 bg-dark-bg/85 backdrop-blur-md border-b border-border-color/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 focus:outline-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo_bw.png"
              alt="Académie des Sotigui Logo"
              className="h-12 w-auto object-contain brightness-110"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1" aria-label={isEn ? 'Main Navigation' : 'Navigation principale'}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                  isActive(link.href)
                    ? 'text-gold-light bg-dark-surface/50 border border-gold-primary/20'
                    : 'text-gray-text hover:text-ivory hover:bg-dark-surface/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions (Language switch & Primary CTA) */}
          <div className="hidden lg:flex items-center gap-4">
            {EVENT_CONFIG.isPublicVotingOpen ? (
              <button
                onClick={() => setIsVotingModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider text-black bg-gold-primary hover:bg-gold-light rounded-full transition-all duration-300 shadow-md shadow-gold-primary/10 hover:scale-105 transform cursor-pointer border border-gold-light/20"
              >
                <Award size={14} className="fill-black" />
                <span>{locale === 'fr' ? 'Voter' : 'Vote'}</span>
              </button>
            ) : (
              <Link
                href={`/${locale}/palmares`}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-black uppercase tracking-wider text-black bg-gold-primary hover:bg-gold-light rounded-full transition-all duration-300 shadow-md shadow-gold-primary/10 hover:scale-105 transform cursor-pointer border border-gold-light/20"
              >
                <Award size={14} className="fill-black" />
                <span>{locale === 'fr' ? 'Palmarès' : 'Winners'}</span>
              </Link>
            )}

            {/* Language Switch */}
            <button
              onClick={handleLanguageChange}
              aria-label={isEn ? 'Switch language to French' : 'Passer le site en anglais'}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-text hover:text-gold-light border border-border-color hover:border-gold-primary/30 rounded-full transition-all duration-300 cursor-pointer"
            >
              <Globe size={14} />
              <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            {EVENT_CONFIG.isPublicVotingOpen ? (
              <button
                onClick={() => setIsVotingModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-black bg-gold-primary hover:bg-gold-light rounded-full transition-all duration-300 cursor-pointer"
              >
                <Award size={12} className="fill-black" />
                <span>{locale === 'fr' ? 'Voter' : 'Vote'}</span>
              </button>
            ) : (
              <Link
                href={`/${locale}/palmares`}
                className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-black bg-gold-primary hover:bg-gold-light rounded-full transition-all duration-300 cursor-pointer"
              >
                <Award size={12} className="fill-black" />
                <span>{locale === 'fr' ? 'Palmarès' : 'Winners'}</span>
              </Link>
            )}

            {/* Mobile language switch */}
            <button
              onClick={handleLanguageChange}
              aria-label={isEn ? 'Switch language' : 'Changer de langue'}
              className="flex items-center gap-1 p-2 text-xs font-semibold text-gray-text hover:text-gold-light border border-border-color rounded-full"
            >
              <Globe size={14} />
              <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="p-2 rounded-md text-gray-text hover:text-ivory hover:bg-dark-surface focus:outline-none cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-dark-bg border-b border-border-color absolute left-0 right-0 py-4 px-6 flex flex-col gap-4 animate-fade-in shadow-2xl">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                  isActive(link.href)
                    ? 'text-gold-light bg-dark-surface border border-gold-primary/20'
                    : 'text-gray-text hover:text-ivory'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Voting Instructions Modal (Only active when voting is open) */}
      {EVENT_CONFIG.isPublicVotingOpen && (
        <VotingModal
          isOpen={isVotingModalOpen}
          onClose={() => setIsVotingModalOpen(false)}
          locale={locale}
        />
      )}
    </header>
  )
}
