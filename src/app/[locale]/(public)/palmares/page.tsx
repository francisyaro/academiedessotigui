import React from 'react'
import { PalmaresClient } from './PalmaresClient'

interface PalmaresProps {
  params: Promise<{ locale: string }>
}

export default async function PalmaresPage({ params }: PalmaresProps) {
  const { locale } = await params
  const isEn = locale === 'en'

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-12 w-full">
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-ivory tracking-tight">
          {isEn ? 'Sotigui Awards History' : 'Palmarès des Sotigui Awards'}
        </h1>
        <p className="text-xs text-gold-light uppercase tracking-widest font-semibold font-serif">
          {isEn ? 'History of Excellence & Distinctions' : 'L\'historique des distinctions et lauréats'}
        </p>
        <div className="w-16 h-0.5 bg-gold-primary mx-auto mt-2" />
      </div>

      <PalmaresClient locale={locale} />
    </div>
  )
}
