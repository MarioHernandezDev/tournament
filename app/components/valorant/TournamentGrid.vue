<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <UCard v-for="i in 3" :key="i" class="bg-slate-900 border-slate-800 hover:border-red-500/40 transition-all">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-xs font-mono text-red-400 font-bold">INSCRIPCIONES ABIERTAS</span>
          <span class="text-xs text-slate-400">5v5</span>
        </div>
      </template>
      <h3 class="font-['Rajdhani'] text-xl font-bold">Copa Spike Plant #{{ i }}</h3>
      <p class="text-xs text-slate-400 mt-1">Premio: 2.500 VP + Slot Playoffs</p>
      <template #footer>
        <UButton block color="red" variant="soft">Inscribir Equipo</UButton>
      </template>
    </UCard>
  </div>
</template>