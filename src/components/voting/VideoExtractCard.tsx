'use client'

import React, { useState } from 'react'
import { NomineeVideoExtract } from '@/lib/academyVotingData'
import { Film, Lock, Copy, Check, Play, User } from 'lucide-react'

interface VideoExtractCardProps {
  nominee: NomineeVideoExtract
  locale: string
}

export function VideoExtractCard({ nominee, locale }: VideoExtractCardProps) {
  const isEn = locale === 'en'
  const [copied, setCopied] = useState(false)

  const handleCopyPassword = () => {
    if (nominee.videoPassword) {
      navigator.clipboard.writeText(nominee.videoPassword)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Format iframe src if YouTube/Vimeo/Dailymotion/Drive url is provided
  const getEmbedUrl = (url?: string) => {
    if (!url) return null
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      if (url.includes('embed')) return url
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()
      return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop()
      return `https://player.vimeo.com/video/${videoId}`
    }
    if (url.includes('dailymotion.com')) {
      const videoId = url.split('/video/')[1]?.split('?')[0] || url.split('/').pop()
      return `https://www.dailymotion.com/embed/video/${videoId}`
    }
    if (url.includes('drive.google.com')) {
      return url.replace('/view', '/preview')
    }
    return url
  }

  const embedUrl = getEmbedUrl(nominee.videoUrl)

  return (
    <div className="bg-dark-surface border border-border-color/80 hover:border-gold-primary/40 rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all duration-300">
      {/* Top Nominee Info Header */}
      <div className="p-5 bg-dark-bg/60 border-b border-border-color/60 flex items-center gap-4">
        {/* Portrait */}
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold-primary/40 shrink-0 bg-dark-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={nominee.portraitPath}
            alt={nominee.actorName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-light">
            {nominee.country}
          </span>
          <h4 className="font-serif text-base font-bold text-ivory truncate">
            {nominee.actorName}
          </h4>
          <p className="text-xs text-gray-text flex items-center gap-1 truncate">
            <Film size={12} className="shrink-0 text-gold-primary" />
            <span className="italic font-serif">« {nominee.filmTitle} »</span>
            {nominee.director && <span>(de {nominee.director})</span>}
          </p>
        </div>
      </div>

      {/* Video Player Section */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={`Extrait - ${nominee.actorName}`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-6 text-center text-gray-text">
            <Play size={32} className="text-gold-primary/60" />
            <p className="text-xs">
              {isEn ? 'Video extract currently loading...' : 'Extrait vidéo en cours de chargement...'}
            </p>
          </div>
        )}
      </div>

      {/* Optional Password Protected Notice */}
      {nominee.videoPassword && (
        <div className="p-4 bg-gold-primary/10 border-t border-gold-primary/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <Lock size={15} className="text-gold-light shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-gold-light">
                {isEn ? 'Protected Video Access' : 'Accès Vidéo Protégé'}
              </p>
              <p className="text-xs text-ivory font-mono font-bold truncate">
                {nominee.videoPassword}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyPassword}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-primary/20 hover:bg-gold-primary text-gold-light hover:text-black border border-gold-primary/40 text-xs font-bold transition-all duration-300 shrink-0 cursor-pointer"
            title={isEn ? 'Copy Password' : 'Copier le mot de passe'}
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>{isEn ? 'Copied' : 'Copié !'}</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>{isEn ? 'Copy' : 'Copier'}</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
