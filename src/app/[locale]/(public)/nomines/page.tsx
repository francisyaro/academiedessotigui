import React from 'react'
import { getNominees } from '@/lib/services'
import { NomineesList } from '@/components/nominees/NomineesList'

interface NominesProps {
  params: Promise<{ locale: string }>
}

export default async function NominesPage({ params }: NominesProps) {
  const { locale } = await params
  const nominees = await getNominees()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-10 w-full">
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-ivory tracking-tight">
          {locale === 'en' ? 'The Nominees 2026' : 'Les Nominés 2026'}
        </h1>
        <p className="text-xs text-gold-light uppercase tracking-widest font-semibold font-serif">
          {locale === 'en' ? '11th Edition of Sotigui Awards' : '11ème Édition des Sotigui Awards'}
        </p>
        <div className="w-16 h-0.5 bg-gold-primary mx-auto mt-2" />
      </div>

      {/* Render the interactive Client component for filtering */}
      <NomineesList initialNominees={nominees} locale={locale} />
    </div>
  )
}
