'use client'

import React, { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Film, Key, Loader2, ShieldCheck } from 'lucide-react'

interface ConnexionProps {
  params: Promise<{ locale: string }>
}

export default function ConnexionPage({ params }: ConnexionProps) {
  const { locale } = use(params)
  const router = useRouter()
  const isEn = locale === 'en'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setError(null)

    // Simulate login for testing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (email === 'admin@sotigui.org' && password === 'admin123') {
      // Direct redirect to administration page
      router.push(`/${locale}/administration`)
    } else {
      // Simulating Supabase Auth client auth: if we don't have connection, we fall back to a mock login credentials check.
      // We will allow admin@sotigui.org/admin123 for seamless testing!
      setError(
        isEn
          ? 'Invalid credentials. For local testing, use: admin@sotigui.org / admin123'
          : 'Identifiants invalides. Pour tester localement, utilisez : admin@sotigui.org / admin123'
      )
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-24 flex flex-col gap-8 w-full">
      <div className="text-center flex flex-col items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo_bw.png"
          alt="Académie des Sotigui"
          className="h-16 w-auto brightness-110 mb-2"
        />
        <h1 className="font-serif text-2xl font-bold text-ivory tracking-tight">
          {isEn ? 'Academy Administration' : 'Administration de l’Académie'}
        </h1>
        <p className="text-[10px] text-gold-light uppercase tracking-widest font-semibold font-serif">
          {isEn ? 'Secure Gateway' : 'Espace Sécurisé'}
        </p>
      </div>

      {error && (
        <div className="bg-bordeaux/20 border border-bordeaux/50 rounded-2xl p-4 text-xs text-ivory text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="bg-dark-surface border border-border-color rounded-3xl p-8 flex flex-col gap-5 shadow-2xl">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-text font-bold uppercase tracking-wider">
            {isEn ? 'Email Address' : 'Adresse e-mail'}
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@sotigui.org"
            className="bg-dark-bg border border-border-color focus:border-gold-primary rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-text font-bold uppercase tracking-wider">
            {isEn ? 'Password' : 'Mot de passe'}
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-dark-bg border border-border-color focus:border-gold-primary rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none transition-colors"
          />
        </div>

        <Button
          type="submit"
          variant="gold"
          disabled={isLoggingIn}
          className="w-full flex items-center justify-center gap-2 uppercase tracking-widest text-xs py-3 mt-2"
        >
          {isLoggingIn ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>{isEn ? 'Connecting...' : 'Connexion...'}</span>
            </>
          ) : (
            <>
              <ShieldCheck size={16} />
              <span>{isEn ? 'Access Dashboard' : 'Accéder au tableau de bord'}</span>
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
