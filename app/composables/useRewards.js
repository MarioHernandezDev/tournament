/**
 * Tienda de canje de puntos (mock).
 */
const seedRewards = () => [
  { id: 'r1', name: 'Revelado de fotos del torneo', description: 'Recibe el pack de fotos profesionales de tu último torneo.', cost: 150, icon: 'i-heroicons-camera' },
  { id: 'r2', name: '1 hora de PC gratis', description: 'Canjea puntos por una hora de PC Gaming Estándar.', cost: 200, icon: 'i-heroicons-computer-desktop' },
  { id: 'r3', name: 'Bebida gratis', description: 'Cualquier refresco o energética de la barra.', cost: 80, icon: 'i-heroicons-beaker' },
  { id: 'r4', name: '3 horas de PC Pro', description: 'Canjea puntos por horas en un setup Pro.', cost: 500, icon: 'i-heroicons-bolt' }
]

export const useRewards = () => {
  // TODO Supabase: SELECT * FROM rewards WHERE active = true ORDER BY cost ASC; puntos desde profiles.points
  const rewards = useState('rewards-shop', seedRewards)
  const points = useState('user-points', () => 620)

  const redeem = (reward) => {
    if (points.value < reward.cost) return false
    points.value -= reward.cost
    return true
  }

  return { rewards, points, redeem }
}
