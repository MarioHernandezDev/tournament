<template>
  <div>
    <MiniHero
      title="Torneos"
      bg-text="torneos"
      description="Elige tu disciplina y entra en la competición. Brackets en vivo, ranking mensual y premios en cada edición."
      icon-name="i-heroicons-trophy"
      theme="emerald"
      button-text="Crear Torneo"
      button-link="/tournaments/create"
      secondary-button-text="Ver Ranking"
      secondary-button-link="/ranks"
    />

    <div class="w-full bg-black overflow-hidden ">
      

      <!-- GRID EDGE-TO-EDGE REACTIVO -->
      <div class="grid grid-cols-1 md:grid-cols-2 w-full">
        <NuxtLink
          v-for="game in games"
          :key="game.id"
          :to="`/torneos/${game.id}`"
          class="group relative w-full h-[550px] sm:h-[700px] lg:h-[800px] overflow-hidden text-left block"
        >
          <!-- Imagen de fondo a pantalla completa -->
          <img 
            :src="gameImages[game.id] || '/img/lol-hero.png'" 
            :alt="game.config.label" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out filter brightness-90 contrast-110"
          />
          
          <!-- Degradado inferior constante -->
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity" />
          
          <!-- Resplandor de color al hacer hover según el tema del juego -->
          <div 
            class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            :class="game.theme.bg"
          />

          <!-- Capa Superpuesta con Contenido -->
          <div class="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end items-start z-10">


            <!-- Información e Interacción Inferior -->
            <div class="w-full space-y-5 pt-8 border-t border-white/10 backdrop-blur-sm">
              <p class="text-sm sm:text-base text-zinc-300 max-w-md font-light line-clamp-2">
                {{ game.description }}
              </p>

              <div class="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <h3 class="font-['Rajdhani'] text-5xl sm:text-6xl lg:text-7xl font-black text-white uppercase leading-none drop-shadow-2xl">
                  {{ game.config.label }}
                </h3>

                <!-- Botón Píldora Elegante -->
                <span 
                  class="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border text-sm font-['Rajdhani'] font-extrabold uppercase tracking-wider backdrop-blur-md transition-all shadow-2xl shrink-0"
                  :class="[game.theme.border, game.theme.text, game.theme.bgHover, game.theme.bgSolidText]"
                >
                  <span>Ver Torneos</span>
                  <UIcon name="i-heroicons-arrow-up-right" class="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </div>
            </div>

          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import valorantImg from '~/assets/img/imagenvalorant.webp'
import lolImg from '~/assets/img/imagenlol.webp'

const { upcomingByGame } = useTournaments()

const gameImages = {
  valorant: valorantImg,
  lol: lolImg
}

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