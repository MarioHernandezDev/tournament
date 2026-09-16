/**
 * Próximas partidas programadas por juego (mock).
 */
const seedMatches = () => ({
  lol: [
    { id: 'lol-m1', date: '2026-09-20T18:00:00', stage: 'Cuartos de Final', teamA: 'Karmine Corp', teamB: 'Vitality Bee' },
    { id: 'lol-m2', date: '2026-09-22T19:00:00', stage: 'Semifinal', teamA: 'Heretics Academy', teamB: 'Fnatic Rising' },
    { id: 'lol-m3', date: '2026-09-27T20:00:00', stage: 'ARAM Showdown · Ronda 1', teamA: 'Giants Gaming', teamB: 'G2 Academy' },
    { id: 'lol-m4', date: '2026-10-04T17:00:00', stage: 'Howling Abyss 1v1 · Octavos', teamA: 'Team BDS Academy', teamB: 'Movistar Riders' }
  ],
  valorant: [
    { id: 'val-m1', date: '2026-09-19T19:00:00', stage: 'Octavos de Final', teamA: 'KRÜ Esports', teamB: 'Fnatic Academy' },
    { id: 'val-m2', date: '2026-09-21T20:00:00', stage: 'Cuartos de Final', teamA: 'KOI Tactics', teamB: 'Heretics Rising' },
    { id: 'val-m3', date: '2026-09-23T21:00:00', stage: 'Swiftplay Rush · Ronda 1', teamA: 'Vitality', teamB: 'Movistar Riders' },
    { id: 'val-m4', date: '2026-10-01T18:00:00', stage: 'Aim Map Open · Octavos', teamA: 'Giants Gaming', teamB: 'BBL Esports' }
  ]
})

export const useMatchCalendar = (game) => {
  // TODO Supabase: SELECT * FROM matches WHERE game = ... AND starts_at >= now() ORDER BY starts_at ASC
  const matches = useState('match-calendar', seedMatches)
  return computed(() =>
    (matches.value[game] ?? []).slice().sort((a, b) => new Date(a.date) - new Date(b.date))
  )
}
