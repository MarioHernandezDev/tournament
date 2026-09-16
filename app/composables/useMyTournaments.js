/**
 * Torneos en los que está inscrito el usuario actual (mock), derivado de useTournaments().
 */
const seedRegisteredIds = () => ['lol-baron-cup-1', 'valorant-spike-plant-1', 'lol-aram-showdown']

export const useMyTournaments = () => {
  // TODO Supabase: SELECT tournaments.* FROM tournament_registrations
  // JOIN tournaments ON tournaments.id = tournament_registrations.tournament_id
  // WHERE tournament_registrations.user_id = auth.uid()
  const { tournaments } = useTournaments()
  const registeredIds = useState('my-tournament-ids', seedRegisteredIds)

  return computed(() => tournaments.value.filter((t) => registeredIds.value.includes(t.id)))
}
