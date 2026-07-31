import React from 'react'
import Link from 'next/link'
import { Award } from 'lucide-react'

interface NomineeCardProps {
  nominee: {
    id: string
    first_name: string
    last_name: string
    stage_name?: string | null
    slug: string
    portrait_path?: string | null
    category_name: string
    category_slug: string
    film_title?: string | null
    film_slug?: string | null
    is_winner?: boolean
  }
  locale: string
  showVoteButton?: boolean
  onVoteClick?: () => void
}

export function NomineeCard({
  nominee,
  locale,
  showVoteButton = false,
  onVoteClick
}: NomineeCardProps) {
  const displayName = nominee.stage_name || `${nominee.first_name} ${nominee.last_name}`
  const imageSrc = nominee.portrait_path || '/images/trophy_dark.jpg'
  const detailLink = `/${locale}/nomines/${nominee.slug}`

  return (
    <div className="group bg-dark-surface border border-border-color rounded-2xl overflow-hidden transition-all duration-500 hover:border-gold-primary/50 gold-glow-hover flex flex-col h-full">
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={displayName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-90" />
        
        {nominee.is_winner && (
          <div className="absolute top-4 right-4 bg-gold-primary text-dark-bg text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <Award size={14} />
            <span>Lauréat</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs text-gold-light font-medium tracking-wider uppercase mb-1 font-serif">
          {nominee.category_name}
        </span>
        
        <h3 className="text-lg font-bold text-ivory group-hover:text-gold-light transition-colors duration-300 mb-1">
          <Link href={detailLink} className="focus:outline-none">
            {displayName}
          </Link>
        </h3>
        
        {nominee.film_title && (
          <p className="text-sm text-gray-text italic mb-4">
            dans{' '}
            {nominee.film_slug ? (
              <Link href={`/${locale}/films/${nominee.film_slug}`} className="hover:text-ivory transition-colors duration-300">
                {nominee.film_title}
              </Link>
            ) : (
              <span>{nominee.film_title}</span>
            )}
          </p>
        )}

        <div className="mt-auto pt-4 flex gap-2">
          <Link
            href={detailLink}
            className="flex-grow text-center text-xs font-semibold py-2 px-4 rounded-full border border-border-color hover:border-ivory text-ivory transition-all duration-300"
          >
            {locale === 'en' ? 'Profile' : 'Fiche profil'}
          </Link>
          
          {showVoteButton && (
            <button
              onClick={onVoteClick}
              className="flex-grow text-center text-xs font-semibold py-2 px-4 rounded-full bg-gold-primary hover:bg-gold-light text-dark-bg transition-all duration-300 shadow-md shadow-gold-primary/10 hover:shadow-gold-primary/25 cursor-pointer"
            >
              {locale === 'en' ? 'Vote' : 'Voter'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
