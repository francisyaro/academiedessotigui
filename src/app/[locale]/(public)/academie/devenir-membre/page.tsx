'use client'

import React, { useState, use } from 'react'
import { Button } from '@/components/ui/Button'
import { CheckCircle, Upload, UserPlus } from 'lucide-react'

interface DevenirMembreProps {
  params: Promise<{ locale: string }>
}

export default function DevenirMembrePage({ params }: DevenirMembreProps) {
  const { locale } = use(params)
  const isEn = locale === 'en'

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    college: 'college-acteurs',
    experience: '',
    motivation: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-gold-primary/10 text-gold-light flex items-center justify-center animate-bounce">
          <CheckCircle size={32} />
        </div>
        <h1 className="font-serif text-2xl font-bold text-ivory">
          {isEn ? 'Application Received' : 'Candidature reçue'}
        </h1>
        <p className="text-sm text-gray-text leading-relaxed">
          {isEn
            ? 'Thank you for your interest. The Academy review board will study your application and get back to you shortly by email.'
            : 'Merci pour votre intérêt. Le comité d’adhésion de l’Académie va étudier votre dossier et reviendra vers vous par e-mail dans les plus brefs délais.'}
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>
          {isEn ? 'Submit another application' : 'Soumettre une autre demande'}
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-10">
      <div className="text-center flex flex-col gap-3">
        <h1 className="font-serif text-3xl font-bold text-ivory tracking-tight">
          {isEn ? 'Join the Academy' : 'Devenir Membre'}
        </h1>
        <p className="text-xs text-gold-light uppercase tracking-widest font-semibold font-serif">
          {isEn ? 'Professional Application' : 'Candidature professionnelle'}
        </p>
        <div className="w-16 h-0.5 bg-gold-primary mx-auto mt-2" />
      </div>

      <form onSubmit={handleSubmit} className="bg-dark-surface border border-border-color rounded-3xl p-8 flex flex-col gap-6 shadow-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-text font-bold uppercase tracking-wider">
              {isEn ? 'First Name' : 'Prénom'} *
            </label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="bg-dark-bg border border-border-color focus:border-gold-primary rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-text font-bold uppercase tracking-wider">
              {isEn ? 'Last Name' : 'Nom'} *
            </label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="bg-dark-bg border border-border-color focus:border-gold-primary rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-text font-bold uppercase tracking-wider">
            {isEn ? 'Email Address' : 'Adresse e-mail'} *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-dark-bg border border-border-color focus:border-gold-primary rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-text font-bold uppercase tracking-wider">
              {isEn ? 'Phone Number' : 'Téléphone'}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-dark-bg border border-border-color focus:border-gold-primary rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-text font-bold uppercase tracking-wider">
              {isEn ? 'Country of Residence' : 'Pays de résidence'} *
            </label>
            <input
              type="text"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="bg-dark-bg border border-border-color focus:border-gold-primary rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-text font-bold uppercase tracking-wider">
            {isEn ? 'Desired Guild' : 'Collège de métiers'} *
          </label>
          <select
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="bg-dark-bg border border-border-color focus:border-gold-primary rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none transition-colors"
          >
            <option value="college-acteurs">{isEn ? 'Actors Guild' : 'Collège des Acteurs'}</option>
            <option value="college-realisateurs">{isEn ? 'Directors Guild' : 'Collège des Réalisateurs'}</option>
            <option value="college-producteurs">{isEn ? 'Producers Guild' : 'Collège des Producteurs'}</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-text font-bold uppercase tracking-wider">
            {isEn ? 'Professional Experience Summary' : 'Résumé de l’expérience professionnelle'} *
          </label>
          <textarea
            name="experience"
            required
            rows={3}
            value={formData.experience}
            onChange={handleChange}
            placeholder={isEn ? 'List main film credits or professional history...' : 'Indiquez vos rôles principaux, films majeurs ou réalisations...'}
            className="bg-dark-bg border border-border-color focus:border-gold-primary rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none transition-colors resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-gray-text font-bold uppercase tracking-wider">
            {isEn ? 'Motivation' : 'Motivation'} *
          </label>
          <textarea
            name="motivation"
            required
            rows={3}
            value={formData.motivation}
            onChange={handleChange}
            placeholder={isEn ? 'Why do you want to join the Academy?' : 'Pourquoi souhaitez-vous intégrer l’Académie des Sotigui ?'}
            className="bg-dark-bg border border-border-color focus:border-gold-primary rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none transition-colors resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-gray-text font-bold uppercase tracking-wider">
            {isEn ? 'Supporting Documents (CV, Filmography, ID)' : 'Documents justificatifs (CV, Filmographie, ID)'} *
          </span>
          <div className="border border-dashed border-border-color hover:border-gold-primary/50 rounded-xl p-6 text-center cursor-pointer transition-colors flex flex-col items-center gap-2 bg-dark-bg/50">
            <Upload size={24} className="text-gold-light" />
            <span className="text-xs text-gray-text">
              {isEn ? 'Upload CV or PDF portfolio (Max 5MB)' : 'Téléversez votre CV ou dossier artistique PDF (Max 5Mo)'}
            </span>
          </div>
        </div>

        <Button
          type="submit"
          variant="gold"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 uppercase tracking-widest text-xs py-3 mt-2"
        >
          <UserPlus size={16} />
          {isSubmitting ? (isEn ? 'Submitting...' : 'Envoi...') : (isEn ? 'Submit Application' : 'Soumettre ma candidature')}
        </Button>
      </form>
    </div>
  )
}
