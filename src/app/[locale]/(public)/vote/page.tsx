import React from 'react'
import { getNominees } from '@/lib/services'
import { VotingFlow } from '@/components/voting/VotingFlow'

interface VotePageProps {
  params: Promise<{ locale: string }>
}

export default async function VotePage({ params }: VotePageProps) {
  const { locale } = await params
  const nominees = await getNominees()

  // Filter public vote eligible nominees
  const eligibleNominees = nominees.filter(n => n.is_public_vote_eligible)

  // Standard public categories list
  const categories = Array.from(new Set(eligibleNominees.map(n => JSON.stringify({
    name: n.category_name,
    slug: n.category_slug
  })))).map((str: any) => JSON.parse(str))

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-10 w-full">
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-ivory tracking-tight">
          {locale === 'en' ? 'Public Choice Vote' : 'Vote du Public'}
        </h1>
        <p className="text-xs text-gold-light uppercase tracking-widest font-semibold font-serif">
          {locale === 'en' ? 'Sotigui Awards 2026' : 'Sotigui Awards 2026'}
        </p>
        <div className="w-16 h-0.5 bg-gold-primary mx-auto mt-2" />
      </div>

      <VotingFlow
        nominees={eligibleNominees}
        categories={categories}
        locale={locale}
      />
    </div>
  )
}
