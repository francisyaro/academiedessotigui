export interface VideoItem {
  url: string
  password?: string
  title?: string
}

export interface NomineeVideoExtract {
  id: string
  actorName: string
  country: string
  filmTitle: string
  director?: string
  portraitPath: string
  videoUrl?: string
  videoUrls?: string[]
  videoItems?: VideoItem[]
  videoPassword?: string
}

export interface AcademyCategory {
  id: string
  slug: string
  titleFr: string
  titleEn: string
  googleFormUrl: string
  bannerPath?: string
  nominees: NomineeVideoExtract[]
}

export const ACADEMY_CATEGORIES: AcademyCategory[] = [
  {
    id: "cat_australe",
    slug: "le-sotigui-du-meilleur-acteur-de-lafrique-australe",
    titleFr: "Sotigui du Meilleur Acteur de l'Afrique Australe",
    titleEn: "Sotigui of the Best Actor of Southern Africa",
    googleFormUrl: "https://forms.gle/BMgEZSoQPdgu5KeZ9",
    bannerPath: "/images/category_banner_afrique_australe.jpg",
    nominees: [
      {
        id: "australe_1",
        actorName: "Silvio Emerson DO NASCIMENTO",
        country: "Angola",
        filmTitle: "MALDITO AMOR",
        director: "Ladislau Ramalho",
        portraitPath: "/images/nominee_11_silvio_nascimento.jpg",
        videoItems: [
          { url: "https://vimeo.com/1170950826", password: "Diamond25", title: "Extrait 1" },
          { url: "https://vimeo.com/1127099277", password: "Val1923", title: "Extrait 2" }
        ]
      },
      {
        id: "australe_2",
        actorName: "Siyabonga SHIBE",
        country: "Afrique du Sud",
        filmTitle: "Laundry (Uhlanjululo)",
        director: "Zamo Mkhwanazi",
        portraitPath: "/images/nominee_11_siyabonga_shibe.jpg"
      },
      {
        id: "australe_3",
        actorName: "Admiro de Laura MUNGUAMBE",
        country: "Mozambique",
        filmTitle: "O Profeta",
        director: "Ique Langa",
        portraitPath: "/images/nominee_11_admiro_munguambe.jpg"
      }
    ]
  },
  {
    id: "cat_centrale",
    slug: "le-sotigui-du-meilleur-acteur-de-lafrique-centrale",
    titleFr: "Sotigui du Meilleur Acteur de l'Afrique Centrale",
    titleEn: "Sotigui of the Best Actor of Central Africa",
    googleFormUrl: "https://forms.gle/fJ6a8R71Rus7WjYL6",
    bannerPath: "/images/category_banner_afrique_centrale.jpg",
    nominees: [
      {
        id: "centrale_1",
        actorName: "Achouackh ABAKAR SOULEYMANE",
        country: "Tchad",
        filmTitle: "Soumsoum, the Night of the Stars",
        director: "Mahamat-Saleh Haroun",
        portraitPath: "/images/nominee_11_achouackh_souleymane.jpg"
      },
      {
        id: "centrale_2",
        actorName: "Emy Dany BASSONG",
        country: "Cameroun",
        filmTitle: "LE PRIX DU POUVOIR",
        director: "Ebenezer Kepombia",
        portraitPath: "/images/nominee_11_emy_dany_bassong.jpg",
        videoUrl: "https://youtu.be/vOSgPa5Xzko"
      },
      {
        id: "centrale_3",
        actorName: "Tiss Warren MOMBO",
        country: "Gabon",
        filmTitle: "AFROTOPIA",
        director: "David Mboussou",
        portraitPath: "/images/nominee_11_tiss_warren_mombo.jpg"
      }
    ]
  },
  {
    id: "cat_diaspora",
    slug: "le-sotigui-du-meilleur-acteur-de-la-diaspora",
    titleFr: "Sotigui du Meilleur Acteur de la Diaspora",
    titleEn: "Sotigui of the Best Actor of the Diaspora",
    googleFormUrl: "https://forms.gle/MmKUhnR9hWXReY6W6",
    bannerPath: "/images/category_banner_diaspora.jpg",
    nominees: [
      {
        id: "diaspora_1",
        actorName: "Michael B. JORDAN",
        country: "USA",
        filmTitle: "SINNERS",
        director: "Ryan Coogler",
        portraitPath: "/images/nominee_11_michael_b_jordan.jpg"
      },
      {
        id: "diaspora_2",
        actorName: "Lupita NYONG'O",
        country: "Mexique/Kenya",
        filmTitle: "A Quiet Place: Day One",
        director: "Michael Sarnoski",
        portraitPath: "/images/nominee_11_lupita_nyongo.jpg"
      },
      {
        id: "diaspora_3",
        actorName: "Eriq EBOUANEY",
        country: "France/Cameroun",
        filmTitle: "L2: Empuraan",
        director: "Prithviraj Sukumaran",
        portraitPath: "/images/nominee_11_eriq_ebouaney.jpg"
      }
    ]
  },
  {
    id: "cat_est",
    slug: "le-sotigui-du-meilleur-acteur-de-lafrique-de-lest",
    titleFr: "Sotigui du Meilleur Acteur de l'Afrique de l'Est",
    titleEn: "Sotigui of the Best Actor of East Africa",
    googleFormUrl: "https://forms.gle/gdQgpeTE3JqzaiEH8",
    bannerPath: "/images/category_banner_afrique_est.jpg",
    nominees: [
      {
        id: "est_1",
        actorName: "Jacky VIKE",
        country: "Kenya",
        filmTitle: "INSIDE JOB",
        director: "Nick Mutuma",
        portraitPath: "/images/nominee_11_jacky_vike.jpg"
      },
      {
        id: "est_2",
        actorName: "Mihad MURTTADA",
        country: "Soudan",
        filmTitle: "COTTON QUEEN",
        director: "Suzannah Mirghani",
        portraitPath: "/images/nominee_11_mihad_murttada.jpg",
        videoUrl: "https://vimeo.com/1226136798?share=copy&fl=sv&fe=ci",
        videoPassword: "sudan2"
      },
      {
        id: "est_3",
        actorName: "Clémentine U. NYIRINKINDI",
        country: "Rwanda",
        filmTitle: "Ben'imana",
        director: "Kantarama Gahigiri",
        portraitPath: "/images/nominee_11_clementine_nyirinkindi.jpg"
      }
    ]
  },
  {
    id: "cat_nord",
    slug: "le-sotigui-du-meilleur-acteur-de-lafrique-du-nord",
    titleFr: "Sotigui du Meilleur Acteur de l'Afrique du Nord",
    titleEn: "Sotigui of the Best Actor of North Africa",
    googleFormUrl: "https://forms.gle/29xBZaLJ2vqE9Hf57",
    bannerPath: "/images/category_banner_afrique_nord.jpg",
    nominees: [
      {
        id: "nord_1",
        actorName: "Fatima ATTIF",
        country: "Maroc",
        filmTitle: "Goundafa the cursed song",
        director: "Nabil Ayouch",
        portraitPath: "/images/nominee_11_fatima_attif.jpg"
      },
      {
        id: "nord_2",
        actorName: "Mohamed FARRAG",
        country: "Egypte",
        filmTitle: "El Sett",
        director: "Marwan Hamed",
        portraitPath: "/images/nominee_11_mohamed_farrag.jpg"
      },
      {
        id: "nord_3",
        actorName: "Saja KILANI",
        country: "Tunisie",
        filmTitle: "The Voice of Hind Rajab",
        director: "Kaouther Ben Hania",
        portraitPath: "/images/nominee_11_saja_kilani.jpg"
      }
    ]
  },
  {
    id: "cat_ouest",
    slug: "le-sotigui-du-meilleur-acteur-de-lafrique-de-louest",
    titleFr: "Sotigui du Meilleur Acteur de l'Afrique de l'Ouest",
    titleEn: "Sotigui of the Best Actor of West Africa",
    googleFormUrl: "https://forms.gle/zJvBnR6w3aF2eRVx5",
    bannerPath: "/images/category_banner_afrique_ouest.jpg",
    nominees: [
      {
        id: "ouest_1",
        actorName: "Prisca MARCELENEY",
        country: "Côte d'Ivoire",
        filmTitle: "Anthôman ou Pour l'honneur",
        director: "Jacques Trabi",
        portraitPath: "/images/nominee_11_prisca_marceleney.jpg"
      },
      {
        id: "ouest_2",
        actorName: "Souleymane Seye NDIAYE",
        country: "Sénégal",
        filmTitle: "VALDIODIO",
        director: "Amina Ndiaye Leclerc",
        portraitPath: "/images/nominee_11_souleymane_seye_ndiaye.jpg"
      },
      {
        id: "ouest_3",
        actorName: "Aïda Niatta MAATIKARA",
        country: "Burkina Faso",
        filmTitle: "Katanga",
        director: "Dani Kouyaté",
        portraitPath: "/images/nominee_11_aida_niatta_maatikara.jpg",
        videoUrl: "https://vimeo.com/1220230039?share=copy&fl=sv&fe=ci",
        videoPassword: "droma2"
      }
    ]
  },
  {
    id: "cat_ng_gh",
    slug: "le-sotigui-du-meilleur-acteur-nigeria-ghana",
    titleFr: "Sotigui du Meilleur Acteur Nigeria / Ghana",
    titleEn: "Sotigui of the Best Actor Nigeria / Ghana",
    googleFormUrl: "https://forms.gle/tf4pvwp2UTQ2zcSz9",
    bannerPath: "/images/category_banner_ng_gh.jpg",
    nominees: [
      {
        id: "ng_gh_1",
        actorName: "Adjetey ANANG",
        country: "Ghana",
        filmTitle: "VIRGIN OF THE THRONE",
        director: "Shirley Frimpong-Manso",
        portraitPath: "/images/nominee_11_adjetey_anang.jpg"
      },
      {
        id: "ng_gh_2",
        actorName: "Şope DÌRÍSÙ",
        country: "Nigéria",
        filmTitle: "My Father's Shadow",
        director: "Akinola Davies Jr.",
        portraitPath: "/images/nominee_11_sope_dirisu.jpg"
      },
      {
        id: "ng_gh_3",
        actorName: "Uche MONTANA",
        country: "Nigéria",
        filmTitle: "MONICA 2",
        director: "Uche Montana",
        portraitPath: "/images/nominee_11_uche_montana.jpg",
        videoUrl: "https://www.youtube.com/watch?v=7jteLIoNDaQ&t=178s"
      }
    ]
  },
  {
    id: "cat_plus_jeune",
    slug: "le-sotigui-du-meilleur-plus-jeune-acteur-africain",
    titleFr: "Sotigui du Meilleur Plus Jeune Acteur Africain",
    titleEn: "Sotigui of the Best Youngest African Actor",
    googleFormUrl: "https://forms.gle/iavTDianGX5Y5rzi6",
    bannerPath: "/images/category_banner_plus_jeune_acteur.jpg",
    nominees: [
      {
        id: "plus_jeune_1",
        actorName: "Diana BOULI",
        country: "Cameroun",
        filmTitle: "Les 3 Lascars 2",
        director: "Boubacar Diallo",
        portraitPath: "/images/nominee_11_diana_bouli.jpg",
        videoUrl: "https://vimeo.com/1220230039?share=copy&fl=sv&fe=ci",
        videoPassword: "droma2"
      },
      {
        id: "plus_jeune_2",
        actorName: "Ephraim OKA",
        country: "Côte d'Ivoire",
        filmTitle: "Ebinto",
        director: "Luc Gnepa",
        portraitPath: "/images/nominee_11_ephraim_oka.jpg",
        videoUrl: "https://vimeo.com/1204785807?fl=ip&fe=ec",
        videoPassword: "I2V"
      },
      {
        id: "plus_jeune_3",
        actorName: "Michel Lemuya IKENY",
        country: "Kenya",
        filmTitle: "Nawi, Dear Future me",
        director: "Vallentine Chelluget",
        portraitPath: "/images/nominee_11_michel_lemuya_ikeny.jpg"
      }
    ]
  },
  {
    id: "cat_espoir",
    slug: "le-sotigui-du-meilleur-espoir-africain",
    titleFr: "Sotigui du Meilleur Espoir Africain",
    titleEn: "Sotigui of the Best African Hope",
    googleFormUrl: "https://forms.gle/LGa7XwERF9X8rZ3R8",
    bannerPath: "/images/category_banner_espoir_africain.jpg",
    nominees: [
      {
        id: "espoir_1",
        actorName: "Adham SHUKR",
        country: "Egypte",
        filmTitle: "THE SETTLEMENT",
        director: "Mohamad RASHAD",
        portraitPath: "/images/nominee_11_adham_shukr.jpg"
      },
      {
        id: "espoir_2",
        actorName: "Thierry YAKÉ",
        country: "Côte d'Ivoire",
        filmTitle: "YA BRAQUAGE AU VILLAGE",
        director: "Odo Marie et Consty Peursy",
        portraitPath: "/images/nominee_11_thierry_yake.jpg",
        videoUrl: "https://vimeo.com/1206281951/0f03b1c6be"
      },
      {
        id: "espoir_3",
        actorName: "Fally IPUPA",
        country: "République Démocratique du Congo",
        filmTitle: "Rumba Royale",
        director: "Yohane Dean Lengol et Hamed Mobasser",
        portraitPath: "/images/nominee_11_fally_ipupa.jpg"
      }
    ]
  },
  {
    id: "cat_burkinabe_m",
    slug: "le-sotigui-de-la-meilleure-interpretation-masculine-burkinabe",
    titleFr: "Sotigui de la Meilleure Interprétation Masculine Burkinabè",
    titleEn: "Sotigui for Best Male Performance - Burkina Faso",
    googleFormUrl: "https://forms.gle/yKaR2ySkHeZ2PphJ9",
    bannerPath: "/images/category_banner_burkinabe_masculin.jpg",
    nominees: [
      {
        id: "burkinabe_m_1",
        actorName: "Charles WATTARA",
        country: "Burkina Faso",
        filmTitle: "LALA",
        director: "Omar SAMBA SEKOU",
        portraitPath: "/images/nominee_11_charles_wattara.jpg"
      },
      {
        id: "burkinabe_m_2",
        actorName: "Gérard OUÉDRAOGO",
        country: "Burkina Faso",
        filmTitle: "CA SUFFIT",
        director: "Alima Ouédraogo",
        portraitPath: "/images/nominee_11_gerard_ouedraogo.jpg"
      },
      {
        id: "burkinabe_m_3",
        actorName: "Soumaïla KABORÉ dit Soum le sapeur",
        country: "Burkina Faso",
        filmTitle: "PPS",
        director: "Soum le Sapeur",
        portraitPath: "/images/nominee_11_soumaila_kabore.jpg"
      }
    ]
  },
  {
    id: "cat_burkinabe_f",
    slug: "le-sotigui-de-la-meilleure-interpretation-feminine-burkinabe",
    titleFr: "Sotigui de la Meilleure Interprétation Féminine Burkinabè",
    titleEn: "Sotigui for Best Female Performance - Burkina Faso",
    googleFormUrl: "https://forms.gle/u6ZTr19ZLChcGdyYA",
    bannerPath: "/images/category_banner_burkinabe_feminin.jpg",
    nominees: [
      {
        id: "burkinabe_f_1",
        actorName: "Alima OUÉDRAOGO",
        country: "Burkina Faso",
        filmTitle: "CA SUFFIT",
        director: "Alima Ouédraogo",
        portraitPath: "/images/nominee_11_alima_ouedraogo.jpg"
      },
      {
        id: "burkinabe_f_2",
        actorName: "Patricia NABA",
        country: "Burkina Faso",
        filmTitle: "YIKIAN, DEBOUT",
        director: "Alidou BADINI",
        portraitPath: "/images/nominee_11_patricia_naba.jpg"
      },
      {
        id: "burkinabe_f_3",
        actorName: "Flora SAWADOGO",
        country: "Burkina Faso",
        filmTitle: "MAMAN DETESTE MA BELLE MERE",
        director: "Omar Dagnon",
        portraitPath: "/images/nominee_11_flora_sawadogo.jpg"
      }
    ]
  },
  {
    id: "cat_espoir_tv",
    slug: "le-sotigui-du-meilleur-espoir-africain-serie-tv",
    titleFr: "Sotigui du Meilleur Espoir Africain Série TV",
    titleEn: "Sotigui for Best Hope African TV Series",
    googleFormUrl: "https://forms.gle/HsAVQ1AcQcvZUytn8",
    bannerPath: "/images/category_banner_espoir_serie_tv.jpg",
    nominees: [
      {
        id: "espoir_tv_1",
        actorName: "EL Hadj Hamadou DIOP",
        country: "Sénégal",
        filmTitle: "LAKANTANE, la méduse",
        director: "Angèle Diabang & Kismath Baguiri",
        portraitPath: "/images/nominee_11_el_hadj_hamadou_diop.jpg"
      },
      {
        id: "espoir_tv_2",
        actorName: "Jenny MEZILE",
        country: "Haïti",
        filmTitle: "le secret des Bagayoko",
        director: "Boubacar Diallo",
        portraitPath: "/images/nominee_11_jenny_mezile.jpg"
      },
      {
        id: "espoir_tv_3",
        actorName: "Marie-Odile GONDO dite ODO MARIE",
        country: "Côte d'Ivoire",
        filmTitle: "LES NOUNOUS SAISON 3",
        director: "Franck Vlehi",
        portraitPath: "/images/nominee_11_marie_odile_gondo.jpg",
        videoUrls: [
          "https://vimeo.com/1205932593/1479dcdb32?share=copy&fl=sv&fe=ci",
          "https://vimeo.com/1205936214/98a2ac1d05?share=copy&fl=sv&fe=ci",
          "https://vimeo.com/1205941655/0a0d2c4471?share=copy&fl=sv&fe=ci"
        ]
      }
    ]
  },
  {
    id: "cat_feminin_tv",
    slug: "le-sotigui-de-la-meilleure-interpretation-feminine-africaine-serie-tv",
    titleFr: "Sotigui de la Meilleure Interprétation Féminine Africaine Série TV",
    titleEn: "Sotigui for Best Female Performance - African TV Series",
    googleFormUrl: "https://forms.gle/tNan5XMLzjMUq67z9",
    bannerPath: "/images/category_banner_feminin_tv.jpg",
    nominees: [
      {
        id: "feminin_tv_1",
        actorName: "Tatiana MATIP",
        country: "Cameroun",
        filmTitle: "MONKAM",
        director: "Narcisse Wandji",
        portraitPath: "/images/nominee_11_tatiana_matip.jpg",
        videoUrls: [
          "https://filmfreeway.com/projects/3277677",
          "https://filmfreeway.com/projects/3277713",
          "https://filmfreeway.com/projects/3277775"
        ],
        videoPassword: "2024"
      },
      {
        id: "feminin_tv_2",
        actorName: "Bienvenue KOFFI",
        country: "Côte d'Ivoire",
        filmTitle: "LES NOUNOUS SAISON 3",
        director: "Franck Vlehi",
        portraitPath: "/images/nominee_11_bienvenue_koffi.jpg",
        videoUrls: [
          "https://vimeo.com/1205932593/1479dcdb32?share=copy&fl=sv&fe=ci",
          "https://vimeo.com/1205936214/98a2ac1d05?share=copy&fl=sv&fe=ci",
          "https://vimeo.com/1205941655/0a0d2c4471?share=copy&fl=sv&fe=ci"
        ]
      },
      {
        id: "feminin_tv_3",
        actorName: "Astou DIAW",
        country: "Sénégal",
        filmTitle: "XALISSO",
        director: "Ibou Gueye",
        portraitPath: "/images/nominee_11_astou_diaw.jpg",
        videoUrls: [
          "https://www.youtube.com/watch?v=mYTFA0VIPLc&list=PLPgAk0OTvFp-EAXDbVBQ2Fb393fkDo906",
          "https://www.youtube.com/watch?v=Crv5fkOYiMA&list=PLPgAk0OTvFp-EAXDbVBQ2Fb393fkDo906&index=2",
          "https://www.youtube.com/watch?v=k566UWDtvKA&list=PLPgAk0OTvFp-EAXDbVBQ2Fb393fkDo906&index=3"
        ]
      }
    ]
  },
  {
    id: "cat_masculin_tv",
    slug: "le-sotigui-de-la-meilleure-interpretation-masculine-africaine-serie-tv",
    titleFr: "Sotigui de la Meilleure Interprétation Masculine Africaine Série TV",
    titleEn: "Sotigui for Best Male Performance - African TV Series",
    googleFormUrl: "https://forms.gle/JPauwQbjyFzXXazTA",
    bannerPath: "/images/category_banner_masculin_tv.jpg",
    nominees: [
      {
        id: "masculin_tv_1",
        actorName: "Jean François ETTIEN",
        country: "Côte d'Ivoire",
        filmTitle: "LES NOUNOUS SAISON 3",
        director: "Franck Vlehi",
        portraitPath: "/images/nominee_11_jean_francois_ettien.jpg",
        videoUrls: [
          "https://vimeo.com/1205932593/1479dcdb32?share=copy&fl=sv&fe=ci",
          "https://vimeo.com/1205936214/98a2ac1d05?share=copy&fl=sv&fe=ci",
          "https://vimeo.com/1205941655/0a0d2c4471?share=copy&fl=sv&fe=ci"
        ]
      },
      {
        id: "masculin_tv_2",
        actorName: "Gaël HOUNKPATIN",
        country: "Bénin",
        filmTitle: "Apparences",
        director: "Kismath BAGUIRI & Pape Abdoulaye SECK",
        portraitPath: "/images/nominee_11_gael_hounkpatin.jpg",
        videoUrls: [
          "https://www.youtube.com/watch?v=N84zsJRtKrs&list=PLDPS0WtrIOX8b28cFJo0jJfc0E45sFZXN&index=39",
          "https://www.youtube.com/watch?v=2lQiXV0s9Ww&list=PLDPS0WtrIOX8b28cFJo0jJfc0E45sFZXN&index=38"
        ]
      },
      {
        id: "masculin_tv_3",
        actorName: "Vincent BAZIÉ",
        country: "Burkina Faso",
        filmTitle: "UNE FEMME A KOSYAM",
        director: "Serge Armel",
        portraitPath: "/images/nominee_11_vincent_bazie.jpg"
      }
    ]
  },
  {
    id: "cat_dor",
    slug: "sotigui-award-2026-sotigui-dor",
    titleFr: "SOTIGUI AWARDS 2026 – SOTIGUI D’OR",
    titleEn: "SOTIGUI AWARDS 2026 – SOTIGUI D'OR",
    googleFormUrl: "https://forms.gle/ua62SQccMtb1HviJ8",
    bannerPath: "/images/trophy_dark.jpg",
    nominees: [
      {
        id: "dor_1",
        actorName: "Silvio Emerson DO NASCIMENTO",
        country: "Angola",
        filmTitle: "MALDITO AMOR",
        director: "Ladislau Ramalho",
        portraitPath: "/images/nominee_11_silvio_nascimento.jpg",
        videoItems: [
          { url: "https://vimeo.com/1170950826", password: "Diamond25", title: "Extrait 1" },
          { url: "https://vimeo.com/1127099277", password: "Val1923", title: "Extrait 2" }
        ]
      },
      {
        id: "dor_2",
        actorName: "Prisca MARCELENEY",
        country: "Côte d'Ivoire",
        filmTitle: "Anthôman ou Pour l'honneur",
        director: "Jacques Trabi",
        portraitPath: "/images/nominee_11_prisca_marceleney.jpg"
      },
      {
        id: "dor_3",
        actorName: "Eriq EBOUANEY",
        country: "France/Cameroun",
        filmTitle: "L2: Empuraan",
        director: "Prithviraj Sukumaran",
        portraitPath: "/images/nominee_11_eriq_ebouaney.jpg"
      }
    ]
  }
]

export function getAcademyCategoryBySlug(slug: string): AcademyCategory | undefined {
  return ACADEMY_CATEGORIES.find(c => c.slug === slug)
}
