'use client'

import React, { useState, useMemo } from 'react'
import { Play, X, ExternalLink, Video, Search } from 'lucide-react'

interface VideoItem {
  id: string
  titleFr: string
  titleEn: string
  category: 'interviews' | 'galas' | 'behind-scenes'
  duration: string
  publishedAtFr: string
  publishedAtEn: string
  // Date timestamp for strict sorting
  timestamp: number
}

interface SotiguiTVProps {
  locale: string
}

const VIDEOS_DATA: VideoItem[] = [
  // --- 2024 ---
  {
    id: 'it1pPuGmvYk',
    titleFr: 'Lauréats SOTIGUI AWARDS 2024',
    titleEn: 'Winners SOTIGUI AWARDS 2024',
    category: 'galas',
    duration: '22:15',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'BTmp30WzZPs',
    titleFr: 'SOTIGUI AWARDS 2024 - Valérie KABORE',
    titleEn: 'SOTIGUI AWARDS 2024 - Valérie KABORE',
    category: 'interviews',
    duration: '02:40',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'ntwFNRocy5I',
    titleFr: 'SOTIGUI AWARDS 2024 - Osita IHEME',
    titleEn: 'SOTIGUI AWARDS 2024 - Osita IHEME',
    category: 'interviews',
    duration: '03:12',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'cxb-CKTQzgA',
    titleFr: 'SOTIGUI AWARDS 2024 - Rihanata ZONGO',
    titleEn: 'SOTIGUI AWARDS 2024 - Rihanata ZONGO',
    category: 'interviews',
    duration: '02:18',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: '4Sxw1YtzfmI',
    titleFr: 'SOTIGUI AWARDS 2024 - Fousseni MAIGA',
    titleEn: 'SOTIGUI AWARDS 2024 - Fousseni MAIGA',
    category: 'interviews',
    duration: '01:55',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'XmHFclMOx3Y',
    titleFr: 'SOTIGUI AWARDS 2024 - OMEGA DAVID',
    titleEn: 'SOTIGUI AWARDS 2024 - OMEGA DAVID',
    category: 'interviews',
    duration: '02:10',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'mpRNsSL2y2M',
    titleFr: 'SOTIGUI AWARDS 2024 - Noraogo SAWADOGO',
    titleEn: 'SOTIGUI AWARDS 2024 - Noraogo SAWADOGO',
    category: 'interviews',
    duration: '03:05',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'P9ol6SxeCBQ',
    titleFr: 'SOTIGUI AWARDS 2024 - Moise TIEMTORÉ',
    titleEn: 'SOTIGUI AWARDS 2024 - Moise TIEMTORÉ',
    category: 'interviews',
    duration: '02:30',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: '0kmonHNeD9A',
    titleFr: 'SOTIGUI AWARDS 2024 - Julienne TRAVENTHAL',
    titleEn: 'SOTIGUI AWARDS 2024 - Julienne TRAVENTHAL',
    category: 'interviews',
    duration: '02:08',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'DxVSJV8D8U4',
    titleFr: 'SOTIGUI AWARDS 2024 - Alejandro COOPER',
    titleEn: 'SOTIGUI AWARDS 2024 - Alejandro COOPER',
    category: 'interviews',
    duration: '02:45',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: '6jABReXJTvs',
    titleFr: 'SOTIGUI AWARDS 2024 - Edinam ATATSI',
    titleEn: 'SOTIGUI AWARDS 2024 - Edinam ATATSI',
    category: 'interviews',
    duration: '03:00',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: '2m30p3CRG8Q',
    titleFr: 'SOTIGUI AWARDS 2024 - Ingrid SANOU',
    titleEn: 'SOTIGUI AWARDS 2024 - Ingrid SANOU',
    category: 'interviews',
    duration: '02:15',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'vj-SONnmDr4',
    titleFr: 'SOTIGUI AWARDS 2024 - Fatoumata COULIBALY',
    titleEn: 'SOTIGUI AWARDS 2024 - Fatoumata COULIBALY',
    category: 'interviews',
    duration: '03:35',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  // --- 2023 ---
  {
    id: 'MCmCd74Swdo',
    titleFr: 'Remise du trophée de Chinedu Ikedieze',
    titleEn: 'Presentation of the trophy to Chinedu Ikedieze',
    category: 'galas',
    duration: '04:15',
    publishedAtFr: '16 novembre 2023',
    publishedAtEn: 'November 16, 2023',
    timestamp: 20231116
  },
  {
    id: '6aH6d1kKcVg',
    titleFr: 'SOTIGUI AWARDS 2023 - GUEST STAR - CHINEDU IKEDIEZE MFR',
    titleEn: 'SOTIGUI AWARDS 2023 - GUEST STAR - CHINEDU IKEDIEZE MFR',
    category: 'interviews',
    duration: '06:42',
    publishedAtFr: '15 novembre 2023',
    publishedAtEn: 'November 15, 2023',
    timestamp: 20231115
  },
  {
    id: '4V-bmyoUB-o',
    titleFr: 'Chinedu Ikedieze - Portrait & Entretien',
    titleEn: 'Chinedu Ikedieze - Portrait & Interview',
    category: 'interviews',
    duration: '05:12',
    publishedAtFr: '15 novembre 2023',
    publishedAtEn: 'November 15, 2023',
    timestamp: 20231115
  },
  {
    id: 'V0HxQzTIBOc',
    titleFr: 'Vidéo Teaser SOTIGUI AWARDS 2023',
    titleEn: 'Teaser Video SOTIGUI AWARDS 2023',
    category: 'galas',
    duration: '02:05',
    publishedAtFr: '29 juillet 2023',
    publishedAtEn: 'July 29, 2023',
    timestamp: 20230729
  },
  {
    id: 'z9ppgA0Z-LE',
    titleFr: 'Ali Ponré sur le 360',
    titleEn: 'Ali Ponré on the 360 show',
    category: 'interviews',
    duration: '08:45',
    publishedAtFr: '24 juillet 2023',
    publishedAtEn: 'July 24, 2023',
    timestamp: 20230724
  },
  {
    id: 'ot_7j75TD7U',
    titleFr: 'Maïmouna Koné dite Maï la bombe sur le 360',
    titleEn: 'Maïmouna Koné alias Maï la bombe on the 360 show',
    category: 'interviews',
    duration: '10:30',
    publishedAtFr: '24 juillet 2023',
    publishedAtEn: 'July 24, 2023',
    timestamp: 20230724
  },
  {
    id: 'U2bxeL4Sgio',
    titleFr: 'Maimouna KONÉ dite ma sur le 360',
    titleEn: 'Maimouna KONÉ on the 360 show',
    category: 'interviews',
    duration: '09:20',
    publishedAtFr: '24 juillet 2023',
    publishedAtEn: 'July 24, 2023',
    timestamp: 20230724
  },
  // --- 2022 ---
  {
    id: 'TpyylkRpuW8',
    titleFr: 'SOIREE VIP SOTIGUI AWARDS : les acteurs apprécient l\'initiative de Canal+ Burkina',
    titleEn: 'VIP NIGHT SOTIGUI AWARDS: actors appreciate the initiative of Canal+ Burkina',
    category: 'galas',
    duration: '06:10',
    publishedAtFr: '17 novembre 2022',
    publishedAtEn: 'November 17, 2022',
    timestamp: 20221117
  },
  // --- 2021 ---
  {
    id: 'hEjPw5koYxw',
    titleFr: 'Académie des SOTIGUI - Projet Amazone',
    titleEn: 'Academy of SOTIGUI - Amazon Project',
    category: 'behind-scenes',
    duration: '11:45',
    publishedAtFr: '14 mai 2021',
    publishedAtEn: 'May 14, 2021',
    timestamp: 20210514
  },
  {
    id: 'nWRDXryS0Ow',
    titleFr: 'Académie des SOTIGUI - Projet Amazone - Bon',
    titleEn: 'Academy of SOTIGUI - Amazon Project - Best',
    category: 'behind-scenes',
    duration: '08:15',
    publishedAtFr: '14 mai 2021',
    publishedAtEn: 'May 14, 2021',
    timestamp: 20210514
  },
  // --- 2019 ---
  {
    id: 'CR91FsUQRC0',
    titleFr: 'Temps forts SOTIGUI AWARDS 2019',
    titleEn: 'Highlights SOTIGUI AWARDS 2019',
    category: 'galas',
    duration: '05:40',
    publishedAtFr: '30 novembre 2019',
    publishedAtEn: 'November 30, 2019',
    timestamp: 20191130
  },
  {
    id: 'e5KZeAoSBjk',
    titleFr: 'Teaser SOTIGUI AWARDS 2019',
    titleEn: 'Teaser SOTIGUI AWARDS 2019',
    category: 'galas',
    duration: '01:30',
    publishedAtFr: '30 juillet 2019',
    publishedAtEn: 'July 30, 2019',
    timestamp: 20190730
  },
  // --- 2018 ---
  {
    id: 'HDI-ixdeC20',
    titleFr: 'HOMMAGE POSTHUME',
    titleEn: 'POSTHUMOUS TRIBUTE',
    category: 'behind-scenes',
    duration: '04:45',
    publishedAtFr: '20 novembre 2018',
    publishedAtEn: 'November 20, 2018',
    timestamp: 20181120
  },
  {
    id: 'z_EDhmB_kCQ',
    titleFr: 'Sotigui Awards 2018 Black Panthers',
    titleEn: 'Sotigui Awards 2018 Black Panthers',
    category: 'galas',
    duration: '03:15',
    publishedAtFr: '18 novembre 2018',
    publishedAtEn: 'November 18, 2018',
    timestamp: 20181118
  },
  {
    id: 'ELCjqKjvSZY',
    titleFr: 'Temps forts SOTIGUI AWARDS 2018',
    titleEn: 'Highlights SOTIGUI AWARDS 2018',
    category: 'galas',
    duration: '04:12',
    publishedAtFr: '18 novembre 2018',
    publishedAtEn: 'November 18, 2018',
    timestamp: 20181118
  },
  {
    id: 'EbbvJs0_SGA',
    titleFr: 'Après les César, les Oscar, les Sotigui du cinéma africain',
    titleEn: 'After the Césars and Oscars, the Sotiguis of African cinema',
    category: 'galas',
    duration: '03:22',
    publishedAtFr: '23 mai 2018',
    publishedAtEn: 'May 23, 2018',
    timestamp: 20180523
  },
  // --- 2017 ---
  {
    id: 'i21R1j4phlY',
    titleFr: 'TEASER LES SOTIGUI AWARDS "C\'est l\'Afrique qui gagne"',
    titleEn: 'TEASER THE SOTIGUI AWARDS "Africa Wins"',
    category: 'galas',
    duration: '01:50',
    publishedAtFr: '15 octobre 2017',
    publishedAtEn: 'October 15, 2017',
    timestamp: 20171015
  },
  {
    id: 'TIy0gu4iwnc',
    titleFr: 'Vote du public : Les Nominés Burkinabé SOTIGUI AWARDS 2017',
    titleEn: 'Public Vote: Burkinabe Nominees SOTIGUI AWARDS 2017',
    category: 'behind-scenes',
    duration: '03:50',
    publishedAtFr: '12 octobre 2017',
    publishedAtEn: 'October 12, 2017',
    timestamp: 20171012
  },
  {
    id: '4bL3DYb6wg4',
    titleFr: 'NOMINES SOTIGUI AWARDS 2017',
    titleEn: 'NOMINEES SOTIGUI AWARDS 2017',
    category: 'galas',
    duration: '05:08',
    publishedAtFr: '10 octobre 2017',
    publishedAtEn: 'October 10, 2017',
    timestamp: 20171010
  },
  // --- 2016 ---
  {
    id: 'D0KUlywKHtY',
    titleFr: 'SPOT LA NUIT DES SOTIGUI 2016 - SALLE DES BANQUETS DE OUAGA 2000',
    titleEn: 'SPOT THE NIGHT OF SOTIGUI 2016 - OUAGA 2000 BANQUET HALL',
    category: 'galas',
    duration: '00:45',
    publishedAtFr: '10 mai 2016',
    publishedAtEn: 'May 10, 2016',
    timestamp: 20160510
  }
]

export function SotiguiTV({ locale }: SotiguiTVProps) {
  const isEn = locale === 'en'
  const [activeCategory, setActiveCategory] = useState<'all' | 'interviews' | 'galas' | 'behind-scenes'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  // Filtered and strictly sorted (newest to oldest) videos list
  const filteredVideos = useMemo(() => {
    return VIDEOS_DATA.filter((video) => {
      const matchesCategory = activeCategory === 'all' || video.category === activeCategory
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        video.titleFr.toLowerCase().includes(query) ||
        video.titleEn.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    }).sort((a, b) => b.timestamp - a.timestamp) // Descending sort (newest first)
  }, [activeCategory, searchQuery])

  // Spotlight video is the first item matching current filters
  const spotlightVideo = filteredVideos[0]
  const listVideos = filteredVideos.slice(1)

  return (
    <section className="flex flex-col gap-10">
      {/* Header with Search and Navigation Category Tabs */}
      <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-end gap-6 border-b border-border-color pb-6">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ivory tracking-tight mb-2">
            Sotigui <span className="gold-text-gradient">TV</span>
          </h2>
          <p className="text-xs text-gold-light uppercase tracking-widest font-semibold">
            {isEn ? 'Official YouTube Channel Videos (Newest First)' : 'Toutes les vidéos du plus récent au plus ancien'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          {/* Search bar */}
          <div className="relative flex-grow sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-text" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? 'Search videos...' : 'Rechercher une vidéo...'}
              className="w-full bg-dark-surface/50 border border-border-color/40 rounded-full py-2 pl-10 pr-4 text-xs text-ivory placeholder-gray-text focus:outline-none focus:border-gold-primary/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-text hover:text-ivory"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-gold-primary text-black font-bold'
                  : 'text-gray-text hover:text-ivory hover:bg-dark-surface/50 border border-border-color/30'
              }`}
            >
              {isEn ? 'All' : 'Tout'}
            </button>
            <button
              onClick={() => setActiveCategory('interviews')}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === 'interviews'
                  ? 'bg-gold-primary text-black font-bold'
                  : 'text-gray-text hover:text-ivory hover:bg-dark-surface/50 border border-border-color/30'
              }`}
            >
              🎙️ {isEn ? 'Interviews' : 'Interviews'}
            </button>
            <button
              onClick={() => setActiveCategory('galas')}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === 'galas'
                  ? 'bg-gold-primary text-black font-bold'
                  : 'text-gray-text hover:text-ivory hover:bg-dark-surface/50 border border-border-color/30'
              }`}
            >
              🏆 {isEn ? 'Galas & Ceremonies' : 'Galas & Cérémonies'}
            </button>
            <button
              onClick={() => setActiveCategory('behind-scenes')}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === 'behind-scenes'
                  ? 'bg-gold-primary text-black font-bold'
                  : 'text-gray-text hover:text-ivory hover:bg-dark-surface/50 border border-border-color/30'
              }`}
            >
              🎬 {isEn ? 'Coulisses' : 'Coulisses'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Left column: Spotlight Video Player Card */}
        {spotlightVideo ? (
          <div className="lg:col-span-2 flex flex-col bg-dark-surface border border-border-color/60 rounded-3xl overflow-hidden shadow-xl group">
            <div
              onClick={() => setSelectedVideo(spotlightVideo)}
              className="relative aspect-video w-full overflow-hidden bg-black cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${spotlightVideo.id}/hqdefault.jpg`}
                alt={isEn ? spotlightVideo.titleEn : spotlightVideo.titleFr}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold-primary text-black flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <Play size={28} className="fill-black ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-xs font-mono px-2 py-1 rounded text-ivory">
                {spotlightVideo.duration}
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-gold-light uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Video size={12} />
                  {isEn ? 'Spotlight Video' : 'À la une'}
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-ivory tracking-tight group-hover:text-gold-light transition-colors">
                  {isEn ? spotlightVideo.titleEn : spotlightVideo.titleFr}
                </h3>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border-color/30">
                <span className="text-xs text-gray-text">
                  {isEn ? spotlightVideo.publishedAtEn : spotlightVideo.publishedAtFr}
                </span>
                <a
                  href={`https://www.youtube.com/watch?v=${spotlightVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gold-light hover:text-gold-primary flex items-center gap-1.5 uppercase tracking-wider font-bold transition-colors"
                >
                  <span>{isEn ? 'Watch on YouTube' : 'Voir sur YouTube'}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 flex flex-col items-center justify-center text-center p-12 border border-dashed border-border-color/40 rounded-3xl min-h-[400px]">
            <p className="text-sm text-gray-text mb-2">
              {isEn ? 'No video matches your search criteria.' : 'Aucune vidéo ne correspond à votre recherche.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="text-xs text-gold-primary hover:underline"
            >
              {isEn ? 'Reset filters' : 'Réinitialiser les filtres'}
            </button>
          </div>
        )}

        {/* Right column: List of remaining category videos */}
        <div className="lg:col-span-1 flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {listVideos.length > 0 ? (
            listVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="bg-dark-surface/50 border border-border-color/40 rounded-2xl p-4 flex gap-4 cursor-pointer hover:border-gold-primary/30 hover:bg-dark-surface transition-all duration-300 group"
              >
                <div className="relative aspect-video w-24 shrink-0 rounded-lg overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={isEn ? video.titleEn : video.titleFr}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gold-primary/95 text-black flex items-center justify-center shadow-lg">
                      <Play size={12} className="fill-black ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between py-1 flex-grow">
                  <h4 className="text-xs font-bold text-ivory leading-snug line-clamp-2 group-hover:text-gold-light transition-colors font-sans">
                    {isEn ? video.titleEn : video.titleFr}
                  </h4>
                  <div className="flex justify-between items-center text-[10px] text-gray-text gap-2 mt-2">
                    <span>{video.duration}</span>
                    <span>•</span>
                    <span className="truncate">
                      {isEn ? video.publishedAtEn : video.publishedAtFr}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            spotlightVideo && (
              <div className="h-full flex items-center justify-center text-center p-8 border border-dashed border-border-color/40 rounded-3xl">
                <p className="text-xs text-gray-text">
                  {isEn ? 'No other videos found.' : 'Aucune autre vidéo trouvée.'}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Lightbox / Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-dark-surface border border-border-color rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-ivory hover:text-gold-light transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                title={isEn ? selectedVideo.titleEn : selectedVideo.titleFr}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-6 flex flex-col gap-2">
              <span className="text-[10px] text-gold-light uppercase tracking-widest font-bold">
                {selectedVideo.category === 'interviews'
                  ? '🎙️ Interview / Invité'
                  : selectedVideo.category === 'galas'
                  ? '🏆 Gala & Cérémonie'
                  : '🎬 Coulisses & Projet'}
              </span>
              <h3 className="font-serif text-lg md:text-xl font-bold text-ivory">
                {isEn ? selectedVideo.titleEn : selectedVideo.titleFr}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
