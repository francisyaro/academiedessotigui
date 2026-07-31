'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

interface HighlightItem {
  id: number
  image: string
  title_fr: string
  title_en: string
  desc_fr: string
  desc_en: string
}

interface HighlightsCarouselProps {
  locale: string
}

export function HighlightsCarousel({ locale }: HighlightsCarouselProps) {
  const isEn = locale === 'en'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const highlights: HighlightItem[] = [
    {
      id: 1,
      image: '/images/highlight_1.jpg',
      title_fr: 'Sotigui d\'Or & Célébration',
      title_en: 'Sotigui d\'Or & Celebration',
      desc_fr: 'Le couronnement de la 10ème édition sous une pluie de confettis dorés.',
      desc_en: 'The crowning moment of the 10th edition under a shower of golden confetti.'
    },
    {
      id: 2,
      image: '/images/highlight_2.jpg',
      title_fr: 'Le Discours du Triomphe',
      title_en: 'Triumphant Acceptance Speech',
      desc_fr: 'L\'émotion pure et la fierté d\'exprimer sa gratitude envers l\'Académie.',
      desc_en: 'Pure emotion and pride in expressing gratitude towards the Academy.'
    },
    {
      id: 3,
      image: '/images/highlight_3.jpg',
      title_fr: 'Prestige sur le Tapis Rouge',
      title_en: 'Red Carpet Glamour',
      desc_fr: 'L\'éclat de la haute couture africaine et de l\'art sous les projecteurs.',
      desc_en: 'The radiance of African haute couture and art under the spotlights.'
    },
    {
      id: 4,
      image: '/images/highlight_4.jpg',
      title_fr: 'Le Sourire de la Victoire',
      title_en: 'The Smile of Victory',
      desc_fr: 'Une célébration radieuse du septième art africain sur scène.',
      desc_en: 'A radiant celebration of African cinematic arts on stage.'
    },
    {
      id: 5,
      image: '/images/highlight_5.jpg',
      title_fr: 'Hommage aux Légendes',
      title_en: 'Honorary Tribute to Legends',
      desc_fr: 'La consécration de toute une carrière dédiée au rayonnement du cinéma africain.',
      desc_en: 'The consecration of an entire career dedicated to the growth of African cinema.'
    },
    {
      id: 6,
      image: '/images/highlight_6.jpg',
      title_fr: 'Surprise & Émotion',
      title_en: 'Surprise & Emotion',
      desc_fr: 'L\'annonce d\'une victoire inattendue célébrée avec ferveur par le public.',
      desc_en: 'The announcement of an unexpected victory celebrated with fervor by the audience.'
    },
    {
      id: 7,
      image: '/images/highlight_7.jpg',
      title_fr: 'Sotigui d\'Honneur',
      title_en: 'Honorary Sotigui',
      desc_fr: 'Un hommage mérité décerné à une grande figure pour sa contribution au septième art.',
      desc_en: 'A well-deserved tribute awarded to a great figure for their contribution to the seventh art.'
    },
    {
      id: 8,
      image: '/images/highlight_8.jpg',
      title_fr: 'Génération Future',
      title_en: 'Future Generation',
      desc_fr: 'Les jeunes talents africains à l\'honneur sur la scène des Sotigui Awards.',
      desc_en: 'Young African talents in the spotlight on the Sotigui Awards stage.'
    },
    {
      id: 9,
      image: '/images/highlight_9.jpg',
      title_fr: 'Le Discours d\'un Espoir',
      title_en: 'The Speech of a Rising Star',
      desc_fr: 'La voix de la jeunesse montante s\'exprimant pour inspirer ses pairs.',
      desc_en: 'The voice of rising youth speaking to inspire their peers.'
    },
    {
      id: 10,
      image: '/images/highlight_10.jpg',
      title_fr: 'La Remise de Trophée',
      title_en: 'The Trophy Presentation',
      desc_fr: 'Un moment solennel scellant le mérite et le talent exceptionnel.',
      desc_en: 'A solemn moment sealing merit and exceptional talent.'
    }
  ]

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    if (isPlaying) {
      timeoutRef.current = setTimeout(
        () =>
          setCurrentIndex((prevIndex) =>
            prevIndex === highlights.length - 1 ? 0 : prevIndex + 1
          ),
        6000
      )
    }
    return () => {
      resetTimeout()
    }
  }, [currentIndex, isPlaying, highlights.length])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? highlights.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === highlights.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-border-color/60 bg-black group shadow-2xl">
      {/* Slides wrapper */}
      <div className="w-full h-full relative">
        {highlights.map((slide, index) => {
          const isActive = index === currentIndex
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image}
                alt={isEn ? slide.title_en : slide.title_fr}
                className="w-full h-full object-cover transition-transform duration-[8000ms] ease-out scale-105 group-hover:scale-100"
              />
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Text Caption inside the active slide */}
              {isActive && (
                <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 z-20 flex flex-col gap-2 max-w-xl animate-fade-in">
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold-light">
                    {isEn ? '10th Edition Highlights' : 'Moments Forts - 10ème Édition'}
                  </span>
                  <h3 className="font-serif text-xl md:text-3xl font-bold text-ivory tracking-tight leading-tight">
                    {isEn ? slide.title_en : slide.title_fr}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-text leading-relaxed">
                    {isEn ? slide.desc_en : slide.desc_fr}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-black/60 hover:bg-gold-primary text-ivory hover:text-black border border-border-color backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-black/60 hover:bg-gold-primary text-ivory hover:text-black border border-border-color backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Control overlay top-right */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-black/60 hover:bg-gold-primary/20 text-ivory border border-border-color backdrop-blur-sm transition-colors duration-300"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>

      {/* Slide Indicators bottom-right */}
      <div className="absolute bottom-4 right-8 md:bottom-6 md:right-12 z-30 flex gap-2">
        {highlights.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex ? 'w-6 bg-gold-primary' : 'w-1.5 bg-ivory/30 hover:bg-ivory/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
