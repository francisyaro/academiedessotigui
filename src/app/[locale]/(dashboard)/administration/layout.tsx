import React from 'react'
import Link from 'next/link'
import { LayoutDashboard, FileSpreadsheet, LogOut, ArrowLeft, Shield } from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params
  const isEn = locale === 'en'

  return (
    <div className="flex min-h-screen bg-dark-bg text-ivory">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-surface border-r border-border-color flex flex-col shrink-0">
        {/* Header Branding */}
        <div className="p-6 border-b border-border-color flex items-center gap-3">
          <Shield size={20} className="text-gold-light" />
          <div>
            <h2 className="font-serif text-sm font-bold tracking-widest text-gold-light uppercase leading-none">
              SOTIGUI ADMIN
            </h2>
            <span className="text-[8px] text-gray-text uppercase tracking-widest block mt-1">
              {isEn ? 'Control Console' : 'Console de Contrôle'}
            </span>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-grow p-4 flex flex-col gap-1">
          <Link
            href={`/${locale}/administration`}
            className="flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-dark-bg/60 hover:text-gold-light transition-all text-gray-text"
          >
            <LayoutDashboard size={16} />
            <span>Tableau de bord</span>
          </Link>
          
          <Link
            href={`/${locale}/administration/import`}
            className="flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-dark-bg/60 hover:text-gold-light transition-all text-gray-text"
          >
            <FileSpreadsheet size={16} />
            <span>Importation CSV</span>
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border-color flex flex-col gap-2">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-dark-bg text-gray-text transition-all"
          >
            <ArrowLeft size={14} />
            <span>{isEn ? 'Return to Site' : 'Retour au site'}</span>
          </Link>

          <Link
            href={`/${locale}/connexion`}
            className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-bordeaux/20 text-bordeaux transition-all"
          >
            <LogOut size={14} />
            <span>{isEn ? 'Logout' : 'Déconnexion'}</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
export const metadata = {
  title: 'Administration — Sotigui Awards',
  description: 'Console d\'administration de l\'Académie des Sotigui'
}
