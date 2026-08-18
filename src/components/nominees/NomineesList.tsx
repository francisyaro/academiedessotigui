'use client'

import React, { useState } from 'react'
import { NomineeCard } from '@/components/ui/NomineeCard'
import { Search, SlidersHorizontal } from 'lucide-react'

interface NomineesListProps {
  initialNominees: any[]
  locale: string
}

export function NomineesList({ initialNominees, locale }: NomineesListProps) {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedYear, setSelectedYear] = useState('2026') // Default to 2026 (11th Edition)

  const isEn = locale === 'en'

  // Extract unique categories and countries dynamically based on the selected year to avoid empty options
  const nomineesForYear = initialNominees.filter(n => selectedYear === 'all' || String(n.year) === selectedYear)
  const categories = ['all', ...Array.from(new Set(nomineesForYear.map(n => n.category_slug)))]
  const countries = ['all', ...Array.from(new Set(nomineesForYear.map(n => n.country_id)))]

  // Filter logic
  const filteredNominees = initialNominees.filter((nominee) => {
    const displayName = nominee.stage_name || `${nominee.first_name} ${nominee.last_name}`
    const matchesSearch = displayName.toLowerCase().includes(search.toLowerCase()) || 
                          (nominee.film_title && nominee.film_title.toLowerCase().includes(search.toLowerCase()))
    
    const matchesYear = selectedYear === 'all' || String(nominee.year) === selectedYear
    const matchesCategory = selectedCategory === 'all' || nominee.category_slug === selectedCategory
    const matchesCountry = selectedCountry === 'all' || nominee.country_id === selectedCountry

    return matchesSearch && matchesYear && matchesCategory && matchesCountry
  })

  const getCategoryLabel = (slug: string) => {
    if (slug === 'all') return isEn ? 'All Categories' : 'Toutes les catégories'
    const found = initialNominees.find(n => n.category_slug === slug)
    return found ? found.category_name : slug
  }

  const getHeaderInfo = () => {
    if (selectedYear === '2026') {
      return {
        title: isEn ? 'The Nominees 2026' : 'Les Nominés 2026',
        subtitle: isEn ? '11th Edition of Sotigui Awards' : '11ème Édition des Sotigui Awards'
      }
    } else if (selectedYear === '2025') {
      return {
        title: isEn ? 'The Nominees 2025' : 'Les Nominés 2025',
        subtitle: isEn ? '10th Edition of Sotigui Awards' : '10ème Édition des Sotigui Awards'
      }
    } else if (selectedYear === '2022') {
      return {
        title: isEn ? 'The Nominees 2022' : 'Les Nominés 2022',
        subtitle: isEn ? '7th Edition of Sotigui Awards' : '7ème Édition des Sotigui Awards'
      }
    } else {
      return {
        title: isEn ? 'All Nominees' : 'Tous les Nominés',
        subtitle: isEn ? 'All Editions of Sotigui Awards' : 'Toutes les éditions des Sotigui Awards'
      }
    }
  }

  const headerInfo = getHeaderInfo()

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Dynamic Header */}
      <div className="text-center flex flex-col gap-2 mb-4 animate-fade-in">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-ivory tracking-tight">
          {headerInfo.title}
        </h1>
        <p className="text-xs text-gold-light uppercase tracking-widest font-semibold font-serif">
          {headerInfo.subtitle}
        </p>
        <div className="w-16 h-0.5 bg-gold-primary mx-auto mt-2" />
      </div>

      {/* Filters Bar */}
      <div className="bg-dark-surface border border-border-color rounded-2xl p-6 flex flex-col lg:flex-row gap-4 items-center justify-between shadow-xl">
        {/* Search */}
        <div className="relative w-full lg:w-1/3">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-text" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isEn ? 'Search nominee or film...' : 'Rechercher un nominé ou un film...'}
            className="w-full bg-dark-bg border border-border-color focus:border-gold-primary rounded-full pl-12 pr-6 py-2.5 text-xs text-ivory focus:outline-none transition-all duration-300"
          />
        </div>

        {/* Filters selectors */}
        <div className="flex flex-wrap lg:flex-nowrap gap-3 w-full lg:w-auto items-center justify-end">
          <div className="flex items-center gap-2 text-xs text-gray-text uppercase font-bold tracking-wider shrink-0 mr-1">
            <SlidersHorizontal size={14} />
            <span>{isEn ? 'Filters' : 'Filtres'} :</span>
          </div>

          {/* Edition Filter */}
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value)
              setSelectedCategory('all')
              setSelectedCountry('all')
            }}
            className="bg-dark-bg border border-border-color focus:border-gold-primary text-xs font-semibold py-2.5 px-4 rounded-full text-ivory focus:outline-none cursor-pointer"
          >
            <option value="2026">{isEn ? '11th Edition (2026)' : '11ème Édition (2026)'}</option>
            <option value="2025">{isEn ? '10th Edition (2025)' : '10ème Édition (2025)'}</option>
            <option value="2022">{isEn ? '7th Edition (2022)' : '7ème Édition (2022)'}</option>
            <option value="all">{isEn ? 'All Editions' : 'Toutes les éditions'}</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-dark-bg border border-border-color focus:border-gold-primary text-xs font-semibold py-2.5 px-4 rounded-full text-ivory focus:outline-none cursor-pointer max-w-[200px] truncate"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {getCategoryLabel(cat)}
              </option>
            ))}
          </select>

          {/* Country Filter */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-dark-bg border border-border-color focus:border-gold-primary text-xs font-semibold py-2.5 px-4 rounded-full text-ivory focus:outline-none cursor-pointer"
          >
            <option value="all">{isEn ? 'All Countries' : 'Tous les pays'}</option>
            {countries.filter(c => c !== 'all').map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Results */}
      {filteredNominees.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNominees.map((nominee) => (
            <NomineeCard
              key={nominee.id}
              nominee={nominee}
              locale={locale}
              showVoteButton={nominee.is_public_vote_eligible}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-dark-surface/50 border border-border-color/60 rounded-2xl">
          <p className="text-sm text-gray-text">
            {isEn ? 'No nominees match your criteria.' : 'Aucun nominé ne correspond à vos critères.'}
          </p>
        </div>
      )}
    </div>
  )
}
