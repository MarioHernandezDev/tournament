/**
 * Perfil público del jugador autenticado (mock).
 */
const seedProfile = () => ({
  name: 'Alex "Nocturn" Rivera',
  avatar: 'https://i.pravatar.cc/300?u=alex-rivera',
  banner: '/img/valorant-hero.png',
  reliability: 92,
  team: 'Heretics Academy',
  badges: [
    { id: 'b1', label: 'Campeón Baron Cup', icon: 'i-heroicons-trophy' },
    { id: 'b2', label: 'MVP Temporada 2', icon: 'i-heroicons-star' },
    { id: 'b3', label: '50 Torneos Jugados', icon: 'i-heroicons-fire' }
  ],
  ranks: {
    lol: { tier: 'Diamante II' },
    valorant: { tier: 'Ascendente III' }
  },
  socials: [
    { id: 'twitch', icon: 'i-simple-icons-twitch', url: 'https://twitch.tv' },
    { id: 'x', icon: 'i-simple-icons-x', url: 'https://x.com' },
    { id: 'instagram', icon: 'i-simple-icons-instagram', url: 'https://instagram.com' }
  ]
})

export const useProfile = () => {
  // TODO Supabase: SELECT * FROM profiles WHERE id = auth.uid()
  const profile = useState('player-profile', seedProfile)

  const updateBanner = (url) => {
    profile.value = { ...profile.value, banner: url }
  }

  return { profile, updateBanner }
}
