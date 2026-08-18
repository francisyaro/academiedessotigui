'use client'

import React, { useState } from 'react'
import { Award, Film, ChevronDown, Trophy, Sparkles, User, Flag, ShieldCheck } from 'lucide-react'

interface Nominee {
  name: string
  country: string
  work: string
  image: string
  isWinner: boolean
}

interface Category {
  id: string
  name_fr: string
  name_en: string
  nominees: Nominee[]
}

interface Edition {
  id: string
  name_fr: string
  name_en: string
  year: number
  location: string
  categories: Category[]
}

interface PalmaresClientProps {
  locale: string
}

export function PalmaresClient({ locale }: PalmaresClientProps) {
  const isEn = locale === 'en'

  // Complete Palmares Mock Data
  const EDITIONS: Edition[] = [
    {
      id: "11e",
      name_fr: "11ème Édition",
      name_en: "11th Edition",
      year: 2026,
      location: "Ouagadougou, Burkina Faso",
      categories: [
        {
          id: "sotigui_du_public",
          name_fr: "Sotigui du Public",
          name_en: "Sotigui of the Public",
          nominees: [
            {
              name: "Eve GUEHI",
              country: "Côte d'Ivoire",
              work: "La femme du foyer",
              image: "/images/eve_guehi.jpg",
              isWinner: false
            },
            {
              name: "Kadhy TOURE",
              country: "Côte d'Ivoire",
              work: "La femme du foyer",
              image: "/images/serie_tv_feminin_2022_kadhy_toure.jpg",
              isWinner: false
            },
            {
              name: "Alassane SY",
              country: "Sénégal",
              work: "Le Rêve",
              image: "/images/laureat_cheikh_babou_gaye.jpg",
              isWinner: false
            },
            {
              name: "Hafissatou COULIBALY",
              country: "Burkina Faso",
              work: "La Traversée",
              image: "/images/burkina_faso_feminin_coulibaly_hafissatou.jpg",
              isWinner: false
            }
          ]
        },
        {
          id: "meilleure_actrice_ao",
          name_fr: "Meilleure Actrice de l'Afrique de l'Ouest",
          name_en: "Best Actress of West Africa",
          nominees: [
            {
              name: "Fatoumata DIAWARA",
              country: "Mali",
              work: "Sira",
              image: "/images/burkina_faso_feminin_irene_minoungou.jpg",
              isWinner: false
            }
          ]
        },
        {
          id: "meilleur_acteur_ao_11e",
          name_fr: "Sotigui du Meilleur Acteur de l'Afrique de l'Ouest",
          name_en: "Sotigui of the Best Actor of West Africa",
          nominees: [
            {
              name: "Prisca MARCELENEY",
              country: "Côte d'Ivoire",
              work: "Anthôman ou Pour l'honneur",
              image: "/images/nominee_11_prisca_marceleney.jpg",
              isWinner: false
            },
            {
              name: "Aïda Niatta MAATIKARA",
              country: "Burkina Faso",
              work: "Les 3 Lascars 2",
              image: "/images/nominee_11_aida_maatikara.jpg",
              isWinner: false
            }
          ],
        },
        {
          id: "meilleure_interpretation_feminine_serie",
          name_fr: "Meilleure Interprétation Féminine Africaine – Série TV",
          name_en: "Best Female Performance – TV Series",
          nominees: [
            {
              name: "Bienvenue KOFFI",
              country: "Côte d'Ivoire",
              work: "Les Nounous Saison 3",
              image: "/images/nominee_11_bienvenue_koffi.jpg",
              isWinner: false
            },
            {
              name: "Astou DIAW",
              country: "Sénégal",
              work: "XALISSO",
              image: "/images/nominee_11_astou_diaw.jpg",
              isWinner: false
            },
            {
              name: "Amina DIALLO",
              country: "Sénégal",
              work: "Bété",
              image: "/images/serie_tv_feminin_keisha_khadija_deme.jpg",
              isWinner: false
            }
          ]
        },
        {
          id: "meilleure_interpretation_masculine_serie",
          name_fr: "Meilleure Interprétation Masculine Africaine – Série TV",
          name_en: "Best Male Performance – TV Series",
          nominees: [
            {
              name: "Biggy King (Jean-François Ettien)",
              country: "Côte d'Ivoire",
              work: "Les Nounous",
              image: "/images/espoir_serie_tv_jean_francois_ettien.jpg",
              isWinner: false
            },
            {
              name: "Souleymane Seye NDIAYE",
              country: "Sénégal",
              work: "Wara",
              image: "/images/serie_tv_masculin_moussa_sow.jpg",
              isWinner: false
            },
            {
              name: "Mahamady NANA",
              country: "Burkina Faso",
              work: "Inspecteur Sori",
              image: "/images/afrique_de_l_ouest_mahamady_nana.jpg",
              isWinner: false
            },
            {
              name: "Gaël HOUNKPATIN",
              country: "Bénin",
              work: "Apparences",
              image: "/images/nominee_11_gael_hounkpatin.jpg",
              isWinner: false
            }
          ]
        },
        {
          id: "meilleur_espoir_serie",
          name_fr: "Meilleur Espoir Africain – Série TV",
          name_en: "Best African Hope – TV Series",
          nominees: [
            {
              name: "Marie-Odile GONDO",
              country: "Côte d'Ivoire",
              work: "Les Nounous",
              image: "/images/laureat_diariatou_sow.jpg",
              isWinner: false
            },
            {
              name: "Thierry YAKE (DJ TikTok)",
              country: "Côte d'Ivoire",
              work: "Y'a Braquage au village",
              image: "/images/espoir_africain_pape_aly_diop.jpg",
              isWinner: false
            }
          ]
        },
        {
          id: "meilleur_jeune_acteur",
          name_fr: "Meilleur Jeune Acteur Africain",
          name_en: "Best Young African Actor",
          nominees: [
            {
              name: "Ephraïm OKA",
              country: "Côte d'Ivoire",
              work: "Ebinto",
              image: "/images/plus_jeune_acteur_marcelino_antonio_ingira.jpg",
              isWinner: false
            },
            {
              name: "Lionel BAMBARA",
              country: "Burkina Faso",
              work: "L'ami de mon père",
              image: "/images/plus_jeune_acteur_lionel_bambara.jpg",
              isWinner: false
            }
          ]
        },
        {
          id: "meilleur_acteur_aa_11e",
          name_fr: "Sotigui du Meilleur Acteur de l'Afrique Australe",
          name_en: "Sotigui of the Best Actor of Southern Africa",
          nominees: [
            {
              name: "Silvio Emerson De Sousa Ferreira DO NASCIMENTO",
              country: "Angola",
              work: "MALDITO AMOR",
              image: "/images/nominee_11_silvio_nascimento.jpg",
              isWinner: false
            },
            {
              name: "Siyabonga SHIBE",
              country: "Afrique du Sud",
              work: "Laundry (Uhlanjululo)",
              image: "/images/nominee_11_siyabonga_shibe.jpg",
              isWinner: false
            },
            {
              name: "Admiro de Laura MUNGUAMBE",
              country: "Mozambique",
              work: "O Profeta",
              image: "/images/nominee_11_admiro_munguambe.jpg",
              isWinner: false
            }
          ]
        },
        {
          id: "meilleur_acteur_ac_11e",
          name_fr: "Sotigui du Meilleur Acteur de l'Afrique Centrale",
          name_en: "Sotigui of the Best Actor of Central Africa",
          nominees: [
            {
              name: "Achouackh ABAKAR SOULEYMANE",
              country: "Tchad",
              work: "Soumsoum, the Night of the Stars",
              image: "/images/nominee_11_achouackh_souleymane.jpg",
              isWinner: false
            },
            {
              name: "Emy Dany BASSONG",
              country: "Cameroun",
              work: "LE PRIX DU POUVOIR",
              image: "/images/nominee_11_emy_dany_bassong.jpg",
              isWinner: false
            }
          ]
        },
        {
          id: "meilleur_acteur_ng_11e",
          name_fr: "Sotigui du Meilleur Acteur Nigeria / Ghana",
          name_en: "Sotigui of the Best Actor Nigeria / Ghana",
          nominees: [
            {
              name: "Adjetey ANANG",
              country: "Ghana",
              work: "VIRGIN OF THE THRONE",
              image: "/images/nominee_11_adjetey_anang.jpg",
              isWinner: false
            }
          ]
        },
        {
          id: "meilleur_acteur_ae_11e",
          name_fr: "Sotigui du Meilleur Acteur de l'Afrique de l'Est",
          name_en: "Sotigui of the Best Actor of East Africa",
          nominees: [
            {
              name: "Clémentine U. NYIRINKINDI",
              country: "Rwanda",
              work: "Ben'imana",
              image: "/images/nominee_11_clementine_nyirinkindi.jpg",
              isWinner: false
            },
            {
              name: "Jacky VIKE",
              country: "Kenya",
              work: "INSIDE JOB",
              image: "/images/nominee_11_jacky_vike.jpg",
              isWinner: false
            },
            {
              name: "Mihad MURTTADA",
              country: "Soudan",
              work: "COTTON QUEEN",
              image: "/images/nominee_11_mihad_murttada.jpg",
              isWinner: false
            }
          ]
        },
        {
          id: "meilleur_acteur_diaspora_11e",
          name_fr: "Sotigui du Meilleur Acteur de la Diaspora",
          name_en: "Sotigui of the Best Actor of the Diaspora",
          nominees: [
            {
              name: "Eriq EBOUANEY",
              country: "France/Cameroun",
              work: "L2: Empuraan",
              image: "/images/nominee_11_eriq_ebouaney.jpg",
              isWinner: false
            },
            {
              name: "Michael B. JORDAN",
              country: "USA",
              work: "SINNERS",
              image: "/images/nominee_11_michael_b_jordan.jpg",
              isWinner: false
            },
            {
              name: "Lupita NYONG'O",
              country: "Mexique/Kenya",
              work: "A Quiet Place: Day One",
              image: "/images/nominee_11_lupita_nyongo.jpg",
              isWinner: false
            }
          ]
        },
        {
          id: "meilleur_acteur_an_11e",
          name_fr: "Sotigui du Meilleur Acteur de l'Afrique du Nord",
          name_en: "Sotigui of the Best Actor of North Africa",
          nominees: [
            {
              name: "Fatima ATTIF",
              country: "Maroc",
              work: "Goundafa the cursed song",
              image: "/images/nominee_11_fatima_attif.jpg",
              isWinner: false
            },
            {
              name: "Mohamed FARRAG",
              country: "Egypte",
              work: "El Sett",
              image: "/images/nominee_11_mohamed_farrag.jpg",
              isWinner: false
            },
            {
              name: "Saja KILANI",
              country: "Tunisie",
              work: "The Voice of Hind Rajab",
              image: "/images/nominee_11_saja_kilani.jpg",
              isWinner: false
            }
          ]
        }
      ]
    }
  ];

  // State
  const [selectedEdition, setSelectedEdition] = useState(EDITIONS[0])
  const [selectedCategory, setSelectedCategory] = useState(EDITIONS[0].categories[0] || null)
  const [isEditionDropdownOpen, setIsEditionDropdownOpen] = useState(false)
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)

  // Handle changes
  const handleEditionChange = (edition: Edition) => {
    setSelectedEdition(edition)
    setSelectedCategory(edition.categories[0] || null)
    setIsEditionDropdownOpen(false)
    setIsCategoryDropdownOpen(false)
  }

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* 1. Selectors Block */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-dark-surface/50 border border-border-color/60 rounded-3xl p-6 shadow-2xl relative z-30">
        
        {/* Dropdown 1: Éditions Selection */}
        <div className="relative w-full md:w-72 shrink-0">
          <label className="text-[10px] text-gold-light uppercase tracking-widest font-bold block mb-2 font-serif">
            {isEn ? 'Select Edition' : 'Sélectionner l\'édition'}
          </label>
          <button
            onClick={() => {
              setIsEditionDropdownOpen(!isEditionDropdownOpen)
              setIsCategoryDropdownOpen(false)
            }}
            className="w-full bg-dark-bg border border-border-color/80 hover:border-gold-primary rounded-xl px-4 py-3 flex items-center justify-between text-ivory text-sm font-semibold transition-all duration-300 shadow-md"
          >
            <span className="flex items-center gap-2">
              <Trophy size={16} className="text-gold-light" />
              {isEn ? selectedEdition.name_en : selectedEdition.name_fr} ({selectedEdition.year})
            </span>
            <ChevronDown
              size={16}
              className={`text-gold-light transition-transform duration-300 ${
                isEditionDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isEditionDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-dark-surface border border-border-color rounded-xl shadow-2xl overflow-hidden z-40 max-h-60 overflow-y-auto backdrop-blur-md">
              {EDITIONS.map((ed) => (
                <button
                  key={ed.id}
                  onClick={() => handleEditionChange(ed)}
                  className={`w-full px-4 py-3 text-left text-sm font-semibold transition-colors duration-200 flex items-center justify-between ${
                    selectedEdition.id === ed.id
                      ? 'bg-gold-primary text-black'
                      : 'text-ivory hover:bg-gold-primary/10 hover:text-gold-light'
                  }`}
                >
                  <span>{isEn ? ed.name_en : ed.name_fr}</span>
                  <span className={`text-xs ${selectedEdition.id === ed.id ? 'text-black/80' : 'text-gray-text'}`}>
                    {ed.year}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown 2: Categories Selection (Unified like Editions dropdown) */}
        <div className="relative w-full md:flex-grow">
          <label className="text-[10px] text-gold-light uppercase tracking-widest font-bold block mb-2 font-serif">
            {isEn ? 'Select Category' : 'Sélectionner la catégorie'}
          </label>
          {selectedEdition.categories.length > 0 ? (
            <div className="relative">
              <button
                onClick={() => {
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  setIsEditionDropdownOpen(false)
                }}
                className="w-full bg-dark-bg border border-border-color/80 hover:border-gold-primary rounded-xl px-4 py-3 flex items-center justify-between text-ivory text-sm font-semibold transition-all duration-300 shadow-md"
              >
                <span className="flex items-center gap-2">
                  <Award size={16} className="text-gold-light animate-pulse" />
                  {isEn ? selectedCategory?.name_en : selectedCategory?.name_fr}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gold-light transition-transform duration-300 ${
                    isCategoryDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-dark-surface border border-border-color rounded-xl shadow-2xl overflow-hidden z-40 max-h-60 overflow-y-auto backdrop-blur-md">
                  {selectedEdition.categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat)
                        setIsCategoryDropdownOpen(false)
                      }}
                      className={`w-full px-4 py-3 text-left text-sm font-semibold transition-colors duration-200 flex items-center justify-between ${
                        selectedCategory?.id === cat.id
                          ? 'bg-gold-primary text-black'
                          : 'text-ivory hover:bg-gold-primary/10 hover:text-gold-light'
                      }`}
                    >
                      <span>{isEn ? cat.name_en : cat.name_fr}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-dark-bg border border-border-color/40 rounded-xl px-4 py-3 text-xs text-gray-text italic">
              {isEn ? 'No category data loaded for this archives edition.' : 'Aucune donnée de catégorie chargée pour cette édition d\'archive.'}
            </div>
          )}
        </div>
      </div>

      {/* 2. Nominees List Display */}
      {selectedCategory ? (
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1 border-b border-border-color pb-4">
            <span className="text-[10px] text-gold-light uppercase tracking-widest font-bold font-serif flex items-center gap-1.5">
              <Sparkles size={12} />
              {isEn ? 'Official Nominations & Results' : 'Nominations officielles & Résultats'}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-ivory tracking-tight">
              {isEn ? selectedCategory.name_en : selectedCategory.name_fr}
            </h2>
            <p className="text-xs text-gray-text">
              {selectedEdition.location} • {selectedEdition.year}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedCategory.nominees.map((nominee) => (
              <div
                key={nominee.name}
                className={`bg-dark-surface border rounded-3xl p-5 flex flex-col gap-4 shadow-xl group transition-all duration-300 transform hover:-translate-y-1.5 relative overflow-hidden ${
                  nominee.isWinner
                    ? 'border-gold-primary/70 bg-gradient-to-b from-gold-primary/5 via-dark-surface to-dark-surface shadow-gold-primary/5'
                    : 'border-border-color/60 hover:border-gold-primary/30'
                }`}
              >
                {/* Winner Gold Glow Effect background */}
                {nominee.isWinner && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold-primary/5 rounded-full blur-2xl pointer-events-none" />
                )}

                {/* Status Badge */}
                <div className="absolute top-8 left-8 z-20 shadow-md">
                  {nominee.isWinner ? (
                    <span className="bg-gradient-to-r from-gold-primary to-gold-light text-black font-black uppercase text-[9px] tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg border border-gold-light/20">
                      🏆 {isEn ? 'LAUREATE' : 'LAURÉAT'}
                    </span>
                  ) : (
                    <span className="bg-dark-bg/95 backdrop-blur-sm text-ivory font-bold uppercase text-[9px] tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 border border-border-color/85">
                      🎖️ {isEn ? 'NOMINEE' : 'NOMINÉ'}
                    </span>
                  )}
                </div>

                {/* Poster Display */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={nominee.image}
                    alt={nominee.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
                </div>

                {/* Nominee details */}
                <div className="flex flex-col gap-2 mt-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-gold-light uppercase tracking-widest font-bold">
                    <Flag size={10} />
                    {nominee.country}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-ivory group-hover:text-gold-light transition-colors duration-300">
                    {nominee.name}
                  </h3>
                  <div className="flex gap-2 items-start text-xs text-gray-text mt-1 italic min-h-[36px]">
                    <Film size={14} className="text-gold-light shrink-0 mt-0.5" />
                    <span>Dans {nominee.work}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border-color/60 rounded-3xl bg-dark-surface/20">
          <Award size={48} className="text-gold-light/20 mb-3" />
          <p className="text-sm text-gray-text italic text-center px-4">
            {isEn ? 'Select a category to view nominees.' : 'Sélectionnez une catégorie pour afficher les lauréats et nommés.'}
          </p>
        </div>
      )}
    </div>
  )
}
