<template>
  <section class="relative w-full space-y-6 my-10">
    
    <!-- ENCABEZADO TÁCTICO CON MAYOR ESPACIADO -->
    <div class="flex items-center justify-between border-b border-zinc-800/80 pb-4">
      <div class="flex items-center gap-3.5">
        <div class="relative flex h-3.5 w-3.5 items-center justify-center">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" :class="theme.bgDot" />
          <span class="relative inline-flex h-2.5 w-2.5 rounded-full" :class="theme.bgDot" />
        </div>
        <h2 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase tracking-widest text-white">
          Expediente del Jugador <span class="text-zinc-600">//</span> {{ gameConfig.label }}
        </h2>
      </div>
      
      
    </div>

    <!-- CON HISTORIAL -->
    <div 
      v-if="activity" 
      class="group relative overflow-hidden rounded-3xl bg-zinc-950/90 border border-zinc-800/80 p-8 sm:p-12 transition-all duration-500 hover:border-zinc-700 shadow-2xl backdrop-blur-xl"
    >
      <!-- GLOW AMBIENTAL PROYECTADO DE FONDO -->
      <div 
        class="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px] pointer-events-none transition-opacity duration-700 group-hover:opacity-25"
        :class="theme.bgGlow"
      />
      
      <!-- PATRÓN TÁCTICO CSS DE FONDO -->
      <div class="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <!-- MARCA DE AGUA TIPOGRÁFICA GIGANTE -->
      <span class="absolute -bottom-8 -right-6 font-['Rajdhani'] text-9xl lg:text-[14rem] font-black uppercase tracking-tighter text-white/[0.02] select-none pointer-events-none leading-none">
        {{ gameConfig.shortName }}
      </span>

      <div class="relative z-10 flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-14">
        
        <!-- COLUMNA IZQUIERDA: BLOQUE JUGADOR / EQUIPO + WINRATE ARRIBA -->
        <div class="flex flex-col justify-between space-y-6 lg:w-5/12 shrink-0">
          
          <!-- SECCIÓN WINRATE (ARRIBA) -->
          <div class="space-y-2 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
            <div class="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span class="flex items-center gap-1.5">
                <UIcon name="i-heroicons-chart-pie" class="w-4 h-4" :class="theme.text" />
                <span>WINRATE</span>
              </span>
              <span class="font-bold text-white font-mono text-sm">{{ activity.winrate }}%</span>
            </div>
            <!-- Barra de progreso -->
            <div class="w-full h-2.5 rounded-full bg-zinc-950 border border-zinc-800/80 overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-1000"
                :class="theme.bgBar"
                :style="{ width: activity.winrate + '%' }"
              />
            </div>
          </div>

          <!-- BLOQUE PERFIL / ROSTER & SQUAD -->
          <div class="flex items-center gap-6">
            <!-- Emblema grande -->
            <div class="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800/90 shadow-2xl text-white font-['Rajdhani'] font-black text-3xl sm:text-4xl group-hover:border-zinc-600 transition-colors shrink-0">
              <span :class="theme.text">{{ activity.team ? activity.team.charAt(0) : 'P' }}</span>
             
            </div>

            <div class="space-y-1.5">
              <h3 class="font-['Rajdhani'] text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-wide leading-none">
                {{ activity.team || 'Sin Equipo' }}
              </h3>
              
            </div>
          </div>

        </div>

        <!-- SEPARADOR VERTICAL DESKTOP -->
        <div class="hidden lg:block w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent shrink-0" />

        <!-- COLUMNA DERECHA / ABAJO: MÉTRICAS Y ÚLTIMO RESULTADO -->
        <div class="flex flex-col justify-between space-y-8 lg:w-6/12 grow pt-6 lg:pt-0 border-t lg:border-t-0 border-zinc-800/80">
          
          <!-- GRID DE MÉTRICAS -->
          <div class="grid grid-cols-3 gap-6">
            <div v-for="stat in stats" :key="stat.label" class="space-y-2">
              <p class="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                <UIcon :name="stat.icon" class="w-4 h-4" :class="theme.text" />
                <span>{{ stat.label }}</span>
              </p>
              <p class="font-['Rajdhani'] text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
                {{ stat.value }}
              </p>
            </div>
          </div>

         

        </div>

      </div>
    </div>

    <!-- SIN HISTORIAL -->
    <div
      v-else
      class="group relative overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-800/80 p-10 sm:p-16 text-center transition-all duration-500 hover:border-zinc-700 shadow-2xl"
    >
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div 
        class="absolute -bottom-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-[100px] pointer-events-none transition-all duration-700 group-hover:opacity-35"
        :class="theme.bgGlow"
      />

      <div class="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto space-y-7">
        <div class="relative flex items-center justify-center w-24 h-24">
          <div class="absolute inset-0 rounded-3xl rotate-45 border border-zinc-800 bg-zinc-900/90 backdrop-blur-md transition-transform duration-700 group-hover:rotate-90 group-hover:scale-105" />
          <UIcon name="i-heroicons-trophy" class="relative z-10 w-11 h-11" :class="theme.text" />
        </div>

        <div class="space-y-3">
          <h3 class="font-['Rajdhani'] text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
            Sin Historial Competitivo
          </h3>
          <p class="text-zinc-400 text-base sm:text-lg leading-relaxed font-normal max-w-lg">
            Registra a tu equipo en la próxima copa oficial de <span class="text-white font-semibold">{{ gameConfig.label }}</span> para comenzar a acumular puntos de liga y desbloquear tus estadísticas globales.
          </p>
        </div>

        <a
          href="#torneos"
          class="inline-flex items-center gap-3.5 px-9 py-4 sm:px-10 sm:py-5 rounded-full font-['Rajdhani'] font-black text-base uppercase tracking-wider text-black transition-all duration-300 shadow-2xl hover:scale-105"
          :class="theme.btnPrimary"
        >
          <UIcon name="i-heroicons-bolt" class="w-6 h-6 fill-current" />
          <span>Inscribir Mi Equipo Ahora</span>
        </a>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  game: {
    type: String,
    required: true,
    validator: (v) => ['lol', 'valorant'].includes(v)
  }
})

const gameConfig = computed(() => ({
  label: props.game === 'valorant' ? 'Valorant' : 'League of Legends',
  shortName: props.game === 'valorant' ? 'VAL' : 'LOL'
}))

const theme = computed(() => ({
  bgDot: props.game === 'valorant' ? 'bg-red-500' : 'bg-cyan-400',
  text: props.game === 'valorant' ? 'text-red-500' : 'text-cyan-400',
  bgGlow: props.game === 'valorant' ? 'bg-red-600' : 'bg-cyan-500',
  bgBar: props.game === 'valorant' ? 'bg-gradient-to-r from-red-600 to-red-400' : 'bg-gradient-to-r from-cyan-500 to-cyan-300',
  btnPrimary: props.game === 'valorant' ? 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/30' : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-cyan-400/30'
}))

// Mock de datos (se puede poner en null para probar la tarjeta vacía)
const activity = ref({
  playerId: '9482-VAL',
  team: 'KRÜ Esports',
  role: 'Duelista',
  streak: '🔥 3W',
  tournamentsPlayed: 14,
  statLabel: 'KDA Medio',
  stat: '2.14',
  position: '#4 Global',
  winrate: 68,
  lastResult: 'Semifinales (2 - 1)'
})

const stats = computed(() => {
  if (!activity.value) return []
  return [
    { label: 'Torneos', value: activity.value.tournamentsPlayed, icon: 'i-heroicons-trophy' },
    { label: activity.value.statLabel, value: activity.value.stat, icon: 'i-heroicons-chart-bar' },
    { label: 'Ranking', value: activity.value.position, icon: 'i-heroicons-flag' }
  ]
})
</script>