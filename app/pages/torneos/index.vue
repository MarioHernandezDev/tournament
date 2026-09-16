<template>
  <div>
    <MiniHero
      title="Torneos"
      bg-text="torneos"
      description="Elige tu disciplina y entra en la competición. Brackets en vivo, ranking mensual y premios en cada edición."
      icon-name="i-heroicons-trophy"
      bg-image="/img/ezreal.png"
      theme="gold"
      button-text="Crear Torneo"
      button-link="/tournaments/create"
      secondary-button-text="Ver Ranking"
      secondary-button-link="/ranks"
    />

    <div class="max-w-[1380px] mx-auto px-4 sm:px-6 py-14 space-y-10">
      <p class="max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
        Cada disciplina tiene su propio circuito: fases clasificatorias, cuadro de eliminación directa
        y una tabla de puntuaciones mensual. Elige tu juego para ver los torneos activos, próximas
        partidas y el ranking de equipos.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NuxtLink
          v-for="game in games"
          :key="game.id"
          :to="`/torneos/${game.id}`"
          class="group relative overflow-hidden rounded-3xl border bg-zinc-950 p-8 sm:p-10 transition-all duration-500 shadow-2xl"
          :class="[game.theme.border, game.theme.borderHover]"
        >
          <div
            class="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 blur-[100px] pointer-events-none transition-opacity duration-500 group-hover:opacity-35"
            :class="game.theme.bg"
          />

          <div class="relative z-10 flex flex-col h-full justify-between gap-8">
            <div class="flex items-center justify-between">
              <UIcon :name="game.config.icon" class="w-10 h-10" :class="game.theme.text" />
              <span
                class="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wide"
                :class="[game.theme.bgSoft, game.theme.text]"
              >
                {{ game.upcomingCount }} activos
              </span>
            </div>

            <div class="space-y-3">
              <h2 class="font-['Rajdhani'] text-4xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none">
                {{ game.config.label }}
              </h2>
              <p class="text-sm text-zinc-400 max-w-sm">
                {{ game.description }}
              </p>
            </div>

            <div
              class="inline-flex items-center gap-2 self-start px-6 py-3 rounded-full font-['Rajdhani'] font-black text-sm uppercase tracking-wider transition-all"
              :class="[game.theme.bg, game.theme.bgHover, game.theme.bgSolidText]"
            >
              <span>Ver Torneos</span>
              <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { upcomingByGame } = useTournaments()

const descriptions = {
  lol: 'Grieta del Invocador, ARAM y 1v1 Howling Abyss. Escala en la clasificación de equipos.',
  valorant: '5v5 competitivo, Swiftplay y duelos 1v1 de puntería. Demuestra tu táctica.'
}

const games = GAME_LIST.map((config) => ({
  id: config.id,
  config,
  theme: useGameTheme(config.theme),
  description: descriptions[config.id],
  upcomingCount: upcomingByGame(config.id).value.length
}))
</script>
