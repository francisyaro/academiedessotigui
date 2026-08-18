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
      {/* Render the interactive Client component for filtering */}
      <NomineesList initialNominees={nominees} locale={locale} />
    </div>
  )
}
