'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Globe, LogIn } from 'lucide-react'
import { Button } from '../ui/Button'

interface NavbarProps {
  locale: string
}

export function Navbar({ locale }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Navigation Links definition
  const links = [
    { href: `/${locale}/academie/presentation`, label: locale === 'en' ? 'The Academy' : "L'Académie" },
    { href: `/${locale}/nomines`, label: locale === 'en' ? 'Nominees' : 'Nominés' },
    { href: `/${locale}/films`, label: locale === 'en' ? 'Films' : 'Films' },
    { href: `/${locale}/vote`, label: locale === 'en' ? 'Vote' : 'Vote' },
    { href: `/${locale}/palmares`, label: locale === 'en' ? 'Winners' : 'Palmarès' },
    { href: `/${locale}/actualites`, label: locale === 'en' ? 'News' : 'Actualités' }
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
          <nav className="hidden lg:flex space-x-1">
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

          {/* Right actions (Language & Admin) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switch */}
            <button
              onClick={handleLanguageChange}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-text hover:text-gold-light border border-border-color hover:border-gold-primary/30 rounded-full transition-all duration-300 cursor-pointer"
            >
              <Globe size={14} />
              <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            {/* Dashboard Link */}
            <Link href={`/${locale}/connexion`}>
              <Button variant="outline" size="sm" className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                <LogIn size={12} />
                <span>{locale === 'en' ? 'Admin' : 'Connexion'}</span>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile language switch */}
            <button
              onClick={handleLanguageChange}
              className="flex items-center gap-1 p-2 text-xs font-semibold text-gray-text hover:text-gold-light border border-border-color rounded-full"
            >
              <Globe size={14} />
              <span>{locale === 'fr' ? 'EN' : 'FR'}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
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
          
          <div className="pt-4 border-t border-border-color flex justify-between items-center">
            <Link href={`/${locale}/connexion`} onClick={() => setIsOpen(false)} className="w-full">
              <Button variant="outline" size="md" className="w-full flex items-center justify-center gap-2 uppercase tracking-widest text-xs">
                <LogIn size={14} />
                <span>{locale === 'en' ? 'Admin Access' : 'Accès Administration'}</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
