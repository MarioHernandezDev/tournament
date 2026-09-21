<template>
  <header class="fixed top-3 sm:top-5 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-4 pointer-events-none">
    
    <!-- BARRA PRINCIPAL FLOTANTE -->
    <div class="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 bg-zinc-950/85 border border-zinc-800/80 p-2 sm:p-2.5 px-4 sm:px-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-md sm:backdrop-blur-2xl transition-all duration-300 w-full max-w-[calc(100vw-2rem)] sm:w-auto">
      
      <!-- ISOTIPO ALIENÍGENA (Más grande y muy separado en Desktop) -->
      <NuxtLink to="/" class="shrink-0 flex items-center mr-2 sm:mr-8 lg:mr-16 hover:scale-110 active:scale-95 transition-transform duration-200">
        <AppImage 
          src="/img/logo.png" 
          alt="Gaming Project Logo" 
          width="96"
          height="80"
          priority
          class="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]"
        />
      </NuxtLink>

      <!-- NAVEGACIÓN DESKTOP CON PÍLDORA -->
      <nav class="hidden md:flex items-center gap-3 font-['Rajdhani'] text-base lg:text-lg font-bold tracking-wider uppercase relative p-1">
        
        <NuxtLink
          to="/"
          class="relative px-7 py-2.5 rounded-full transition-all duration-300 ease-out border border-transparent hover:border-zinc-800/80 hover:bg-white/5"
          :class="route.path === '/' ? 'text-zinc-950 font-black' : 'text-zinc-300 hover:text-white'"
        >
          <Transition name="pill">
            <span 
              v-if="route.path === '/'" 
              class="absolute inset-0 bg-white rounded-full shadow-[0_0_25px_rgba(255,255,255,0.35)] -z-10"
            ></span>
          </Transition>
          <span>Inicio</span>
        </NuxtLink>

        <NuxtLink
          to="/instalaciones"
          class="relative px-7 py-2.5 rounded-full transition-all duration-300 ease-out border border-transparent hover:border-zinc-800/80 hover:bg-white/5"
          :class="route.path.startsWith('/instalaciones') ? 'text-zinc-950 font-black' : 'text-zinc-300 hover:text-white'"
        >
          <Transition name="pill">
            <span 
              v-if="route.path.startsWith('/instalaciones')" 
              class="absolute inset-0 bg-white rounded-full shadow-[0_0_25px_rgba(255,255,255,0.35)] -z-10"
            ></span>
          </Transition>
          <span>Instalaciones</span>
        </NuxtLink>

      </nav>

      <!-- BOTONES DE ACCIÓN (RESERVAR & MÓVIL) -->
      <div class="shrink-0 flex items-center gap-2 sm:gap-3">

        <NuxtLink
          to="/reservas"
          class="px-4 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-950 font-['Rajdhani'] font-black text-xs sm:text-base uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/25 flex items-center gap-1.5"
        >
          <span>Reservar</span>
          <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 sm:w-5 sm:h-5 hidden sm:inline-block" />
        </NuxtLink>

        <!-- BOTÓN MENÚ MÓVIL -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-1.5 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/80 active:scale-95 transition-all duration-200"
          aria-label="Abrir menú"
        >
          <UIcon :name="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-6 h-6 text-cyan-400" />
        </button>

      </div>

    </div>

    <!-- MENÚ MÓVIL DESPLEGABLE -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-90 opacity-0 -translate-y-4"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-90 opacity-0 -translate-y-4"
    >
      <nav
        v-if="mobileMenuOpen"
        class="pointer-events-auto md:hidden mt-2 w-full max-w-[calc(100vw-2rem)] rounded-3xl border border-zinc-800/90 bg-zinc-950/95 backdrop-blur-md shadow-2xl p-3 space-y-1.5 font-['Rajdhani'] text-base font-bold tracking-wider uppercase text-center"
      >
        <NuxtLink
          to="/"
          class="block px-4 py-3 rounded-2xl text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all duration-200"
          active-class="!bg-white !text-zinc-950 !font-black shadow-lg"
          @click="mobileMenuOpen = false"
        >
          Inicio
        </NuxtLink>

        <NuxtLink
          to="/instalaciones"
          class="block px-4 py-3 rounded-2xl text-zinc-300 hover:text-white hover:bg-zinc-900 transition-all duration-200"
          active-class="!bg-white !text-zinc-950 !font-black shadow-lg"
          @click="mobileMenuOpen = false"
        >
          Instalaciones
        </NuxtLink>

        <NuxtLink
          to="/reservas"
          class="block px-4 py-3 rounded-2xl text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 font-black transition-all duration-200 hover:bg-cyan-500/20"
          @click="mobileMenuOpen = false"
        >
          Reservar PC →
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)
</script>

<style scoped>
.pill-enter-active,
.pill-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.pill-enter-from,
.pill-leave-to {
  opacity: 0;
  transform: scale(0.88);
}
</style>