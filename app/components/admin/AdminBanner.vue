<template>
  <!-- VARIANTE: BIENVENIDA -->
  <section
    v-if="variant === 'welcome'"
    class="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-zinc-950 to-black p-8 sm:p-10"
  >
    <div class="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-amber-400/10 blur-[100px] pointer-events-none" />
    <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div class="space-y-2">
        <span class="text-xs font-mono uppercase tracking-[0.3em] text-amber-400">Panel de Administración</span>
        <h1 class="font-['Rajdhani'] text-3xl sm:text-4xl font-black uppercase text-white tracking-wide">
          Bienvenido, {{ user?.name?.split(' ')[0] || 'Admin' }}
        </h1>
        <p class="text-zinc-400 text-sm sm:text-base max-w-lg">
          Gestiona torneos, usuarios y consulta el estado general del local desde un único panel.
        </p>
      </div>

      <NuxtLink
        to="/tournaments/create"
        class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-['Rajdhani'] font-black text-sm uppercase tracking-wider transition-all shrink-0"
      >
        <UIcon name="i-heroicons-plus-circle" class="w-4 h-4" />
        Crear Torneo
      </NuxtLink>
    </div>
  </section>

  <!-- VARIANTE: ESTADÍSTICAS RÁPIDAS -->
  <section v-else class="grid grid-cols-1 sm:grid-cols-3 gap-5">
    <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-6 flex items-center gap-4">
      <div class="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
        <UIcon name="i-heroicons-trophy" class="w-6 h-6 text-cyan-400" />
      </div>
      <div>
        <p class="font-['Rajdhani'] text-3xl font-black text-white leading-none">{{ stats.activeTournaments }}</p>
        <p class="text-xs text-zinc-500 uppercase tracking-wide mt-1">Torneos Activos</p>
      </div>
    </div>

    <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-6 flex items-center gap-4">
      <div class="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
        <UIcon name="i-heroicons-users" class="w-6 h-6 text-amber-400" />
      </div>
      <div>
        <p class="font-['Rajdhani'] text-3xl font-black text-white leading-none">{{ stats.registeredUsers.toLocaleString('es-ES') }}</p>
        <p class="text-xs text-zinc-500 uppercase tracking-wide mt-1">Usuarios Registrados</p>
      </div>
    </div>

    <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-6 flex items-center gap-4">
      <div class="w-12 h-12 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center shrink-0">
        <UIcon name="i-heroicons-banknotes" class="w-6 h-6 text-emerald-400" />
      </div>
      <div>
        <p class="font-['Rajdhani'] text-3xl font-black text-white leading-none">{{ stats.monthlyRevenue.toLocaleString('es-ES') }}&euro;</p>
        <p class="text-xs text-zinc-500 uppercase tracking-wide mt-1">Ingresos del Mes</p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'welcome',
    validator: (v) => ['welcome', 'stats'].includes(v)
  }
})

const { user } = useAuthMock()
const stats = useAdminStats()
</script>
