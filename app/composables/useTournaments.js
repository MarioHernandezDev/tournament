/**
 * Estado global (mock) de torneos, compartido entre las páginas de juego
 * y el wizard de creación de torneos (`useState('tournaments')`).
 */
const seedTournaments = () => [
  {
    id: 'lol-baron-cup-1',
    game: 'lol',
    name: 'Baron Nashor Cup #1',
    banner: '/img/lol-hero.png',
    mode: '5v5 Grieta',
    format: 'Eliminación Directa',
    maxTeams: 16,
    teamsRegistered: 11,
    startDate: '2026-09-20T18:00:00',
    prizePool: '500.000 RP + Aspectos Exclusivos',
    status: 'upcoming'
  },
  {
    id: 'lol-aram-showdown',
    game: 'lol',
    name: 'ARAM Showdown',
    banner: '/img/lol-hero.png',
    mode: 'ARAM',
    format: 'Doble Eliminación',
    maxTeams: 8,
    teamsRegistered: 8,
    startDate: '2026-09-27T20:00:00',
    prizePool: '200.000 RP',
    status: 'upcoming'
  },
  {
    id: 'lol-howling-1v1',
    game: 'lol',
    name: 'Howling Abyss 1v1 Open',
    banner: '/img/lol-hero.png',
    mode: '1v1 Howling Abyss',
    format: 'Eliminación Directa',
    maxTeams: 32,
    teamsRegistered: 19,
    startDate: '2026-10-04T17:00:00',
    prizePool: '100.000 RP',
    status: 'upcoming'
  },
  {
    id: 'lol-summoners-clash',
    game: 'lol',
    name: 'Summoners Clash Season 3',
    banner: '/img/lol-hero.png',
    mode: '5v5 Grieta',
    format: 'Doble Eliminación',
    maxTeams: 16,
    teamsRegistered: 16,
    startDate: '2026-08-10T18:00:00',
    prizePool: '750.000 RP',
    status: 'completed',
    champion: 'Heretics Academy',
    mvp: 'Kaelis "Nocturn" Vega',
    prizeDistributed: '750.000 RP repartidos entre Top 4'
  },
  {
    id: 'lol-aram-winter',
    game: 'lol',
    name: 'ARAM Winter Clash',
    banner: '/img/lol-hero.png',
    mode: 'ARAM',
    format: 'Eliminación Directa',
    maxTeams: 8,
    teamsRegistered: 8,
    startDate: '2026-07-15T19:00:00',
    prizePool: '150.000 RP',
    status: 'completed',
    champion: 'Fnatic Rising',
    mvp: 'Iris "Frostbyte" Lund',
    prizeDistributed: '150.000 RP al equipo campeón'
  },
  {
    id: 'valorant-spike-plant-1',
    game: 'valorant',
    name: 'Copa Spike Plant #1',
    banner: '/img/valorant-hero.png',
    mode: '5v5 Competitivo',
    format: 'Eliminación Directa',
    maxTeams: 16,
    teamsRegistered: 14,
    startDate: '2026-09-19T19:00:00',
    prizePool: '2.500 VP + Slot Playoffs',
    status: 'upcoming'
  },
  {
    id: 'valorant-swiftplay-rush',
    game: 'valorant',
    name: 'Swiftplay Rush',
    banner: '/img/valorant-hero.png',
    mode: 'Swiftplay',
    format: 'Doble Eliminación',
    maxTeams: 8,
    teamsRegistered: 5,
    startDate: '2026-09-23T21:00:00',
    prizePool: '1.000 VP',
    status: 'upcoming'
  },
  {
    id: 'valorant-aim-map-open',
    game: 'valorant',
    name: 'Aim Map Open',
    banner: '/img/valorant-hero.png',
    mode: '1v1 Aim Map',
    format: 'Eliminación Directa',
    maxTeams: 32,
    teamsRegistered: 22,
    startDate: '2026-10-01T18:00:00',
    prizePool: '500 VP',
    status: 'upcoming'
  },
  {
    id: 'valorant-radiant-clash',
    game: 'valorant',
    name: 'Radiant Clash Season 2',
    banner: '/img/valorant-hero.png',
    mode: '5v5 Competitivo',
    format: 'Doble Eliminación',
    maxTeams: 16,
    teamsRegistered: 16,
    startDate: '2026-08-05T19:00:00',
    prizePool: '5.000 VP + Slot Internacional',
    status: 'completed',
    champion: 'Karmine Corp',
    mvp: 'Sana "Vantage" Ortiz',
    prizeDistributed: '5.000 VP repartidos entre Top 4'
  },
  {
    id: 'valorant-swiftplay-classic',
    game: 'valorant',
    name: 'Swiftplay Classic',
    banner: '/img/valorant-hero.png',
    mode: 'Swiftplay',
    format: 'Eliminación Directa',
    maxTeams: 8,
    teamsRegistered: 8,
    startDate: '2026-07-22T20:00:00',
    prizePool: '800 VP',
    status: 'completed',
    champion: 'KOI Academy',
    mvp: 'Theo "Ashline" Marchetti',
    prizeDistributed: '800 VP al equipo campeón'
  }
]

export const useTournaments = () => {
  const tournaments = useState('tournaments', seedTournaments)

  const byGame = (game) => computed(() => tournaments.value.filter((t) => t.game === game))

  const upcomingByGame = (game) =>
    computed(() =>
      tournaments.value
        .filter((t) => t.game === game && t.status === 'upcoming')
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    )

  const completedByGame = (game) =>
    computed(() =>
      tournaments.value
        .filter((t) => t.game === game && t.status === 'completed')
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    )

  const addTournament = (payload) => {
    const tournament = {
      id: `${payload.game}-${Date.now()}`,
      teamsRegistered: 0,
      status: 'upcoming',
      ...payload
    }
    tournaments.value.unshift(tournament)
    return tournament
  }

  return { tournaments, byGame, upcomingByGame, completedByGame, addTournament }
}
