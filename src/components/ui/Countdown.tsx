'use client'

import React, { useState, useEffect } from 'react'

interface CountdownProps {
  targetDate: string
  locale: string
}

export function Countdown({ targetDate, locale }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true })
        return
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (timeLeft.isExpired) {
    return (
      <div className="text-center font-serif text-2xl text-gold-light tracking-wide py-4 animate-pulse">
        {locale === 'en' ? 'The Ceremony Has Begun!' : 'La cérémonie a commencé !'}
      </div>
    )
  }

  const items = [
    { label: locale === 'en' ? 'Days' : 'Jours', value: timeLeft.days },
    { label: locale === 'en' ? 'Hours' : 'Heures', value: timeLeft.hours },
    { label: locale === 'en' ? 'Minutes' : 'Minutes', value: timeLeft.minutes },
    { label: locale === 'en' ? 'Seconds' : 'Secondes', value: timeLeft.seconds }
  ]

  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center">
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="bg-dark-surface border border-border-color rounded-2xl w-16 h-16 md:w-24 md:h-24 flex items-center justify-center shadow-lg gold-glow">
            <span className="font-serif text-xl md:text-4xl font-bold text-gold-light tracking-tight">
              {String(item.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] md:text-xs font-semibold text-gray-text uppercase tracking-wider mt-2">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
