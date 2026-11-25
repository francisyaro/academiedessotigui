// src/lib/eventConfig.ts
// Configuration centralisée du cycle de vie événementiel des Sotigui Awards

export const EVENT_CONFIG = {
  currentEdition: 11,
  currentYear: 2026,
  nextEdition: 12,
  nextYear: 2027,
  /**
   * Statut de l'édition :
   * - 'PRE_EVENT' : Annonce, appels à candidatures
   * - 'VOTING_OPEN' : Votes du public et de l'Académie ouverts
   * - 'POST_EVENT' : Édition clôturée, votes fermés, mise en avant du Palmarès et des archives
   */
  phase: 'POST_EVENT' as 'PRE_EVENT' | 'VOTING_OPEN' | 'POST_EVENT',
  isPublicVotingOpen: false,
  isAcademyVotingOpen: false,
  ceremonyDateISO: '2026-11-14T19:00:00Z',
}
