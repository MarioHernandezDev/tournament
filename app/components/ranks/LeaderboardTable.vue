<template>
  <div class="w-full space-y-3">
    
    <!-- CABECERA MÍNIMA -->
    <div class="grid grid-cols-12 gap-4 px-6 py-2 text-[10px] font-mono text-zinc-500 uppercase tracking-[0.25em]">
      <div class="col-span-2 sm:col-span-1">POS</div>
      <div class="col-span-6 sm:col-span-5">EQUIPO</div>
      <div class="col-span-4 hidden sm:block">LIGA / TIER</div>
      <div class="col-span-4 sm:col-span-2 text-right pr-2">PTS</div>
    </div>

    <!-- FILAS CON FONDO OPACO / SEMITRANSPARENTE -->
    <div 
      v-for="team in teams" 
      :key="team.rank"
      class="group relative rounded-2xl bg-zinc-950/70 backdrop-blur-md border border-white/[0.08] transition-all duration-300 hover:border-amber-400/40 hover:bg-zinc-950/90 shadow-xl overflow-hidden"
    >
      <!-- Indicador lateral activo -->
      <div 
        class="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 opacity-0 transition-opacity duration-300"
        :class="{ 'opacity-100': expandedRow === team.rank }"
      />

      <!-- FILA PRINCIPAL -->
      <div 
        @click="toggleRow(team.rank)"
        class="grid grid-cols-12 gap-4 items-center p-4 sm:px-6 cursor-pointer"
      >
        <!-- POSICIÓN -->
        <div class="col-span-2 sm:col-span-1 flex items-center gap-2">
          <span class="font-['Rajdhani'] font-black text-2xl text-zinc-400 group-hover:text-white transition-colors">
            {{ team.rank < 10 ? `0${team.rank}` : team.rank }}
          </span>
        </div>

        <!-- EQUIPO (LOGO + NOMBRE) -->
        <div class="col-span-6 sm:col-span-5 flex items-center gap-3.5">
          <div class="relative shrink-0">
            <img 
              :src="team.logo" 
              :alt="team.name" 
              class="w-10 h-10 rounded-xl bg-black/60 border border-white/10 p-1.5 object-contain group-hover:border-amber-400/40 transition-colors"
            />
          </div>
          <div class="overflow-hidden">
            <h3 class="font-['Rajdhani'] font-black text-lg sm:text-xl text-white uppercase tracking-wide group-hover:text-amber-400 transition-colors truncate">
              {{ team.name }}
            </h3>
            <span class="text-[10px] font-mono text-zinc-500 uppercase">
              [{{ team.tag }}] &bull; <span class="text-emerald-400">{{ team.winrate }}% WR</span>
            </span>
          </div>
        </div>

        <!-- LIGA / TIER -->
        <div class="col-span-4 hidden sm:flex items-center">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/5 text-[11px] font-mono text-zinc-300">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            {{ team.tier }}
          </span>
        </div>

        <!-- PUNTOS Y BOTÓN -->
        <div class="col-span-4 sm:col-span-2 flex items-center justify-end gap-3">
          <div class="text-right">
            <span class="font-['Rajdhani'] font-black text-2xl sm:text-3xl text-amber-400 leading-none block">
              {{ team.points }}
            </span>
          </div>

          <button 
            type="button"
            class="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-white/20 transition-all"
          >
            <UIcon 
              name="i-heroicons-chevron-down" 
              class="w-3.5 h-3.5 transition-transform duration-300"
              :class="{ 'rotate-180 text-amber-400': expandedRow === team.rank }"
            />
          </button>
        </div>
      </div>

      <!-- DESPLEGABLE -->
      <div 
        v-if="expandedRow === team.rank" 
        class="border-t border-white/[0.06] bg-black/50 backdrop-blur-md p-5 sm:px-6"
      >
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div class="space-y-2">
            <span class="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em] block">Roster activo</span>
            <div class="flex flex-wrap gap-1.5">
              <div 
                v-for="(player, idx) in team.roster" 
                :key="player" 
                class="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/5 text-xs text-zinc-300 font-mono flex items-center gap-2"
              >
                <span class="text-[10px] text-amber-400 font-bold">0{{ idx + 1 }}</span>
                <span>{{ player }}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-6 text-xs font-mono sm:border-l sm:border-white/[0.06] sm:pl-6 pt-3 sm:pt-0 border-t border-white/[0.06]">
            <div>
              <span class="text-zinc-500 text-[9px] block uppercase tracking-wider">Partidas</span>
              <span class="text-white font-bold font-['Rajdhani'] text-base">{{ team.matchesPlayed }}</span>
            </div>
            <div>
              <span class="text-zinc-500 text-[9px] block uppercase tracking-wider">Estado</span>
              <span class="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5 mt-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Activo
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  teams: {
    type: Array,
    required: true
  }
})

const expandedRow = ref(null)

const toggleRow = (rank) => {
  expandedRow.value = expandedRow.value === rank ? null : rank
}
</script>