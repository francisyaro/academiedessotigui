import React from 'react'
import Link from 'next/link'
import { getNominees } from '@/lib/services'
import { EVENT_CONFIG } from '@/lib/eventConfig'
import { VotingFlow } from '@/components/voting/VotingFlow'
import { Award, Lock, ArrowRight, Users } from 'lucide-react'

interface VotePageProps {
  params: Promise<{ locale: string }>
}

export default async function VotePage({ params }: VotePageProps) {
  const { locale } = await params
  const isEn = locale === 'en'

  if (!EVENT_CONFIG.isPublicVotingOpen) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center gap-8 w-full">
        <div className="bg-dark-surface border border-gold-primary/30 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center gap-6 relative overflow-hidden w-full">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bronze via-gold-primary to-bordeaux" />

          <div className="w-16 h-16 rounded-2xl bg-gold-primary/10 border border-gold-primary/30 text-gold-light flex items-center justify-center shadow-inner">
            <Lock size={30} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs text-gold-light uppercase tracking-widest font-bold font-serif">
              Sotigui Awards {EVENT_CONFIG.currentYear} • {EVENT_CONFIG.currentEdition}{isEn ? 'th Edition' : 'ème Édition'}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-ivory tracking-tight">
              {isEn ? 'Public Voting is Officially Closed' : 'Le Vote du Public est Officiellement Clos'}
            </h1>
          </div>

          <p className="text-sm text-gray-text max-w-xl leading-relaxed">
            {isEn
              ? 'The 11th Edition of the Sotigui Awards has concluded. The Academy of SOTIGUI warmly thanks the thousands of cinema lovers worldwide for their massive participation in the Public Choice Vote.'
              : "La 11ème Édition des Sotigui Awards est désormais clôturée. L'Académie des SOTIGUI remercie chaleureusement les milliers de passionnés du cinéma africain et de la diaspora à travers le monde pour leur participation massive au Vote du Public."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full pt-4">
            <Link
              href={`/${locale}/palmares`}
              className="px-8 py-3.5 rounded-full bg-gold-primary hover:bg-gold-light text-black font-extrabold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Award size={16} />
              <span>{isEn ? 'View Official Winners' : 'Consulter le Palmarès'}</span>
            </Link>

            <Link
              href={`/${locale}/nomines`}
              className="px-8 py-3.5 rounded-full bg-dark-bg hover:bg-dark-surface border border-border-color hover:border-gold-primary/40 text-ivory font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Users size={16} className="text-gold-light" />
              <span>{isEn ? 'View 2026 Nominees' : 'Voir les Nominés 2026'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

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
          {isEn ? 'Public Choice Vote' : 'Vote du Public'}
        </h1>
        <p className="text-xs text-gold-light uppercase tracking-widest font-semibold font-serif">
          Sotigui Awards 2026
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
