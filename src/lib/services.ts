// src/lib/services.ts
// Service layer for retrieving database or mock data for the Académie des Sotigui

export interface Nominee {
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
    id: 'n1',
    first_name: 'Eve',
    last_name: 'GUEHI',
    stage_name: 'Eve Guehi',
    slug: 'eve-guehi',
    gender: 'F',
    portrait_path: '/images/eve_guehi.jpg',
    biography: "Eve GUEHI est une actrice ivoirienne de talent. Révélée au grand public par son charisme naturel et son jeu d'actrice saisissant, elle a été désignée égérie officielle de la 11ème édition des Sotigui Awards 2026. Elle est nommée dans la catégorie Sotigui du Public pour sa performance magistrale dans la série événement 'La femme du foyer'.",
    short_biography: 'Actrice ivoirienne d\'exception et Égérie de la 11ème édition des Sotigui Awards 2026.',
    country_id: 'Côte d\'Ivoire',
    category_name: 'Sotigui du Public',
    category_slug: 'sotigui-du-public',
    film_title: 'La femme du foyer',
    film_slug: 'la-femme-du-foyer',
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: 'n2',
    first_name: 'Kadhy',
    last_name: 'TOURE',
    stage_name: 'Kadhy Touré',
    slug: 'kadhy-toure',
    gender: 'F',
    portrait_path: '/images/trophy_dark.jpg', // Placeholder template using trophy
    biography: 'Kadhy Touré est une actrice, réalisatrice et productrice de cinéma ivoirienne. Connue pour ses œuvres percutantes et son engagement pour la promotion de l\'excellence cinématographique en Afrique de l\'Ouest, elle concourt à la fois pour le Sotigui du Public et comme Meilleure Actrice.',
    short_biography: 'Actrice et productrice ivoirienne renommée.',
    country_id: 'Côte d\'Ivoire',
    category_name: 'Sotigui du Public',
    category_slug: 'sotigui-du-public',
    film_title: 'La femme du foyer',
    film_slug: 'la-femme-du-foyer',
    is_winner: false,
    is_public_vote_eligible: true
  },
  {
    id: 'n3',
    first_name: 'Issaka',
    last_name: 'SAWADOGO',
    stage_name: 'Issaka Sawadogo',
    slug: 'issaka-sawadogo',
    gender: 'M',
    portrait_path: '/images/trophy_dark.jpg',
    biography: 'Issaka Sawadogo est un acteur, danseur et musicien burkinabè de renommée internationale. Il s\'est illustré dans de nombreuses productions européennes et africaines majeures, recevant de multiples distinctions pour sa polyvalence dramatique.',
    short_biography: 'Acteur burkinabè de stature internationale.',
    country_id: 'Burkina Faso',
    category_name: 'Meilleur Acteur de l\'Afrique de l\'Ouest',
    category_slug: 'meilleur-acteur-afrique-ouest',
    film_title: 'L\'homme qui a vendu sa peau',
    film_slug: 'l-homme-qui-a-vendu-sa-peau',
    is_winner: false,
    is_public_vote_eligible: false
  }
]

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
