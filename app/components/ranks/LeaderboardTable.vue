<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex gap-2">
        <UButton color="amber" variant="soft" size="sm" class="font-bold">Todos</UButton>
        <UButton color="gray" variant="ghost" size="sm">Valorant</UButton>
        <UButton color="gray" variant="ghost" size="sm">League of Legends</UButton>
      </div>
    </div>

    <UTable 
      :rows="[
        { rank: '#1', team: 'KOI Academy', juego: 'Valorant', puntos: '1250 pts', winrate: '88%' },
        { rank: '#2', team: 'Heretics Clan', juego: 'League of Legends', puntos: '1100 pts', winrate: '82%' },
        { rank: '#3', team: 'Karmine Corp', juego: 'Valorant', puntos: '950 pts', winrate: '79%' },
        { rank: '#4', team: 'Fnatic Rising', juego: 'League of Legends', puntos: '870 pts', winrate: '75%' }
      ]"
      class="bg-slate-900 rounded-lg border border-slate-800"
    />
  </div>
</template>