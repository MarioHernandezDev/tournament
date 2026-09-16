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

        <div
          class="relative"
          @mouseenter="tournamentsMenuOpen = true"
          @mouseleave="tournamentsMenuOpen = false"
        >
          <NuxtLink
            to="/torneos"
            class="px-5 py-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-all duration-200 flex items-center gap-1.5 group"
            active-class="!text-white font-extrabold bg-zinc-800/80 shadow-inner"
          >
            Torneos
            <UIcon 
              name="i-heroicons-chevron-down" 
              class="w-4 h-4 text-zinc-500 group-hover:text-white transition-transform duration-300" 
              :class="{ 'rotate-180 text-emerald-400': tournamentsMenuOpen }" 
            />
          </NuxtLink>

          <Transition name="dropdown">
            <div
              v-if="tournamentsMenuOpen"
              class="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56 z-50"
            >
              <div class="rounded-3xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-2xl shadow-2xl p-2 space-y-1 overflow-hidden">
                <NuxtLink
                  to="/torneos/lol"
                  class="flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200"
                >
                  <UIcon name="i-simple-icons-leagueoflegends" class="w-4 h-4 text-cyan-400 shrink-0" />
                  <span class="text-sm font-bold tracking-wide">League of Legends</span>
                </NuxtLink>

                <NuxtLink
                  to="/torneos/valorant"
                  class="flex items-center gap-3 px-4 py-3 rounded-2xl text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all duration-200"
                >
                  <UIcon name="i-simple-icons-valorant" class="w-4 h-4 text-rose-500 shrink-0" />
                  <span class="text-sm font-bold tracking-wide">Valorant</span>
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>

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
        
        <template v-if="!isLoggedIn">
          <NuxtLink
            to="/admin"
            class="px-6 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-['Rajdhani'] font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 shadow-md flex items-center gap-2"
          >
            <span>Iniciar Sesión</span>
          </NuxtLink>
        </template>

        <NuxtLink
          v-else
          :to="user.role === 'admin' ? '/admin' : '/perfil'"
          class="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-['Rajdhani'] transition-all duration-200 hover:scale-105 active:scale-95 shadow-md flex items-center gap-3 group"
        >
          <img 
            :src="user.avatar" 
            :alt="user.name" 
            class="w-7 h-7 rounded-full object-cover border border-zinc-300"
          >
          <span class="font-extrabold text-xs sm:text-sm text-zinc-950 lowercase tracking-normal">
            {{ user.email || user.name.toLowerCase().replace(/\s+/g, '') + '@gmail.com' }}
          </span>
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

    <!-- MENÚ MÓVIL DESPLEGABLE... (sin cambios) -->
  </header>
</template>