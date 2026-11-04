'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { VoteCTAButton } from '@/components/ui/VoteCTAButton'
import { ChevronLeft, ChevronRight, Calendar, MapPin, Clock, Sparkles } from 'lucide-react'

interface HeroPosterSliderProps {
  locale: string
}

const POSTER_SLIDES = [
  {
    id: 1,
    image: '/images/hero_sotigui_2026_1.jpg',
    labelFr: 'Affiche Officielle I • Glamour & Tradition',
    labelEn: 'Official Poster I • Glamour & Tradition',
  },
  {
    id: 2,
    image: '/images/hero_sotigui_2026_2.jpg',
    labelFr: 'Affiche Officielle II • Élégance Cinématographique',
    labelEn: 'Official Poster II • Cinematic Elegance',
  },
  {
    id: 3,
    image: '/images/hero_sotigui_2026_3.jpg',
    labelFr: 'Affiche Officielle III • Rayonnement Africain',
    labelEn: 'Official Poster III • African Radiance',
  },
]

export function HeroPosterSlider({ locale }: HeroPosterSliderProps) {
  const isEn = locale === 'en'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % POSTER_SLIDES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? POSTER_SLIDES.length - 1 : prev - 1))
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  return (
    <section
      className="relative min-h-[88vh] flex items-center bg-black overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Ambient Background Crossfade */}
      {POSTER_SLIDES.map((slide, idx) => (
        <div
          key={`bg-${slide.id}`}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-30 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            filter: 'blur(28px) saturate(1.2)',
          }}
        />
      ))}

      {/* Luxury Vignette & Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/75 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/60 to-transparent" />

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Editorial & Event Info (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-gold-primary/15 border border-gold-primary/40 text-gold-light text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Sparkles size={14} className="text-gold-primary animate-pulse" />
            <span>{isEn ? '11th Edition • Official Selection' : '11ème Édition • Sélection Officielle'}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold text-ivory tracking-tight mb-4 leading-[1.05]">
            SOTIGUI AWARDS <span className="gold-text-gradient block sm:inline">2026</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-text font-sans max-w-2xl mb-8 leading-relaxed">
            {isEn
              ? 'Celebrating the excellence of actors, actresses, and cinema professionals from Africa and its Diaspora.'
              : 'Célébrer l’excellence des acteurs, actrices et professionnels des arts cinématographiques africains et de la diaspora.'}
          </p>

          {/* Key Event Details Pill Box (Matching the 3 Official Posters) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl mb-10 bg-dark-surface/80 border border-gold-primary/30 backdrop-blur-md rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-center lg:justify-start gap-3 px-2 py-1 border-b sm:border-b-0 sm:border-r border-border-color/60 pb-3 sm:pb-1 sm:pr-4">
              <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary shrink-0">
                <Calendar size={18} />
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-widest text-gray-text font-semibold">
                  {isEn ? 'Date' : 'Date'}
                </span>
                <span className="font-serif text-sm font-bold text-ivory">
                  {isEn ? 'Sat. Nov 14, 2026' : 'Sam. 14 Nov. 2026'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 px-2 py-1 border-b sm:border-b-0 sm:border-r border-border-color/60 pb-3 sm:pb-1 sm:pr-4">
              <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary shrink-0">
                <MapPin size={18} />
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-widest text-gray-text font-semibold">
                  {isEn ? 'Venue' : 'Lieu'}
                </span>
                <span className="font-serif text-sm font-bold text-ivory leading-tight block">
                  Centre Culturel du Faso
                </span>
                <span className="text-[10px] text-gold-light block">Ouaga 2000</span>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 px-2 py-1">
              <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary shrink-0">
                <Clock size={18} />
              </div>
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-widest text-gray-text font-semibold">
                  {isEn ? 'Red Carpet & Gala' : 'Cérémonie'}
                </span>
                <span className="font-serif text-base font-extrabold text-gold-light">
                  19H00 GMT
                </span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full">
            <VoteCTAButton locale={locale} variant="gold" />
            <Link href={`/${locale}/academie/presentation`}>
              <Button
                variant="outline"
                size="lg"
                className="uppercase tracking-widest text-xs px-8 border-gold-primary/40 hover:border-gold-primary text-gold-light hover:text-gold-primary backdrop-blur-sm"
              >
                {isEn ? 'Discover The Academy' : "Découvrir L'Académie"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive 3-Poster 3D Showcase Carousel (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4] flex items-center justify-center">
            {/* Ambient Gold Glow Behind Poster */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-gold-primary/25 via-gold-light/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />

            {/* Stacked/Sliding Posters */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-gold-primary/50 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-dark-surface group">
              {POSTER_SLIDES.map((slide, index) => {
                const isActive = index === currentIndex
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                      isActive
                        ? 'opacity-100 scale-100 translate-x-0 z-20'
                        : index < currentIndex
                        ? 'opacity-0 scale-95 -translate-x-8 z-10 pointer-events-none'
                        : 'opacity-0 scale-95 translate-x-8 z-10 pointer-events-none'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image}
                      alt={isEn ? slide.labelEn : slide.labelFr}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )
              })}

              {/* Left / Right Controls inside Poster Frame */}
              <button
                onClick={prevSlide}
                aria-label="Visuel précédent"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/65 hover:bg-gold-primary text-ivory hover:text-black border border-gold-primary/40 flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Visuel suivant"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/65 hover:bg-gold-primary text-ivory hover:text-black border border-gold-primary/40 flex items-center justify-center backdrop-blur-md transition-all duration-300 opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Interactive Thumbnail & Progress Indicators */}
          <div className="flex items-center gap-4 mt-6 z-20">
            {POSTER_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex
              return (
                <button
                  key={`thumb-${slide.id}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={isEn ? slide.labelEn : slide.labelFr}
                  className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border-2 ${
                    isActive
                      ? 'w-16 h-20 border-gold-primary scale-105 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'w-12 h-16 border-border-color/60 opacity-50 hover:opacity-85'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
