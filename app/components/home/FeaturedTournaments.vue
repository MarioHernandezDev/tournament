<template>
  <section class="space-y-6">
    <h2 class="font-['Rajdhani'] text-3xl font-bold flex items-center gap-2">
      <UIcon name="i-heroicons-fire" class="text-amber-500" /> Torneos Destacados
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Card Valorant -->
      <UCard class="bg-slate-900/80 border-slate-800 hover:border-red-500/50 transition-all">
        <div class="flex justify-between items-start mb-4">
          <div>
            <UBadge color="red" class="mb-2">VALORANT</UBadge>
            <h3 class="text-2xl font-['Rajdhani'] font-bold">Valorant Masters Open #4</h3>
          </div>
          <span class="text-amber-400 font-mono font-bold">$500 PRIZE</span>
        </div>
        <p class="text-slate-400 text-sm mb-4">Modo: 5v5 Competitivo • 16 Equipos máx.</p>
        <UButton block color="red" to="/valorant">Ver Detalle</UButton>
      </UCard>

      <!-- Card LoL -->
      <UCard class="bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 transition-all">
        <div class="flex justify-between items-start mb-4">
          <div>
            <UBadge color="cyan" class="mb-2">LEAGUE OF LEGENDS</UBadge>
            <h3 class="text-2xl font-['Rajdhani'] font-bold">King of the Rift 5v5</h3>
          </div>
          <span class="text-amber-400 font-mono font-bold">10.000 RP</span>
        </div>
        <p class="text-slate-400 text-sm mb-4">Grieta del Invocador • Formato Eliminatoria Directa</p>
        <UButton block color="cyan" to="/lol">Ver Detalle</UButton>
      </UCard>
    </div>
  </section>
</template>