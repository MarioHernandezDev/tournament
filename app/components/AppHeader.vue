<template>
  <header class="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
    
    <div class="pointer-events-auto flex items-center gap-3 sm:gap-4 bg-zinc-950/90 border border-zinc-800/80 p-2 pl-2.5 pr-2.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300">
      
      <!-- LOGO ARREGLADO (Sin iconos extra, con overflow-hidden) -->
      <NuxtLink 
        to="/" 
        class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform duration-200 shadow-md overflow-hidden"
      >
        <img 
          src="/img/logo.png" 
          alt="Logo" 
          class="w-full h-full object-cover"
        />
      </NuxtLink>

      <!-- NAVEGACIÓN CON EFECTO HOVER PÍLDORA -->
      <nav class="hidden md:flex items-center gap-1 font-['Rajdhani'] text-sm sm:text-base font-bold tracking-wider uppercase">
        
        <NuxtLink
          to="/"
          class="px-5 py-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all duration-200"
          active-class="!text-white font-extrabold bg-zinc-800/80 shadow-inner"
        >
          Inicio
        </NuxtLink>

        <NuxtLink
          to="/instalaciones"
          class="px-5 py-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all duration-200"
          active-class="!text-white font-extrabold bg-zinc-800/80 shadow-inner"
        >
          Instalaciones
        </NuxtLink>

        <NuxtLink
          to="/ranks"
          class="px-5 py-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all duration-200"
          active-class="!text-white font-extrabold bg-zinc-800/80 shadow-inner"
        >
          Ranking
        </NuxtLink>

      </nav>

      <!-- BOTÓN PÍLDORA BLANCA DERECHA -->
      <div class="shrink-0 flex items-center">

        <NuxtLink
          to="/instalaciones#ubicacion"
          class="px-6 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-['Rajdhani'] font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 shadow-md flex items-center gap-2"
        >
          <span>Reservar</span>
        </NuxtLink>

        <!-- BOTÓN MÓVIL -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden ml-1 p-2.5 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200"
          aria-label="Toggle menu"
        >
          <UIcon :name="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-6 h-6" />
        </button>

      </div>

    </div>

    <!-- MENÚ MÓVIL DESPLEGABLE -->
    <Transition name="dropdown">
      <nav
        v-if="mobileMenuOpen"
        class="pointer-events-auto md:hidden absolute top-full mt-3 w-56 rounded-3xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-2xl shadow-2xl p-2 space-y-1 font-['Rajdhani'] text-sm font-bold tracking-wider uppercase"
      >
        <NuxtLink
          to="/"
          class="block px-4 py-3 rounded-2xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200"
          active-class="!text-white bg-zinc-800/80"
          @click="mobileMenuOpen = false"
        >
          Inicio
        </NuxtLink>
        <NuxtLink
          to="/instalaciones"
          class="block px-4 py-3 rounded-2xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200"
          active-class="!text-white bg-zinc-800/80"
          @click="mobileMenuOpen = false"
        >
          Instalaciones
        </NuxtLink>
        <NuxtLink
          to="/ranks"
          class="block px-4 py-3 rounded-2xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200"
          active-class="!text-white bg-zinc-800/80"
          @click="mobileMenuOpen = false"
        >
          Ranking
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>