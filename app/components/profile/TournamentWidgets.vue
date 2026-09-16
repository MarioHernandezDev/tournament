<template>
  <section class="space-y-6">
    <h2 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
      {{ title }}
    </h2>

    <div v-if="tournaments.length" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      <article
        v-for="tournament in tournaments"
        :key="tournament.id"
        class="rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden flex flex-col"
      >
        <div class="relative aspect-[16/7] overflow-hidden bg-zinc-900">
          <img :src="tournament.banner" :alt="tournament.name" class="w-full h-full object-cover opacity-70">
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          <span
            class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wide"
            :class="statusClass(tournament.status)"
          >
            {{ statusLabel(tournament.status) }}
          </span>
        </div>

        <div class="p-5 space-y-2 grow flex flex-col justify-between">
          <div>
            <h3 class="font-['Rajdhani'] text-lg font-black uppercase text-white leading-tight">{{ tournament.name }}</h3>
            <p class="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
              <UIcon :name="useGameConfig(tournament.game).icon" class="w-3.5 h-3.5" />
              {{ useGameConfig(tournament.game).label }}
            </p>
          </div>
          <p class="text-xs text-zinc-500">{{ formatDate(tournament.startDate) }}</p>
        </div>
      </article>
    </div>

    <div v-else class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-10 text-center">
      <UIcon name="i-heroicons-trophy" class="w-9 h-9 text-zinc-600 mx-auto mb-3" />
      <p class="text-zinc-400 text-sm">{{ emptyLabel }}</p>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  tournaments: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: 'Mis Torneos'
  },
  emptyLabel: {
    type: String,
    default: 'Todavía no te has apuntado a ningún torneo.'
  }
})

const statusLabel = (status) => (status === 'completed' ? 'Finalizado' : 'Próximo')
const statusClass = (status) =>
  status === 'completed' ? 'bg-zinc-900/80 text-zinc-400' : 'bg-emerald-500/15 text-emerald-300'

const formatDate = (iso) =>
  new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso))
</script>
