<template>
  <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <UIcon name="i-heroicons-trophy" class="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform" />
        <span class="font-['Rajdhani'] text-2xl font-bold tracking-wider bg-gradient-to-r from-red-500 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
          NEXUS ARENA
        </span>
      </NuxtLink>

      <!-- Menú de Navegación -->
      <nav class="hidden md:flex items-center gap-1 font-['Rajdhani'] text-lg font-semibold">
        <NuxtLink 
          to="/" 
          class="px-3 py-1.5 rounded-md transition-colors hover:text-red-400"
          active-class="text-red-500 bg-slate-800/60"
        >
          Inicio
        </NuxtLink>
        <NuxtLink 
          to="/valorant" 
          class="px-3 py-1.5 rounded-md transition-colors hover:text-red-400 flex items-center gap-1.5"
          active-class="text-red-500 bg-slate-800/60"
        >
          <UIcon name="i-simple-icons-valorant" class="w-4 h-4 text-red-500" />
          Valorant
        </NuxtLink>
        <NuxtLink 
          to="/lol" 
          class="px-3 py-1.5 rounded-md transition-colors hover:text-cyan-400 flex items-center gap-1.5"
          active-class="text-cyan-400 bg-slate-800/60"
        >
          <UIcon name="i-simple-icons-leagueoflegends" class="w-4 h-4 text-cyan-400" />
          League of Legends
        </NuxtLink>
        <NuxtLink 
          to="/ranks" 
          class="px-3 py-1.5 rounded-md transition-colors hover:text-amber-400 flex items-center gap-1.5"
          active-class="text-amber-400 bg-slate-800/60"
        >
          <UIcon name="i-heroicons-chart-bar" class="w-4 h-4 text-amber-400" />
          Rankings
        </NuxtLink>
        <NuxtLink 
          to="/about" 
          class="px-3 py-1.5 rounded-md transition-colors hover:text-slate-300"
          active-class="text-slate-100 bg-slate-800/60"
        >
          Nosotros
        </NuxtLink>
      </nav>

      <!-- Botones de Acción / Auth -->
      <div class="flex items-center gap-3">
        <UButton color="gray" variant="ghost" class="hidden sm:flex font-['Rajdhani'] font-bold">
          Iniciar Sesión
        </UButton>
        <UButton color="red" variant="solid" class="font-['Rajdhani'] font-bold uppercase tracking-wider shadow-lg shadow-red-500/20">
          Registrarse
        </UButton>
      </div>

    </div>
  </header>
</template>