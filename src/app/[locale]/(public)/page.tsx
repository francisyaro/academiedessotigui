import React from 'react'
import Link from 'next/link'
import { getPartners, getArticles } from '@/lib/services'
import { Countdown } from '@/components/ui/Countdown'
import { Button } from '@/components/ui/Button'
import { LaureatesGrid } from '@/components/ui/LaureatesGrid'
import { HighlightsCarousel } from '@/components/ui/HighlightsCarousel'
import { Calendar, Newspaper } from 'lucide-react'

interface HomeProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: HomeProps) {
  const { locale } = await params
  
  // Fetch data from service
  const partners = await getPartners()
  const articles = await getArticles()

  const isEn = locale === 'en'

  const officialPartners = [
    { name: 'Coris Bank', logo: '/images/partners/official_coris.png', url: 'https://www.coris-bank.com/' },
    { name: 'Azalaï Hotel', logo: '/images/partners/official_azalai.png', url: 'https://www.azalaihotels.com/' },
    { name: 'Canal+', logo: '/images/partners/official_canalplus.png', url: 'https://www.canalplus-afrique.com/' }
  ]

  const regularPartners = [
    { logo: '/images/partners/regular_presidence.png' },
    { logo: '/images/partners/regular_uemoa.png' },
    { logo: '/images/partners/regular_fespaco.jpg' },
    { logo: '/images/partners/partner_row1_3.png' },
    { logo: '/images/partners/regular_movup.png' },
    { logo: '/images/partners/partner_row1_5.png' },
    { logo: '/images/partners/regular_raynal.png' },
    { logo: '/images/partners/regular_vistabank.jpg' },
    { logo: '/images/partners/partner_row2_1.png' },
    { logo: '/images/partners/partner_row2_2.png' },
    { logo: '/images/partners/regular_un1school.png' },
    { logo: '/images/partners/regular_iamgold.png' },
    { logo: '/images/partners/partner_row2_5.png' },
    { logo: '/images/partners/regular_ruedesetoiles.png' },
    { logo: '/images/partners/partner_row3_0.png' },
    { logo: '/images/partners/regular_ccibf.png' },
    { logo: '/images/partners/regular_aplus.png' },
    { logo: '/images/partners/partner_row3_2.png' },
    { logo: '/images/partners/partner_row3_3.png' },
    { logo: '/images/partners/partner_row3_4.png' },
    { logo: '/images/partners/partner_row3_5.png' },
    { logo: '/images/partners/partner_row3_6.png' },
    { logo: '/images/partners/partner_row4_0.png' },
    { logo: '/images/partners/partner_row4_1.png' },
    { logo: '/images/partners/partner_row4_2.png' },
    { logo: '/images/partners/partner_row4_3.png' },
    { logo: '/images/partners/partner_row4_4.png' },
    { logo: '/images/partners/partner_row4_5.png' },
    { logo: '/images/partners/partner_row4_6.png' },
    { logo: '/images/partners/partner_row4_7.png' },
    { logo: '/images/partners/partner_row5_0.png' },
    { logo: '/images/partners/partner_row5_1.png' },
    { logo: '/images/partners/partner_row5_2.png' },
    { logo: '/images/partners/partner_row5_3.png' },
    { logo: '/images/partners/partner_row5_4.png' },
    { logo: '/images/partners/partner_row5_5.png' },
    { logo: '/images/partners/partner_row5_6.png' }
  ]

  const OTHER_LAUREATES = [
    {
      name: 'Cheikh Babou GAYE',
      country: 'Sénégal',
      title_fr: 'Meilleur Acteur Afrique de l\'Ouest',
      title_en: 'Best Actor West Africa',
      work: '"NANAS" de Khalifa BA',
      image: '/images/laureat_cheikh_babou_gaye.jpg'
    },
    {
      name: 'Dramane OUEDRAOGO',
      country: 'Burkina Faso',
      title_fr: 'Meilleure Interp. Masculine Burkinabè',
      title_en: 'Best Actor Burkina',
      work: '"KATANGA" de Dani KOUYATE',
      image: '/images/laureat_dramane_ouedraogo.jpg'
    },
    {
      name: 'Diariatou SOW',
      country: 'Sénégal',
      title_fr: 'Meilleur Espoir TV Show',
      title_en: 'Best Hope TV Show',
      work: '"CREDULE" de Almouktar JANTLER',
      image: '/images/laureat_diariatou_sow.jpg'
    },
    {
      name: 'Eve GUEHI',
      country: 'Côte d\'Ivoire',
      title_fr: 'Meilleure Interp. Féminine Série TV',
      title_en: 'Best Actress TV Show',
      work: '"LES NOUNOUS" de F. VLEHI & M. NIAVA',
      image: '/images/laureat_eve_guehi.jpg'
    },
    {
      name: 'Coulibaly HAFISSATOU',
      country: 'Burkina Faso',
      title_fr: 'Meilleure Interp. Féminine Burkinabè',
      title_en: 'Best Actress Burkina',
      work: '"LES INVERTIEUSES" de Aïcha BORO',
      image: '/images/laureat_coulibaly_hafissatou.jpg'
    },
    {
      name: 'Ednara CONCEIÇÃO',
      country: 'Angola',
      title_fr: 'Meilleur Acteur de l\'Afrique de l\'Est',
      title_en: 'Best Actor of East Africa',
      work: '"A CAIXA" de Carlos G. RODRIGUES',
      image: '/images/laureat_ednara_conceicao.jpg'
    },
    {
      name: 'Fortune AKAKPO',
      country: 'Côte d\'Ivoire',
      title_fr: 'Meilleure Interp. Masculine Série TV',
      title_en: 'Best Actor TV Show',
      work: '"LES NOUNOUS" de F. VLEHI & M. NIAVA',
      image: '/images/laureat_fortune_akakpo.jpg'
    },
    {
      name: 'Ibrahim MBAYE (Diaspora)',
      country: 'Sénégal',
      title_fr: 'Meilleur Acteur de la Diaspora',
      title_en: 'Best Actor of Diaspora',
      work: '"NI CHAINES NI MAITRES" de Simon MOUTAIROU',
      image: '/images/laureat_diaspora_ibrahim_mbaye.jpg'
    },
    {
      name: 'Pape Aly DIOP',
      country: 'Sénégal',
      title_fr: 'Meilleur Espoir Africain',
      title_en: 'Best African Hope',
      work: '"TIMPI TAMPA" de Adama Bineta SOW',
      image: '/images/laureat_pape_aly_diop.jpg'
    },
    {
      name: 'Kwadwo NKANSAH (Lil Win)',
      country: 'Ghana',
      title_fr: 'Meilleur Acteur Nigeria / Ghana',
      title_en: 'Best Actor Nigeria / Ghana',
      work: '"CAPITAIN IBRAHIM TRAORE" de Jackson K. BENTUM',
      image: '/images/laureat_kwadwo_nkansah.jpg'
    },
    {
      name: 'Nisrin ERRADI',
      country: 'Maroc',
      title_fr: 'Meilleur Acteur de l\'Afrique du Nord',
      title_en: 'Best Actor of North Africa',
      work: '"EVERYBODY LOVES TOUDA" de Nabil AYOUCH',
      image: '/images/laureat_nisrin_erradi.jpg'
    },
    {
      name: 'Rosine NGUEMGAING',
      country: 'Cameroun',
      title_fr: 'Meilleur Plus Jeune Acteur Africain',
      title_en: 'Best Younger African Actor',
      work: '"CLASSE A PART" de Ghislain TOWA',
      image: '/images/laureat_rosine_nguemgaing.jpg'
    },
    {
      name: 'Sharone Gah ROUSSETY',
      country: 'Ile Maurice',
      title_fr: 'Meilleur Acteur de l\'Afrique Australe',
      title_en: 'Best Actor of Southern Africa',
      work: '"SIMIN ZETWAL, REGARDER LES ETOILES" de David CONSTANTIN',
      image: '/images/laureat_sharone_gah_roussety.jpg'
    },
    {
      name: 'Thérèse NGONO',
      country: 'Cameroun',
      title_fr: 'Meilleur Acteur de l\'Afrique Centrale',
      title_en: 'Best Actor of Central Africa',
      work: '"INDOMPTABLES" de Thomas NGIJOL',
      image: '/images/laureat_therese_ngono.jpg'
    }
  ]

  return (
    <div className="flex flex-col w-full pb-20">
      {/* 1. Hero Banner */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-black overflow-hidden py-20 px-4">
        {/* Background Image: Eve GUEHI Poster */}
        <div className="absolute inset-0 bg-[url('/images/dress_code.jpg')] bg-cover bg-center opacity-45 mix-blend-luminosity scale-105 transition-transform duration-[10000ms] hover:scale-100" />
        {/* Soft Golden & Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/90 via-transparent to-dark-bg/90" />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          <span className="bg-gold-primary/10 border border-gold-primary/30 text-gold-light text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 font-serif animate-pulse">
            {isEn ? '11th Edition • November 2026' : '11ème Édition • Novembre 2026'}
          </span>
          
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-ivory tracking-tight mb-6 leading-none">
            SOTIGUI AWARDS <span className="gold-text-gradient">2026</span>
          </h1>
          
          <p className="text-sm md:text-lg text-gray-text font-sans max-w-2xl mb-10 leading-relaxed uppercase tracking-wider">
            {isEn
              ? 'Celebrating the actors, actresses and professionals of African and Diaspora cinema.'
              : 'Célébrer les acteurs, actrices et professionnels du cinéma africain et de sa diaspora.'}
          </p>

          <div className="flex justify-center w-full">
            <Link href={`/${locale}/academie/presentation`}>
              <Button variant="gold" size="lg" className="uppercase tracking-widest text-xs px-8">
                {isEn ? 'The Academy' : "L'Académie"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Countdown Section */}
      <section className="relative z-20 -mt-16 max-w-4xl mx-auto w-full px-4">
        <div className="bg-dark-surface/90 border border-border-color backdrop-blur-md rounded-3xl p-8 text-center shadow-2xl">
          <p className="text-xs uppercase tracking-widest text-gold-light font-semibold mb-6 flex items-center justify-center gap-2">
            <Calendar size={14} />
            {isEn ? 'Time remaining until the ceremony' : 'Temps restant avant la cérémonie'}
          </p>
          {/* Target date is November 12, 2026 at 19:00 UTC */}
          <Countdown targetDate="2026-11-12T19:00:00Z" locale={locale} />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 flex flex-col gap-28 w-full">
        {/* Carousel Highlights of the 10th Edition */}
        <section className="flex flex-col gap-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-ivory tracking-tight mb-2">
              {isEn ? '10th Edition Highlights' : 'Moments Forts de la 10ème Édition'}
            </h2>
            <p className="text-xs text-gray-text uppercase tracking-widest">
              {isEn ? 'Relive the most memorable moments on stage' : 'Revivez les moments les plus marquants de la cérémonie'}
            </p>
          </div>
          <HighlightsCarousel locale={locale} />
        </section>

        {/* 6. Laureates Showcase (10th Edition) */}
        <section className="flex flex-col gap-10 bg-gradient-to-b from-dark-surface/50 to-transparent border border-border-color/40 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle gold decoration background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center md:text-left flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-border-color pb-6">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-ivory tracking-tight mb-2">
                {isEn ? 'Laureates of the 10th Edition' : 'Lauréats de la 10ème Édition'}
              </h2>
              <p className="text-xs text-gold-light uppercase tracking-widest font-semibold">
                {isEn ? 'Celebrating the winners of the 2025 ceremony' : 'Célébration des vainqueurs de la cérémonie 2025'}
              </p>
            </div>
            <div className="text-xs text-gray-text max-w-md">
              {isEn
                ? 'Discover the actors, actresses and screen professionals honored by the Academy for their outstanding performances.'
                : 'Découvrez les acteurs, actrices et professionnels du cinéma distingués par l\'Académie pour leurs performances exceptionnelles.'}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Spotlight Card: Sotigui d'Or (Ibrahim Mbaye) */}
            <div className="lg:col-span-1 flex flex-col gap-4 bg-gradient-to-b from-gold-primary/10 via-dark-surface to-dark-surface border-2 border-gold-primary/60 rounded-2xl p-6 shadow-xl relative group hover:border-gold-primary transition-colors duration-300">
              <div className="absolute top-4 left-4 z-20 bg-gold-primary text-black font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md text-[10px] flex items-center gap-1 border border-black/20">
                🏆 {isEn ? 'Sotigui d\'Or 2025' : 'Sotigui d\'Or 2025'}
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-black shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/laureat_sotigui_d_or_ibrahim_mbaye.jpg"
                  alt="Ibrahim Mbaye - Sotigui d'Or 2025"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              </div>
              <div className="flex flex-col gap-1.5 text-center mt-2">
                <span className="text-[10px] text-gold-light uppercase tracking-widest font-bold">Sénégal</span>
                <h3 className="font-serif text-xl font-bold text-ivory tracking-tight group-hover:text-gold-light transition-colors duration-300">Ibrahim MBAYE</h3>
                <p className="text-xs text-gray-text font-medium italic">
                  Dans <span className="text-ivory font-semibold">"Ni Chaînes Ni Maîtres"</span> de Simon Moutaïrou
                </p>
              </div>
            </div>

            {/* Other Laureates Grid (Lazy loaded with skeletons) */}
            <div className="lg:col-span-2">
              <LaureatesGrid laureates={OTHER_LAUREATES} locale={locale} />
            </div>
          </div>
        </section>

        {/* 7. News Section */}
        <section className="flex flex-col gap-8">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="font-serif text-3xl font-bold text-ivory tracking-tight mb-2">
                {isEn ? 'Latest News' : 'Actualités'}
              </h2>
              <p className="text-xs text-gray-text uppercase tracking-widest">
                {isEn ? 'Announcements and interviews' : 'Les annonces et interviews récentes'}
              </p>
            </div>
            <Link
              href={`/${locale}/actualites`}
              className="text-xs font-bold uppercase tracking-widest text-gold-light hover:text-gold-primary transition-colors duration-300"
            >
              {isEn ? 'View all news →' : 'Toutes les actualités →'}
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <div key={article.slug} className="group bg-dark-surface border border-border-color/60 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-xl">
                <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto overflow-hidden bg-black shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.cover_path}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-gold-light uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-2">
                      <Newspaper size={12} />
                      {article.article_type}
                    </span>
                    <h3 className="text-base font-bold text-ivory group-hover:text-gold-light transition-colors duration-300 line-clamp-2 mb-2">
                      <Link href={`/${locale}/actualites/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-gray-text leading-relaxed line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-text">
                    {article.published_at}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Partners Section */}
        <section className="flex flex-col gap-12 text-center border-t border-border-color/30 pt-16 pb-12 overflow-hidden">
          {/* Partenaires Officiels */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-gold-light tracking-widest uppercase mb-1">
                {isEn ? 'Official Partners' : 'Partenaires Officiels'}
              </h2>
              <div className="h-[2px] w-24 bg-gold-primary mx-auto"></div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 mt-6">
              {officialPartners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 md:h-20 w-auto object-contain max-w-[220px] transition-all duration-300 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Partenaires */}
          <div className="flex flex-col gap-6 mt-8">
            <div>
              <h2 className="font-serif text-lg md:text-xl font-semibold text-ivory/80 tracking-widest uppercase mb-1">
                {isEn ? 'Partners' : 'Partenaires'}
              </h2>
              <div className="h-[1px] w-16 bg-ivory/30 mx-auto"></div>
            </div>
            
            {/* Infinite Marquee Loop */}
            <div className="relative w-full overflow-hidden py-4 bg-dark-surface/30 border-y border-border-color/20 mt-4">
              <div className="animate-marquee gap-16 items-center">
                {/* First half: list of logos */}
                {regularPartners.map((partner, index) => (
                  <div key={`orig-${index}`} className="flex-shrink-0">
                    <img
                      src={partner.logo}
                      alt="Partner"
                      className="h-10 md:h-12 w-auto object-contain max-w-[150px] transition-all duration-300"
                    />
                  </div>
                ))}
                {/* Second half: duplicate list for infinite looping */}
                {regularPartners.map((partner, index) => (
                  <div key={`dup-${index}`} className="flex-shrink-0">
                    <img
                      src={partner.logo}
                      alt="Partner Duplicate"
                      className="h-10 md:h-12 w-auto object-contain max-w-[150px] transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
