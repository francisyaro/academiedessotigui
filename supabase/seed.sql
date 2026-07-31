-- supabase/seed.sql
-- Seed data for Académie des Sotigui

-- 1. Insert default roles
insert into public.roles (name, code, description) values
('Super Administrateur', 'super_admin', 'Accès complet à toutes les fonctionnalités et paramètres.'),
('Administrateur', 'admin', 'Gestion générale des contenus de la plateforme.'),
('Responsable des Votes', 'voting_manager', 'Gestion des sessions de vote et consultation sécurisée des rapports.'),
('Responsable Nominations', 'nominations_manager', 'Gestion des films, personnes et nominations.'),
('Rédacteur Actualités', 'news_editor', 'Création et modification des articles et communiqués.'),
('Responsable Médias', 'media_manager', 'Gestion des galeries photos, vidéos et fichiers multimédias.'),
('Responsable Membres', 'members_manager', 'Gestion des collèges, membres et candidatures.');

-- 2. Insert standard professions
insert into public.professions (name, slug) values
('Acteur', 'acteur'),
('Actrice', 'actrice'),
('Réalisateur', 'realisateur'),
('Réalisatrice', 'realisatrice'),
('Producteur', 'producteur'),
('Productrice', 'productrice'),
('Scénariste', 'scenariste');

-- 3. Insert academy colleges
insert into public.academy_colleges (name, slug, description, display_order, is_active) values
('Collège des Acteurs', 'college-acteurs', 'Collège représentant les comédiens et comédiennes.', 1, true),
('Collège des Réalisateurs', 'college-realisateurs', 'Collège représentant les réalisateurs et réalisatrices de films.', 2, true),
('Collège des Producteurs', 'college-producteurs', 'Collège représentant les producteurs et productrices.', 3, true);

-- 4. Insert editions
insert into public.editions (year, edition_number, title, slug, theme, description, starts_at, ends_at, host_city, host_country_id, status, voting_opens_at, voting_closes_at, published_at) values
(2026, 11, '11ème Edition Sotigui Awards 2026', 'sotigui-awards-2026', 'Le cinéma africain et sa diaspora : résilience et opportunités', 'La 11ème édition officielle des Sotigui Awards se tiendra à Ouagadougou sous le signe de l''excellence créative panafricaine.', '2026-11-11 19:00:00+00', '2026-11-14 23:59:59+00', 'Ouagadougou', 'BF', 'active', '2026-08-01 00:00:00+00', '2026-11-10 23:59:59+00', '2026-07-30 12:00:00+00'),
(2025, 10, '10ème Edition Sotigui Awards 2025', 'sotigui-awards-2025', 'Célébrer une décennie de reconnaissance des talents', 'La 10ème édition anniversaire des Sotigui Awards.', '2025-11-12 19:00:00+00', '2025-11-15 23:59:59+00', 'Ouagadougou', 'BF', 'completed', '2025-08-01 00:00:00+00', '2025-11-11 23:59:59+00', '2025-07-30 12:00:00+00');

-- 5. Insert award categories
insert into public.award_categories (name, slug, description, category_type, is_public_vote, display_order, is_active) values
('Sotigui d''Or 2026', 'sotigui-d-or', 'La plus haute distinction décernée par l''Académie.', 'honorary', false, 1, true),
('Meilleur Acteur de l''Afrique de l''Ouest', 'meilleur-acteur-afrique-ouest', 'Récompense le meilleur acteur ouest-africain.', 'actor', false, 2, true),
('Meilleure Actrice de l''Afrique de l''Ouest', 'meilleure-actrice-afrique-ouest', 'Récompense la meilleure actrice ouest-africaine.', 'actress', false, 3, true),
('Sotigui du Public (Prix du Public)', 'sotigui-du-public', 'Catégorie officielle soumise au vote du public.', 'public_choice', true, 4, true);

-- Link categories to 2026 edition
insert into public.edition_categories (edition_id, category_id, is_open, nomination_limit, public_vote_enabled, display_order)
select e.id, c.id, true, 5, c.is_public_vote, c.display_order
from public.editions e, public.award_categories c
where e.year = 2026;

-- Link categories to 2025 edition
insert into public.edition_categories (edition_id, category_id, is_open, nomination_limit, public_vote_enabled, display_order)
select e.id, c.id, false, 5, c.is_public_vote, c.display_order
from public.editions e, public.award_categories c
where e.year = 2025;

-- 6. Insert people (Artists / Muse)
insert into public.people (first_name, last_name, stage_name, slug, gender, date_of_birth, country_id, biography, short_biography, portrait_path, is_published) values
('Eve', 'GUEHI', 'Eve Guehi', 'eve-guehi', 'F', '1995-04-12', 'CI', 'Eve GUEHI est une actrice ivoirienne de talent, égérie officielle de la 11ème édition des Sotigui Awards 2026.', 'Actrice ivoirienne et Égérie Sotigui 2026', '/images/eve_guehi.jpg', true),
('Kadhy', 'TOURE', 'Kadhy Touré', 'kadhy-toure', 'F', '1988-09-13', 'CI', 'Kadhy Touré est une actrice, réalisatrice et productrice de cinéma ivoirienne.', 'Actrice, réalisatrice et productrice ivoirienne', '/images/kadhy_toure.jpg', true),
('Issaka', 'SAWADOGO', 'Issaka Sawadogo', 'issaka-sawadogo', 'M', '1966-05-18', 'BF', 'Issaka Sawadogo est un acteur burkinabè de renommée internationale.', 'Acteur burkinabè international', '/images/issaka_sawadogo.jpg', true);

-- Link people to professions
insert into public.person_professions (person_id, profession_id)
select p.id, pr.id from public.people p, public.professions pr
where p.slug = 'eve-guehi' and pr.slug = 'actrice';

insert into public.person_professions (person_id, profession_id)
select p.id, pr.id from public.people p, public.professions pr
where p.slug = 'kadhy-toure' and pr.slug in ('actrice', 'realisatrice', 'productrice');

insert into public.person_professions (person_id, profession_id)
select p.id, pr.id from public.people p, public.professions pr
where p.slug = 'issaka-sawadogo' and pr.slug = 'acteur';

-- 7. Insert films
insert into public.films (title, original_title, slug, work_type, release_year, duration_minutes, country_id, synopsis, poster_path, language, is_published) values
('L''homme qui a vendu sa peau', 'The Man Who Sold His Skin', 'l-homme-qui-a-vendu-sa-peau', 'feature_film', 2020, 104, 'TN', 'Sam Ali, un jeune Syrien sensible et impulsif, fuit son pays pour le Liban...', '/images/film_skin.jpg', 'ar', true),
('La femme du foyer', 'La femme du foyer', 'la-femme-du-foyer', 'series', 2026, 45, 'CI', 'Une série dramatique captivante qui explore le quotidien des foyers d''Abidjan.', '/images/film_foyer.jpg', 'fr', true);

-- Link people to films
insert into public.film_people (film_id, person_id, profession_id, character_name, credit_order)
select f.id, p.id, pr.id, 'Mariam', 1
from public.films f, public.people p, public.professions pr
where f.slug = 'la-femme-du-foyer' and p.slug = 'eve-guehi' and pr.slug = 'actrice';

insert into public.film_people (film_id, person_id, profession_id, character_name, credit_order)
select f.id, p.id, pr.id, 'Awa', 2
from public.films f, public.people p, public.professions pr
where f.slug = 'la-femme-du-foyer' and p.slug = 'kadhy-toure' and pr.slug = 'actrice';

-- 8. Insert nominations for 2026
-- Eve Guehi nominated for Sotigui du Public
insert into public.nominations (edition_id, category_id, person_id, film_id, character_name, nomination_text, is_winner, is_public_vote_eligible, display_order, status, published_at)
select e.id, c.id, p.id, f.id, 'Mariam', 'Nomination d''Eve Guehi pour son rôle dans La femme du foyer', false, true, 1, 'published', now()
from public.editions e, public.award_categories c, public.people p, public.films f
where e.year = 2026 and c.slug = 'sotigui-du-public' and p.slug = 'eve-guehi' and f.slug = 'la-femme-du-foyer';

-- Kadhy Toure nominated for Sotigui du Public
insert into public.nominations (edition_id, category_id, person_id, film_id, character_name, nomination_text, is_winner, is_public_vote_eligible, display_order, status, published_at)
select e.id, c.id, p.id, f.id, 'Awa', 'Nomination de Kadhy Touré pour son rôle dans La femme du foyer', false, true, 2, 'published', now()
from public.editions e, public.award_categories c, public.people p, public.films f
where e.year = 2026 and c.slug = 'sotigui-du-public' and p.slug = 'kadhy-toure' and f.slug = 'la-femme-du-foyer';

-- Issaka Sawadogo nominated for Meilleur Acteur Afrique Ouest (Not public vote)
insert into public.nominations (edition_id, category_id, person_id, film_id, character_name, nomination_text, is_winner, is_public_vote_eligible, display_order, status, published_at)
select e.id, c.id, p.id, null, null, 'Nomination d''Issaka Sawadogo pour l''ensemble de ses rôles récents', false, false, 1, 'published', now()
from public.editions e, public.award_categories c, public.people p
where e.year = 2026 and c.slug = 'meilleur-acteur-afrique-ouest' and p.slug = 'issaka-sawadogo';

-- 9. Insert partners
insert into public.partners (name, slug, description, logo_path, website_url, partner_type, display_order, is_active) values
('Ministère de la Culture de Côte d''Ivoire', 'ministere-culture-ci', 'Partenaire institutionnel officiel.', '/images/partner_min_culture.jpg', 'https://culture.gouv.ci', 'institutional', 1, true),
('Canal+ Afrique', 'canal-plus-afrique', 'Diffuseur officiel de la cérémonie.', '/images/partner_canalplus.jpg', 'https://www.canalplus-afrique.com', 'media', 2, true);

-- Link partners to 2026 edition
insert into public.edition_partners (edition_id, partner_id, display_order)
select e.id, p.id, p.display_order
from public.editions e, public.partners p
where e.year = 2026;

-- 10. Insert voting rounds
insert into public.voting_rounds (edition_id, name, opens_at, closes_at, status, verification_method, results_visibility)
select id, 'Vote Public 11ème Edition', '2026-08-01 00:00:00+00', '2026-11-10 23:59:59+00', 'open', 'email', 'hidden'
from public.editions
where year = 2026;

-- Link public choice category to the voting round
insert into public.voting_round_categories (voting_round_id, category_id, maximum_votes_per_voter)
select vr.id, c.id, 1
from public.voting_rounds vr, public.award_categories c
where vr.status = 'open' and c.slug = 'sotigui-du-public';
