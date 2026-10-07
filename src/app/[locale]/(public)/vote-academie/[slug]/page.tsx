import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAcademyCategoryBySlug } from '@/lib/academyVotingData'
import { AcademyAuthGate } from '@/components/voting/AcademyAuthGate'
import { VideoExtractCard } from '@/components/voting/VideoExtractCard'
import { ArrowLeft, Award, Film, ExternalLink, Sparkles } from 'lucide-react'

interface CategoryVotePageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function CategoryVotePage({ params }: CategoryVotePageProps) {
  const { locale, slug } = await params
  const isEn = locale === 'en'

  const category = getAcademyCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  // Ensure iframe src ends with embedded parameter for clean view
  const formEmbedUrl = category.googleFormUrl.includes('embedded=true')
    ? category.googleFormUrl
    : `${category.googleFormUrl}?embedded=true`

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-10 w-full">
      {/* Auth Gate Verification */}
      <AcademyAuthGate locale={locale}>
        <div className="flex flex-col gap-8 w-full animate-fade-in">
          {/* Back Navigation Button */}
          <div>
            <Link
              href={`/${locale}/vote-academie`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-surface border border-border-color hover:border-gold-primary text-gray-text hover:text-ivory text-xs font-bold uppercase tracking-wider transition-all duration-300 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-gold-primary" />
              <span>{isEn ? 'Back to All Categories' : 'Retour aux 15 catégories de vote'}</span>
            </Link>
          </div>

          {/* Category Title Header */}
          <div className="bg-dark-surface border border-gold-primary/30 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="flex flex-col gap-2 z-10">
              <span className="inline-flex items-center gap-2 text-gold-light text-xs font-mono uppercase tracking-widest font-semibold">
                <Award size={14} className="text-gold-primary" />
                <span>{isEn ? 'Academy Member Vote 2026' : 'Vote Officiel de l\'Académie 2026'}</span>
              </span>
              <h1 className="font-serif text-2xl md:text-4xl font-bold text-ivory leading-tight">
                {isEn ? category.titleEn : category.titleFr}
              </h1>
            </div>

            <a
              href={category.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-gold-primary hover:bg-gold-light text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shrink-0 shadow-lg cursor-pointer"
            >
              <span>{isEn ? 'Open Form Fullscreen' : 'Ouvrir le formulaire plein écran'}</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Embedded Google Form Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-ivory font-serif text-lg font-bold">
              <Sparkles size={18} className="text-gold-primary" />
              <h2>{isEn ? 'Official Voting Form' : 'Formulaire de Vote Officiel'}</h2>
            </div>

            <div className="w-full h-[800px] bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-primary/40 relative">
              <iframe
                src={formEmbedUrl}
                title={category.titleFr}
                className="w-full h-full border-0"
              >
                {isEn ? 'Loading form...' : 'Chargement du formulaire...'}
              </iframe>
            </div>
          </div>

          {/* Nominee Video Extracts Section (Excluded for Sotigui d'Or as extracts are available in individual categories) */}
          {category.id !== 'cat_dor' && category.nominees.length > 0 && (
            <div className="flex flex-col gap-6 mt-6 border-t border-border-color/60 pt-10">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-ivory font-serif text-xl font-bold">
                  <Film size={22} className="text-gold-primary" />
                  <h2>{isEn ? 'Nominees Film Video Extracts' : 'Extraits Vidéo des Acteurs Nominés'}</h2>
                </div>
                <p className="text-xs text-gray-text">
                  {isEn
                    ? 'Watch the performance excerpts for each nominated actor below to inform your decision.'
                    : 'Consultez les extraits d\'interprétation de chaque acteur nominé ci-dessous pour guider votre choix.'}
                </p>
              </div>

              {/* Grid of 3 VideoExtractCards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {category.nominees.map((nominee) => (
                  <VideoExtractCard key={nominee.id} nominee={nominee} locale={locale} />
                ))}
              </div>
            </div>
          )}
        </div>
      </AcademyAuthGate>
    </div>
  )
}
