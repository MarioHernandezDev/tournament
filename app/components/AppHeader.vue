<template>
  <header class="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
    
    <div class="pointer-events-auto flex items-center gap-2 sm:gap-4 bg-zinc-950/90 border border-zinc-800/90 p-2 pl-3 pr-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-300">
      
      <!-- LOGO SEPARADO -->
      <NuxtLink 
        to="/" 
        class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform duration-200 border border-zinc-800 overflow-hidden shadow-md mr-2 sm:mr-4"
      >
        <img 
          src="/img/logo.png" 
          alt="Gaming Project Logo" 
          class="w-full h-full object-cover"
        />
      </NuxtLink>

      <!-- NAVEGACIÓN DESKTOP CON PÍLDORA FLUIDA -->
      <nav class="hidden md:flex items-center gap-1 font-['Rajdhani'] text-sm sm:text-base font-bold tracking-wider uppercase relative p-1">
        
        <NuxtLink
          to="/"
          class="relative px-8 py-2.5 rounded-full transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          :class="route.path === '/' ? 'text-zinc-950 font-black' : 'text-zinc-400 hover:text-white'"
        >
          <!-- Fondo animado individual con transición de escala/opacidad suave -->
          <Transition name="pill">
            <span 
              v-if="route.path === '/'" 
              class="absolute inset-0 bg-white rounded-full shadow-[0_0_25px_rgba(255,255,255,0.45)] -z-10"
            ></span>
          </Transition>
          <span>Inicio</span>
        </NuxtLink>

        <NuxtLink
          to="/instalaciones"
          class="relative px-8 py-2.5 rounded-full transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          :class="route.path.startsWith('/instalaciones') ? 'text-zinc-950 font-black' : 'text-zinc-400 hover:text-white'"
        >
          <Transition name="pill">
            <span 
              v-if="route.path.startsWith('/instalaciones')" 
              class="absolute inset-0 bg-white rounded-full shadow-[0_0_25px_rgba(255,255,255,0.45)] -z-10"
            ></span>
          </Transition>
          <span>Instalaciones</span>
        </NuxtLink>

      </nav>

      <!-- BOTÓN CTA RESERVAR -->
      <div class="shrink-0 flex items-center gap-2 ml-2 sm:ml-4">

        <NuxtLink
          to="/reservas"
          class="px-6 sm:px-7 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-950 font-['Rajdhani'] font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
        >
          <span>Reservar</span>
          <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 hidden sm:inline-block" />
        </NuxtLink>

        <!-- BOTÓN MÓVIL -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200"
          aria-label="Abrir menú"
        >
          <UIcon :name="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-6 h-6 text-cyan-400" />
        </button>

      </div>

    </div>

    <!-- MENÚ MÓVIL DESPLEGABLE -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0 -translate-y-2"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 -translate-y-2"
    >
      <nav
        v-if="mobileMenuOpen"
        class="pointer-events-auto md:hidden absolute top-full mt-3 w-64 rounded-3xl border border-zinc-800/90 bg-zinc-950/95 backdrop-blur-2xl shadow-2xl p-2.5 space-y-1 font-['Rajdhani'] text-sm font-bold tracking-wider uppercase"
      >
        <NuxtLink
          to="/"
          class="block px-4 py-3 rounded-2xl text-zinc-300 hover:text-white transition-all duration-200"
          active-class="!bg-white !text-zinc-950 !font-black"
          @click="mobileMenuOpen = false"
        >
          Inicio
        </NuxtLink>

        <NuxtLink
          to="/instalaciones"
          class="block px-4 py-3 rounded-2xl text-zinc-300 hover:text-white transition-all duration-200"
          active-class="!bg-white !text-zinc-950 !font-black"
          @click="mobileMenuOpen = false"
        >
          Instalaciones
        </NuxtLink>

        <NuxtLink
          to="/reservas"
          class="block px-4 py-3 rounded-2xl text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 font-black transition-all duration-200"
          @click="mobileMenuOpen = false"
        >
          Ir a Reservas →
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
/* Animación suave estilo "morfismo/muelle" para la píldora blanca */
.pill-enter-active,
.pill-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.pill-enter-from {
  opacity: 0;
  transform: scale(0.85);
}

.pill-leave-to {
  opacity: 0;
  transform: scale(0.85);
}
</style>