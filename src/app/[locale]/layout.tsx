import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '../globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Académie des Sotigui',
  description: 'Site officiel de l\'Académie des Arts Cinématographiques Africains et de la Diaspora',
}

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dark-bg text-ivory selection:bg-gold-primary selection:text-dark-bg">
        <Navbar locale={locale} />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}
