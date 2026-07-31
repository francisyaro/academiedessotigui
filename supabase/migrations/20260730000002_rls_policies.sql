-- 20260730000002_rls_policies.sql
-- Row Level Security (RLS) policies for Académie des Sotigui tables

-- Helper function to check if user has admin/super_admin role
create or replace function public.is_admin(p_user_id uuid)
returns boolean security definer as $$
begin
    return exists (
        select 1 
        from public.user_roles ur
        join public.roles r on ur.role_id = r.id
        where ur.user_id = p_user_id 
          and r.code in ('super_admin', 'admin')
    );
end;
$$ language plpgsql;

-- Helper function to check if user has a specific role
create or replace function public.has_role(p_user_id uuid, p_role_code text)
returns boolean security definer as $$
begin
    return exists (
        select 1 
        from public.user_roles ur
        join public.roles r on ur.role_id = r.id
        where ur.user_id = p_user_id 
          and r.code = p_role_code
    );
end;
$$ language plpgsql;

-- 1. Profiles & Roles Policies
create policy "Allow users to read profiles" on public.profiles
    for select using (true);

create policy "Allow users to update their own profile" on public.profiles
    for update using (auth.uid() = id);

create policy "Allow admin full access to profiles" on public.profiles
    for all using (public.is_admin(auth.uid()));

create policy "Allow admin full access to roles" on public.roles
    for all using (public.is_admin(auth.uid()));

create policy "Allow admin full access to user_roles" on public.user_roles
    for all using (public.is_admin(auth.uid()));

-- 2. Editions & Categories Policies
create policy "Allow public read active editions" on public.editions
    for select using (status != 'draft' or public.is_admin(auth.uid()));

create policy "Allow admin full access to editions" on public.editions
    for all using (public.is_admin(auth.uid()));

create policy "Allow public read active categories" on public.award_categories
    for select using (is_active = true or public.is_admin(auth.uid()));

create policy "Allow admin full access to award_categories" on public.award_categories
    for all using (public.is_admin(auth.uid()));

create policy "Allow public read edition_categories" on public.edition_categories
    for select using (true);

create policy "Allow admin full access to edition_categories" on public.edition_categories
    for all using (public.is_admin(auth.uid()));

-- 3. People & Professions Policies
create policy "Allow public read published people" on public.people
    for select using (is_published = true or public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'nominations_manager'));

create policy "Allow admin/nominations_manager write people" on public.people
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'nominations_manager'));

create policy "Allow public read professions" on public.professions
    for select using (true);

create policy "Allow admin/nominations_manager write professions" on public.professions
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'nominations_manager'));

create policy "Allow public read person_professions" on public.person_professions
    for select using (true);

create policy "Allow admin/nominations_manager write person_professions" on public.person_professions
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'nominations_manager'));

-- 4. Academy Structure Policies
create policy "Allow public read active colleges" on public.academy_colleges
    for select using (is_active = true or public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'members_manager'));

create policy "Allow admin/members_manager write academy_colleges" on public.academy_colleges
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'members_manager'));

create policy "Allow public read public members" on public.academy_members
    for select using (is_public = true or public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'members_manager'));

create policy "Allow admin/members_manager write academy_members" on public.academy_members
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'members_manager'));

create policy "Allow public read committees" on public.committees
    for select using (true);

create policy "Allow admin/members_manager write committees" on public.committees
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'members_manager'));

create policy "Allow public read committee_members" on public.committee_members
    for select using (true);

create policy "Allow admin/members_manager write committee_members" on public.committee_members
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'members_manager'));

create policy "Allow public to insert membership_applications" on public.membership_applications
    for insert with check (true);

create policy "Allow admin/members_manager read/write membership_applications" on public.membership_applications
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'members_manager'));

-- 5. Films Policies
create policy "Allow public read published films" on public.films
    for select using (is_published = true or public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'nominations_manager'));

create policy "Allow admin/nominations_manager write films" on public.films
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'nominations_manager'));

create policy "Allow public read film_people" on public.film_people
    for select using (true);

create policy "Allow admin/nominations_manager write film_people" on public.film_people
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'nominations_manager'));

-- 6. Nominations Policies
create policy "Allow public read validated/published nominations" on public.nominations
    for select using (status in ('validated', 'published') or public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'nominations_manager'));

create policy "Allow admin/nominations_manager write nominations" on public.nominations
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'nominations_manager'));

-- 7. Ceremonies, Venues & Broadcasters Policies
create policy "Allow public read venues" on public.venues
    for select using (true);

create policy "Allow admin write venues" on public.venues
    for all using (public.is_admin(auth.uid()));

create policy "Allow public read ceremonies" on public.ceremonies
    for select using (true);

create policy "Allow admin write ceremonies" on public.ceremonies
    for all using (public.is_admin(auth.uid()));

create policy "Allow public read ceremony_people" on public.ceremony_people
    for select using (true);

create policy "Allow admin write ceremony_people" on public.ceremony_people
    for all using (public.is_admin(auth.uid()));

create policy "Allow public read broadcasters" on public.broadcasters
    for select using (true);

create policy "Allow admin write broadcasters" on public.broadcasters
    for all using (public.is_admin(auth.uid()));

create policy "Allow public read ceremony_broadcasters" on public.ceremony_broadcasters
    for select using (true);

create policy "Allow admin write ceremony_broadcasters" on public.ceremony_broadcasters
    for all using (public.is_admin(auth.uid()));

create policy "Allow public read public schedule_events" on public.schedule_events
    for select using (is_public = true or public.is_admin(auth.uid()));

create policy "Allow admin write schedule_events" on public.schedule_events
    for all using (public.is_admin(auth.uid()));

-- 8. Editorial & Media Assets Policies
create policy "Allow public read published articles" on public.articles
    for select using (status = 'published' and published_at <= now() or public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'news_editor'));

create policy "Allow admin/news_editor write articles" on public.articles
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'news_editor'));

create policy "Allow public read article_relations" on public.article_relations
    for select using (true);

create policy "Allow admin/news_editor write article_relations" on public.article_relations
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'news_editor'));

create policy "Allow public read tags" on public.tags
    for select using (true);

create policy "Allow admin/news_editor write tags" on public.tags
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'news_editor'));

create policy "Allow public read article_tags" on public.article_tags
    for select using (true);

create policy "Allow admin/news_editor write article_tags" on public.article_tags
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'news_editor'));

create policy "Allow public read public media_assets" on public.media_assets
    for select using (is_public = true or public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'media_manager'));

create policy "Allow admin/media_manager write media_assets" on public.media_assets
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'media_manager'));

create policy "Allow public read published galleries" on public.galleries
    for select using (status = 'published' or public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'media_manager'));

create policy "Allow admin/media_manager write galleries" on public.galleries
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'media_manager'));

create policy "Allow public read gallery_items" on public.gallery_items
    for select using (true);

create policy "Allow admin/media_manager write gallery_items" on public.gallery_items
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'media_manager'));

-- 9. Partners Policies
create policy "Allow public read active partners" on public.partners
    for select using (is_active = true or public.is_admin(auth.uid()));

create policy "Allow admin write partners" on public.partners
    for all using (public.is_admin(auth.uid()));

create policy "Allow public read edition_partners" on public.edition_partners
    for select using (true);

create policy "Allow admin write edition_partners" on public.edition_partners
    for all using (public.is_admin(auth.uid()));

-- 10. Voting Policies
create policy "Allow public read active voting_rounds" on public.voting_rounds
    for select using (status = 'open' or public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'voting_manager'));

create policy "Allow admin/voting_manager write voting_rounds" on public.voting_rounds
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'voting_manager'));

create policy "Allow public read voting_round_categories" on public.voting_round_categories
    for select using (true);

create policy "Allow admin/voting_manager write voting_round_categories" on public.voting_round_categories
    for all using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'voting_manager'));

-- Voter identities can only be managed by system (service role) or read by voting managers
create policy "Allow admin/voting_manager read voter_identities" on public.voter_identities
    for select using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'voting_manager'));

-- Vote verification codes can only be handled by service role/system, no direct public select
create policy "Allow admin/voting_manager read verification_codes" on public.vote_verification_codes
    for select using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'voting_manager'));

-- Votes read policy (aggregated count or anonymized display for admins)
create policy "Allow admin/voting_manager read votes" on public.votes
    for select using (public.is_admin(auth.uid()) or public.has_role(auth.uid(), 'voting_manager'));

-- 11. Audit Logs Policies
create policy "Allow admin read audit_logs" on public.audit_logs
    for select using (public.is_admin(auth.uid()));
