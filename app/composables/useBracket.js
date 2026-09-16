/**
 * Cuadro de eliminación directa (mock) de un torneo concreto, indexado por `tournamentId`.
 * Los torneos sin bracket seedeado devuelven `null` (el cuadro aún no se ha publicado).
 */
const seedBrackets = () => ({
  'lol-baron-cup-1': {
    tournamentName: 'Baron Nashor Cup #1',
    rounds: [
      {
        name: 'Cuartos de Final',
        matches: [
          { id: 'lol-qf1', teamA: 'Heretics Academy', teamB: 'Giants Gaming', scoreA: 2, scoreB: 0, status: 'completed' },
          { id: 'lol-qf2', teamA: 'Fnatic Rising', teamB: 'MAD Lions KOI', scoreA: 2, scoreB: 1, status: 'completed' },
          { id: 'lol-qf3', teamA: 'KOI Academy', teamB: 'Movistar Riders', scoreA: 1, scoreB: 2, status: 'completed' },
          { id: 'lol-qf4', teamA: 'Karmine Corp', teamB: 'Vitality Bee', scoreA: null, scoreB: null, status: 'live' }
        ]
      },
      {
        name: 'Semifinal',
        matches: [
          { id: 'lol-sf1', teamA: 'Heretics Academy', teamB: 'Fnatic Rising', scoreA: null, scoreB: null, status: 'upcoming' },
          { id: 'lol-sf2', teamA: 'Movistar Riders', teamB: null, scoreA: null, scoreB: null, status: 'upcoming' }
        ]
      },
      {
        name: 'Final',
        matches: [
          { id: 'lol-final', teamA: null, teamB: null, scoreA: null, scoreB: null, status: 'upcoming' }
        ]
      }
    ]
  },
  'valorant-spike-plant-1': {
    tournamentName: 'Copa Spike Plant #1',
    rounds: [
      {
        name: 'Octavos de Final',
        matches: [
          { id: 'val-of1', teamA: 'KRÜ Esports', teamB: 'BBL Esports', scoreA: 2, scoreB: 0, status: 'completed' },
          { id: 'val-of2', teamA: 'Fnatic Academy', teamB: 'Wolves Esports', scoreA: 2, scoreB: 1, status: 'completed' },
          { id: 'val-of3', teamA: 'KOI Tactics', teamB: 'Team Liquid', scoreA: 2, scoreB: 0, status: 'completed' },
          { id: 'val-of4', teamA: 'Heretics Rising', teamB: 'Giants Gaming', scoreA: null, scoreB: null, status: 'live' }
        ]
      },
      {
        name: 'Cuartos de Final',
        matches: [
          { id: 'val-qf1', teamA: 'KRÜ Esports', teamB: 'Fnatic Academy', scoreA: null, scoreB: null, status: 'upcoming' },
          { id: 'val-qf2', teamA: 'KOI Tactics', teamB: null, scoreA: null, scoreB: null, status: 'upcoming' }
        ]
      },
      {
        name: 'Final',
        matches: [
          { id: 'val-final', teamA: null, teamB: null, scoreA: null, scoreB: null, status: 'upcoming' }
        ]
      }
    ]
  }
})

export const useBracket = (tournamentId) => {
  // TODO Supabase: SELECT rounds/matches FROM tournament_brackets WHERE tournament_id = :tournamentId ORDER BY round_order, match_order
  const brackets = useState('tournament-brackets', seedBrackets)
  return computed(() => brackets.value[tournamentId] ?? null)
}

/**
 * Tabla de puntuación (standings) de un torneo concreto, derivada de su bracket:
 * partidos jugados, victorias/derrotas y ronda máxima alcanzada por cada equipo.
 */
export const useTournamentStandings = (tournamentId) => {
  // TODO Supabase: se sustituiría por una vista/consulta agregada
  // (p.ej. SELECT team, wins, losses FROM tournament_standings WHERE tournament_id = :tournamentId)
  const bracket = useBracket(tournamentId)

  return computed(() => {
    if (!bracket.value) return []

    const table = new Map()
    const ensure = (team) => {
      if (!team) return null
      if (!table.has(team)) {
        table.set(team, { team, wins: 0, losses: 0, played: 0, lastRound: '', eliminated: false })
      }
      return table.get(team)
    }

    bracket.value.rounds.forEach((round) => {
      round.matches.forEach((match) => {
        const a = ensure(match.teamA)
        const b = ensure(match.teamB)
        if (match.scoreA === null || match.scoreB === null) return

        if (a) { a.played++; a.lastRound = round.name }
        if (b) { b.played++; b.lastRound = round.name }

        if (match.scoreA > match.scoreB) {
          if (a) a.wins++
          if (b) { b.losses++; b.eliminated = true }
        } else if (match.scoreB > match.scoreA) {
          if (b) b.wins++
          if (a) { a.losses++; a.eliminated = true }
        }
      })
    })

    return Array.from(table.values()).sort((x, y) => y.wins - x.wins || x.losses - y.losses)
  })
}
