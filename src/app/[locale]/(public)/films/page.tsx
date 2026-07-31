import React from 'react'
import { getFilms } from '@/lib/services'
import { FilmCard } from '@/components/ui/FilmCard'

interface FilmsPageProps {
  params: Promise<{ locale: string }>
}

export default async function FilmsPage({ params }: FilmsPageProps) {
  const { locale } = await params
  const films = await getFilms()

  const isEn = locale === 'en'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-10 w-full">
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-ivory tracking-tight">
          {isEn ? 'Films & Series' : 'Films & Séries'}
        </h1>
        <p className="text-xs text-gold-light uppercase tracking-widest font-semibold font-serif">
          {isEn ? 'In Competition for 2026' : 'En Compétition pour l\'Édition 2026'}
        </p>
        <div className="w-16 h-0.5 bg-gold-primary mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} locale={locale} />
        ))}
      </div>
    </div>
  )
}
