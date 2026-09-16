/**
 * Promociones activas del local (mock).
 */
const seedPromos = () => [
  {
    id: 'promo-2x1-tarde',
    title: '2x1 en horas de tarde',
    description: 'De lunes a jueves, de 16:00 a 19:00, todas las horas de PC van a 2x1.',
    icon: 'i-heroicons-clock',
    badge: 'Entre semana'
  },
  {
    id: 'promo-primera-hora',
    title: 'Primera hora gratis',
    description: 'Ven por primera vez y prueba nuestros setups con 1 hora de PC gratis.',
    icon: 'i-heroicons-gift',
    badge: 'Nuevos'
  },
  {
    id: 'promo-combo-duo',
    title: 'Combo Dúo + Bebida',
    description: '2 horas para dos jugadores + una bebida cada uno por solo 8€.',
    icon: 'i-heroicons-user-group',
    badge: 'Grupos'
  }
]

export const usePromos = () => {
  // TODO Supabase: SELECT * FROM promotions WHERE active = true ORDER BY starts_at DESC
  return useState('active-promos', seedPromos)
}
