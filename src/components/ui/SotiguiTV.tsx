'use client'

import React, { useState } from 'react'
import { Play, X, ExternalLink, Video } from 'lucide-react'

interface VideoItem {
  id: string
  titleFr: string
  titleEn: string
  category: 'interviews' | 'galas' | 'behind-scenes'
  duration: string
  publishedAtFr: string
  publishedAtEn: string
}

interface SotiguiTVProps {
  locale: string
}

const VIDEOS_DATA: VideoItem[] = [
  {
    id: 'Y3G7zG9e_l8', // Real/mock YouTube ID
    titleFr: 'Grand entretien avec Adrienne KOUTOUAN - Sotigui d\'Honneur',
    titleEn: 'Grand interview with Adrienne KOUTOUAN - Sotigui of Honor',
    category: 'interviews',
    duration: '15:24',
    publishedAtFr: '28 juillet 2026',
    publishedAtEn: 'July 28, 2026'
  },
  {
    id: 'qP24Uv1S8K4',
    titleFr: 'Ildevert MEDA : Retour sur son parcours d\'acteur et metteur en scène',
    titleEn: 'Ildevert MEDA: Looking back at his actor and director journey',
    category: 'interviews',
    duration: '18:10',
    publishedAtFr: '15 mai 2026',
    publishedAtEn: 'May 15, 2026'
  },
  {
    id: 'zG8X2_wK1sA',
    titleFr: 'Cérémonie de Clôture et remise des Sotigui d\'Or 2025',
    titleEn: 'Closing Ceremony and Presentation of the Sotigui d\'Or 2025',
    category: 'galas',
    duration: '45:12',
    publishedAtFr: '16 novembre 2025',
    publishedAtEn: 'November 16, 2025'
  },
  {
    id: 'tV9mX4_wL8k',
    titleFr: 'Tapis Rouge & Arrivée des stars de la 10ème Édition',
    titleEn: 'Red Carpet & Stars Arrival of the 10th Edition',
    category: 'galas',
    duration: '12:35',
    publishedAtFr: '15 novembre 2025',
    publishedAtEn: 'November 15, 2025'
  },
  {
    id: 'wL8sZ2_wK4m',
    titleFr: 'Conférence de presse : Lancement officiel des Sotigui 2026',
    titleEn: 'Press Conference: Official Launch of the Sotigui 2026',
    category: 'behind-scenes',
    duration: '22:45',
    publishedAtFr: '29 juillet 2026',
    publishedAtEn: 'July 29, 2026'
  },
  {
    id: 'kL9wX2_zS8a',
    titleFr: 'Projet "La Rue des Étoiles Kwamé N\'Krumah" : Les temps forts',
    titleEn: 'Project "Kwamé N\'Krumah Street of Stars": The highlights',
    category: 'behind-scenes',
    duration: '08:50',
    publishedAtFr: '12 avril 2026',
    publishedAtEn: 'April 12, 2026'
  }
]

export function SotiguiTV({ locale }: SotiguiTVProps) {
  const isEn = locale === 'en'
  const [activeCategory, setActiveCategory] = useState<'all' | 'interviews' | 'galas' | 'behind-scenes'>('all')
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  const filteredVideos = activeCategory === 'all'
    ? VIDEOS_DATA
    : VIDEOS_DATA.filter((v) => v.category === activeCategory)

  // Spotlight video is always the first one in the list (Adrienne Koutouan or selected category)
  const spotlightVideo = filteredVideos[0]
  const listVideos = filteredVideos.slice(1)

  return (
    <section className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border-color pb-6">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ivory tracking-tight mb-2">
            Sotigui <span className="gold-text-gradient">TV</span>
          </h2>
          <p className="text-xs text-gold-light uppercase tracking-widest font-semibold">
            {isEn ? 'Official YouTube Channel Highlights' : 'Les temps forts de notre chaîne YouTube'}
          </p>
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Left column: Spotlight Video Player Card */}
        {spotlightVideo && (
          <div className="lg:col-span-2 flex flex-col bg-dark-surface border border-border-color/60 rounded-3xl overflow-hidden shadow-xl group">
            <div
              onClick={() => setSelectedVideo(spotlightVideo)}
              className="relative aspect-video w-full overflow-hidden bg-black cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${spotlightVideo.id}/maxresdefault.jpg`}
                alt={isEn ? spotlightVideo.titleEn : spotlightVideo.titleFr}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if maxresdefault doesn't exist
                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${spotlightVideo.id}/0.jpg`
                }}
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
                    src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
                    alt={isEn ? video.titleEn : video.titleFr}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gold-primary/95 text-black flex items-center justify-center shadow-lg">
                      <Play size={12} className="fill-black ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between py-1">
                  <h4 className="text-xs font-bold text-ivory leading-snug line-clamp-2 group-hover:text-gold-light transition-colors">
                    {isEn ? video.titleEn : video.titleFr}
                  </h4>
                  <div className="flex justify-between items-center text-[10px] text-gray-text gap-2">
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
            <div className="h-full flex items-center justify-center text-center p-8 border border-dashed border-border-color/40 rounded-3xl">
              <p className="text-xs text-gray-text">
                {isEn ? 'No other videos in this category.' : 'Aucune autre vidéo dans cette catégorie.'}
              </p>
            </div>
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
                  ? '🎙️ Interview'
                  : selectedVideo.category === 'galas'
                  ? '🏆 Gala & Cérémonie'
                  : '🎬 Coulisses & Conférence'}
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
