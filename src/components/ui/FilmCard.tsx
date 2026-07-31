import React from 'react'
import Link from 'next/link'
import { Film } from 'lucide-react'

interface FilmCardProps {
  film: {
    id: string
    title: string
    original_title?: string | null
    slug: string
    poster_path?: string | null
    work_type: string
    release_year?: number | null
    country_id?: string | null
    duration_minutes?: number | null
  }
  locale: string
}

export function FilmCard({ film, locale }: FilmCardProps) {
  const imageSrc = film.poster_path || '/images/trophy_dark.jpg'
  const detailLink = `/${locale}/films/${film.slug}`

  // Work type label translation
  const getWorkTypeLabel = (type: string) => {
    const types: Record<string, { fr: string; en: string }> = {
      feature_film: { fr: 'Long métrage', en: 'Feature Film' },
      short_film: { fr: 'Court métrage', en: 'Short Film' },
      series: { fr: 'Série', en: 'Series' },
      documentary: { fr: 'Documentaire', en: 'Documentary' },
      animation: { fr: 'Animation', en: 'Animation' },
      television_film: { fr: 'Téléfilm', en: 'TV Movie' }
    }
    return types[type]?.[locale as 'fr' | 'en'] || type
  }

  return (
    <div className="group bg-dark-surface border border-border-color rounded-2xl overflow-hidden transition-all duration-500 hover:border-gold-primary/50 gold-glow-hover flex flex-col h-full">
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={film.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-90" />
        
        <div className="absolute top-4 left-4 bg-dark-bg/80 backdrop-blur-md text-gold-light text-xs font-semibold px-3 py-1 rounded-full border border-border-color flex items-center gap-1">
          <Film size={12} />
          <span>{getWorkTypeLabel(film.work_type)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-xs text-gray-text font-medium mb-1">
          {film.country_id || 'Afrique'} {film.release_year ? `• ${film.release_year}` : ''}
        </span>
        
        <h3 className="text-lg font-bold text-ivory group-hover:text-gold-light transition-colors duration-300 mb-2 line-clamp-1">
          <Link href={detailLink} className="focus:outline-none">
            {film.title}
          </Link>
        </h3>
        
        {film.original_title && film.original_title !== film.title && (
          <p className="text-xs text-gray-text italic mb-4 line-clamp-1">
            VO : {film.original_title}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-border-color/30 flex justify-between items-center">
          <span className="text-xs text-gray-text">
            {film.duration_minutes ? `${film.duration_minutes} min` : 'N/A'}
          </span>
          
          <Link
            href={detailLink}
            className="text-xs font-semibold text-gold-light hover:text-gold-primary transition-colors duration-300"
          >
            {locale === 'en' ? 'View details →' : 'Voir détails →'}
          </Link>
        </div>
      </div>
    </div>
  )
}
