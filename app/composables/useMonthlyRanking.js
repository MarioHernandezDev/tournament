/**
 * Ranking mensual (mock) TOP 10 por juego, con LP y posición del mes anterior
 * para derivar la tendencia (sube / baja / mantiene).
 */
const seedRanking = () => ({
  lol: [
    { team: 'Heretics Academy', previousRank: 2, points: 1420, wins: 18, losses: 4 },
    { team: 'Fnatic Rising', previousRank: 1, points: 1385, wins: 17, losses: 5 },
    { team: 'KOI Academy', previousRank: 4, points: 1310, wins: 15, losses: 6 },
    { team: 'Karmine Corp', previousRank: 3, points: 1275, wins: 14, losses: 7 },
    { team: 'Vitality Bee', previousRank: 6, points: 1190, wins: 13, losses: 8 },
    { team: 'G2 Academy', previousRank: 5, points: 1160, wins: 12, losses: 8 },
    { team: 'Movistar Riders', previousRank: 7, points: 1080, wins: 11, losses: 9 },
    { team: 'MAD Lions KOI', previousRank: 9, points: 1015, wins: 10, losses: 10 },
    { team: 'Team BDS Academy', previousRank: 8, points: 985, wins: 9, losses: 10 },
    { team: 'Giants Gaming', previousRank: 10, points: 920, wins: 8, losses: 11 }
  ],
  valorant: [
    { team: 'Karmine Corp', previousRank: 1, points: 1510, wins: 20, losses: 3 },
    { team: 'KOI Academy', previousRank: 3, points: 1440, wins: 18, losses: 5 },
    { team: 'Fnatic Rising', previousRank: 2, points: 1400, wins: 17, losses: 6 },
    { team: 'Heretics Clan', previousRank: 5, points: 1330, wins: 16, losses: 6 },
    { team: 'Vitality', previousRank: 4, points: 1290, wins: 15, losses: 7 },
    { team: 'Movistar Riders', previousRank: 7, points: 1205, wins: 13, losses: 8 },
    { team: 'Giants Gaming', previousRank: 6, points: 1180, wins: 12, losses: 9 },
    { team: 'Team Liquid', previousRank: 8, points: 1090, wins: 11, losses: 9 },
    { team: 'BBL Esports', previousRank: 10, points: 1010, wins: 10, losses: 11 },
    { team: 'Wolves Esports', previousRank: 9, points: 975, wins: 9, losses: 11 }
  ]
})

export const useMonthlyRanking = (game) => {
  const ranking = useState('monthly-ranking', seedRanking)

  return computed(() =>
    (ranking.value[game] ?? [])
      .map((entry, index) => {
        const rank = index + 1
        const delta = entry.previousRank - rank
        const trend = delta > 0 ? 'up' : delta < 0 ? 'down' : 'same'
        return { ...entry, rank, delta: Math.abs(delta), trend }
      })
  )
}
