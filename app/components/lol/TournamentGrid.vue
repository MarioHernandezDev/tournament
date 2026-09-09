<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <UCard v-for="i in 3" :key="i" class="bg-slate-900 border-slate-800 hover:border-cyan-500/40 transition-all">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-xs font-mono text-cyan-400 font-bold">PRÓXIMAMENTE</span>
          <span class="text-xs text-slate-400">5v5 Grieta</span>
        </div>
      </template>
      <h3 class="font-['Rajdhani'] text-xl font-bold">Baron Nashor Cup #{{ i }}</h3>
      <p class="text-xs text-slate-400 mt-1">Premio: Riot Points + Aspectos Exclusivos</p>
      <template #footer>
        <UButton block color="cyan" variant="soft">Ver Cuadrante</UButton>
      </template>
    </UCard>
  </div>
</template>