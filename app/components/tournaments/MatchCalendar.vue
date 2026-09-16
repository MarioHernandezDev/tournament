<template>
  <section class="space-y-6">
    <div>
      <h2 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
        Próximas Partidas
      </h2>
      <p class="text-sm text-zinc-500 mt-1">Calendario de enfrentamientos &middot; {{ gameConfig.label }}</p>
    </div>

    <div v-if="matches.length" class="rounded-2xl border border-zinc-800/80 bg-zinc-950 divide-y divide-zinc-900">
      <div
        v-for="match in matches"
        :key="match.id"
        class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5"
      >
        <div class="flex items-center gap-3 sm:w-40 shrink-0">
          <div class="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800/80 shrink-0">
            <span class="font-['Rajdhani'] font-black text-lg leading-none" :class="theme.text">
              {{ formatDay(match.date) }}
            </span>
            <span class="text-[10px] uppercase text-zinc-500 font-mono">{{ formatMonth(match.date) }}</span>
          </div>
          <span class="text-sm text-zinc-400 font-mono">{{ formatTime(match.date) }}</span>
        </div>

        <div class="flex-1 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3 min-w-0">
            <span class="font-['Rajdhani'] font-bold text-white text-base sm:text-lg truncate">{{ match.teamA }}</span>
            <span class="text-zinc-600 text-xs font-mono shrink-0">VS</span>
            <span class="font-['Rajdhani'] font-bold text-white text-base sm:text-lg truncate">{{ match.teamB }}</span>
          </div>
          <span class="hidden sm:inline-flex px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wide shrink-0" :class="[theme.bgSoft, theme.text]">
            {{ match.stage }}
          </span>
        </div>
      </div>
    </div>

    <div v-else class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-12 text-center">
      <UIcon name="i-heroicons-calendar-days" class="w-10 h-10 text-zinc-600 mx-auto mb-3" />
      <p class="text-zinc-400">No hay partidas programadas por ahora.</p>
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
const matches = useMatchCalendar(props.game)

const formatDay = (iso) => new Intl.DateTimeFormat('es-ES', { day: '2-digit' }).format(new Date(iso))
const formatMonth = (iso) => new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(new Date(iso)).replace('.', '')
const formatTime = (iso) => new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' }).format(new Date(iso)) + 'h'
</script>
