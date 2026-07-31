'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Laureate {
  name: string
  country: string
  title_fr: string
  title_en: string
  work: string
  image: string
}

interface LaureatesGridProps {
  laureates: Laureate[]
  locale: string
}

export function LaureatesGrid({ laureates, locale }: LaureatesGridProps) {
  const isEn = locale === 'en'
  const [visibleCount, setVisibleCount] = useState(6)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (visibleCount >= laureates.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true)
          // Simulate a premium loading latency to let skeletons pulse beautifully
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 3, laureates.length))
            setIsLoadingMore(false)
          }, 800)
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    const currentRef = observerRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [visibleCount, isLoadingMore, laureates.length])

  // Renders the visible cards
  const visibleLaureates = laureates.slice(0, visibleCount)

  // Skeleton placeholders representing the next batch of 3 cards
  const skeletonCardsCount = Math.min(3, laureates.length - visibleCount)

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleLaureates.map((laureat) => (
          <div
            key={`${laureat.name}-${laureat.title_fr}`}
            className="bg-dark-surface border border-border-color/60 hover:border-gold-primary/40 rounded-2xl p-4 flex flex-col gap-3 shadow-lg group transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={laureat.image}
                alt={laureat.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-dark-bg/85 backdrop-blur-sm text-[8px] font-bold px-2 py-0.5 rounded text-gold-light uppercase tracking-wider border border-gold-primary/20">
                {laureat.country}
              </div>
            </div>
            <div className="flex flex-col gap-1 text-center">
              <h4 className="font-serif text-sm font-bold text-ivory group-hover:text-gold-light transition-colors duration-300">
                {laureat.name}
              </h4>
              <p className="text-[10px] text-gold-light uppercase tracking-wider font-semibold leading-tight line-clamp-2 min-h-[28px] flex items-center justify-center">
                {isEn ? laureat.title_en : laureat.title_fr}
              </p>
              <p className="text-[9px] text-gray-text italic truncate">
                Dans {laureat.work}
              </p>
            </div>
          </div>
        ))}

        {/* Skeleton pulse loading placeholders */}
        {isLoadingMore &&
          Array.from({ length: skeletonCardsCount }).map((_, idx) => (
            <div
              key={`skeleton-${idx}`}
              className="bg-dark-surface border border-border-color/30 rounded-2xl p-4 flex flex-col gap-3 shadow-lg animate-pulse"
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white/5 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-gold-primary/20 border-t-gold-primary animate-spin" />
              </div>
              <div className="flex flex-col gap-2.5 items-center mt-2">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-gold-primary/10 rounded w-1/2" />
                <div className="h-2.5 bg-white/5 rounded w-2/3" />
              </div>
            </div>
          ))}
      </div>

      {/* Sentinel observer reference element for infinite loading */}
      {visibleCount < laureates.length && (
        <div
          ref={observerRef}
          className="h-10 w-full flex items-center justify-center mt-4 text-xs text-gold-light/40 tracking-widest font-mono uppercase animate-pulse"
        >
          {isEn ? 'Scroll down to discover more laureates...' : 'Faites défiler pour découvrir d\'autres lauréats...'}
        </div>
      )}
    </div>
  )
}
