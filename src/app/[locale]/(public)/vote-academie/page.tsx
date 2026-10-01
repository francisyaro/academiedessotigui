import React from 'react'
import Link from 'next/link'
import { ACADEMY_CATEGORIES } from '@/lib/academyVotingData'
import { AcademyAuthGate } from '@/components/voting/AcademyAuthGate'
import { Award, ArrowRight, Film, Sparkles, CheckCircle } from 'lucide-react'

interface AcademyVotePortalPageProps {
  params: Promise<{ locale: string }>
}

export default async function AcademyVotePortalPage({ params }: AcademyVotePortalPageProps) {
  const { locale } = await params
  const isEn = locale === 'en'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-10 w-full">
      {/* Header Banner */}
      <div className="text-center flex flex-col items-center gap-3">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-primary/10 border border-gold-primary/30 text-gold-light text-xs font-bold uppercase tracking-widest">
          <Award size={14} className="text-gold-primary" />
          <span>{isEn ? 'Official Member Portal' : 'Portail Officiel des Membres'}</span>
        </span>

        <h1 className="font-serif text-3xl md:text-5xl font-bold text-ivory tracking-tight max-w-3xl">
          {isEn ? 'Academy of SOTIGUI Voting System' : 'Vote de l\'Académie des SOTIGUI'}
        </h1>

        <p className="text-sm text-gray-text max-w-2xl leading-relaxed">
          {isEn
            ? 'Access the 15 official category voting forms reserved exclusively for Academy members. Select a category below to view nominee film clips and cast your vote.'
            : 'Accédez aux 15 formulaires de vote officiels réservés exclusivement aux membres de l\'Académie. Sélectionnez une catégorie ci-dessous pour consulter les extraits vidéo et soumettre votre vote.'}
        </p>
        <div className="w-20 h-0.5 bg-gold-primary mt-2" />
      </div>

      {/* Auth Gate wrapping the portal cards grid */}
      <AcademyAuthGate locale={locale}>
        <div className="flex flex-col gap-8 mt-4">
          <div className="flex items-center justify-between border-b border-border-color/60 pb-4">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-ivory flex items-center gap-2">
              <Sparkles size={20} className="text-gold-primary" />
              <span>{isEn ? 'Voting Categories (15)' : 'Catégories de Voting (15)'}</span>
            </h2>
            <span className="text-xs text-gray-text font-mono uppercase tracking-wider">
              SOTIGUI AWARDS 2026
            </span>
          </div>

          {/* Grid of 15 Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMY_CATEGORIES.map((category, index) => (
              <div
                key={category.id}
                className="group bg-dark-surface border border-border-color hover:border-gold-primary/50 rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-gold-primary/10 hover:-translate-y-1"
              >
                {/* Banner Header */}
                <div className="relative h-48 w-full bg-black/80 overflow-hidden">
                  {category.bannerPath ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={category.bannerPath}
                      alt={category.titleFr}
                      className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-dark-surface via-black to-dark-bg flex items-center justify-center">
                      <Film size={48} className="text-gold-primary/30" />
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-black/40" />

                  {/* Category index badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-gold-primary/30 text-gold-light font-mono text-[11px] font-bold">
                    #{index + 1}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-grow flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-lg font-bold text-ivory group-hover:text-gold-light transition-colors leading-snug">
                      {isEn ? category.titleEn : category.titleFr}
                    </h3>
                    <p className="text-xs text-gray-text flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-gold-primary shrink-0" />
                      <span>{category.nominees.length} {isEn ? 'Nominated Actors' : 'Acteurs Nominés'}</span>
                    </p>
                  </div>

                  {/* CTA Link to category voting page */}
                  <Link
                    href={`/${locale}/vote-academie/${category.slug}`}
                    className="w-full py-3 px-4 rounded-xl bg-dark-bg hover:bg-gold-primary border border-border-color hover:border-gold-light text-ivory hover:text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer"
                  >
                    <span>{isEn ? 'Vote in this category' : 'Voter dans cette catégorie'}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AcademyAuthGate>
    </div>
  )
}
