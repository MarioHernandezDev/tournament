/**
 * Estadísticas rápidas del local para el panel de administración (mock).
 */
const seedStats = () => ({
  activeTournaments: 4,
  registeredUsers: 1284,
  monthlyRevenue: 6540
})

export const useAdminStats = () => {
  // TODO Supabase: SELECT count(*) FROM tournaments WHERE status = 'upcoming';
  // SELECT count(*) FROM profiles; SELECT sum(amount) FROM payments WHERE date_trunc('month', created_at) = date_trunc('month', now())
  return useState('admin-stats', seedStats)
}
