<template>
  <section class="space-y-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
          Cuadro de Eliminación
        </h2>
        <p v-if="bracket" class="text-sm text-zinc-500 mt-1">{{ bracket.tournamentName }} &middot; Eliminación directa</p>
      </div>
      <span
        v-if="bracket"
        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wide"
        :class="[theme.bgSoft, theme.text]"
      >
        <span class="w-1.5 h-1.5 rounded-full animate-pulse" :class="theme.dot" />
        En Curso
      </span>
    </div>

    <div v-if="bracket" class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-5 sm:p-8 overflow-x-auto">
      <div class="flex items-stretch gap-8 sm:gap-14 min-w-[720px]">
        <div
          v-for="round in bracket.rounds"
          :key="round.name"
          class="flex-1 flex flex-col justify-around gap-6"
        >
          <p class="text-center text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
            {{ round.name }}
          </p>

          <div
            v-for="match in round.matches"
            :key="match.id"
            class="relative rounded-xl border bg-zinc-900/70 p-3.5 space-y-2 transition-colors"
            :class="match.status === 'live' ? [theme.border, 'shadow-lg', theme.glow] : 'border-zinc-800/80'"
          >
            <span
              v-if="match.status === 'live'"
              class="absolute -top-2.5 left-3 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wide bg-black"
              :class="theme.text"
            >
              &#9679; En Vivo
            </span>

            <div
              v-for="slot in [{ team: match.teamA, score: match.scoreA }, { team: match.teamB, score: match.scoreB }]"
              :key="slot.team ?? Math.random()"
              class="flex items-center justify-between gap-2 text-sm"
            >
              <span
                class="font-semibold truncate"
                :class="slot.team ? (isWinner(match, slot) ? 'text-white' : 'text-zinc-400') : 'text-zinc-600 italic'"
              >
                {{ slot.team || 'Por definir' }}
              </span>
              <span
                v-if="slot.score !== null && slot.score !== undefined"
                class="font-['Rajdhani'] font-black text-base shrink-0"
                :class="isWinner(match, slot) ? theme.text : 'text-zinc-500'"
              >
                {{ slot.score }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-12 text-center">
      <UIcon name="i-heroicons-squares-2x2" class="w-10 h-10 text-zinc-600 mx-auto mb-3" />
      <p class="text-zinc-400">El cuadro de este torneo aún no se ha publicado.</p>
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
const bracket = useBracket(props.tournamentId)

const isWinner = (match, slot) => {
  if (match.scoreA === null || match.scoreB === null) return false
  const isTeamA = slot.team === match.teamA
  return isTeamA ? match.scoreA > match.scoreB : match.scoreB > match.scoreA
}
</script>
