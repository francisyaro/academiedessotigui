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
      id: '10e',
      name_fr: '10ème Édition',
      name_en: '10th Edition',
      year: 2025,
      location: 'Ouagadougou, Burkina Faso',
      categories: [
        {
          id: 'meilleur_acteur_ao',
          name_fr: 'Sotigui du Meilleur Acteur de l’Afrique de l’Ouest',
          name_en: 'Sotigui of the Best Actor of West Africa',
          nominees: [
            {
              name: 'Cheikh Babou GAYE',
              country: 'Sénégal',
              work: '"NANAS" de Khalifa BA',
              image: '/images/afrique_de_l_ouest_cheikh_babou_gaye.jpg',
              isWinner: true
            },
            {
              name: 'Arthur LONGVILLE',
              country: 'Côte d\'Ivoire',
              work: '"LE SACRIFICE" de Landry AGBADOU',
              image: '/images/afrique_de_l_ouest_arthur_longville.jpg',
              isWinner: false
            },
            {
              name: 'Mahamady NANA',
              country: 'Burkina Faso',
              work: '"KATANGA, LA DANSE DES SCORPIONS" de Dani KOUYATE',
              image: '/images/afrique_de_l_ouest_mahamady_nana.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleur_acteur_an',
          name_fr: 'Sotigui du Meilleur Acteur de l’Afrique du Nord',
          name_en: 'Sotigui of the Best Actor of North Africa',
          nominees: [
            {
              name: 'Nisrin ERRADI',
              country: 'Maroc',
              work: '"EVERYBODY LOVES TOUDA" de Nabil AYOUCH',
              image: '/images/afrique_du_nord_nisrin_erradi.jpg',
              isWinner: true
            },
            {
              name: 'Sammy LECHEA',
              country: 'Algérie',
              work: '"L\'EFFACEMENT" de Karim MOUSSAOUI',
              image: '/images/afrique_du_nord_sammy_lechea.jpg',
              isWinner: false
            },
            {
              name: 'Fatma SFAR',
              country: 'Tunisie',
              work: '"AICHA" de Mehdi BARSOUI',
              image: '/images/afrique_du_nord_fatma_sfar.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleur_acteur_ae',
          name_fr: 'Sotigui du Meilleur Acteur de l’Afrique de l’Est',
          name_en: 'Sotigui of the Best Actor of East Africa',
          nominees: [
            {
              name: 'Ednara CONCEIÇÃO',
              country: 'Angola',
              work: '"ACAIXA" de Carlos G. RODRIGUES',
              image: '/images/afrique_de_l_est_ednara_conceicao.jpg',
              isWinner: true
            },
            {
              name: 'Aline AMike',
              country: 'Rwanda',
              work: '"MINIMALS IN A TITANIC WORLD / UN MONDE TITANIC" de Philbert Aimé MBABAZI SHARANGABO',
              image: '/images/afrique_de_l_est_aline_amike.jpg',
              isWinner: false
            },
            {
              name: 'Debbie BAKUSEKA',
              country: 'Ouganda',
              work: '"PHILBERT AIMÉ MBABAZI SHARANGABO" de Rehema NANFUKA',
              image: '/images/afrique_de_l_est_debbie_bakuseka.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleur_acteur_ac',
          name_fr: 'Sotigui du Meilleur Acteur de l’Afrique Centrale',
          name_en: 'Sotigui of the Best Actor of Central Africa',
          nominees: [
            {
              name: 'Thérèse NGONO',
              country: 'Cameroun',
              work: '"INDOMPTABLES" de Thomas NGIJOL',
              image: '/images/afrique_centrale_therese_ngono.jpg',
              isWinner: true
            },
            {
              name: 'Ferdinand MBAISSANE',
              country: 'Tchad',
              work: '"DIYA" de Achille RONAIMOU',
              image: '/images/afrique_centrale_ferdinand_mbaissane.jpg',
              isWinner: false
            },
            {
              name: 'Olivier KISSITA',
              country: 'République du Congo',
              work: '"SEX LOVE AND MONEY" de Owen BROWN',
              image: '/images/afrique_centrale_olivier_kissita.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleur_acteur_ng_gh',
          name_fr: 'Sotigui du Meilleur Acteur Nigeria / Ghana',
          name_en: 'Sotigui of the Best Actor Nigeria / Ghana',
          nominees: [
            {
              name: 'Kwadwo NKANSAH alias Lil Win',
              country: 'Ghana',
              work: '"CAPITAIN IBRAHIM TRAORE" de Jackson K. BENTUM',
              image: '/images/nigeria_ghana_kwadwo_nkansah.jpg',
              isWinner: true
            },
            {
              name: 'Nnamdi AGBO',
              country: 'Nigéria',
              work: '"LE DETOURNEMENT (HIJACK 93)" de Robert O. PETERS',
              image: '/images/nigeria_ghana_nnamdi_agbo.jpg',
              isWinner: false
            },
            {
              name: 'Wole OJO',
              country: 'Nigéria',
              work: '"L\'HOMME EST MORT" de Awam AMKPA',
              image: '/images/nigeria_ghana_wole_ojo.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleur_acteur_diaspora',
          name_fr: 'Sotigui du Meilleur Acteur de la Diaspora',
          name_en: 'Sotigui of the Best Actor of Diaspora',
          nominees: [
            {
              name: 'Ibrahim MBAYE',
              country: 'Sénégal',
              work: '"NI CHAINES NI MAITRES" de Simon MOUTAIROU',
              image: '/images/diaspora_ibrahim_mbaye.jpg',
              isWinner: true
            },
            {
              name: 'Taraji P. HENSON',
              country: 'USA',
              work: '"A BOUT" de Tyler PERRY',
              image: '/images/diaspora_taraji_p_henson.jpg',
              isWinner: false
            },
            {
              name: 'Thomas NGIJOL',
              country: 'France / Cameroun',
              work: '"INDOMPTABLES" de Thomas NGIJOL',
              image: '/images/diaspora_thomas_ngijol.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleure_interpretation_feminine_serie_tv',
          name_fr: 'Sotigui de la Meilleure Interprétation Féminine Africaine Série TV',
          name_en: 'Sotigui of the Best Female Interpretation African TV Show',
          nominees: [
            {
              name: 'Eve GUEHI',
              country: 'Côte d\'Ivoire',
              work: '"LES NOUNOUS" de Franck VLEHI & Marina NIAVA',
              image: '/images/serie_tv_feminin_eve_guehi.jpg',
              isWinner: true
            },
            {
              name: 'Hortavie MPONDO',
              country: 'Cameroun',
              work: '"REVELATIONS SCANDALEUSES" de Ebenezer KEPOMBIA',
              image: '/images/serie_tv_feminin_hortavie_mpondo.jpg',
              isWinner: false
            },
            {
              name: 'Keisha Khadija DEME',
              country: 'Sénégal',
              work: '"KEY & ZA" de Peter AYIVOR',
              image: '/images/serie_tv_feminin_keisha_khadija_deme.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleure_interpretation_masculine_serie_tv',
          name_fr: 'Sotigui de la Meilleure Interprétation Masculine Africaine Série TV',
          name_en: 'Sotigui of the Best Male Interpretation African TV Show',
          nominees: [
            {
              name: 'Fortune AKAKPO',
              country: 'Côte d\'Ivoire',
              work: '"LES NOUNOUS" de Franck VLEHI & Marina NIAVA',
              image: '/images/serie_tv_masculin_fortune_akakpo.jpg',
              isWinner: true
            },
            {
              name: 'Moussa SOW',
              country: 'Sénégal',
              work: '"CŒURS BRISES" de EVENPROD',
              image: '/images/serie_tv_masculin_moussa_sow.jpg',
              isWinner: false
            },
            {
              name: 'Femi ADEBAYO',
              country: 'Nigéria',
              work: '"SEVENS DOORS" de Femi ADEBAYO',
              image: '/images/serie_tv_masculin_femi_adebayo.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleur_plus_jeune_acteur_africain',
          name_fr: 'Sotigui du Meilleur plus Jeune Acteur Africain',
          name_en: 'Sotigui of the Best Younger African Actor',
          nominees: [
            {
              name: 'Rosine NGUEMGAING',
              country: 'Cameroun',
              work: '"CLASSE A PART" de Ghislain TOWA',
              image: '/images/plus_jeune_acteur_rosine_nguemgaing.jpg',
              isWinner: true
            },
            {
              name: 'Marcelino Antonio INGIRA',
              country: 'Guinée Bissau',
              work: '"NOME" de Sana NA N\'HADA',
              image: '/images/plus_jeune_acteur_marcelino_antonio_ingira.jpg',
              isWinner: false
            },
            {
              name: 'Lionel BAMBARA',
              country: 'Burkina Faso',
              work: '"KATANGA, LA DANSE DES SCORPIONS" de Dani KOUYATE',
              image: '/images/plus_jeune_acteur_lionel_bambara.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleur_espoir_africain',
          name_fr: 'Sotigui du Meilleur Espoir Africain',
          name_en: 'Sotigui of the Best African Hope',
          nominees: [
            {
              name: 'Pape Aly DIOP',
              country: 'Sénégal',
              work: '"TIMPI TAMPA" de Adama Bineta SOW',
              image: '/images/espoir_africain_pape_aly_diop.jpg',
              isWinner: true
            },
            {
              name: 'Yassine SAMOUNI',
              country: 'Tunisie',
              work: '"LES ENFANTS ROUGES" de Lotfi ACHOUR',
              image: '/images/espoir_africain_yassine_samouni.jpg',
              isWinner: false
            },
            {
              name: 'Youssef KADIR',
              country: 'Maroc',
              work: '"LE LAC BLEU" de Daoud AOULAD SYAD',
              image: '/images/espoir_africain_youssef_kadir.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleur_espoir_africain_serie_tv',
          name_fr: 'Sotigui du Meilleur Espoir Africain Série TV',
          name_en: 'Sotigui of the Best Hope African TV Show',
          nominees: [
            {
              name: 'Diariatou SOW',
              country: 'Sénégal',
              work: '"CREDULE" de Almoukhtari JANTLER',
              image: '/images/espoir_serie_tv_diariatou_sow.jpg',
              isWinner: true
            },
            {
              name: 'Aliu GAFAR',
              country: 'Nigéria',
              work: '"SEVENS DOORS" de Femi ADEBAYO',
              image: '/images/espoir_serie_tv_aliu_gafar.jpg',
              isWinner: false
            },
            {
              name: 'Jean François ETTIEN',
              country: 'Côte d\'Ivoire',
              work: '"LES NOUNOUS" de Franck VLEHI & Marina NIAVA',
              image: '/images/espoir_serie_tv_jean_francois_ettien.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleure_interpretation_feminine_burkinabe',
          name_fr: 'Sotigui de la Meilleure Interprétation Féminine Burkinabè',
          name_en: 'Sotigui of the Best Burkinabè Female Interpretation',
          nominees: [
            {
              name: 'Adissa ILBOUDO',
              country: 'Burkina Faso',
              work: '"KATANGA, LA DANSE DES SCORPIONS" de Dani KOUYATE',
              image: '/images/burkina_faso_feminin_adissa_ilboudo.jpg',
              isWinner: true
            },
            {
              name: 'COULIBALY Hafissatou',
              country: 'Burkina Faso',
              work: '"LES INVERTIEUSES" de Aïcha BORO',
              image: '/images/burkina_faso_feminin_coulibaly_hafissatou.jpg',
              isWinner: false
            },
            {
              name: 'Irène MINOUNGOU',
              country: 'Burkina Faso',
              work: '"CHOC MORTEL" de Euloge HOUNSOU',
              image: '/images/burkina_faso_feminin_irene_minoungou.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleure_interpretation_masculine_burkinabe',
          name_fr: 'Sotigui de la Meilleure Interprétation Masculine Burkinabè',
          name_en: 'Sotigui of the Best Burkinabè Male Interpretation',
          nominees: [
            {
              name: 'Dramane OUEDRAOGO',
              country: 'Burkina Faso',
              work: '"KATANGA, LA DANSE DES SCORPIONS" de Dani KOUYATE',
              image: '/images/burkina_faso_masculin_dramane_ouedraogo.jpg',
              isWinner: true
            },
            {
              name: 'MANDJEM Heu Maurice Johnny Jonathan',
              country: 'Burkina Faso',
              work: '"UNE SI LONGUE NUIT" de Dephine YERBANGA',
              image: '/images/burkina_faso_masculin_mandjem_heu_maurice_johnny_jonathan.jpg',
              isWinner: false
            },
            {
              name: 'Tony OUEDRAOGO',
              country: 'Burkina Faso',
              work: '"BRAQUAGE A OUAGA" de Abdoul Aziz NIKIEMA',
              image: '/images/burkina_faso_masculin_tony_ouedraogo.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'sotigui_d_or',
          name_fr: 'Sotigui d\'Or',
          name_en: 'Sotigui d\'Or',
          nominees: [
            {
              name: 'Ibrahim MBAYE',
              country: 'Sénégal',
              work: '"NI CHAINES NI MAITRES" de Simon MOUTAIROU',
              image: '/images/laureat_sotigui_d_or_ibrahim_mbaye.jpg',
              isWinner: true
            }
          ]
        }
      ]
    },
    {
      id: '9e',
      name_fr: '9ème Édition',
      name_en: '9th Edition',
      year: 2024,
      location: 'Ouagadougou, Burkina Faso',
      categories: [
        {
          id: 'sotigui_d_or_9',
          name_fr: 'Sotigui d\'Or 2024',
          name_en: 'Sotigui d\'Or 2024',
          nominees: [
            {
              name: 'Lazare Minoungou',
              country: 'Burkina Faso',
              work: '"SIRA" d\'Apolline Traoré',
              image: '/images/trophy_dark.jpg',
              isWinner: true
            }
          ]
        }
      ]
    },
    {
      id: '8e',
      name_fr: '8ème Édition',
      name_en: '8th Edition',
      year: 2023,
      location: 'Ouagadougou, Burkina Faso',
      categories: []
    },
    {
      id: '7e',
      name_fr: '7ème Édition',
      name_en: '7th Edition',
      year: 2022,
      location: 'Ouagadougou, Burkina Faso',
      categories: [
        {
          id: 'meilleur_acteur_ac_7e',
          name_fr: 'Sotigui du Meilleur Acteur de l’Afrique Centrale',
          name_en: 'Sotigui of the Best Actor of Central Africa',
          nominees: [
            {
              name: 'Landry Nguetsa',
              country: 'Cameroun',
              work: '"KANKAN" de Joseph Akama',
              image: '/images/trophy_dark.jpg',
              isWinner: true
            },
            {
              name: 'Doria LEMBE',
              country: 'Congo Brazzaville',
              work: '"PARCOURS" de BONGO Said',
              image: '/images/afrique_centrale_2022_doria_lembe.jpg',
              isWinner: false
            },
            {
              name: 'Adjani Nancy NGELEKWA',
              country: 'RD Congo',
              work: '"ADJANI" de Julio Lolo BIBAS',
              image: '/images/afrique_centrale_2022_adjani_nancy_ngelekwa.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleur_acteur_ng_gh_7e',
          name_fr: 'Sotigui du Meilleur Acteur Nigeria / Ghana',
          name_en: 'Sotigui of the Best Actor Nigeria / Ghana',
          nominees: [
            {
              name: 'Lydia Forson',
              country: 'Ghana',
              work: '"BORGA" de York-Fabian Raabe',
              image: '/images/trophy_dark.jpg',
              isWinner: true
            },
            {
              name: 'Blossom Chukwujekwu',
              country: 'Nigéria',
              work: '"THE RISE OF IGBINOGUN" de Onesoul',
              image: '/images/nigeria_ghana_2022_blossom_chukwujekwu.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleure_interpretation_feminine_serie_tv_7e',
          name_fr: 'Sotigui de la Meilleure Interprétation Féminine Africaine Série TV',
          name_en: 'Sotigui of the Best Female Interpretation African TV Show',
          nominees: [
            {
              name: 'Khady Touré',
              country: 'Côte d\'Ivoire',
              work: '"L\'INDOMPTABLE" de Franck Vlehi',
              image: '/images/trophy_dark.jpg',
              isWinner: true
            },
            {
              name: 'Awa Djiga KANE',
              country: 'Sénégal',
              work: '"VAUTOURS" de Ibou GAYE',
              image: '/images/serie_tv_feminin_2022_awa_djiga_kane.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'meilleur_acteur_an_7e',
          name_fr: 'Sotigui du Meilleur Acteur de l’Afrique du Nord',
          name_en: 'Sotigui of the Best Actor of North Africa',
          nominees: [
            {
              name: 'Fatma Ben Saidane',
              country: 'Tunisie',
              work: '"J\'IRAI AU DIABLE" de Ismahane Lahmar',
              image: '/images/trophy_dark.jpg',
              isWinner: true
            },
            {
              name: 'Demyana NASSAR',
              country: 'Égypte',
              work: '"FEATHERS" de Omar EL ZOHANY',
              image: '/images/afrique_du_nord_2022_demyana_nassar.jpg',
              isWinner: false
            }
          ]
        },
        {
          id: 'sotigui_d_or_7e',
          name_fr: 'Sotigui d\'Or 2022',
          name_en: 'Sotigui d\'Or 2022',
          nominees: [
            {
              name: 'Roger Felmont Sallah',
              country: 'Sénégal',
              work: '"SALOUM" de Jean-Luc Herbulot',
              image: '/images/trophy_dark.jpg',
              isWinner: true
            }
          ]
        }
      ]
    },
    {
      id: '6e',
      name_fr: '6ème Édition',
      name_en: '6th Edition',
      year: 2021,
      location: 'Ouagadougou, Burkina Faso',
      categories: []
    },
    {
      id: '5e',
      name_fr: '5ème Édition',
      name_en: '5th Edition',
      year: 2020,
      location: 'Ouagadougou, Burkina Faso',
      categories: []
    },
    {
      id: '4e',
      name_fr: '4ème Édition',
      name_en: '4th Edition',
      year: 2019,
      location: 'Ouagadougou, Burkina Faso',
      categories: []
    }
  ]

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
