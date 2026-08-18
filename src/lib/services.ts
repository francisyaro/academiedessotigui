// src/lib/services.ts
// Service layer for retrieving database or mock data for the Académie des Sotigui

export interface Nominee {
  year: number
  id: string
  first_name: string
  last_name: string
  stage_name?: string | null
  slug: string
  gender: string
  portrait_path: string
  biography: string
  short_biography: string
  country_id: string
  category_name: string
  category_slug: string
  film_title?: string | null
  film_slug?: string | null
  is_winner?: boolean
  is_public_vote_eligible?: boolean
}

export interface Film {
  id: string
  title: string
  original_title?: string | null
  slug: string
  work_type: string
  release_year: number
  duration_minutes: number
  country_id: string
  synopsis: string
  poster_path: string
  language: string
  trailer_url?: string
}

export interface Partner {
  name: string
  slug: string
  logo_path: string
  website_url: string
  partner_type: string
}

export interface Article {
  title: string
  slug: string
  excerpt: string
  content: string
  cover_path: string
  published_at: string
  article_type: string
}

// -------------------------------------------------------------------------
// Rich Mock Data (Fallbacks for Local presentation / incomplete DB setup)
// -------------------------------------------------------------------------
export const MOCK_NOMINEES: Nominee[] = [
  {
    id: "n2",
    year: 2022,
    first_name: "Kadhy",
    last_name: "TOURE",
    stage_name: "Kadhy Touré",
    slug: "kadhy-toure",
    gender: "F",
    portrait_path: "/images/serie_tv_feminin_2022_kadhy_toure.jpg",
    biography: "Kadhy Touré est une actrice, réalisatrice et productrice de cinéma ivoirienne, nominée dans la catégorie Meilleure Interprétation Féminine Africaine – Série TV de la 7ème édition (2022) pour son rôle marquant dans 'LES LARMES DE L'AMOUR' de Brigitte Bleu et Andy Melo.",
    short_biography: "Nominée pour la Meilleure Interprétation Féminine - Série TV.",
    country_id: "Côte d'Ivoire",
    category_name: "Meilleure Interprétation Féminine Africaine – Série TV",
    category_slug: "meilleure-interpretation-feminine-serie-tv",
    film_title: "LES LARMES DE L'AMOUR",
    film_slug: "les-larmes-de-l-amour",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n3",
    year: 2026,
    first_name: "Prisca",
    last_name: "MARCELENEY",
    stage_name: "Prisca Marceleney",
    slug: "prisca-marceleney",
    gender: "F",
    portrait_path: "/images/nominee_11_prisca_marceleney.jpg",
    biography: "Prisca Marceleney est nominée dans la catégorie Sotigui du Meilleur Acteur de l'Afrique de l'Ouest (Sotigui of the Best Actor of West Africa) pour son rôle remarquable dans 'Anthôman' ou 'Pour l'honneur' de Jacques Trabi.",
    short_biography: "Nominée pour le Meilleur Acteur de l'Afrique de l'Ouest.",
    country_id: "Côte d'Ivoire",
    category_name: "Meilleur Acteur de l'Afrique de l'Ouest",
    category_slug: "meilleur-acteur-afrique-ouest",
    film_title: "Anthôman ou Pour l'honneur",
    film_slug: "anthoman-ou-pour-l-honneur",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n4",
    year: 2026,
    first_name: "Bienvenue",
    last_name: "KOFFI",
    stage_name: "Bienvenue Koffi",
    slug: "bienvenue-koffi",
    gender: "F",
    portrait_path: "/images/nominee_11_bienvenue_koffi.jpg",
    biography: "Bienvenue Koffi est nominée pour le prix de la Meilleure Interprétation Féminine Africaine – Série TV (Best Hope Female Interpretation African TV Show) pour son excellent rôle dans 'Les Nounous Saison 3' de Franck Vlehi.",
    short_biography: "Nominée pour la Meilleure Interprétation Féminine - Série TV.",
    country_id: "Côte d'Ivoire",
    category_name: "Meilleure Interprétation Féminine Africaine – Série TV",
    category_slug: "meilleure-interpretation-feminine-serie-tv",
    film_title: "Les Nounous Saison 3",
    film_slug: "les-nounous-saison-3",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n5",
    year: 2026,
    first_name: "Jean François",
    last_name: "ETTIEN",
    stage_name: "Jean François Ettien",
    slug: "jean-francois-ettien",
    gender: "M",
    portrait_path: "/images/nominee_11_jean_francois_ettien.jpg",
    biography: "Jean François Ettien est nominé dans la catégorie Meilleure Interprétation Masculine Africaine – Série TV (Sotigui of the Best Hope Male Interpretation African TV Show) pour son rôle marquant dans 'Les Nounous Saison 3' de Franck Vlehi.",
    short_biography: "Nominé pour la Meilleure Interprétation Masculine - Série TV.",
    country_id: "Côte d'Ivoire",
    category_name: "Meilleure Interprétation Masculine Africaine – Série TV",
    category_slug: "meilleure-interpretation-masculine-serie-tv",
    film_title: "Les Nounous Saison 3",
    film_slug: "les-nounous-saison-3",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n11",
    year: 2026,
    first_name: "Souleymane Seye",
    last_name: "NDIAYE",
    stage_name: "Souleymane Seye Ndiaye",
    slug: "souleymane-seye-ndiaye",
    gender: "M",
    portrait_path: "/images/nominee_11_souleymane_seye_ndiaye.jpg",
    biography: "Souleymane Seye Ndiaye est un acteur sénégalais de premier plan, nommé dans la catégorie Sotigui du Meilleur Acteur de l'Afrique de l'Ouest pour sa performance d'exception dans 'VALDIODIO' de Amina NDIAYE LECLERC.",
    short_biography: "Nominé pour le Meilleur Acteur de l'Afrique de l'Ouest.",
    country_id: "Sénégal",
    category_name: "Meilleur Acteur de l'Afrique de l'Ouest",
    category_slug: "meilleur-acteur-afrique-ouest",
    film_title: "VALDIODIO",
    film_slug: "valdiodio",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n16",
    year: 2026,
    first_name: "Silvio Emerson",
    last_name: "DO NASCIMENTO",
    stage_name: "Silvio Nascimento",
    slug: "silvio-nascimento",
    gender: "M",
    portrait_path: "/images/nominee_11_silvio_nascimento.jpg",
    biography: "Silvio Nascimento (Silvio Emerson De Sousa Ferreira DO NASCIMENTO) est un acteur angolais de premier plan, nommé dans la catégorie Meilleur Acteur de l'Afrique Australe pour sa performance marquante dans le film 'MALDITO AMOR' de Ladislau Ramalho.",
    short_biography: "Nominé pour le Meilleur Acteur de l'Afrique Australe.",
    country_id: "Angola",
    category_name: "Meilleur Acteur de l'Afrique Australe",
    category_slug: "meilleur-acteur-afrique-australe",
    film_title: "MALDITO AMOR",
    film_slug: "maldito-amor",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n17",
    year: 2026,
    first_name: "Achouackh",
    last_name: "ABAKAR SOULEYMANE",
    stage_name: "Achouackh Abakar Souleymane",
    slug: "achouackh-souleymane",
    gender: "F",
    portrait_path: "/images/nominee_11_achouackh_souleymane.jpg",
    biography: "Achouackh Abakar Souleymane est une actrice tchadienne acclamée, nominée dans la catégorie Meilleur Acteur de l'Afrique Centrale (Sotigui du Meilleur Acteur de l'Afrique Centrale) pour son rôle dans le film 'Soumsoum, the Night of the Stars' de Mahamat-Saleh Haroun.",
    short_biography: "Nominée pour le Meilleur Acteur de l'Afrique Centrale.",
    country_id: "Tchad",
    category_name: "Meilleur Acteur de l'Afrique Centrale",
    category_slug: "meilleur-acteur-afrique-centrale",
    film_title: "Soumsoum, the Night of the Stars",
    film_slug: "soumsoum-the-night-of-the-stars",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n18",
    year: 2026,
    first_name: "Adjetey",
    last_name: "ANANG",
    stage_name: "Adjetey Anang",
    slug: "adjetey-anang",
    gender: "M",
    portrait_path: "/images/nominee_11_adjetey_anang.jpg",
    biography: "Adjetey Anang est un actor ghanéen de premier ordre, nommé dans la catégorie Meilleur Acteur Nigeria / Ghana pour sa performance d'exception dans 'VIRGIN OF THE THRONE' de Frank Rajah.",
    short_biography: "Nominé pour le Meilleur Acteur Nigeria / Ghana.",
    country_id: "Ghana",
    category_name: "Meilleur Acteur Nigeria / Ghana",
    category_slug: "meilleur-acteur-nigeria-ghana",
    film_title: "VIRGIN OF THE THRONE",
    film_slug: "virgin-of-the-throne",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n19",
    year: 2026,
    first_name: "Astou",
    last_name: "DIAW",
    stage_name: "Astou Diaw",
    slug: "astou-diaw",
    gender: "F",
    portrait_path: "/images/nominee_11_astou_diaw.jpg",
    biography: "Astou Diaw est une actrice sénégalaise nommée dans la catégorie Meilleure Interprétation Féminine Africaine – Série TV (Best Hope Female Interpretation African TV Show) pour son incarnation dans 'XALISSO' de Ibou Gueye.",
    short_biography: "Nominée pour la Meilleure Interprétation Féminine - Série TV.",
    country_id: "Sénégal",
    category_name: "Meilleure Interprétation Féminine Africaine – Série TV",
    category_slug: "meilleure-interpretation-feminine-serie-tv",
    film_title: "XALISSO",
    film_slug: "xalisso",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n20",
    year: 2026,
    first_name: "Aïda Niatta",
    last_name: "MAATIKARA",
    stage_name: "Aïda Niatta Maatikara",
    slug: "aida-maatikara",
    gender: "F",
    portrait_path: "/images/nominee_11_aida_maatikara.jpg",
    biography: "Aïda Niatta Maatikara représente fièrement le Burkina Faso dans la catégorie Sotigui du Meilleur Acteur de l'Afrique de l'Ouest pour son jeu remarqué dans le long-métrage 'Les 3 Lascars 2' de Boubacar Diallo.",
    short_biography: "Nominée pour le Meilleur Acteur de l'Afrique de l'Ouest.",
    country_id: "Burkina Faso",
    category_name: "Meilleur Acteur de l'Afrique de l'Ouest",
    category_slug: "meilleur-acteur-afrique-ouest",
    film_title: "Les 3 Lascars 2",
    film_slug: "les-3-lascars-2",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n21",
    year: 2026,
    first_name: "Clémentine",
    last_name: "U. NYIRINKINDI",
    stage_name: "Clémentine U. Nyirinkindi",
    slug: "clementine-nyirinkindi",
    gender: "F",
    portrait_path: "/images/nominee_11_clementine_nyirinkindi.jpg",
    biography: "Clémentine U. Nyirinkindi est une actrice rwandaise talentueuse, nommée dans la catégorie Meilleur Acteur de l'Afrique de l'Est pour son rôle dans le long-métrage 'Ben'imana' de Marie-Clémentine Dusabejambo.",
    short_biography: "Nominée pour le Meilleur Acteur de l'Afrique de l'Est.",
    country_id: "Rwanda",
    category_name: "Meilleur Acteur de l'Afrique de l'Est",
    category_slug: "meilleur-acteur-afrique-est",
    film_title: "Ben'imana",
    film_slug: "ben-imana",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n22",
    year: 2026,
    first_name: "Emy Dany",
    last_name: "BASSONG",
    stage_name: "Emy Dany Bassong",
    slug: "emy-dany-bassong",
    gender: "F",
    portrait_path: "/images/nominee_11_emy_dany_bassong.jpg",
    biography: "Emy Dany Bassong est une célèbre actrice camerounaise, nominée dans la catégorie Meilleur Acteur de l'Afrique Centrale pour sa brillante performance dans le long-métrage 'LE PRIX DU POUVOIR' de Ebenezer Kepombia.",
    short_biography: "Nominée pour le Meilleur Acteur de l'Afrique Centrale.",
    country_id: "Cameroun",
    category_name: "Meilleur Acteur de l'Afrique Centrale",
    category_slug: "meilleur-acteur-afrique-centrale",
    film_title: "LE PRIX DU POUVOIR",
    film_slug: "le-prix-du-pouvoir",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n23",
    year: 2026,
    first_name: "Eriq",
    last_name: "EBOUANEY",
    stage_name: "Eriq Ebouaney",
    slug: "eriq-ebouaney",
    gender: "M",
    portrait_path: "/images/nominee_11_eriq_ebouaney.jpg",
    biography: "Eriq Ebouaney est un acteur franco-camerounais de renommée internationale, nominé dans la catégorie Meilleur Acteur de la Diaspora pour son rôle dans le long-métrage 'L2: Empuraan' de Prithviraj Sukumaran.",
    short_biography: "Nominé pour le Meilleur Acteur de la Diaspora.",
    country_id: "France/Cameroun",
    category_name: "Meilleur Acteur de la Diaspora",
    category_slug: "meilleur-acteur-diaspora",
    film_title: "L2: Empuraan",
    film_slug: "l2-empuraan",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n24",
    year: 2026,
    first_name: "Fatima",
    last_name: "ATTIF",
    stage_name: "Fatima Attif",
    slug: "fatima-attif",
    gender: "F",
    portrait_path: "/images/nominee_11_fatima_attif.jpg",
    biography: "Fatima Attif est une actrice marocaine d'exception, nommée dans la catégorie Meilleur Acteur de l'Afrique du Nord (Sotigui du Meilleur Acteur de l'Afrique du Nord) pour son interprétation remarquable dans le long-métrage 'Goundafa the cursed song' de Ali Benjelloun.",
    short_biography: "Nominée pour le Meilleur Acteur de l'Afrique du Nord.",
    country_id: "Maroc",
    category_name: "Meilleur Acteur de l'Afrique du Nord",
    category_slug: "meilleur-acteur-afrique-nord",
    film_title: "Goundafa the cursed song",
    film_slug: "goundafa-the-cursed-song",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n25",
    year: 2026,
    first_name: "Jacky",
    last_name: "VIKE",
    stage_name: "Jacky Vike",
    slug: "jacky-vike",
    gender: "F",
    portrait_path: "/images/nominee_11_jacky_vike.jpg",
    biography: "Jacky Vike est une actrice kényane talentueuse, nommée dans la catégorie Meilleur Acteur de l'Afrique de l'Est (Sotigui du Meilleur Acteur de l'Afrique de l'Est) pour son rôle clé dans 'INSIDE JOB' de Tosh Gitonga.",
    short_biography: "Nominée pour le Meilleur Acteur de l'Afrique de l'Est.",
    country_id: "Kenya",
    category_name: "Meilleur Acteur de l'Afrique de l'Est",
    category_slug: "meilleur-acteur-afrique-est",
    film_title: "INSIDE JOB",
    film_slug: "inside-job",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n26",
    year: 2026,
    first_name: "Gaël",
    last_name: "HOUNKPATIN",
    stage_name: "Gaël Hounkpatin",
    slug: "gael-hounkpatin",
    gender: "M",
    portrait_path: "/images/nominee_11_gael_hounkpatin.jpg",
    biography: "Gaël Hounkpatin est un acteur béninois nommé dans la catégorie Meilleure Interprétation Masculine Africaine – Série TV pour sa remarquable performance dans la série 'Apparences' de Kismath Baguiri & Pape Abdoulaye Seck.",
    short_biography: "Nominé pour la Meilleure Interprétation Masculine - Série TV.",
    country_id: "Bénin",
    category_name: "Meilleure Interprétation Masculine Africaine – Série TV",
    category_slug: "meilleure-interpretation-masculine-serie-tv",
    film_title: "Apparences",
    film_slug: "apparences",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n27",
    year: 2026,
    first_name: "Michael B.",
    last_name: "JORDAN",
    stage_name: "Michael B. Jordan",
    slug: "michael-b-jordan",
    gender: "M",
    portrait_path: "/images/nominee_11_michael_b_jordan.jpg",
    biography: "Michael B. Jordan est un acteur et réalisateur américain de renommée mondiale, nominé dans la catégorie Meilleur Acteur de la Diaspora pour son rôle de premier plan dans le long-métrage 'SINNERS' de Ryan Coogler.",
    short_biography: "Nominé pour le Meilleur Acteur de la Diaspora.",
    country_id: "USA",
    category_name: "Meilleur Acteur de la Diaspora",
    category_slug: "meilleur-acteur-diaspora",
    film_title: "SINNERS",
    film_slug: "sinners",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n28",
    year: 2026,
    first_name: "Lupita",
    last_name: "NYONG'O",
    stage_name: "Lupita Nyong'o",
    slug: "lupita-nyongo",
    gender: "F",
    portrait_path: "/images/nominee_11_lupita_nyongo.jpg",
    biography: "Lupita Nyong'o, actrice oscarisée mexicano-kényane, est nominée dans la catégorie Meilleur Acteur de la Diaspora pour sa performance incroyable dans 'A Quiet Place: Day One' de Michael Sarnoski.",
    short_biography: "Nominée pour le Meilleur Acteur de la Diaspora.",
    country_id: "Mexique/Kenya",
    category_name: "Meilleur Acteur de la Diaspora",
    category_slug: "meilleur-acteur-diaspora",
    film_title: "A Quiet Place: Day One",
    film_slug: "a-quiet-place-day-one",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n29",
    year: 2026,
    first_name: "Mihad",
    last_name: "MURTTADA",
    stage_name: "Mihad Murttada",
    slug: "mihad-murttada",
    gender: "F",
    portrait_path: "/images/nominee_11_mihad_murttada.jpg",
    biography: "Mihad Murttada est une actrice soudanaise nommée dans la catégorie Meilleur Acteur de l'Afrique de l'Est pour son incarnation remarquable dans le long-métrage 'COTTON QUEEN' de Suzannah Mirghani.",
    short_biography: "Nominée pour le Meilleur Acteur de l'Afrique de l'Est.",
    country_id: "Soudan",
    category_name: "Meilleur Acteur de l'Afrique de l'Est",
    category_slug: "meilleur-acteur-afrique-est",
    film_title: "COTTON QUEEN",
    film_slug: "cotton-queen",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n30",
    year: 2026,
    first_name: "Mohamed",
    last_name: "FARRAG",
    stage_name: "Mohamed Farrag",
    slug: "mohamed-farrag",
    gender: "M",
    portrait_path: "/images/nominee_11_mohamed_farrag.jpg",
    biography: "Mohamed Farrag est un acteur égyptien nommé dans la catégorie Meilleur Acteur de l'Afrique du Nord pour son rôle d'exception dans 'El Sett' de Marwan Hamed.",
    short_biography: "Nominé pour le Meilleur Acteur de l'Afrique du Nord.",
    country_id: "Egypte",
    category_name: "Meilleur Acteur de l'Afrique du Nord",
    category_slug: "meilleur-acteur-afrique-nord",
    film_title: "El Sett",
    film_slug: "el-sett",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n31",
    year: 2026,
    first_name: "Saja",
    last_name: "KILANI",
    stage_name: "Saja Kilani",
    slug: "saja-kilani",
    gender: "F",
    portrait_path: "/images/nominee_11_saja_kilani.jpg",
    biography: "Saja Kilani est une actrice tunisienne nommée dans la catégorie Meilleur Acteur de l'Afrique du Nord pour son rôle d'exception dans 'The Voice of Hind Rajab' de Kaouther Ben Ania.",
    short_biography: "Nominée pour le Meilleur Acteur de l'Afrique du Nord.",
    country_id: "Tunisie",
    category_name: "Meilleur Acteur de l'Afrique du Nord",
    category_slug: "meilleur-acteur-afrique-nord",
    film_title: "The Voice of Hind Rajab",
    film_slug: "the-voice-of-hind-rajab",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n32",
    year: 2026,
    first_name: "Siyabonga",
    last_name: "SHIBE",
    stage_name: "Siyabonga Shibe",
    slug: "siyabonga-shibe",
    gender: "M",
    portrait_path: "/images/nominee_11_siyabonga_shibe.jpg",
    biography: "Siyabonga Shibe est un acteur sud-africain nommé dans la catégorie Meilleur Acteur de l'Afrique Australe pour sa remarquable performance dans le film 'Laundry (Uhlanjululo)' de Zamo Mkhwanazi.",
    short_biography: "Nominé pour le Meilleur Acteur de l'Afrique Australe.",
    country_id: "Afrique du Sud",
    category_name: "Meilleur Acteur de l'Afrique Australe",
    category_slug: "meilleur-acteur-afrique-australe",
    film_title: "Laundry (Uhlanjululo)",
    film_slug: "laundry-uhlanjululo",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n33",
    year: 2026,
    first_name: "Admiro",
    last_name: "de Laura MUNGUAMBE",
    stage_name: "Admiro de Laura Munguambe",
    slug: "admiro-de-laura-munguambe",
    gender: "M",
    portrait_path: "/images/nominee_11_admiro_munguambe.jpg",
    biography: "Admiro de Laura Munguambe est un acteur mozambicain nommé dans la catégorie Meilleur Acteur de l'Afrique Australe pour sa performance d'exception dans 'O Profeta' de Ique Langa.",
    short_biography: "Nominé pour le Meilleur Acteur de l'Afrique Australe.",
    country_id: "Mozambique",
    category_name: "Meilleur Acteur de l'Afrique Australe",
    category_slug: "meilleur-acteur-afrique-australe",
    film_title: "O Profeta",
    film_slug: "o-profeta",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n34",
    year: 2026,
    first_name: "Şope",
    last_name: "DÌRÍSÙ",
    stage_name: "Şope Dìrísù",
    slug: "sope-dirisu",
    gender: "M",
    portrait_path: "/images/nominee_11_sope_dirisu.jpg",
    biography: "Şope Dìrísù est un acteur nigérian de premier plan, nommé dans la catégorie Sotigui du Meilleur Acteur Nigeria / Ghana pour son rôle d'exception dans 'My Father's Shadow' de Akinola Davies Jr.",
    short_biography: "Nominé pour le Meilleur Acteur Nigeria / Ghana.",
    country_id: "Nigéria",
    category_name: "Meilleur Acteur Nigeria / Ghana",
    category_slug: "meilleur-acteur-nigeria-ghana",
    film_title: "My Father's Shadow",
    film_slug: "my-father-s-shadow",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n35",
    year: 2026,
    first_name: "Tatiana",
    last_name: "MATIP",
    stage_name: "Tatiana Matip",
    slug: "tatiana-matip",
    gender: "F",
    portrait_path: "/images/nominee_11_tatiana_matip.jpg",
    biography: "Tatiana Matip est une actrice camerounaise de talent, nommée dans la catégorie Meilleure Interprétation Féminine Africaine – Série TV pour son incarnation dans 'MONKAM' de Narcisse WANDJI.",
    short_biography: "Nominée pour la Meilleure Interprétation Féminine - Série TV.",
    country_id: "Cameroun",
    category_name: "Meilleure Interprétation Féminine Africaine – Série TV",
    category_slug: "meilleure-interpretation-feminine-serie-tv",
    film_title: "MONKAM",
    film_slug: "monkam",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n36",
    year: 2026,
    first_name: "Uche",
    last_name: "MONTANA",
    stage_name: "Uche Montana",
    slug: "uche-montana",
    gender: "F",
    portrait_path: "/images/nominee_11_uche_montana.jpg",
    biography: "Uche Montana est une actrice nigériane de grand talent, nommée dans la catégorie Meilleur Acteur Nigeria / Ghana (Sotigui du Meilleur Acteur Nigeria / Ghana) pour sa performance remarquable dans 'MONICA 2' de Uche Montana.",
    short_biography: "Nominée pour le Meilleur Acteur Nigeria / Ghana.",
    country_id: "Nigéria",
    category_name: "Meilleur Acteur Nigeria / Ghana",
    category_slug: "meilleur-acteur-nigeria-ghana",
    film_title: "MONICA 2",
    film_slug: "monica-2",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n37",
    year: 2026,
    first_name: "Vincent",
    last_name: "BAZIÉ",
    stage_name: "Vincent Bazié",
    slug: "vincent-bazie",
    gender: "M",
    portrait_path: "/images/nominee_11_vincent_bazie.jpg",
    biography: "Vincent Bazié est nominé dans la catégorie Meilleure Interprétation Masculine Africaine – Série TV (Sotigui of the Best Hope Male Interpretation African TV Show) pour son interprétation remarquable dans 'UNE FEMME A KOSYAM' de Serge Armel.",
    short_biography: "Nominé pour la Meilleure Interprétation Masculine - Série TV.",
    country_id: "Burkina Faso",
    category_name: "Meilleure Interprétation Masculine Africaine – Série TV",
    category_slug: "meilleure-interpretation-masculine-serie-tv",
    film_title: "UNE FEMME A KOSYAM",
    film_slug: "une-femme-a-kosyam",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n38",
    year: 2026,
    first_name: "Tiss Warren",
    last_name: "MOMBO",
    stage_name: "Tiss Warren Mombo",
    slug: "tiss-warren-mombo",
    gender: "M",
    portrait_path: "/images/nominee_11_tiss_warren_mombo.jpg",
    biography: "Tiss Warren Mombo est un acteur gabonais de renom, nominé dans la catégorie Meilleur Acteur de l'Afrique Centrale pour sa performance remarquable dans le long-métrage 'AFROTOPIA' de David MBOUSSOU.",
    short_biography: "Nominé pour le Meilleur Acteur de l'Afrique Centrale.",
    country_id: "Gabon",
    category_name: "Meilleur Acteur de l'Afrique Centrale",
    category_slug: "meilleur-acteur-afrique-centrale",
    film_title: "AFROTOPIA",
    film_slug: "afrotopia",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n101",
    year: 2025,
    first_name: "Ferdinand",
    last_name: "MBAISSANE",
    stage_name: "Ferdinand Mbaissane",
    slug: "ferdinand-mbaissane-2025",
    gender: "M",
    portrait_path: "/images/nominee_10_ferdinand_mbaissane.jpg",
    biography: "Ferdinand Mbaissane est un acteur tchadien, nominé dans la catégorie Sotigui du Meilleur Acteur de l'Afrique Centrale lors de la 10ème édition (2025) pour sa performance dans le long-métrage 'DIYA' de Achille Ronaimou.",
    short_biography: "Nominé pour le Meilleur Acteur de l'Afrique Centrale 2025.",
    country_id: "Tchad",
    category_name: "Meilleur Acteur de l'Afrique Centrale",
    category_slug: "meilleur-acteur-afrique-centrale",
    film_title: "DIYA",
    film_slug: "diya",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n102",
    year: 2025,
    first_name: "Thérèse",
    last_name: "NGONO",
    stage_name: "Thérèse Ngono",
    slug: "therese-ngono-2025",
    gender: "F",
    portrait_path: "/images/nominee_10_therese_ngono.jpg",
    biography: "Thérèse Ngono est une actrice camerounaise, nominée dans la catégorie Sotigui du Meilleur Acteur de l'Afrique Centrale lors de la 10ème édition (2025) pour son rôle dans le long-métrage 'INDOMPTABLES' de Thomas Ngijol.",
    short_biography: "Nominée pour le Meilleur Acteur de l'Afrique Centrale 2025.",
    country_id: "Cameroun",
    category_name: "Meilleur Acteur de l'Afrique Centrale",
    category_slug: "meilleur-acteur-afrique-centrale",
    film_title: "INDOMPTABLES",
    film_slug: "indomptables",
    is_winner: true,
    is_public_vote_eligible: true
  },
  {
    id: "n103",
    year: 2025,
    first_name: "Olivier",
    last_name: "KISSITA",
    stage_name: "Olivier Kissita",
    slug: "olivier-kissita-2025",
    gender: "M",
    portrait_path: "/images/nominee_10_olivier_kissita.jpg",
    biography: "Olivier Kissita est un acteur de la République du Congo, nominé dans la catégorie Sotigui du Meilleur Acteur de l'Afrique Centrale lors de la 10ème édition (2025) pour son rôle dans le long-métrage 'SEX LOVE AND MONEY' de Owen Brown.",
    short_biography: "Nominé pour le Meilleur Acteur de l'Afrique Centrale 2025.",
    country_id: "République du Congo",
    category_name: "Meilleur Acteur de l'Afrique Centrale",
    category_slug: "meilleur-acteur-afrique-centrale",
    film_title: "SEX LOVE AND MONEY",
    film_slug: "sex-love-and-money",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n104",
    year: 2025,
    first_name: "Debbie",
    last_name: "BAKUSEKA",
    stage_name: "Debbie Bakuseka",
    slug: "debbie-bakuseka-2025",
    gender: "F",
    portrait_path: "/images/nominee_10_debbie_bakuseka.jpg",
    biography: "Debbie Bakuseka est une actrice ougandaise nommée dans la catégorie Sotigui du Meilleur Acteur de l'Afrique de l'Est lors de la 10ème édition (2025) pour sa performance remarquée dans 'Philbert Aimé MBABAZI SHARANGABO' de Rehema Nanfuka.",
    short_biography: "Nominée pour le Meilleur Acteur de l'Afrique de l'Est 2025.",
    country_id: "Ouganda",
    category_name: "Meilleur Acteur de l'Afrique de l'Est",
    category_slug: "meilleur-acteur-afrique-est",
    film_title: "Philbert Aimé MBABAZI SHARANGABO",
    film_slug: "philbert-aime-mbabazi-sharangabo",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n105",
    year: 2025,
    first_name: "Ednara",
    last_name: "CONCEIÇÃO",
    stage_name: "Ednara Conceição",
    slug: "ednara-conceicao-2025",
    gender: "F",
    portrait_path: "/images/nominee_10_ednara_conceicao.jpg",
    biography: "Ednara Conceição est une actrice angolaise nommée dans la catégorie Sotigui du Meilleur Acteur de l'Afrique de l'Est lors de la 10ème édition (2025) pour sa prestation magistrale dans le long-métrage 'ACAIXA' de Carlos G. Rodrigues.",
    short_biography: "Nominée pour le Meilleur Acteur de l'Afrique de l'Est 2025.",
    country_id: "Angola",
    category_name: "Meilleur Acteur de l'Afrique de l'Est",
    category_slug: "meilleur-acteur-afrique-est",
    film_title: "ACAIXA",
    film_slug: "acaixa",
    is_winner: true,
    is_public_vote_eligible: true
  },
  {
    id: "n106",
    year: 2025,
    first_name: "Aline",
    last_name: "AMIKE",
    stage_name: "Aline Amike",
    slug: "aline-amike-2025",
    gender: "F",
    portrait_path: "/images/nominee_10_aline_amike.jpg",
    biography: "Aline Amike est une actrice rwandaise nommée dans la catégorie Sotigui du Meilleur Acteur de l'Afrique de l'Est lors de la 10ème édition (2025) pour son rôle dans le long-métrage 'MINIMALS IN A TITANIC WORLD / UN MONDE TITANIC' de Philbert Aimé Mbabazi Sharangabo.",
    short_biography: "Nominée pour le Meilleur Acteur de l'Afrique de l'Est 2025.",
    country_id: "Rwanda",
    category_name: "Meilleur Acteur de l'Afrique de l'Est",
    category_slug: "meilleur-acteur-afrique-est",
    film_title: "MINIMALS IN A TITANIC WORLD / UN MONDE TITANIC",
    film_slug: "minimals-in-a-titanic-world-un-monde-titanic",
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: "n201",
    year: 2022,
    first_name: "Roger Felmont",
    last_name: "SALLAH",
    stage_name: "Roger Felmont Sallah",
    slug: "roger-felmont-sallah-2022",
    gender: "M",
    portrait_path: "/images/afrique_de_l_ouest_2022_roger_felmont_sallah.jpg",
    biography: "Lauréat du Sotigui du Meilleur Acteur de l'Afrique de l'Ouest en 2022 pour son rôle légendaire dans 'SALOUM' de Jean Luc HERBULOT.",
    short_biography: "Sotigui du Meilleur Acteur de l'Afrique de l'Ouest 2022.",
    country_id: "Sénégal",
    category_name: "Meilleur Acteur de l'Afrique de l'Ouest",
    category_slug: "meilleur-acteur-afrique-ouest",
    film_title: "SALOUM",
    film_slug: "saloum",
    is_winner: true,
    is_public_vote_eligible: false
  },
  {
    id: "n202",
    year: 2022,
    first_name: "Demyana",
    last_name: "NASSAR",
    stage_name: "Demyana Nassar",
    slug: "demyana-nassar-2022",
    gender: "F",
    portrait_path: "/images/afrique_du_nord_2022_demyana_nassar.jpg",
    biography: "Lauréate du Sotigui du Meilleur Acteur de l'Afrique du Nord en 2022 pour le film 'PLUME' de Omar EL ZOHAIRY.",
    short_biography: "Sotigui du Meilleur Acteur de l'Afrique du Nord 2022.",
    country_id: "Egypte",
    category_name: "Meilleur Acteur de l'Afrique du Nord",
    category_slug: "meilleur-acteur-afrique-nord",
    film_title: "PLUME",
    film_slug: "plume",
    is_winner: true,
    is_public_vote_eligible: false
  }
];
export const MOCK_FILMS: Film[] = [
  {
    id: 'f1',
    title: 'La femme du foyer',
    slug: 'la-femme-du-foyer',
    work_type: 'series',
    release_year: 2026,
    duration_minutes: 45,
    country_id: 'Côte d\'Ivoire',
    synopsis: "Une série dramatique captivante qui explore le quotidien des foyers d'Abidjan à travers les destins croisés de trois femmes fortes confrontées aux défis modernes de la société.",
    poster_path: '/images/eve_guehi.jpg', // Uses the gorgeous Eve poster
    language: 'Français'
  },
  {
    id: 'f2',
    title: 'L\'homme qui a vendu sa peau',
    original_title: 'The Man Who Sold His Skin',
    slug: 'l-homme-qui-a-vendu-sa-peau',
    work_type: 'feature_film',
    release_year: 2020,
    duration_minutes: 104,
    country_id: 'Tunisie',
    synopsis: "Sam Ali, un jeune Syrien sensible et impulsif, fuit son pays pour le Liban. Pour pouvoir voyager en Europe et vivre avec l'amour de sa vie, il accepte de se faire tatouer le visa Schengen sur le dos par l'un des artistes contemporains les plus sulfureux au monde. En transformant son propre corps en œuvre d'art prestigieuse, Sam Ali se retrouve confronté à la perte de sa liberté.",
    poster_path: '/images/trophy_dark.jpg',
    language: 'Arabe, Français, Anglais'
  }
]

export const MOCK_PARTNERS: Partner[] = [
  {
    name: 'BBDA',
    slug: 'bbda',
    logo_path: '/images/partner_bbda.jpg',
    website_url: 'https://www.bbda.bf',
    partner_type: 'institutional'
  },
  {
    name: 'bf1',
    slug: 'bf1',
    logo_path: '/images/partner_bf1.jpg',
    website_url: '#',
    partner_type: 'media'
  },
  {
    name: 'Digital Magazine',
    slug: 'digital-magazine',
    logo_path: '/images/partner_dm.jpg',
    website_url: '#',
    partner_type: 'media'
  },
  {
    name: 'Coris Bank International',
    slug: 'coris-bank',
    logo_path: '/images/partner_coris.png',
    website_url: 'https://www.coris-bank.com',
    partner_type: 'sponsor'
  },
  {
    name: 'Telecel',
    slug: 'telecel',
    logo_path: '/images/partner_telecel.png',
    website_url: 'https://www.telecel.bf',
    partner_type: 'sponsor'
  }
]

export const MOCK_ARTICLES: Article[] = [
  {
    title: 'Appel aux stylistes 2026 : "L\'Histoire est ton tissu"',
    slug: 'appel-aux-stylistes-l-histoire-est-ton-tissu',
    excerpt: 'L\'Académie des Sotigui lance un grand appel aux créateurs de mode pour la 11ème édition.',
    content: 'Pour cette 11ème édition des Sotigui Awards en novembre 2026, l\'Académie lance un appel exceptionnel aux stylistes africains sous la thématique "L\'Histoire est ton tissu". L\'objectif est de fusionner l\'héritage vestimentaire des années 50 à 70 avec la haute couture contemporaine et la noblesse du pagne tissé traditionnel africain. Les créations sélectionnées illumineront le tapis rouge et les défilés officiels de la cérémonie.',
    cover_path: '/images/dress_code.jpg',
    published_at: '2026-07-28',
    article_type: 'announcement'
  },
  {
    title: 'Sotigui d\'Or 2025 : Le sacre historique d\'Ibrahim Mbaye',
    slug: 'sacre-historique-ibrahim-mbaye-sotigui-or-2025',
    excerpt: 'Le comédien sénégalais a remporté la distinction suprême lors du 10ème anniversaire du festival.',
    content: 'Le comédien sénégalais Ibrahim Mbaye a remporté le trophée suprême de Sotigui d\'Or 2025 lors du gala de clôture du 10ème anniversaire à Ouagadougou. Récompensé pour sa performance bouleversante dans le film historique "Ni Chaînes Ni Maîtres", il succède aux plus grands noms du septième art continental. L\'édition 2025 était placée sous la thématique : "Le cinéma africain face aux défis du harcèlement sexuel : de l\'indignation à l\'action".',
    cover_path: '/images/trophy_dark.jpg',
    published_at: '2025-11-16',
    article_type: 'press'
  },
  {
    title: 'Eve Guehi désignée égérie officielle de la 11ème édition',
    slug: 'eve-guehi-egerie-officielle-sotigui-2026',
    excerpt: 'Lauréate du prix de la meilleure interprétation féminine en 2025, l\'actrice ivoirienne incarne les Sotigui 2026.',
    content: 'Après avoir ébloui le public et remporté le trophée de la meilleure interprétation féminine, l\'actrice ivoirienne Eve Guehi a été officiellement désignée égérie officielle des Sotigui Awards 2026. Elle sera le visage de cette 11ème édition en apportant sa grâce, son talent et son engagement pour la promotion du cinéma africain à l\'échelle mondiale.',
    cover_path: '/images/eve_guehi.jpg',
    published_at: '2026-07-29',
    article_type: 'interview'
  }
]


// -------------------------------------------------------------------------
// Services functions
// -------------------------------------------------------------------------

export async function getNominees(): Promise<Nominee[]> {
  // Returns mock data for fallback
  return MOCK_NOMINEES
}

export async function getNomineeBySlug(slug: string): Promise<Nominee | null> {
  const nominee = MOCK_NOMINEES.find((n) => n.slug === slug)
  return nominee || null
}

export async function getFilms(): Promise<Film[]> {
  return MOCK_FILMS
}

export async function getFilmBySlug(slug: string): Promise<Film | null> {
  const film = MOCK_FILMS.find((f) => f.slug === slug)
  return film || null
}

export async function getPartners(): Promise<Partner[]> {
  return MOCK_PARTNERS
}

export async function getArticles(): Promise<Article[]> {
  return MOCK_ARTICLES
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = MOCK_ARTICLES.find((a) => a.slug === slug)
  return article || null
}
