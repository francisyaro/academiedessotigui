import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/services'
import { ArrowLeft, Calendar, Newspaper } from 'lucide-react'

interface NewsDetailProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { locale, slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const isEn = locale === 'en'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-10 w-full">
      {/* Back button */}
      <div>
        <Link
          href={`/${locale}/actualites`}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-text hover:text-gold-light transition-colors duration-300"
        >
          <ArrowLeft size={16} />
          <span>{isEn ? 'Back to news' : 'Retour aux actualités'}</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="flex flex-col gap-4">
        <span className="text-xs text-gold-light font-bold uppercase tracking-widest font-serif flex items-center gap-1.5 self-start bg-gold-primary/10 border border-gold-primary/20 px-3 py-1 rounded-full">
          <Newspaper size={12} />
          {article.article_type}
        </span>
        
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ivory tracking-tight leading-tight">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-2 text-xs text-gray-text font-semibold uppercase tracking-wider">
          <Calendar size={14} className="text-gold-light" />
          <span>{isEn ? 'Published on' : 'Publié le'} {article.published_at}</span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative aspect-video rounded-3xl overflow-hidden border border-border-color bg-black shadow-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.cover_path}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body Content */}
      <article className="prose prose-invert prose-gold max-w-none text-sm md:text-base text-gray-text leading-relaxed whitespace-pre-line bg-dark-surface border border-border-color rounded-3xl p-8 md:p-12 shadow-xl">
        {article.content}
      </article>
    </div>
  )
}
