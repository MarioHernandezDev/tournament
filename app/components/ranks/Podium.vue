<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 items-end">
    <!-- Top 2 -->
    <div class="bg-slate-900/90 border border-slate-700 p-6 rounded-xl text-center space-y-2 order-2 md:order-1">
      <UBadge color="gray" size="xs">TOP 2</UBadge>
      <h3 class="font-['Rajdhani'] text-2xl font-bold">Heretics Clan</h3>
      <p class="text-xs text-slate-400">League of Legends</p>
      <p class="text-amber-400 font-mono font-bold">1.100 PTS</p>
    </div>

    <!-- Top 1 -->
    <div class="bg-slate-900 border-2 border-amber-500/80 p-8 rounded-xl text-center space-y-2 order-1 md:order-2 shadow-lg shadow-amber-500/10">
      <UIcon name="i-heroicons-trophy" class="w-8 h-8 text-amber-400 mx-auto" />
      <UBadge color="amber" size="xs">TOP 1</UBadge>
      <h3 class="font-['Rajdhani'] text-3xl font-bold text-amber-400">KOI Academy</h3>
      <p class="text-xs text-slate-400">Valorant</p>
      <p class="text-amber-400 font-mono text-xl font-bold">1.250 PTS</p>
    </div>

    <!-- Top 3 -->
    <div class="bg-slate-900/90 border border-slate-700 p-6 rounded-xl text-center space-y-2 order-3">
      <UBadge color="amber" variant="subtle" size="xs">TOP 3</UBadge>
      <h3 class="font-['Rajdhani'] text-2xl font-bold">Karmine Corp</h3>
      <p class="text-xs text-slate-400">Valorant</p>
      <p class="text-amber-400 font-mono font-bold">950 PTS</p>
    </div>
  </div>
</template>