<template>
  <header class="fixed top-3 sm:top-5 left-0 right-0 z-50 flex flex-col items-center px-3 sm:px-4 pointer-events-none">
    
    <!-- BARRA PRINCIPAL FLOTANTE -->
    <div class="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 bg-zinc-950/85 border border-zinc-800/80 p-2 sm:p-2.5 px-4 sm:px-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-md sm:backdrop-blur-2xl transition-all duration-300 w-full max-w-[calc(100vw-2rem)] sm:w-auto relative z-50">
      
      <!-- ISOTIPO ALIENÍGENA (SIN REESCALADO HOVER) -->
      <NuxtLink to="/" class="shrink-0 flex items-center mr-2 sm:mr-8 lg:mr-16 opacity-90 hover:opacity-100 transition-opacity duration-200">
        <img 
          src="/img/logo.webp" 
          alt="Gaming Project Logo" 
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

        <!-- BOTÓN RESERVAR (OCULTO EN MÓVIL) -->
        <NuxtLink
          to="/reservas"
          class="hidden sm:flex px-4 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-950 font-['Rajdhani'] font-black text-xs sm:text-base uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/25 items-center gap-1.5"
        >
          <span>Reservar</span>
          <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 sm:w-5 sm:h-5 hidden sm:inline-block" />
        </NuxtLink>

        <!-- BOTÓN MENÚ MÓVIL -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/80 active:scale-95 transition-all duration-200"
          aria-label="Toggle Menu"
        >
          <UIcon :name="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-6 h-6 text-cyan-400" />
        </button>

      </div>

    </div>

    <!-- MENÚ MÓVIL FULLSCREEN OVERLAY -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-98"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-98"
    >
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-2xl pointer-events-auto flex flex-col justify-between px-6 pt-28 pb-10 md:hidden"
      >
        <!-- NAVEGACIÓN MÓVIL PRINCIPAL -->
        <nav class="space-y-4 font-['Rajdhani'] uppercase tracking-wider">
          <p class="text-xs font-bold text-zinc-500 tracking-[0.3em] mb-2 px-2">Navegación</p>
          
          <NuxtLink
            to="/"
            class="group flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 text-zinc-200 hover:text-white hover:bg-zinc-800/60 active:scale-[0.98] transition-all duration-200"
            :class="{ '!bg-white !text-zinc-950 border-white font-black': route.path === '/' }"
            @click="mobileMenuOpen = false"
          >
            <span class="text-xl font-bold">Inicio</span>
            <UIcon name="i-heroicons-chevron-right" class="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>

          <NuxtLink
            to="/instalaciones"
            class="group flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 text-zinc-200 hover:text-white hover:bg-zinc-800/60 active:scale-[0.98] transition-all duration-200"
            :class="{ '!bg-white !text-zinc-950 border-white font-black': route.path.startsWith('/instalaciones') }"
            @click="mobileMenuOpen = false"
          >
            <span class="text-xl font-bold">Instalaciones</span>
            <UIcon name="i-heroicons-chevron-right" class="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </nav>

        <!-- ZONA INFERIOR / CTA MÓVIL Y REDES -->
        <div class="space-y-6 pt-6 border-t border-zinc-900">
          <NuxtLink
            to="/reservas"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-500 text-zinc-950 font-['Rajdhani'] font-black text-lg uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 active:scale-98 transition-transform"
            @click="mobileMenuOpen = false"
          >
            <span>Reservar PC Ahora</span>
            <UIcon name="i-heroicons-arrow-up-right" class="w-5 h-5" />
          </NuxtLink>

          <!-- ENLACES RÁPIDOS REDES -->
          <div class="flex items-center justify-center gap-6 text-zinc-400">
            <a href="https://discord.gg" target="_blank" rel="noopener" aria-label="Discord" class="p-2 hover:text-cyan-400 transition-colors">
              <UIcon name="i-simple-icons-discord" class="w-5 h-5" />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener" aria-label="Twitter X" class="p-2 hover:text-cyan-400 transition-colors">
              <UIcon name="i-simple-icons-x" class="w-5 h-5" />
            </a>
            <a href="https://twitch.tv" target="_blank" rel="noopener" aria-label="Twitch" class="p-2 hover:text-cyan-400 transition-colors">
              <UIcon name="i-simple-icons-twitch" class="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Bloquea el scroll del body mientras el menú móvil está desplegado
watch(mobileMenuOpen, (isOpen) => {
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})
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