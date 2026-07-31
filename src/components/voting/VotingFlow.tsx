'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Award, Mail, ShieldAlert, CheckCircle2, Loader2, Key } from 'lucide-react'
import confetti from 'canvas-confetti'

const COUNTRIES_LIST = [
  { code: 'CI', fr: 'Côte d\'Ivoire', en: 'Ivory Coast' },
  { code: 'BF', fr: 'Burkina Faso', en: 'Burkina Faso' },
  { code: 'SN', fr: 'Sénégal', en: 'Senegal' },
  { code: 'ML', fr: 'Mali', en: 'Mali' },
  { code: 'GN', fr: 'Guinée', en: 'Guinea' },
  { code: 'NE', fr: 'Niger', en: 'Niger' },
  { code: 'TG', fr: 'Togo', en: 'Togo' },
  { code: 'BJ', fr: 'Bénin', en: 'Benin' },
  { code: 'CM', fr: 'Cameroun', en: 'Cameroon' },
  { code: 'GA', fr: 'Gabon', en: 'Gabon' },
  { code: 'CG', fr: 'Congo-Brazzaville', en: 'Congo-Brazzaville' },
  { code: 'CD', fr: 'Congo-Kinshasa (RDC)', en: 'DR Congo' },
  { code: 'NG', fr: 'Nigeria', en: 'Nigeria' },
  { code: 'GH', fr: 'Ghana', en: 'Ghana' },
  { code: 'KE', fr: 'Kenya', en: 'Kenya' },
  { code: 'ZA', fr: 'Afrique du Sud', en: 'South Africa' },
  { code: 'MA', fr: 'Maroc', en: 'Morocco' },
  { code: 'DZ', fr: 'Algérie', en: 'Algeria' },
  { code: 'TN', fr: 'Tunisie', en: 'Tunisia' },
  { code: 'EG', fr: 'Égypte', en: 'Egypt' },
  { code: 'FR', fr: 'France', en: 'France' },
  { code: 'US', fr: 'États-Unis', en: 'United States' },
  { code: 'CA', fr: 'Canada', en: 'Canada' },
  { code: 'BE', fr: 'Belgique', en: 'Belgium' },
  { code: 'GB', fr: 'Royaume-Uni', en: 'United Kingdom' },
  { code: 'DE', fr: 'Allemagne', en: 'Germany' },
  { code: 'BR', fr: 'Brésil', en: 'Brazil' },
  { code: 'HT', fr: 'Haïti', en: 'Haiti' }
]

interface VotingFlowProps {
  nominees: any[]
  categories: { name: string; slug: string }[]
  locale: string
}

export function VotingFlow({ nominees, categories, locale }: VotingFlowProps) {
  const [step, setStep] = useState(1) // 1: Category, 2: Nominee, 3: Email, 4: OTP, 5: Success
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedNominee, setSelectedNominee] = useState<any | null>(null)
  
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [otp, setOtp] = useState('')
  
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [verificationId, setVerificationId] = useState<string>('')

  const isEn = locale === 'en'

  // Filter nominees for selected category
  const filteredNominees = nominees.filter(n => n.category_slug === selectedCategory)

  // Step 1 -> Step 2
  const handleSelectCategory = (catSlug: string) => {
    setSelectedCategory(catSlug)
    setStep(2)
  }

  // Step 2 -> Step 3
  const handleSelectNominee = (nominee: any) => {
    setSelectedNominee(nominee)
    setStep(3)
  }

  // Step 3 -> Step 4: Ask for verification code
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSendingCode(true)
    setError(null)

    try {
      const res = await fetch('/api/vote/demander-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, country })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Error requesting code')

      setVerificationId(data.verificationId)
      setStep(4)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSendingCode(false)
    }
  }

  // Step 4 -> Step 5: Verify OTP & Save Vote
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setError(null)

    try {
      const res = await fetch('/api/vote/enregistrer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          otp,
          verificationId,
          nominationId: selectedNominee.id,
          categorySlug: selectedCategory
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Error recording vote')

      // Trigger Confetti Celebration!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C69A3A', '#E0BC68', '#8D6428', '#FFFFFF']
      })

      setStep(5)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="w-full">
      {/* Progress Steps Indicators */}
      <div className="flex justify-between items-center max-w-xl mx-auto mb-12">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center flex-grow last:flex-grow-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              step >= s 
                ? 'bg-gold-primary text-dark-bg font-bold shadow-lg shadow-gold-primary/20'
                : 'bg-dark-surface border border-border-color text-gray-text'
            }`}>
              {s}
            </div>
            {s < 5 && (
              <div className={`h-0.5 flex-grow mx-2 transition-colors duration-500 ${
                step > s ? 'bg-gold-primary' : 'bg-border-color'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Error alert banner */}
      {error && (
        <div className="max-w-md mx-auto mb-8 bg-bordeaux/20 border border-bordeaux/50 rounded-2xl p-4 flex gap-3 text-xs text-ivory">
          <ShieldAlert size={18} className="shrink-0 text-bordeaux" />
          <span>{error}</span>
        </div>
      )}

      {/* -------------------------------------------------------------------
          STEP 1: SELECT CATEGORY
         ------------------------------------------------------------------- */}
      {step === 1 && (
        <div className="flex flex-col gap-6">
          <h2 className="font-serif text-lg font-bold text-ivory text-center uppercase tracking-wider mb-2">
            {isEn ? 'Choose a Category' : 'Sélectionnez une catégorie'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleSelectCategory(cat.slug)}
                className="bg-dark-surface border border-border-color hover:border-gold-primary/40 rounded-3xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center gap-4 group hover:scale-[1.02]"
              >
                <div className="p-4 rounded-2xl bg-gold-primary/10 text-gold-light group-hover:bg-gold-primary group-hover:text-dark-bg transition-colors duration-300">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-ivory group-hover:text-gold-light transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-gray-text uppercase tracking-widest mt-1 block">
                    {isEn ? 'Public Choice Vote' : 'Soumis au vote populaire'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------
          STEP 2: SELECT NOMINEE
         ------------------------------------------------------------------- */}
      {step === 2 && (
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-gray-text hover:text-ivory transition-colors uppercase tracking-widest cursor-pointer"
            >
              ← {isEn ? 'Back' : 'Retour'}
            </button>
            <h2 className="font-serif text-lg font-bold text-gold-light uppercase tracking-wider">
              {categories.find(c => c.slug === selectedCategory)?.name}
            </h2>
            <div className="w-10" /> {/* Spacer */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNominees.map((nominee) => {
              const displayName = nominee.stage_name || `${nominee.first_name} ${nominee.last_name}`
              return (
                <div
                  key={nominee.id}
                  className="group bg-dark-surface border border-border-color rounded-2xl overflow-hidden flex flex-col h-full hover:border-gold-primary/50 transition-all duration-500 shadow-xl"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={nominee.portrait_path}
                      alt={displayName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-90" />
                  </div>
                  <div className="p-5 flex flex-col flex-grow text-center items-center">
                    <h3 className="text-base font-bold text-ivory mb-1">{displayName}</h3>
                    <p className="text-xs text-gray-text italic mb-4">{nominee.film_title}</p>
                    
                    <Button
                      variant="gold"
                      size="sm"
                      onClick={() => handleSelectNominee(nominee)}
                      className="w-full mt-auto uppercase tracking-widest text-[10px] py-2"
                    >
                      {isEn ? 'Select' : 'Sélectionner'}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------
          STEP 3: IDENTIFICATION
         ------------------------------------------------------------------- */}
      {step === 3 && (
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-border-color pb-3">
            <button
              onClick={() => setStep(2)}
              className="text-xs font-semibold text-gray-text hover:text-ivory transition-colors uppercase tracking-widest cursor-pointer"
            >
              ← {isEn ? 'Back' : 'Retour'}
            </button>
            <span className="text-xs font-bold text-gold-light uppercase tracking-wider font-serif">
              {isEn ? 'Step 3: Verification' : 'Étape 3 : Identification'}
            </span>
          </div>

          <div className="bg-dark-surface border border-border-color rounded-3xl p-6 flex flex-col gap-4 text-center items-center">
            <div className="p-3 rounded-full bg-gold-primary/10 text-gold-light mb-2">
              <Mail size={24} />
            </div>
            <h3 className="font-serif text-base font-bold text-ivory">
              {isEn ? 'Your Selected Nominee' : 'Votre sélection'}
            </h3>
            <p className="text-sm text-gold-light font-bold -mt-2">
              {selectedNominee?.stage_name || `${selectedNominee?.first_name} ${selectedNominee?.last_name}`}
            </p>
          </div>

          <form onSubmit={handleSendCode} className="bg-dark-surface border border-border-color rounded-3xl p-8 flex flex-col gap-5 shadow-2xl">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-text font-bold uppercase tracking-wider">
                {isEn ? 'Email Address' : 'Adresse e-mail'} *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre.email@domain.com"
                className="bg-dark-bg border border-border-color focus:border-gold-primary rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none transition-colors"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-gray-text font-bold uppercase tracking-wider">
                {isEn ? 'Country of Origin' : 'Pays d\'origine'} *
              </label>
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-dark-bg border border-border-color focus:border-gold-primary rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none transition-colors w-full cursor-pointer"
              >
                <option value="" disabled>
                  {isEn ? '-- Select your country --' : '-- Sélectionnez votre pays --'}
                </option>
                {COUNTRIES_LIST.map((c) => (
                  <option key={c.code} value={c.code}>
                    {isEn ? c.en : c.fr}
                  </option>
                ))}
              </select>
            </div>

            <p className="text-[10px] text-gray-text leading-relaxed">
              {isEn
                ? 'We will send a one-time verification code (OTP) to your email. This ensures one unique vote per user identity.'
                : 'Nous allons vous envoyer un code de vérification à usage unique par e-mail. Cela permet de garantir un vote unique par personne.'}
            </p>

            <Button
              type="submit"
              variant="gold"
              disabled={isSendingCode}
              className="w-full flex items-center justify-center gap-2 uppercase tracking-widest text-xs py-3 mt-2"
            >
              {isSendingCode && <Loader2 size={14} className="animate-spin" />}
              {isSendingCode ? (isEn ? 'Sending...' : 'Envoi...') : (isEn ? 'Send Verification Code' : 'Envoyer le code')}
            </Button>
          </form>
        </div>
      )}

      {/* -------------------------------------------------------------------
          STEP 4: OTP VERIFICATION
         ------------------------------------------------------------------- */}
      {step === 4 && (
        <div className="max-w-md mx-auto flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-border-color pb-3">
            <button
              onClick={() => setStep(3)}
              className="text-xs font-semibold text-gray-text hover:text-ivory transition-colors uppercase tracking-widest cursor-pointer"
            >
              ← {isEn ? 'Back' : 'Retour'}
            </button>
            <span className="text-xs font-bold text-gold-light uppercase tracking-wider font-serif">
              {isEn ? 'Step 4: Enter Code' : 'Étape 4 : Validation du Code'}
            </span>
          </div>

          <form onSubmit={handleVerifyOtp} className="bg-dark-surface border border-border-color rounded-3xl p-8 flex flex-col gap-5 shadow-2xl">
            <div className="flex flex-col gap-4 text-center items-center">
              <div className="p-3 rounded-full bg-gold-primary/10 text-gold-light">
                <Key size={24} />
              </div>
              <h3 className="font-serif text-base font-bold text-ivory">
                {isEn ? 'Enter Verification Code' : 'Entrez le code reçu'}
              </h3>
              <p className="text-xs text-gray-text leading-relaxed">
                {isEn
                  ? `A 6-digit code was sent to ${email}. Check your inbox (and spam folder).`
                  : `Un code à 6 chiffres a été envoyé à ${email}. Vérifiez vos spams si besoin.`}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="bg-dark-bg border border-border-color focus:border-gold-primary rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest text-gold-light focus:outline-none transition-colors"
              />
            </div>

            <Button
              type="submit"
              variant="gold"
              disabled={isVerifying}
              className="w-full flex items-center justify-center gap-2 uppercase tracking-widest text-xs py-3 mt-2"
            >
              {isVerifying && <Loader2 size={14} className="animate-spin" />}
              {isVerifying ? (isEn ? 'Verifying...' : 'Vérification...') : (isEn ? 'Confirm My Vote' : 'Confirmer mon vote')}
            </Button>
          </form>
        </div>
      )}

      {/* -------------------------------------------------------------------
          STEP 5: SUCCESS CONFIRMATION
         ------------------------------------------------------------------- */}
      {step === 5 && (
        <div className="max-w-md mx-auto px-4 text-center flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-gold-primary/10 text-gold-light flex items-center justify-center animate-pulse">
            <CheckCircle2 size={32} />
          </div>
          
          <h2 className="font-serif text-2xl font-bold text-ivory">
            {isEn ? 'Thank You!' : 'Votre vote a été pris en compte !'}
          </h2>
          
          <p className="text-xs text-gray-text leading-relaxed">
            {isEn
              ? `You voted successfully for ${selectedNominee?.stage_name || selectedNominee?.first_name} in the category "${categories.find(c => c.slug === selectedCategory)?.name}".`
              : `Vous avez voté avec succès pour ${selectedNominee?.stage_name || selectedNominee?.first_name} dans la catégorie "${categories.find(c => c.slug === selectedCategory)?.name}".`}
          </p>

          <div className="h-px bg-border-color/60 w-full my-2" />

          <Button
            variant="outline"
            onClick={() => {
              setStep(1)
              setSelectedCategory(null)
              setSelectedNominee(null)
              setOtp('')
              setError(null)
            }}
            className="uppercase tracking-widest text-[10px]"
          >
            {isEn ? 'Vote in another category' : 'Voter dans une autre catégorie'}
          </Button>
        </div>
      )}
    </div>
  )
}
// Placeholder types for imports
export type Nominee = any;
