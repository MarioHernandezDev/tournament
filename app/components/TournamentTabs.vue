<template>
  <section id="torneos" class="space-y-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <h2 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
        Torneos
      </h2>

      <!-- TABS -->
      <div class="flex items-center gap-1 rounded-full border border-zinc-800/80 bg-zinc-950 p-1">
        <button
          type="button"
          class="px-4 sm:px-5 py-2 rounded-full font-['Rajdhani'] font-bold text-sm uppercase tracking-wide transition-all duration-200"
          :class="activeTab === 'proximos' ? [theme.bg, theme.bgSolidText] : 'text-zinc-400 hover:text-white'"
          @click="activeTab = 'proximos'"
        >
          Próximos Torneos
        </button>
        <button
          type="button"
          class="px-4 sm:px-5 py-2 rounded-full font-['Rajdhani'] font-bold text-sm uppercase tracking-wide transition-all duration-200"
          :class="activeTab === 'concluidos' ? [theme.bg, theme.bgSolidText] : 'text-zinc-400 hover:text-white'"
          @click="activeTab = 'concluidos'"
        >
          Concluidos
        </button>
      </div>
    </div>

    <!-- PRÓXIMOS TORNEOS -->
    <div v-if="activeTab === 'proximos'" class="space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800/80">
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-colors"
            :class="modeFilter === 'all' ? [theme.bg, theme.bgSolidText] : 'bg-zinc-900 text-zinc-400 hover:text-white'"
            @click="modeFilter = 'all'"
          >
            Todos
          </button>
          <button
            v-for="mode in gameConfig.modes"
            :key="mode"
            type="button"
            class="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-colors"
            :class="modeFilter === mode ? [theme.bg, theme.bgSolidText] : 'bg-zinc-900 text-zinc-400 hover:text-white'"
            @click="modeFilter = mode"
          >
            {{ mode }}
          </button>
        </div>

        <div class="relative w-full md:w-64">
          <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            v-model="search"
            type="text"
            placeholder="Buscar torneo..."
            class="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600"
          >
        </div>
      </div>

      <div v-if="filteredUpcoming.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <article
          v-for="tournament in filteredUpcoming"
          :key="tournament.id"
          class="group rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden transition-colors"
          :class="theme.borderHover"
        >
          <div class="relative aspect-[16/9] overflow-hidden bg-zinc-900">
            <img
              :src="tournament.banner"
              :alt="tournament.name"
              class="w-full h-full object-cover object-center opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div class="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
              <span
                class="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wide"
                :class="isFull(tournament) ? 'bg-zinc-800 text-zinc-400' : [theme.bgSoft, theme.text]"
              >
                {{ isFull(tournament) ? 'Cupo Completo' : 'Inscripciones Abiertas' }}
              </span>
              <span class="px-2.5 py-1 rounded-md text-[11px] bg-zinc-900/80 text-zinc-300 backdrop-blur">
                {{ tournament.mode }}
              </span>
            </div>
          </div>

          <div class="p-5 space-y-4">
            <div>
              <h3 class="font-['Rajdhani'] text-xl font-black uppercase text-white leading-tight">
                {{ tournament.name }}
              </h3>
              <p class="text-xs text-zinc-500 mt-1">{{ tournament.format }} &middot; {{ formatDate(tournament.startDate) }}</p>
            </div>

            <p class="text-sm text-zinc-400">
              <span class="text-zinc-300 font-semibold">Premio:</span> {{ tournament.prizePool }}
            </p>

            <div class="space-y-1.5">
              <div class="flex items-center justify-between text-xs text-zinc-500">
                <span>Equipos inscritos</span>
                <span>{{ tournament.teamsRegistered }}/{{ tournament.maxTeams }}</span>
              </div>
              <div class="h-1.5 rounded-full bg-zinc-900 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500"
                  :class="theme.bg"
                  :style="{ width: fillPercent(tournament) + '%' }"
                />
              </div>
            </div>

            <button
              type="button"
              class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-['Rajdhani'] font-black text-sm uppercase tracking-wider transition-all duration-300 disabled:cursor-not-allowed"
              :class="registerButtonClass(tournament)"
              :disabled="isFull(tournament) && !isRegistered(tournament)"
              @click="toggleRegistration(tournament)"
            >
              <UIcon :name="registerButtonIcon(tournament)" class="w-4 h-4" />
              {{ registerButtonLabel(tournament) }}
            </button>
          </div>
        </article>
      </div>

      <div v-else class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-12 text-center">
        <UIcon name="i-heroicons-face-frown" class="w-10 h-10 text-zinc-600 mx-auto mb-3" />
        <p class="text-zinc-400">No se encontraron torneos con estos filtros.</p>
      </div>
    </div>

    <!-- TORNEOS CONCLUIDOS -->
    <div v-else class="space-y-5">
      <div v-if="completed.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <article
          v-for="tournament in completed"
          :key="tournament.id"
          class="rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden"
        >
          <div class="relative aspect-[16/9] overflow-hidden bg-zinc-900">
            <img
              :src="tournament.banner"
              :alt="tournament.name"
              class="w-full h-full object-cover object-center grayscale-[40%] opacity-60"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
            <span class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wide bg-zinc-900/80 text-zinc-400 backdrop-blur">
              Finalizado
            </span>
          </div>

          <div class="p-5 space-y-4">
            <div>
              <h3 class="font-['Rajdhani'] text-xl font-black uppercase text-white leading-tight">
                {{ tournament.name }}
              </h3>
              <p class="text-xs text-zinc-500 mt-1">{{ formatDate(tournament.startDate) }}</p>
            </div>

            <div class="space-y-2.5 text-sm">
              <div class="flex items-center gap-2.5">
                <UIcon name="i-heroicons-trophy" class="w-4 h-4 shrink-0" :class="theme.text" />
                <span class="text-zinc-400">Campeón:</span>
                <span class="text-white font-bold">{{ tournament.champion }}</span>
              </div>
              <div class="flex items-center gap-2.5">
                <UIcon name="i-heroicons-star" class="w-4 h-4 shrink-0" :class="theme.text" />
                <span class="text-zinc-400">MVP:</span>
                <span class="text-white font-bold">{{ tournament.mvp }}</span>
              </div>
              <div class="flex items-start gap-2.5">
                <UIcon name="i-heroicons-banknotes" class="w-4 h-4 shrink-0 mt-0.5" :class="theme.text" />
                <span class="text-zinc-400">{{ tournament.prizeDistributed }}</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-12 text-center">
        <UIcon name="i-heroicons-archive-box" class="w-10 h-10 text-zinc-600 mx-auto mb-3" />
        <p class="text-zinc-400">Todavía no hay torneos concluidos.</p>
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
const { upcomingByGame, completedByGame } = useTournaments()

const upcoming = upcomingByGame(props.game)
const completed = completedByGame(props.game)

const activeTab = ref('proximos')
const modeFilter = ref('all')
const search = ref('')
const registered = ref(new Set())

const filteredUpcoming = computed(() =>
  upcoming.value.filter((t) => {
    const matchesMode = modeFilter.value === 'all' || t.mode === modeFilter.value
    const matchesSearch = t.name.toLowerCase().includes(search.value.trim().toLowerCase())
    return matchesMode && matchesSearch
  })
)

const isFull = (tournament) => tournament.teamsRegistered >= tournament.maxTeams
const isRegistered = (tournament) => registered.value.has(tournament.id)
const fillPercent = (tournament) => Math.min(100, Math.round((tournament.teamsRegistered / tournament.maxTeams) * 100))

const toggleRegistration = (tournament) => {
  if (isRegistered(tournament)) {
    registered.value.delete(tournament.id)
    tournament.teamsRegistered--
  } else if (!isFull(tournament)) {
    registered.value.add(tournament.id)
    tournament.teamsRegistered++
  }
  registered.value = new Set(registered.value)
}

const registerButtonLabel = (tournament) => {
  if (isRegistered(tournament)) return 'Inscrito · Ver Detalles'
  if (isFull(tournament)) return 'Cupo Completo'
  return 'Inscribirse / Ver Detalles'
}

const registerButtonIcon = (tournament) => {
  if (isRegistered(tournament)) return 'i-heroicons-check-circle'
  if (isFull(tournament)) return 'i-heroicons-lock-closed'
  return 'i-heroicons-arrow-right-circle'
}

const registerButtonClass = (tournament) => {
  if (isRegistered(tournament)) return 'bg-zinc-800 text-white border border-zinc-700'
  if (isFull(tournament)) return 'bg-zinc-900 text-zinc-600'
  return [theme.bg, theme.bgHover, theme.bgSolidText]
}

const formatDate = (iso) =>
  new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
</script>
