/**
 * Canales sociales y seguidores (mock).
 */
const seedSocials = () => [
  { id: 'instagram', label: 'Instagram', handle: '@projectgaming', followers: 12400, icon: 'i-simple-icons-instagram', url: 'https://instagram.com' },
  { id: 'twitter', label: 'Twitter / X', handle: '@projectgaming', followers: 8300, icon: 'i-simple-icons-x', url: 'https://x.com' },
  { id: 'discord', label: 'Discord', handle: 'Project Gaming', followers: 5600, icon: 'i-simple-icons-discord', url: 'https://discord.gg' },
  { id: 'tiktok', label: 'TikTok', handle: '@projectgaming', followers: 21000, icon: 'i-simple-icons-tiktok', url: 'https://tiktok.com' }
]

export const useSocialStats = () => {
  // TODO Supabase: SELECT * FROM social_channels ORDER BY followers DESC
  return useState('social-stats', seedSocials)
}
