import React from 'react'
import Link from 'next/link'
import { getArticles } from '@/lib/services'
import { Newspaper } from 'lucide-react'

interface NewsPageProps {
  params: Promise<{ locale: string }>
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params
  const articles = await getArticles()

  const isEn = locale === 'en'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-10 w-full">
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-ivory tracking-tight">
          {isEn ? 'Academy News' : 'Actualités de l\'Académie'}
        </h1>
        <p className="text-xs text-gold-light uppercase tracking-widest font-semibold font-serif">
          {isEn ? 'Announcements, Press Releases & Interviews' : 'Communiqués, Annonces & Interviews'}
        </p>
        <div className="w-16 h-0.5 bg-gold-primary mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <div
            key={article.slug}
            className="group bg-dark-surface border border-border-color rounded-3xl overflow-hidden flex flex-col shadow-xl transition-all duration-300 hover:border-gold-primary/30"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-black shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.cover_path}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />
            </div>
            
            <div className="p-6 flex flex-col justify-between flex-grow gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-gold-light uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Newspaper size={12} />
                  {article.article_type}
                </span>
                <h3 className="text-lg font-bold text-ivory group-hover:text-gold-light transition-colors duration-300 line-clamp-2">
                  <Link href={`/${locale}/actualites/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="text-xs text-gray-text leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
              
              <div className="pt-4 border-t border-border-color/30 flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
                <span className="text-gray-text">{article.published_at}</span>
                <Link
                  href={`/${locale}/actualites/${article.slug}`}
                  className="text-gold-light hover:text-gold-primary transition-colors"
                >
                  {isEn ? 'Read More →' : 'Lire la suite →'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
