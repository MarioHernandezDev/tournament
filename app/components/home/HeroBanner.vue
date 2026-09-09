<template>
  <section class="text-center space-y-4">
    <UBadge color="red" variant="subtle" size="lg" class="font-semibold uppercase tracking-widest">
      Temporada 2026 Abierta
    </UBadge>
    <h1 class="font-['Rajdhani'] text-5xl md:text-7xl font-bold tracking-tight">
      COMPITE, GANA Y DOMINA EL <span class="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">RANKING</span>
    </h1>
    <p class="text-slate-400 text-lg max-w-2xl mx-auto">
      Entra en torneos diarios de Valorant y League of Legends, acumula puntos y demuestra que tu equipo es el mejor.
    </p>
    <div class="flex justify-center gap-4 pt-4">
      <UButton to="/valorant" size="xl" color="red" icon="i-simple-icons-valorant">
        Torneos Valorant
      </UButton>
      <UButton to="/lol" size="xl" color="cyan" icon="i-simple-icons-leagueoflegends">
        Torneos LoL
      </UButton>
    </div>
  </section>
</template>