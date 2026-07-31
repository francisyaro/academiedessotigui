-- 20260730000001_voting_transaction.sql
-- Transaction function for secure atomic voting

create or replace function public.register_vote(
    p_voting_round_id uuid,
    p_category_id uuid,
    p_nomination_id uuid,
    p_voter_identity_id uuid,
    p_device_hash text,
    p_ip_hash text,
    p_user_agent_hash text
) returns uuid as $$
declare
    v_vote_id uuid;
    v_round_status text;
    v_round_opens timestamp with time zone;
    v_round_closes timestamp with time zone;
    v_is_public_vote_eligible boolean;
    v_nomination_category_id uuid;
    v_nomination_round_edition_id uuid;
    v_round_edition_id uuid;
    v_voter_verified timestamp with time zone;
    v_max_votes integer;
    v_current_votes_count integer;
begin
    -- 1. Check if voting round exists and get status & dates & edition
    select status, opens_at, closes_at, edition_id
    into v_round_status, v_round_opens, v_round_closes, v_round_edition_id
    from public.voting_rounds
    where id = p_voting_round_id;

    if not found then
        raise exception 'La session de vote spécifiée est introuvable.';
    end if;

    -- 2. Verify voting round is active and within dates
    if v_round_status != 'open' or now() < v_round_opens or now() > v_round_closes then
        raise exception 'La session de vote est actuellement fermée ou inactive.';
    end if;

    -- 3. Verify category is active for this round and get maximum votes allowed
    select maximum_votes_per_voter
    into v_max_votes
    from public.voting_round_categories
    where voting_round_id = p_voting_round_id and category_id = p_category_id;

    if not found then
        raise exception 'Cette catégorie n''est pas ouverte au vote dans cette session.';
    end if;

    -- 4. Verify nomination details (category matches, public vote is eligible, edition matches)
    select is_public_vote_eligible, category_id, edition_id
    into v_is_public_vote_eligible, v_nomination_category_id, v_nomination_round_edition_id
    from public.nominations
    where id = p_nomination_id;

    if not found then
        raise exception 'La nomination spécifiée est introuvable.';
    end if;

    if v_nomination_category_id != p_category_id then
        raise exception 'La nomination n''appartient pas à la catégorie spécifiée.';
    end if;

    if v_nomination_round_edition_id != v_round_edition_id then
        raise exception 'La nomination n''appartient pas à la bonne édition.';
    end if;

    if not v_is_public_vote_eligible then
        raise exception 'Cette nomination n''est pas éligible au vote du public.';
    end if;

    -- 5. Verify voter identity is verified
    select verified_at
    into v_voter_verified
    from public.voter_identities
    where id = p_voter_identity_id;

    if not found or v_voter_verified is null then
        raise exception 'L''identité de l''électeur n''est pas vérifiée.';
    end if;

    -- 6. Check existing votes for this voter in this category and voting round
    select count(*)
    into v_current_votes_count
    from public.votes
    where voting_round_id = p_voting_round_id
      and category_id = p_category_id
      and voter_identity_id = p_voter_identity_id;

    if v_current_votes_count >= v_max_votes then
        raise exception 'Vous avez déjà atteint la limite de vote pour cette catégorie.';
    end if;

    -- 7. Insert the vote
    insert into public.votes (
        voting_round_id,
        category_id,
        nomination_id,
        voter_identity_id,
        anonymous_device_hash,
        ip_hash,
        user_agent_hash,
        created_at
    ) values (
        p_voting_round_id,
        p_category_id,
        p_nomination_id,
        p_voter_identity_id,
        p_device_hash,
        p_ip_hash,
        p_user_agent_hash,
        now()
    ) returning id into v_vote_id;

    -- 8. Log vote event
    insert into public.vote_events (
        vote_id,
        event_type,
        metadata
    ) values (
        v_vote_id,
        'vote_recorded',
        jsonb_build_object(
            'device_hash', p_device_hash,
            'ip_hash', p_ip_hash
        )
    );

    -- 9. Update voter's vote timestamp
    update public.voter_identities
    set last_vote_at = now(),
        first_vote_at = coalesce(first_vote_at, now())
    where id = p_voter_identity_id;

    return v_vote_id;
end;
$$ language plpgsql security definer;
