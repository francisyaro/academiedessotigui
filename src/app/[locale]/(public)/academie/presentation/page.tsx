import React from 'react'

interface PresentationProps {
  params: Promise<{ locale: string }>
}

export default async function PresentationPage({ params }: PresentationProps) {
  const { locale } = await params
  const isEn = locale === 'en'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-16">
      {/* Intro */}
      <section className="flex flex-col gap-6 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-ivory tracking-tight">
          {isEn ? 'The Academy of Arts' : 'L’Académie des Arts'}
        </h1>
        <p className="text-gold-light font-serif uppercase tracking-widest text-xs font-semibold">
          {isEn ? 'African Cinematic Excellence' : 'L’excellence cinématographique africaine'}
        </p>
        <div className="w-24 h-0.5 bg-gold-primary mx-auto my-2" />
        <p className="text-sm text-gray-text leading-relaxed max-w-2xl mx-auto">
          {isEn
            ? 'The Academy of African and Diaspora Cinematic Arts and of the Diaspora is an institution dedicated to high standards, recognition, and worldwide promotion of cinema professionals.'
            : 'L’Académie des Arts Cinématographiques Africains et de la Diaspora est une institution consacrée à l’exigence, à la reconnaissance et à la mise en lumière des professionnels du cinéma à l’échelle internationale.'}
        </p>
      </section>

      {/* History */}
      <section id="histoire" className="flex flex-col gap-6 bg-dark-surface border border-border-color rounded-3xl p-8 md:p-12">
        <h2 className="font-serif text-2xl font-bold text-gold-light tracking-tight border-b border-border-color/60 pb-3">
          {isEn ? 'Our History' : 'Notre Histoire'}
        </h2>
        <p className="text-sm text-gray-text leading-relaxed">
          {isEn
            ? 'Created to fulfill the need to recognize acting performance (often overshadowed by film direction in festivals), the Academy awards the Sotigui Awards since 2016. In partnership with institutional authorities, it has established itself as the leading reference for acting performance in Africa and its diaspora.'
            : 'Créée pour répondre au besoin de valorisation du jeu d’acteur (souvent relégué au second plan derrière la réalisation dans les festivals), l’Académie décerne les Sotigui Awards depuis 2016. En partenariat avec les instances culturelles, elle s’est imposée comme la référence incontournable de la performance d’acteur en Afrique et dans sa diaspora.'}
        </p>
        <p className="text-sm text-gray-text leading-relaxed">
          {isEn
            ? 'Year after year, the Academy expands its network of professionals grouped in guilds, thus participating in the structuration and training of actors.'
            : 'Année après année, l’Académie élargit son réseau de professionnels regroupés en collèges de métiers, participant ainsi à la structuration et à la professionnalisation des acteurs du continent.'}
        </p>
      </section>

      {/* Governance */}
      <section id="gouvernance" className="flex flex-col gap-6">
        <h2 className="font-serif text-2xl font-bold text-ivory tracking-tight border-b border-border-color/60 pb-3">
          {isEn ? 'Governance & Guilds' : 'Gouvernance & Collèges'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-surface border border-border-color/60 rounded-2xl p-6 flex flex-col gap-3">
            <h3 className="font-serif text-base font-bold text-gold-light">
              {isEn ? 'Actors Guild' : 'Collège des Acteurs'}
            </h3>
            <p className="text-xs text-gray-text leading-relaxed">
              {isEn ? 'Represents actors and actresses from Africa and the diaspora.' : 'Regroupe les comédiens et comédiennes d’Afrique et de la diaspora.'}
            </p>
          </div>
          <div className="bg-dark-surface border border-border-color/60 rounded-2xl p-6 flex flex-col gap-3">
            <h3 className="font-serif text-base font-bold text-gold-light">
              {isEn ? 'Directors Guild' : 'Collège des Réalisateurs'}
            </h3>
            <p className="text-xs text-gray-text leading-relaxed">
              {isEn ? 'Focuses on the collaboration between actors and directors.' : 'Se concentre sur la collaboration entre acteurs et réalisateurs.'}
            </p>
          </div>
          <div className="bg-dark-surface border border-border-color/60 rounded-2xl p-6 flex flex-col gap-3">
            <h3 className="font-serif text-base font-bold text-gold-light">
              {isEn ? 'Producers Guild' : 'Collège des Producteurs'}
            </h3>
            <p className="text-xs text-gray-text leading-relaxed">
              {isEn ? 'Supports legal frameworks and production conditions.' : 'Accompagne la structuration juridique et économique de la production.'}
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="flex flex-col gap-6 text-center bg-gradient-to-br from-dark-surface to-dark-bg border border-gold-primary/20 rounded-3xl p-8 md:p-12">
        <h2 className="font-serif text-xl font-bold text-gold-light tracking-widest uppercase">
          {isEn ? 'The Cinematic Muse' : 'L’égérie cinématographique'}
        </h2>
        <p className="text-sm text-gray-text max-w-xl mx-auto italic">
          {isEn
            ? '"A film exists through the look, the silence, and the emotion of its actors. Rewarding them is keeping the heartbeat of our stories alive."'
            : '"Un film existe par le regard, le silence et l\'émotion de ses comédiens. Les récompenser, c\'est faire battre le cœur de nos histoires."'}
        </p>
      </section>
    </div>
  )
}
