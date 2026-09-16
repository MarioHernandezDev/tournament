/**
 * Listado de usuarios para la gestión de administración (mock).
 */
const seedUsers = () => [
  { id: 'u1', name: 'Alex Rivera', role: 'player', status: 'active', reliability: 92 },
  { id: 'u2', name: 'Lucía Fernández', role: 'player', status: 'active', reliability: 88 },
  { id: 'u3', name: 'Diego Morales', role: 'player', status: 'suspended', reliability: 54 },
  { id: 'u4', name: 'Nerea Pardo', role: 'admin', status: 'active', reliability: 97 },
  { id: 'u5', name: 'Marcos Gil', role: 'player', status: 'active', reliability: 75 }
]

export const useUsersMock = () => {
  // TODO Supabase: SELECT id, name, role, status, reliability FROM profiles ORDER BY created_at DESC
  const users = useState('admin-users', seedUsers)

  const toggleSuspend = (id) => {
    const target = users.value.find((u) => u.id === id)
    if (target) target.status = target.status === 'suspended' ? 'active' : 'suspended'
  }

  return { users, toggleSuspend }
}
