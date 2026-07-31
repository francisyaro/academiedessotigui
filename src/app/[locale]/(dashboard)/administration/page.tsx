import React from 'react'
import { Award, Film, Users, Vote, ShieldAlert, History } from 'lucide-react'

interface AdminPageProps {
  params: Promise<{ locale: string }>
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale } = await params
  const isEn = locale === 'en'

  // Mock dashboard stats
  const stats = [
    { label: 'Votes Enregistrés', value: '1,248', icon: Vote, color: 'text-gold-light' },
    { label: 'Nominés Actifs', value: '3', icon: Users, color: 'text-gold-light' },
    { label: 'Films & Séries', value: '2', icon: Film, color: 'text-gold-light' },
    { label: 'Candidatures Membres', value: '14', icon: Award, color: 'text-gold-light' }
  ]

  // Mock Audit logs
  const logs = [
    { action: 'Connexion de l\'administrateur', user: 'admin@sotigui.org', date: 'Aujourd\'hui, 15:47' },
    { action: 'Enregistrement d\'un vote public (Démo)', user: 'Anonyme (Code Vérifié)', date: 'Aujourd\'hui, 15:42' },
    { action: 'Ouverture du vote pour la catégorie Sotigui du Public', user: 'admin@sotigui.org', date: 'Hier, 10:00' },
    { action: 'Importation des films par fichier CSV', user: 'admin@sotigui.org', date: '28/07/2026, 16:30' }
  ]

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Title */}
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-ivory tracking-tight mb-1">
          {isEn ? 'Dashboard Overview' : 'Tableau de bord'}
        </h1>
        <p className="text-xs text-gray-text uppercase tracking-widest">
          {isEn ? 'General metrics and audit logs' : 'Statistiques générales et journaux d’activités'}
        </p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-dark-surface border border-border-color rounded-2xl p-6 flex items-center justify-between shadow-lg">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-text font-semibold uppercase tracking-wider">{stat.label}</span>
                <span className="text-2xl font-bold text-ivory">{stat.value}</span>
              </div>
              <div className={`p-3.5 rounded-xl bg-gold-primary/10 ${stat.color}`}>
                <Icon size={20} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Main sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Audit Log */}
        <div className="lg:col-span-8 bg-dark-surface border border-border-color rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-border-color pb-4">
            <History size={18} className="text-gold-light" />
            <h2 className="font-serif text-base font-bold text-ivory uppercase tracking-wider">
              {isEn ? 'Recent Audit Logs' : 'Journal d’Audit Récent'}
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs py-3 border-b border-border-color/40 last:border-0"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-ivory">{log.action}</span>
                  <span className="text-gray-text">{log.user}</span>
                </div>
                <span className="text-gray-text font-medium shrink-0">{log.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Security & status */}
        <div className="lg:col-span-4 bg-dark-surface border border-border-color rounded-3xl p-6 md:p-8 flex flex-col gap-6 shadow-xl">
          <div className="flex items-center gap-2.5 border-b border-border-color pb-4">
            <ShieldAlert size={18} className="text-gold-light" />
            <h2 className="font-serif text-base font-bold text-ivory uppercase tracking-wider">
              {isEn ? 'Security Alerts' : 'Alertes de sécurité'}
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-xs">
            <div className="bg-gold-primary/5 border border-gold-primary/20 rounded-xl p-4 leading-relaxed text-gold-light">
              <strong>Info :</strong> L’application tourne actuellement en mode démo locale (Base de données locale simulée si non connectée).
            </div>
            
            <div className="flex flex-col gap-1 border-l-2 border-gold-primary pl-3 py-1">
              <span className="font-bold text-ivory">Sauvegardes de vote</span>
              <span className="text-gray-text text-[10px]">Sauvegarde journalière active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export const dynamic = 'force-dynamic'
export const revalidate = 0
