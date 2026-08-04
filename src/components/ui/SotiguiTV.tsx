'use client'

import React, { useState, useMemo } from 'react'
import { Play, X, Search, Film } from 'lucide-react'

interface ShortVideoItem {
  id: string
  titleFr: string
  titleEn: string
  duration: string
  publishedAtFr: string
  publishedAtEn: string
  timestamp: number
}

interface SotiguiTVProps {
  locale: string
}

const SHORTS_DATA: ShortVideoItem[] = [
  // --- 2024 ---
  {
    id: 'BTmp30WzZPs',
    titleFr: 'SOTIGUI AWARDS 2024 - Valérie KABORE',
    titleEn: 'SOTIGUI AWARDS 2024 - Valérie KABORE',
    duration: '02:40',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'ntwFNRocy5I',
    titleFr: 'SOTIGUI AWARDS 2024 - Osita IHEME',
    titleEn: 'SOTIGUI AWARDS 2024 - Osita IHEME',
    duration: '03:12',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'cxb-CKTQzgA',
    titleFr: 'SOTIGUI AWARDS 2024 - Rihanata ZONGO',
    titleEn: 'SOTIGUI AWARDS 2024 - Rihanata ZONGO',
    duration: '02:18',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: '4Sxw1YtzfmI',
    titleFr: 'SOTIGUI AWARDS 2024 - Fousseni MAIGA',
    titleEn: 'SOTIGUI AWARDS 2024 - Fousseni MAIGA',
    duration: '01:55',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'XmHFclMOx3Y',
    titleFr: 'SOTIGUI AWARDS 2024 - OMEGA DAVID',
    titleEn: 'SOTIGUI AWARDS 2024 - OMEGA DAVID',
    duration: '02:10',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'mpRNsSL2y2M',
    titleFr: 'SOTIGUI AWARDS 2024 - Noraogo SAWADOGO',
    titleEn: 'SOTIGUI AWARDS 2024 - Noraogo SAWADOGO',
    duration: '03:05',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'P9ol6SxeCBQ',
    titleFr: 'SOTIGUI AWARDS 2024 - Moise TIEMTORÉ',
    titleEn: 'SOTIGUI AWARDS 2024 - Moise TIEMTORÉ',
    duration: '02:30',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: '0kmonHNeD9A',
    titleFr: 'SOTIGUI AWARDS 2024 - Julienne TRAVENTHAL',
    titleEn: 'SOTIGUI AWARDS 2024 - Julienne TRAVENTHAL',
    duration: '02:08',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'DxVSJV8D8U4',
    titleFr: 'SOTIGUI AWARDS 2024 - Alejandro COOPER',
    titleEn: 'SOTIGUI AWARDS 2024 - Alejandro COOPER',
    duration: '02:45',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: '6jABReXJTvs',
    titleFr: 'SOTIGUI AWARDS 2024 - Edinam ATATSI',
    titleEn: 'SOTIGUI AWARDS 2024 - Edinam ATATSI',
    duration: '03:00',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: '2m30p3CRG8Q',
    titleFr: 'SOTIGUI AWARDS 2024 - Ingrid SANOU',
    titleEn: 'SOTIGUI AWARDS 2024 - Ingrid SANOU',
    duration: '02:15',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  {
    id: 'vj-SONnmDr4',
    titleFr: 'SOTIGUI AWARDS 2024 - Fatoumata COULIBALY',
    titleEn: 'SOTIGUI AWARDS 2024 - Fatoumata COULIBALY',
    duration: '03:35',
    publishedAtFr: '16 novembre 2024',
    publishedAtEn: 'November 16, 2024',
    timestamp: 20241116
  },
  // --- 2023 ---
  {
    id: '4V-bmyoUB-o',
    titleFr: 'Chinedu Ikedieze - Portrait & Entretien',
    titleEn: 'Chinedu Ikedieze - Portrait & Interview',
    duration: '05:12',
    publishedAtFr: '15 novembre 2023',
    publishedAtEn: 'November 15, 2023',
    timestamp: 20231115
  },
  {
    id: 'z9ppgA0Z-LE',
    titleFr: 'Ali Ponré sur le 360',
    titleEn: 'Ali Ponré on the 360 show',
    duration: '08:45',
    publishedAtFr: '24 juillet 2023',
    publishedAtEn: 'July 24, 2023',
    timestamp: 20230724
  },
  {
    id: 'ot_7j75TD7U',
    titleFr: 'Maïmouna Koné dite Maï la bombe sur le 360',
    titleEn: 'Maïmouna Koné alias Maï la bombe on the 360 show',
    duration: '10:30',
    publishedAtFr: '24 juillet 2023',
    publishedAtEn: 'July 24, 2023',
    timestamp: 20230724
  },
  {
    id: 'U2bxeL4Sgio',
    titleFr: 'Maimouna KONÉ dite ma sur le 360',
    titleEn: 'Maimouna KONÉ on the 360 show',
    duration: '09:20',
    publishedAtFr: '24 juillet 2023',
    publishedAtEn: 'July 24, 2023',
    timestamp: 20230724
  }
]

export function SotiguiTV({ locale }: SotiguiTVProps) {
  const isEn = locale === 'en'
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(6)
  const [selectedVideo, setSelectedVideo] = useState<ShortVideoItem | null>(null)

  // Filtered and strictly sorted (newest to oldest) shorts list
  const filteredShorts = useMemo(() => {
    return SHORTS_DATA.filter((video) => {
      const query = searchQuery.toLowerCase()
      return (
        video.titleFr.toLowerCase().includes(query) ||
        video.titleEn.toLowerCase().includes(query)
      )
    }).sort((a, b) => b.timestamp - a.timestamp)
  }, [searchQuery])

  // Paginated list of visible shorts
  const visibleShorts = useMemo(() => {
    return filteredShorts.slice(0, visibleCount)
  }, [filteredShorts, visibleCount])

  const hasMore = filteredShorts.length > visibleCount

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, filteredShorts.length))
  }

  return (
    <section className="flex flex-col gap-10">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border-color pb-6">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ivory tracking-tight mb-2">
            Sotigui <span className="gold-text-gradient">Shorts</span>
          </h2>
          <p className="text-xs text-gold-light uppercase tracking-widest font-semibold flex items-center gap-1.5">
            <Film size={14} />
            {isEn ? 'Official YouTube Shorts (Newest First)' : 'Vidéos shorts officielles (Du plus récent au plus ancien)'}
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-text" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setVisibleCount(6) // Reset pagination when searching
            }}
            placeholder={isEn ? 'Search shorts...' : 'Rechercher un short...'}
            className="w-full bg-dark-surface/50 border border-border-color/40 rounded-full py-2 pl-10 pr-4 text-xs text-ivory placeholder-gray-text focus:outline-none focus:border-gold-primary/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('')
                setVisibleCount(6)
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-text hover:text-ivory"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Grid Layout: Vertical 9:16 Cards */}
      {visibleShorts.length > 0 ? (
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {visibleShorts.map((short) => (
              <div
                key={short.id}
                onClick={() => setSelectedVideo(short)}
                className="bg-dark-surface border border-border-color/40 hover:border-gold-primary/40 rounded-2xl overflow-hidden cursor-pointer shadow-lg group relative aspect-[9/16] transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Thumbnail Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`}
                  alt={isEn ? short.titleEn : short.titleFr}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Vignette / Hover Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 group-hover:via-black/20 transition-all duration-300 flex flex-col justify-between p-4">
                  {/* Top Badge: Duration */}
                  <div className="self-end bg-black/60 backdrop-blur-sm text-[9px] font-mono px-2 py-0.5 rounded text-ivory">
                    {short.duration}
                  </div>

                  {/* Play Center Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-gold-primary text-black flex items-center justify-center shadow-xl">
                      <Play size={20} className="fill-black ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Text */}
                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-[11px] font-bold text-ivory leading-tight group-hover:text-gold-light transition-colors line-clamp-2">
                      {isEn ? short.titleEn : short.titleFr}
                    </h3>
                    <span className="text-[8px] text-gray-text">
                      {isEn ? short.publishedAtEn : short.publishedAtFr}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-2">
              <button
                onClick={handleLoadMore}
                className="bg-transparent border border-gold-primary/40 hover:border-gold-primary text-gold-light hover:text-gold-primary text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full transition-all duration-300"
              >
                {isEn ? 'Load More' : 'Voir plus'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-border-color/40 rounded-3xl min-h-[300px]">
          <p className="text-sm text-gray-text mb-2">
            {isEn ? 'No shorts matches your search criteria.' : 'Aucun short ne correspond à votre recherche.'}
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-gold-primary hover:underline"
          >
            {isEn ? 'Reset search' : 'Réinitialiser la recherche'}
          </button>
        </div>
      )}

      {/* Lightbox / Video Modal (Adjusted for Vertical Video playing) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm bg-dark-surface border border-border-color rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-ivory hover:text-gold-light transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            <div className="relative aspect-[9/16] w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                title={isEn ? selectedVideo.titleEn : selectedVideo.titleFr}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="p-4 flex flex-col gap-1.5 border-t border-border-color/20 bg-dark-surface">
              <span className="text-[9px] text-gold-light uppercase tracking-widest font-bold">
                📱 YouTube Short
              </span>
              <h3 className="font-serif text-xs font-bold text-ivory line-clamp-2">
                {isEn ? selectedVideo.titleEn : selectedVideo.titleFr}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
