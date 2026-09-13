/**
 * Actividad (mock) del usuario autenticado por juego.
 * `null` simula un usuario sin historial todavía (muestra el CTA de bienvenida).
 */
const seedActivity = () => ({
  lol: {
    tournamentsPlayed: 7,
    team: 'Heretics Academy',
    stat: '4.2 KDA',
    statLabel: 'KDA Promedio',
    position: '#3',
    lastResult: 'Semifinalista · Baron Nashor Cup'
  },
  valorant: null
})

export const useUserActivity = (game) => {
  const activity = useState('user-activity', seedActivity)
  return computed(() => activity.value[game] ?? null)
}
