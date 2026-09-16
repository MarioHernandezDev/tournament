<template>
  <section class="space-y-6">
    <div>
      <h2 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
        Tabla de Puntuación
      </h2>
      <p class="text-sm text-zinc-500 mt-1">Resultados de los equipos en este torneo</p>
    </div>

    <div v-if="standings.length" class="rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-zinc-800/80 text-left text-xs uppercase tracking-wider text-zinc-500">
              <th class="px-5 py-3.5 font-semibold">#</th>
              <th class="px-5 py-3.5 font-semibold">Equipo</th>
              <th class="px-5 py-3.5 font-semibold text-right">Victorias</th>
              <th class="px-5 py-3.5 font-semibold text-right">Derrotas</th>
              <th class="px-5 py-3.5 font-semibold text-right hidden sm:table-cell">Última Ronda</th>
              <th class="px-5 py-3.5 font-semibold text-right">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(entry, index) in standings"
              :key="entry.team"
              class="border-b border-zinc-900 last:border-b-0 hover:bg-zinc-900/50 transition-colors"
              :class="index === 0 ? theme.bgSoft : ''"
            >
              <td class="px-5 py-3.5">
                <span
                  class="inline-flex items-center justify-center w-7 h-7 rounded-lg font-['Rajdhani'] font-black text-sm"
                  :class="index === 0 ? [theme.bg, theme.bgSolidText] : 'bg-zinc-900 text-zinc-400'"
                >
                  {{ index + 1 }}
                </span>
              </td>
              <td class="px-5 py-3.5 font-semibold text-white">{{ entry.team }}</td>
              <td class="px-5 py-3.5 text-right font-['Rajdhani'] font-bold text-base" :class="theme.text">{{ entry.wins }}</td>
              <td class="px-5 py-3.5 text-right text-zinc-400">{{ entry.losses }}</td>
              <td class="px-5 py-3.5 text-right text-zinc-400 hidden sm:table-cell">{{ entry.lastRound }}</td>
              <td class="px-5 py-3.5 text-right">
                <span
                  class="inline-flex items-center gap-1.5 font-semibold text-xs justify-end"
                  :class="entry.eliminated ? 'text-red-400' : 'text-emerald-400'"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="entry.eliminated ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'" />
                  {{ entry.eliminated ? 'Eliminado' : 'Activo' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-12 text-center">
      <UIcon name="i-heroicons-list-bullet" class="w-10 h-10 text-zinc-600 mx-auto mb-3" />
      <p class="text-zinc-400">Todavía no hay resultados para este torneo.</p>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  tournamentId: {
    type: String,
    required: true
  },
  game: {
    type: String,
    required: true,
    validator: (v) => ['lol', 'valorant'].includes(v)
  }
})

const gameConfig = useGameConfig(props.game)
const theme = useGameTheme(gameConfig.theme)
const standings = useTournamentStandings(props.tournamentId)
</script>
