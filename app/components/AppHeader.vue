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
          NEXUS<span class="text-zinc-400">ARENA</span>
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
          to="/valorant" 
          class="px-5 py-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all flex items-center gap-2"
          active-class="!text-white !bg-zinc-800 border border-zinc-700"
        >
          <UIcon name="i-simple-icons-valorant" class="w-3.5 h-3.5" />
          Valorant
        </NuxtLink>

        <NuxtLink 
          to="/lol" 
          class="px-5 py-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all flex items-center gap-2"
          active-class="!text-white !bg-zinc-800 border border-zinc-700"
        >
          <UIcon name="i-simple-icons-leagueoflegends" class="w-3.5 h-3.5" />
          League of Legends
        </NuxtLink>

        <NuxtLink 
          to="/ranks" 
          class="px-5 py-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all flex items-center gap-2"
          active-class="!text-white !bg-zinc-800 border border-zinc-700"
        >
          <UIcon name="i-heroicons-chart-bar" class="w-4 h-4" />
          Rankings
        </NuxtLink>

        <NuxtLink 
          to="/about" 
          class="px-5 py-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-all"
          active-class="!text-white !bg-zinc-800 border border-zinc-700"
        >
          Nosotros
        </NuxtLink>
      </nav>

      <!-- BOTONES DE ACCIÓN (PÍLDORAS) -->
      <div class="flex items-center gap-3 shrink-0">
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
      </div>

    </div>
  </header>
</template>