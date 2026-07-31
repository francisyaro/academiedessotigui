-- 20260730000000_initial_schema.sql
-- Schema definition for Académie des Sotigui

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =========================================================================
-- 1. Profiles & Roles (Auth extensions)
-- =========================================================================

create table public.profiles (
    id uuid primary key references auth.users on delete cascade,
    first_name text not null,
    last_name text not null,
    email text not null,
    avatar_path text,
    status text default 'active' check (status in ('active', 'suspended', 'pending')),
    last_login_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.roles (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    code text not null unique,
    description text
);

create table public.user_roles (
    user_id uuid references public.profiles(id) on delete cascade,
    role_id uuid references public.roles(id) on delete cascade,
    primary key (user_id, role_id)
);

-- =========================================================================
-- 2. Editions & Categories
-- =========================================================================

create table public.editions (
    id uuid default gen_random_uuid() primary key,
    year integer not null unique,
    edition_number integer not null,
    title text not null,
    slug text not null unique,
    theme text,
    description text,
    starts_at timestamp with time zone,
    ends_at timestamp with time zone,
    host_city text,
    host_country_id text,
    poster_path text,
    hero_video_url text,
    status text default 'draft' check (status in ('draft', 'upcoming', 'active', 'completed', 'archived')),
    voting_opens_at timestamp with time zone,
    voting_closes_at timestamp with time zone,
    published_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.award_categories (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    slug text not null unique,
    description text,
    category_type text default 'actor' check (category_type in ('actor', 'actress', 'film', 'honorary', 'public_choice', 'special')),
    is_public_vote boolean default false,
    display_order integer default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.edition_categories (
    id uuid default gen_random_uuid() primary key,
    edition_id uuid references public.editions(id) on delete cascade,
    category_id uuid references public.award_categories(id) on delete cascade,
    is_open boolean default true,
    nomination_limit integer default 5,
    public_vote_enabled boolean default false,
    display_order integer default 0,
    unique (edition_id, category_id)
);

-- =========================================================================
-- 3. People & Professions (Artists)
-- =========================================================================

create table public.people (
    id uuid default gen_random_uuid() primary key,
    first_name text not null,
    last_name text not null,
    stage_name text,
    slug text not null unique,
    gender text,
    date_of_birth date,
    country_id text,
    diaspora_country_id text,
    biography text,
    short_biography text,
    portrait_path text,
    website_url text,
    instagram_url text,
    facebook_url text,
    x_url text,
    youtube_url text,
    is_published boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.professions (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    slug text not null unique
);

create table public.person_professions (
    person_id uuid references public.people(id) on delete cascade,
    profession_id uuid references public.professions(id) on delete cascade,
    primary key (person_id, profession_id)
);

-- =========================================================================
-- 4. Academy Structure & Membership
-- =========================================================================

create table public.academy_colleges (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    slug text not null unique,
    description text,
    admission_requirements text,
    display_order integer default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.academy_members (
    id uuid default gen_random_uuid() primary key,
    person_id uuid references public.people(id) on delete cascade,
    college_id uuid references public.academy_colleges(id) on delete set null,
    membership_number text unique,
    joined_at timestamp with time zone,
    left_at timestamp with time zone,
    status text default 'active' check (status in ('active', 'suspended', 'resigned', 'deceased')),
    biography text,
    is_public boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.committees (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    slug text not null,
    description text,
    edition_id uuid references public.editions(id) on delete cascade,
    is_permanent boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.committee_members (
    id uuid default gen_random_uuid() primary key,
    committee_id uuid references public.committees(id) on delete cascade,
    person_id uuid references public.people(id) on delete cascade,
    position text,
    started_at timestamp with time zone,
    ended_at timestamp with time zone,
    display_order integer default 0
);

create table public.membership_applications (
    id uuid default gen_random_uuid() primary key,
    first_name text not null,
    last_name text not null,
    email text not null,
    phone text,
    country_id text,
    college_id uuid references public.academy_colleges(id) on delete set null,
    professional_experience text,
    motivation text,
    document_path text,
    status text default 'pending' check (status in ('pending', 'under_review', 'approved', 'rejected')),
    reviewed_by uuid references public.profiles(id) on delete set null,
    reviewed_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =========================================================================
-- 5. Works (Films & Series)
-- =========================================================================

create table public.films (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    original_title text,
    slug text not null unique,
    work_type text default 'feature_film' check (work_type in ('feature_film', 'short_film', 'series', 'documentary', 'animation', 'television_film')),
    release_year integer,
    duration_minutes integer,
    country_id text,
    synopsis text,
    poster_path text,
    trailer_url text,
    language text,
    subtitle_languages text[],
    production_company text,
    distribution_company text,
    is_published boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.film_people (
    id uuid default gen_random_uuid() primary key,
    film_id uuid references public.films(id) on delete cascade,
    person_id uuid references public.people(id) on delete cascade,
    profession_id uuid references public.professions(id) on delete set null,
    character_name text,
    credit_order integer default 0
);

-- =========================================================================
-- 6. Nominations
-- =========================================================================

create table public.nominations (
    id uuid default gen_random_uuid() primary key,
    edition_id uuid references public.editions(id) on delete cascade,
    category_id uuid references public.award_categories(id) on delete cascade,
    person_id uuid references public.people(id) on delete cascade,
    film_id uuid references public.films(id) on delete cascade,
    character_name text,
    nomination_text text,
    is_winner boolean default false,
    is_public_vote_eligible boolean default false,
    display_order integer default 0,
    status text default 'draft' check (status in ('draft', 'validated', 'published', 'withdrawn')),
    published_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (edition_id, category_id, person_id, film_id)
);

-- =========================================================================
-- 7. Ceremonies, Venues & Broadcasters
-- =========================================================================

create table public.venues (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    address text,
    city text,
    country_id text,
    latitude double precision,
    longitude double precision,
    capacity integer,
    map_url text
);

create table public.ceremonies (
    id uuid default gen_random_uuid() primary key,
    edition_id uuid references public.editions(id) on delete cascade,
    title text not null,
    description text,
    starts_at timestamp with time zone,
    ends_at timestamp with time zone,
    venue_id uuid references public.venues(id) on delete set null,
    broadcast_information text,
    livestream_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.ceremony_people (
    id uuid default gen_random_uuid() primary key,
    ceremony_id uuid references public.ceremonies(id) on delete cascade,
    person_id uuid references public.people(id) on delete cascade,
    role text check (role in ('host', 'co_host', 'president', 'guest_of_honour', 'performer', 'speaker')),
    display_order integer default 0
);

create table public.broadcasters (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    logo_path text,
    country_id text,
    website_url text,
    broadcast_type text check (broadcast_type in ('tv', 'online', 'both'))
);

create table public.ceremony_broadcasters (
    ceremony_id uuid references public.ceremonies(id) on delete cascade,
    broadcaster_id uuid references public.broadcasters(id) on delete cascade,
    broadcast_time timestamp with time zone,
    broadcast_url text,
    primary key (ceremony_id, broadcaster_id)
);

create table public.schedule_events (
    id uuid default gen_random_uuid() primary key,
    edition_id uuid references public.editions(id) on delete cascade,
    title text not null,
    description text,
    event_type text check (event_type in ('ceremony', 'conference', 'panel', 'masterclass', 'screening', 'press_conference', 'reception', 'training', 'red_carpet')),
    starts_at timestamp with time zone,
    ends_at timestamp with time zone,
    venue_id uuid references public.venues(id) on delete set null,
    registration_url text,
    capacity integer,
    is_public boolean default true,
    is_featured boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =========================================================================
-- 8. Editorial & Media Assets
-- =========================================================================

create table public.articles (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    slug text not null unique,
    excerpt text,
    content text not null,
    cover_path text,
    article_type text default 'news' check (article_type in ('news', 'interview', 'press_release', 'announcement')),
    author_id uuid references public.profiles(id) on delete set null,
    status text default 'draft' check (status in ('draft', 'to_validate', 'validated', 'scheduled', 'published', 'archived')),
    published_at timestamp with time zone,
    edition_id uuid references public.editions(id) on delete set null,
    seo_title text,
    seo_description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.article_relations (
    id uuid default gen_random_uuid() primary key,
    article_id uuid references public.articles(id) on delete cascade,
    person_id uuid references public.people(id) on delete cascade,
    film_id uuid references public.films(id) on delete cascade,
    category_id uuid references public.award_categories(id) on delete cascade
);

create table public.tags (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    slug text not null unique
);

create table public.article_tags (
    article_id uuid references public.articles(id) on delete cascade,
    tag_id uuid references public.tags(id) on delete cascade,
    primary key (article_id, tag_id)
);

create table public.media_assets (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    media_type text default 'image' check (media_type in ('image', 'video', 'document')),
    storage_path text not null,
    external_url text,
    thumbnail_path text,
    copyright_holder text,
    photographer text,
    edition_id uuid references public.editions(id) on delete set null,
    person_id uuid references public.people(id) on delete set null,
    film_id uuid references public.films(id) on delete set null,
    captured_at timestamp with time zone,
    is_public boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.galleries (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    slug text not null unique,
    description text,
    cover_path text,
    edition_id uuid references public.editions(id) on delete set null,
    status text default 'draft' check (status in ('draft', 'published')),
    published_at timestamp with time zone
);

create table public.gallery_items (
    id uuid default gen_random_uuid() primary key,
    gallery_id uuid references public.galleries(id) on delete cascade,
    media_asset_id uuid references public.media_assets(id) on delete cascade,
    display_order integer default 0,
    caption text
);

-- =========================================================================
-- 9. Partners
-- =========================================================================

create table public.partners (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    slug text not null unique,
    description text,
    logo_path text not null,
    website_url text,
    partner_type text default 'sponsor' check (partner_type in ('institutional', 'official', 'sponsor', 'technical', 'media', 'broadcaster', 'supporter')),
    display_order integer default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.edition_partners (
    edition_id uuid references public.editions(id) on delete cascade,
    partner_id uuid references public.partners(id) on delete cascade,
    display_order integer default 0,
    primary key (edition_id, partner_id)
);

-- =========================================================================
-- 10. Voting System
-- =========================================================================

create table public.voting_rounds (
    id uuid default gen_random_uuid() primary key,
    edition_id uuid references public.editions(id) on delete cascade,
    name text not null,
    opens_at timestamp with time zone not null,
    closes_at timestamp with time zone not null,
    status text default 'draft' check (status in ('draft', 'open', 'closed', 'cancelled')),
    verification_method text default 'email' check (verification_method in ('email', 'sms', 'both')),
    results_visibility text default 'hidden' check (results_visibility in ('hidden', 'partial', 'visible')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.voting_round_categories (
    id uuid default gen_random_uuid() primary key,
    voting_round_id uuid references public.voting_rounds(id) on delete cascade,
    category_id uuid references public.award_categories(id) on delete cascade,
    maximum_votes_per_voter integer default 1,
    unique (voting_round_id, category_id)
);

create table public.voter_identities (
    id uuid default gen_random_uuid() primary key,
    email_hash text unique,
    phone_hash text unique,
    country_id text,
    verified_at timestamp with time zone,
    first_vote_at timestamp with time zone,
    last_vote_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.vote_verification_codes (
    id uuid default gen_random_uuid() primary key,
    identity_id uuid references public.voter_identities(id) on delete cascade,
    code_hash text not null,
    expires_at timestamp with time zone not null,
    attempt_count integer default 0,
    used_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.votes (
    id uuid default gen_random_uuid() primary key,
    voting_round_id uuid references public.voting_rounds(id) on delete cascade,
    category_id uuid references public.award_categories(id) on delete cascade,
    nomination_id uuid references public.nominations(id) on delete cascade,
    voter_identity_id uuid references public.voter_identities(id) on delete cascade,
    anonymous_device_hash text,
    ip_hash text,
    user_agent_hash text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (voting_round_id, category_id, voter_identity_id)
);

create table public.vote_events (
    id uuid default gen_random_uuid() primary key,
    vote_id uuid references public.votes(id) on delete cascade,
    event_type text not null,
    metadata jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =========================================================================
-- 11. Security Audit Logs
-- =========================================================================

create table public.audit_logs (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) on delete set null,
    action text not null,
    entity_type text not null,
    entity_id uuid,
    old_values jsonb,
    new_values jsonb,
    ip_hash text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.roles enable row level security;
alter table public.user_roles enable row level security;
alter table public.editions enable row level security;
alter table public.award_categories enable row level security;
alter table public.edition_categories enable row level security;
alter table public.people enable row level security;
alter table public.professions enable row level security;
alter table public.person_professions enable row level security;
alter table public.academy_colleges enable row level security;
alter table public.academy_members enable row level security;
alter table public.committees enable row level security;
alter table public.committee_members enable row level security;
alter table public.membership_applications enable row level security;
alter table public.films enable row level security;
alter table public.film_people enable row level security;
alter table public.nominations enable row level security;
alter table public.venues enable row level security;
alter table public.ceremonies enable row level security;
alter table public.ceremony_people enable row level security;
alter table public.broadcasters enable row level security;
alter table public.ceremony_broadcasters enable row level security;
alter table public.schedule_events enable row level security;
alter table public.articles enable row level security;
alter table public.article_relations enable row level security;
alter table public.tags enable row level security;
alter table public.article_tags enable row level security;
alter table public.media_assets enable row level security;
alter table public.galleries enable row level security;
alter table public.gallery_items enable row level security;
alter table public.partners enable row level security;
alter table public.edition_partners enable row level security;
alter table public.voting_rounds enable row level security;
alter table public.voting_round_categories enable row level security;
alter table public.voter_identities enable row level security;
alter table public.vote_verification_codes enable row level security;
alter table public.votes enable row level security;
alter table public.vote_events enable row level security;
alter table public.audit_logs enable row level security;
