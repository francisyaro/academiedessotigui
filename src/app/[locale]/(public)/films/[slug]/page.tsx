import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getFilmBySlug } from '@/lib/services'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Clock, Film as FilmIcon, Globe, Play } from 'lucide-react'

interface FilmDetailPageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function FilmDetailPage({ params }: FilmDetailPageProps) {
  const { locale, slug } = await params
  const film = await getFilmBySlug(slug)

  if (!film) {
    notFound()
  }

  const isEn = locale === 'en'

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-10 w-full">
      {/* Back button */}
      <div>
        <Link
          href={`/${locale}/films`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-text hover:text-gold-light transition-colors duration-300"
        >
          <ArrowLeft size={16} />
          <span>{isEn ? 'Back to films' : 'Retour aux films'}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Poster */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative aspect-[2/3] rounded-3xl overflow-hidden border border-border-color bg-black shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={film.poster_path || '/images/trophy_dark.jpg'}
              alt={film.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {film.trailer_url && (
            <a
              href={film.trailer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-3 uppercase tracking-wider text-xs">
                <Play size={16} />
                <span>{isEn ? 'Watch Trailer' : 'Regarder la bande-annonce'}</span>
              </Button>
            </a>
          )}
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-7 flex flex-col gap-8 justify-center">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-gold-light font-semibold uppercase tracking-widest font-serif flex items-center gap-1.5">
              <FilmIcon size={14} />
              {getWorkTypeLabel(film.work_type)}
            </span>
            
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory tracking-tight mb-2">
              {film.title}
            </h1>
            
            {film.original_title && film.original_title !== film.title && (
              <p className="text-sm text-gray-text italic -mt-1 mb-2">
                Original Title: {film.original_title}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-text font-semibold uppercase tracking-wider">
              <span>{film.country_id}</span>
              <span>•</span>
              <span>{film.release_year}</span>
              {film.duration_minutes && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {film.duration_minutes} min
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="h-px bg-border-color/60 w-full" />

          {/* Synopsis */}
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-lg font-bold text-gold-light uppercase tracking-widest">
              Synopsis
            </h2>
            <p className="text-sm text-gray-text leading-relaxed">
              {film.synopsis}
            </p>
          </div>

          <div className="h-px bg-border-color/60 w-full" />

          {/* Technical Info */}
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-lg font-bold text-gold-light uppercase tracking-widest">
              {isEn ? 'Technical Sheet' : 'Fiche technique'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-dark-surface border border-border-color rounded-2xl p-5">
              <div className="flex flex-col gap-1">
                <span className="text-gray-text uppercase font-bold tracking-wider">{isEn ? 'Original Language' : 'Langue originale'}</span>
                <span className="text-ivory font-semibold">{film.language}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-text uppercase font-bold tracking-wider">{isEn ? 'Country of Production' : 'Pays de production'}</span>
                <span className="text-ivory font-semibold">{film.country_id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
