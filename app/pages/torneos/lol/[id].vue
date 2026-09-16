<template>
  <div class="max-w-[1380px] mx-auto px-4 sm:px-6 py-10 space-y-10">
    <NuxtLink to="/torneos/lol" class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
      <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
      Volver a Torneos de LoL
    </NuxtLink>

    <div v-if="tournament" class="space-y-14">
      <!-- CABECERA DEL TORNEO -->
      <section class="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950">
        <div class="relative aspect-[21/7] sm:aspect-[21/5] overflow-hidden bg-zinc-900">
          <img :src="tournament.banner" :alt="tournament.name" class="w-full h-full object-cover opacity-60">
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>

        <div class="relative z-10 px-6 sm:px-10 pb-8 -mt-16 sm:-mt-20 space-y-4">
          <span
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wide"
            :class="tournament.status === 'completed' ? 'bg-zinc-900/80 text-zinc-400' : [theme.bgSoft, theme.text]"
          >
            <UIcon name="i-simple-icons-leagueoflegends" class="w-3.5 h-3.5" />
            {{ tournament.status === 'completed' ? 'Finalizado' : 'Inscripciones / En Curso' }}
          </span>

          <h1 class="font-['Rajdhani'] text-3xl sm:text-5xl font-black uppercase text-white tracking-wide leading-none">
            {{ tournament.name }}
          </h1>

          <div class="flex flex-wrap gap-x-8 gap-y-2 text-sm text-zinc-400">
            <span class="flex items-center gap-1.5"><UIcon name="i-heroicons-calendar-days" class="w-4 h-4" />{{ formatDate(tournament.startDate) }}</span>
            <span class="flex items-center gap-1.5"><UIcon name="i-heroicons-adjustments-horizontal" class="w-4 h-4" />{{ tournament.format }}</span>
            <span class="flex items-center gap-1.5"><UIcon name="i-heroicons-banknotes" class="w-4 h-4" />{{ tournament.prizePool }}</span>
            <span class="flex items-center gap-1.5"><UIcon name="i-heroicons-users" class="w-4 h-4" />{{ tournament.teamsRegistered }}/{{ tournament.maxTeams }} equipos</span>
          </div>
        </div>
      </section>

      <TournamentsBracketView :tournament-id="tournament.id" game="lol" />
      <TournamentsTournamentScoreboard :tournament-id="tournament.id" game="lol" />
    </div>

    <div v-else class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-16 text-center">
      <UIcon name="i-heroicons-face-frown" class="w-10 h-10 text-zinc-600 mx-auto mb-3" />
      <p class="text-zinc-400">No se ha encontrado este torneo.</p>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { tournaments } = useTournaments()

const tournament = computed(() => tournaments.value.find((t) => t.id === route.params.id && t.game === 'lol'))

const gameConfig = useGameConfig('lol')
const theme = useGameTheme(gameConfig.theme)

const formatDate = (iso) =>
  new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
</script>
