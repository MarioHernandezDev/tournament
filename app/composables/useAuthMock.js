/**
 * Sesión de usuario (mock). Simula un usuario logueado con rol 'player' | 'admin'.
 * `user` a null simula un invitado sin sesión (se muestra "Iniciar Sesión / Registrarse").
 */
const seedUser = () => ({
  id: 'mock-user-1',
  name: 'Alex Rivera',
  handle: '@nocturn',
  avatar: 'https://i.pravatar.cc/150?u=alex-rivera',
  role: 'player',
  reliability: 92
})

export const useAuthMock = () => {
  // TODO Supabase: sustituir por useSupabaseUser() + SELECT id, name, avatar_url, role, reliability FROM profiles WHERE id = auth.uid()
  const user = useState('auth-mock-user', () => seedUser())

  const isLoggedIn = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const login = (role = 'player') => {
    user.value = { ...seedUser(), role }
  }

  const logout = () => {
    user.value = null
  }

  const toggleRole = () => {
    if (!user.value) return
    user.value = { ...user.value, role: user.value.role === 'admin' ? 'player' : 'admin' }
  }

  return { user, isLoggedIn, isAdmin, login, logout, toggleRole }
}
