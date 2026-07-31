import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNomineeBySlug } from '@/lib/services'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Award, Film, Globe, Share2 } from 'lucide-react'

interface NomineeDetailProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function NomineeDetailPage({ params }: NomineeDetailProps) {
  const { locale, slug } = await params
  const nominee = await getNomineeBySlug(slug)

  if (!nominee) {
    notFound()
  }

  const displayName = nominee.stage_name || `${nominee.first_name} ${nominee.last_name}`
  const isEn = locale === 'en'

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-10 w-full">
      {/* Back button */}
      <div>
        <Link
          href={`/${locale}/nomines`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-text hover:text-gold-light transition-colors duration-300"
        >
          <ArrowLeft size={16} />
          <span>{isEn ? 'Back to nominees' : 'Retour aux nominés'}</span>
        </Link>
      </div>

      {/* Main Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Image Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-border-color bg-black shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={nominee.portrait_path || '/images/trophy_dark.jpg'}
              alt={displayName}
              className="w-full h-full object-cover"
            />
            {nominee.is_winner && (
              <div className="absolute top-6 right-6 bg-gold-primary text-dark-bg text-sm font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
                <Award size={16} />
                <span>{isEn ? 'Winner' : 'Lauréat'}</span>
              </div>
            )}
          </div>
          
          {/* Action Row */}
          <div className="flex gap-4">
            <button className="flex-grow flex items-center justify-center gap-2 border border-border-color hover:border-ivory rounded-full py-3 text-xs font-bold uppercase tracking-wider text-ivory transition-colors cursor-pointer">
              <Share2 size={16} />
              <span>{isEn ? 'Share Profile' : 'Partager la fiche'}</span>
            </button>
            
            {nominee.is_public_vote_eligible && (
              <Link href={`/${locale}/vote`} className="flex-grow">
                <Button variant="gold" size="lg" className="w-full uppercase tracking-widest text-xs py-3.5">
                  {isEn ? 'Vote for this artist' : 'Voter pour cet artiste'}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Right: Content details */}
        <div className="lg:col-span-7 flex flex-col gap-8 justify-center">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-gold-light font-semibold uppercase tracking-widest font-serif flex items-center gap-1.5">
              <Award size={14} />
              {nominee.category_name}
            </span>
            
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory tracking-tight mb-2">
              {displayName}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-text font-semibold uppercase tracking-wider">
              <span>{nominee.country_id}</span>
              <span>•</span>
              <span>{nominee.gender === 'F' ? (isEn ? 'Actress' : 'Actrice') : (isEn ? 'Actor' : 'Acteur')}</span>
            </div>
          </div>

          <div className="h-px bg-border-color/60 w-full" />

          {/* Biography */}
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-lg font-bold text-gold-light uppercase tracking-widest">
              {isEn ? 'Biography' : 'Biographie'}
            </h2>
            <p className="text-sm text-gray-text leading-relaxed whitespace-pre-line">
              {nominee.biography}
            </p>
          </div>

          <div className="h-px bg-border-color/60 w-full" />

          {/* Featured Works */}
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-lg font-bold text-gold-light uppercase tracking-widest">
              {isEn ? 'Nominated Work' : 'Œuvre nominée'}
            </h2>
            {nominee.film_title ? (
              <div className="bg-dark-surface border border-border-color rounded-2xl p-5 flex items-center gap-4 hover:border-gold-primary/30 transition-all duration-300">
                <div className="p-3.5 rounded-xl bg-gold-primary/10 text-gold-light">
                  <Film size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ivory">
                    {nominee.film_slug ? (
                      <Link href={`/${locale}/films/${nominee.film_slug}`} className="hover:text-gold-light transition-colors">
                        {nominee.film_title}
                      </Link>
                    ) : (
                      nominee.film_title
                    )}
                  </h3>
                  <span className="text-[10px] text-gray-text uppercase tracking-widest mt-0.5 block">
                    {isEn ? '11th Sotigui Awards Competition' : 'Compétition 11ème Édition'}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-text italic">
                {isEn ? 'No direct work associated.' : 'Aucune œuvre directement associée.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
