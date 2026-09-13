<template>
  <section class="space-y-5">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
          Ranking Mensual
        </h2>
        <p class="text-sm text-zinc-500 mt-1">TOP 10 equipos &middot; {{ gameConfig.label }} &middot; Temporada actual</p>
      </div>
      <span class="px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wide" :class="[theme.bgSoft, theme.text]">
        LP &middot; League Points
      </span>
    </div>

    <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-zinc-800/80 text-left text-xs uppercase tracking-wider text-zinc-500">
              <th class="px-5 py-3.5 font-semibold">#</th>
              <th class="px-5 py-3.5 font-semibold">Equipo</th>
              <th class="px-5 py-3.5 font-semibold text-right">LP</th>
              <th class="px-5 py-3.5 font-semibold text-right hidden sm:table-cell">Victorias</th>
              <th class="px-5 py-3.5 font-semibold text-right hidden sm:table-cell">Derrotas</th>
              <th class="px-5 py-3.5 font-semibold text-right">Tendencia</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="entry in ranking"
              :key="entry.team"
              class="border-b border-zinc-900 last:border-b-0 hover:bg-zinc-900/50 transition-colors"
              :class="entry.rank <= 3 ? theme.bgSoft : ''"
            >
              <td class="px-5 py-3.5">
                <span
                  class="inline-flex items-center justify-center w-7 h-7 rounded-lg font-['Rajdhani'] font-black text-sm"
                  :class="entry.rank <= 3 ? [theme.bg, theme.bgSolidText] : 'bg-zinc-900 text-zinc-400'"
                >
                  {{ entry.rank }}
                </span>
              </td>
              <td class="px-5 py-3.5 font-semibold text-white">{{ entry.team }}</td>
              <td class="px-5 py-3.5 text-right font-['Rajdhani'] font-bold text-base" :class="theme.text">
                {{ entry.points.toLocaleString('es-ES') }}
              </td>
              <td class="px-5 py-3.5 text-right text-zinc-400 hidden sm:table-cell">{{ entry.wins }}</td>
              <td class="px-5 py-3.5 text-right text-zinc-400 hidden sm:table-cell">{{ entry.losses }}</td>
              <td class="px-5 py-3.5 text-right">
                <span class="inline-flex items-center justify-end gap-1 font-semibold" :class="trendClass(entry.trend)">
                  <UIcon :name="trendIcon(entry.trend)" class="w-4 h-4" />
                  <span v-if="entry.trend !== 'same'">{{ entry.delta }}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  game: {
    type: String,
    required: true,
    validator: (v) => ['lol', 'valorant'].includes(v)
  }
})

const gameConfig = useGameConfig(props.game)
const theme = useGameTheme(gameConfig.theme)
const ranking = useMonthlyRanking(props.game)

const trendIcon = (trend) => {
  if (trend === 'up') return 'i-heroicons-arrow-trending-up'
  if (trend === 'down') return 'i-heroicons-arrow-trending-down'
  return 'i-heroicons-minus'
}

const trendClass = (trend) => {
  if (trend === 'up') return 'text-emerald-400'
  if (trend === 'down') return 'text-red-400'
  return 'text-zinc-500'
}
</script>
