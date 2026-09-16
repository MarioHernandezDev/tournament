<template>
  <header class="sticky top-0 z-50 w-full px-4 sm:px-8 py-3 bg-black/80 backdrop-blur-xl border-b border-zinc-800/80 transition-all">
    <div class="max-w-[1500px] mx-auto flex items-center justify-between gap-4">

      <!-- LOGO -->
      <NuxtLink to="/" class="flex items-center gap-3 group shrink-0">
        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-white via-zinc-400 to-zinc-700 p-0.5 shadow-lg shadow-white/5 group-hover:scale-105 transition-transform">
          <div class="w-full h-full bg-black rounded-full flex items-center justify-center">
            <UIcon name="i-heroicons-trophy" class="w-5 h-5 text-white" />
          </div>
        </div>
        <span class="font-['Rajdhani'] text-2xl font-black tracking-widest text-white uppercase">
          PROJECT<span class="text-zinc-400">GAMING</span>
        </span>
      </NuxtLink>

      <!-- NAVEGACIÓN EN CÁPSULA / PÍLDORA -->
      <nav class="hidden lg:flex items-center gap-1 bg-zinc-900/90 border border-zinc-800/80 p-1.5 rounded-full shadow-inner font-['Rajdhani'] text-sm font-bold tracking-wide">
        <NuxtLink
          to="/"
          class="px-5 py-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all"
          active-class="!text-black !bg-white shadow-md"
        >
          Inicio
        </NuxtLink>

        <NuxtLink
          to="/instalaciones"
          class="px-5 py-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all flex items-center gap-2"
          active-class="!text-white !bg-zinc-800 border border-zinc-700"
        >
          <UIcon name="i-heroicons-building-storefront" class="w-4 h-4" />
          Instalaciones
        </NuxtLink>

        <!-- TORNEOS CON SUBMENÚ (LOL / VALORANT) -->
        <div
          class="relative"
          @mouseenter="tournamentsMenuOpen = true"
          @mouseleave="tournamentsMenuOpen = false"
        >
          <NuxtLink
            to="/torneos"
            class="px-5 py-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all flex items-center gap-2"
            active-class="!text-white !bg-zinc-800 border border-zinc-700"
          >
            <UIcon name="i-heroicons-trophy" class="w-4 h-4" />
            Torneos
            <UIcon name="i-heroicons-chevron-down" class="w-3 h-3 opacity-60" />
          </NuxtLink>

          <Transition name="fade">
            <div
              v-if="tournamentsMenuOpen"
              class="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-52"
            >
              <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl shadow-2xl p-1.5 space-y-1">
                <NuxtLink
                  to="/torneos/lol"
                  class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors"
                >
                  <UIcon name="i-simple-icons-leagueoflegends" class="w-4 h-4 text-cyan-400" />
                  League of Legends
                </NuxtLink>
                <NuxtLink
                  to="/torneos/valorant"
                  class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/70 transition-colors"
                >
                  <UIcon name="i-simple-icons-valorant" class="w-4 h-4 text-red-500" />
                  Valorant
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

        <NuxtLink
          to="/ranks"
          class="px-5 py-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all flex items-center gap-2"
          active-class="!text-white !bg-zinc-800 border border-zinc-700"
        >
          <UIcon name="i-heroicons-chart-bar" class="w-4 h-4" />
          Ranking
        </NuxtLink>
      </nav>

      <!-- BOTONES DE ACCIÓN (PÍLDORAS) -->
      <div class="flex items-center gap-3 shrink-0">
        <!-- INVITADO: SIN SESIÓN -->
        <template v-if="!isLoggedIn">
          <NuxtLink
            to="/login"
            class="hidden sm:inline-flex items-center justify-center rounded-full font-['Rajdhani'] font-bold text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60 px-5 py-2 transition-colors"
          >
            Iniciar Sesión
          </NuxtLink>

          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center rounded-full bg-white hover:bg-zinc-200 text-black font-['Rajdhani'] font-black text-sm uppercase tracking-wider px-6 py-2 shadow-lg shadow-white/10 transition-all active:scale-95"
          >
            Registrarse
          </NuxtLink>
        </template>

        <!-- CON SESIÓN: AVATAR / PILL -->
        <NuxtLink
          v-else
          :to="user.role === 'admin' ? '/admin' : '/perfil'"
          class="group inline-flex items-center gap-2.5 rounded-full bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-600 pl-2 pr-4 py-1.5 transition-all"
        >
          <img :src="user.avatar" :alt="user.name" class="w-7 h-7 rounded-full object-cover border border-zinc-700">
          <span class="font-['Rajdhani'] font-bold text-sm text-zinc-200 group-hover:text-white transition-colors leading-none">
            {{ user.name.split(' ')[0] }}
          </span>
          <span
            class="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider"
            :class="user.role === 'admin' ? 'bg-amber-400/15 text-amber-300' : 'bg-cyan-400/10 text-cyan-300'"
          >
            {{ user.role }}
          </span>
        </NuxtLink>
      </div>

    </div>
  </header>
</template>

<script setup>
// TODO Supabase: sustituir useAuthMock() por useSupabaseUser() + una consulta a `profiles`
// para conocer el rol real (player/admin) del usuario autenticado.
const { user, isLoggedIn } = useAuthMock()

const tournamentsMenuOpen = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -4px);
}
</style>
