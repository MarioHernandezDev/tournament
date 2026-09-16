<template>
  <div class="max-w-[1380px] mx-auto px-4 sm:px-6 py-14 space-y-10">
    <!-- ACCESO DENEGADO (SOLO PARA ROL 'admin') -->
    <div v-if="!isAdmin" class="max-w-lg mx-auto text-center py-20 space-y-6">
      <div class="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center mx-auto">
        <UIcon name="i-heroicons-lock-closed" class="w-8 h-8 text-zinc-500" />
      </div>
      <div class="space-y-2">
        <h1 class="font-['Rajdhani'] text-2xl font-black uppercase text-white tracking-wide">Acceso restringido</h1>
        <p class="text-zinc-400 text-sm">
          Esta sección está protegida por el rol <span class="text-white font-semibold">admin</span>.
          Tu usuario mock actual tiene el rol <span class="text-white font-semibold">{{ user?.role }}</span>.
        </p>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-['Rajdhani'] font-black text-sm uppercase tracking-wider transition-all"
        @click="toggleRole"
      >
        <UIcon name="i-heroicons-key" class="w-4 h-4" />
        Simular acceso admin (demo)
      </button>
    </div>

    <!-- PANEL DE ADMINISTRACIÓN -->
    <template v-else>
      <AdminBanner variant="welcome" />
      <AdminBanner variant="stats" />
      <ProfileTournamentWidgets
        :tournaments="activeTournaments"
        title="Torneos Activos"
        empty-label="No hay torneos activos en este momento."
      />
      <AdminUserManagement />
    </template>
  </div>
</template>

<script setup>
// TODO Supabase: proteger con middleware server-side (useSupabaseUser + rol en `profiles`)
// en lugar de comprobar el rol mock en el cliente.
const { user, isAdmin, toggleRole } = useAuthMock()
const { tournaments } = useTournaments()

const activeTournaments = computed(() => tournaments.value.filter((t) => t.status === 'upcoming'))
</script>
