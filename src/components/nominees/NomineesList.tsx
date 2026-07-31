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

  const isEn = locale === 'en'

  // Extract unique categories and countries for filters
  const categories = ['all', ...Array.from(new Set(initialNominees.map(n => n.category_slug)))]
  const countries = ['all', ...Array.from(new Set(initialNominees.map(n => n.country_id)))]

  // Filter logic
  const filteredNominees = initialNominees.filter((nominee) => {
    const displayName = nominee.stage_name || `${nominee.first_name} ${nominee.last_name}`
    const matchesSearch = displayName.toLowerCase().includes(search.toLowerCase()) || 
                          (nominee.film_title && nominee.film_title.toLowerCase().includes(search.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || nominee.category_slug === selectedCategory
    const matchesCountry = selectedCountry === 'all' || nominee.country_id === selectedCountry

    return matchesSearch && matchesCategory && matchesCountry
  })

  const getCategoryLabel = (slug: string) => {
    if (slug === 'all') return isEn ? 'All Categories' : 'Toutes les catégories'
    const found = initialNominees.find(n => n.category_slug === slug)
    return found ? found.category_name : slug
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Filters Bar */}
      <div className="bg-dark-surface border border-border-color rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
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
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full md:w-auto items-center justify-end">
          <div className="flex items-center gap-2 text-xs text-gray-text uppercase font-bold tracking-wider shrink-0">
            <SlidersHorizontal size={14} />
            <span>{isEn ? 'Filters' : 'Filtres'} :</span>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-dark-bg border border-border-color focus:border-gold-primary text-xs font-semibold py-2.5 px-4 rounded-full text-ivory focus:outline-none cursor-pointer"
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
