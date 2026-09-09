<template>
  <header class="sticky top-0 z-50 w-full px-4 sm:px-8 py-3 bg-slate-950/70 backdrop-blur-xl border-b border-slate-800/80 transition-all">
    <div class="max-w-[1500px] mx-auto flex items-center justify-between gap-4">
      
      <!-- LOGO -->
      <NuxtLink to="/" class="flex items-center gap-3 group shrink-0">
        <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
          <div class="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
            <UIcon name="i-heroicons-trophy" class="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        <span class="font-['Rajdhani'] text-2xl font-black tracking-widest bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent uppercase">
          NEXUS<span class="text-cyan-400">ARENA</span>
        </span>
      </NuxtLink>

      <!-- NAVEGACIÓN EN CÁPSULA / PÍLDORA -->
      <nav class="hidden lg:flex items-center gap-1 bg-slate-900/90 border border-slate-800/80 p-1.5 rounded-full shadow-inner font-['Rajdhani'] text-sm font-bold tracking-wide">
        <NuxtLink 
          to="/" 
          class="px-5 py-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
          active-class="!text-slate-950 !bg-white shadow-md"
        >
          Inicio
        </NuxtLink>

        <NuxtLink 
          to="/valorant" 
          class="px-5 py-2 rounded-full text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 transition-all flex items-center gap-2"
          active-class="!text-cyan-400 !bg-cyan-500/10 border border-cyan-500/20"
        >
          <UIcon name="i-simple-icons-valorant" class="w-3.5 h-3.5" />
          Valorant
        </NuxtLink>

        <NuxtLink 
          to="/lol" 
          class="px-5 py-2 rounded-full text-slate-300 hover:text-indigo-400 hover:bg-slate-800/60 transition-all flex items-center gap-2"
          active-class="!text-indigo-400 !bg-indigo-500/10 border border-indigo-500/20"
        >
          <UIcon name="i-simple-icons-leagueoflegends" class="w-3.5 h-3.5" />
          League of Legends
        </NuxtLink>

        <NuxtLink 
          to="/ranks" 
          class="px-5 py-2 rounded-full text-slate-300 hover:text-amber-400 hover:bg-slate-800/60 transition-all flex items-center gap-2"
          active-class="!text-amber-400 !bg-amber-500/10 border border-amber-500/20"
        >
          <UIcon name="i-heroicons-chart-bar" class="w-4 h-4" />
          Rankings
        </NuxtLink>

        <NuxtLink 
          to="/about" 
          class="px-5 py-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
          active-class="!text-white !bg-slate-800"
        >
          Nosotros
        </NuxtLink>
      </nav>

      <!-- BOTONES DE ACCIÓN (PÍLDORAS) -->
      <div class="flex items-center gap-3 shrink-0">
        <UButton 
          color="gray" 
          variant="ghost" 
          class="hidden sm:flex rounded-full font-['Rajdhani'] font-bold text-slate-300 hover:text-white hover:bg-slate-800/60 px-5 py-2"
        >
          Iniciar Sesión
        </UButton>

        <UButton 
          color="cyan" 
          variant="solid" 
          class="rounded-full font-['Rajdhani'] font-extrabold uppercase tracking-wider px-6 py-2 shadow-lg shadow-cyan-500/20 transition-transform active:scale-95"
        >
          Registrarse
        </UButton>
      </div>

    </div>
  </header>
</template>