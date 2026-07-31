import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <polygon points="10 15 15 12 10 9"/>
    </svg>
  )
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.73 16h4.27L8.27 4z" />
      <path d="M18 4l-4.25 5.75M11.25 12.75L4 20" />
    </svg>
  )
}

interface FooterProps {
  locale: string
}

export function Footer({ locale }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-surface border-t border-border-color/60 mt-auto text-gray-text">
      {/* Premium subtle African border line */}
      <div className="h-1 bg-gradient-to-r from-bronze via-gold-primary to-bordeaux" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo_bw.png"
                alt="Académie des Sotigui"
                className="h-12 w-auto brightness-110"
              />
            </Link>
            <p className="text-xs leading-relaxed max-w-xs">
              {locale === 'en'
                ? 'Recognizing and promoting actors, actresses and film professionals of Africa and the Diaspora worldwide.'
                : "Valoriser et promouvoir les acteurs, actrices et professionnels du cinéma d'Afrique et de sa diaspora dans le monde."}
            </p>
            <div className="flex gap-4">
              <a href="https://web.facebook.com/Lessotigui/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition-colors" aria-label="Facebook"><FacebookIcon /></a>
              <a href="https://twitter.com/SotiguiAwds" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition-colors" aria-label="X"><XIcon /></a>
              <a href="https://www.instagram.com/sotiguiawards/" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition-colors" aria-label="Instagram"><InstagramIcon /></a>
              <a href="https://www.youtube.com/@academiedessotigui6686" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition-colors" aria-label="Youtube"><YoutubeIcon /></a>
            </div>
          </div>

          {/* Academy Col */}
          <div>
            <h4 className="font-serif text-sm font-bold text-ivory uppercase tracking-widest mb-6">
              {locale === 'en' ? 'The Academy' : "L'Académie"}
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href={`/${locale}/academie/presentation`} className="hover:text-ivory transition-colors">
                  {locale === 'en' ? 'Presentation' : 'Présentation'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/academie/presentation#histoire`} className="hover:text-ivory transition-colors">
                  {locale === 'en' ? 'History' : 'Histoire'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/academie/presentation#gouvernance`} className="hover:text-ivory transition-colors">
                  {locale === 'en' ? 'Governance' : 'Gouvernance'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/academie/devenir-membre`} className="hover:text-ivory transition-colors">
                  {locale === 'en' ? 'Become a Member' : 'Devenir Membre'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Awards Col */}
          <div>
            <h4 className="font-serif text-sm font-bold text-ivory uppercase tracking-widest mb-6">
              Sotigui Awards
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href={`/${locale}/nomines`} className="hover:text-ivory transition-colors">
                  {locale === 'en' ? 'Nominees 2026' : 'Nominés 2026'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/vote`} className="hover:text-ivory transition-colors">
                  {locale === 'en' ? 'Public Vote' : 'Vote du Public'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/palmares`} className="hover:text-ivory transition-colors">
                  {locale === 'en' ? 'Historical Winners' : 'Palmarès Historiques'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/vote#reglement`} className="hover:text-ivory transition-colors">
                  {locale === 'en' ? 'Voting Rules' : 'Règlement du Vote'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-serif text-sm font-bold text-ivory uppercase tracking-widest mb-6">
              Contact
            </h4>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-gold-light shrink-0" />
                <span>Ouagadougou, Burkina Faso</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-gold-light shrink-0" />
                <a href="mailto:cinema@academiedessotigui.org" className="hover:text-ivory transition-colors">
                  cinema@academiedessotigui.org
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-gold-light shrink-0" />
                <span>+226 58 07 00 00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 mt-12 border-t border-border-color/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-wider">
          <span>
            © {currentYear} ACADÉMIE DES SOTIGUI. All rights reserved.
          </span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ivory transition-colors">
              {locale === 'en' ? 'Privacy' : 'Confidentialité'}
            </a>
            <a href="#" className="hover:text-ivory transition-colors">
              {locale === 'en' ? 'Terms' : 'Mentions Légales'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
