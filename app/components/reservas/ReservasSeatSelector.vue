<template>
  <div class="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 sm:backdrop-blur-md space-y-6">
    <div class="flex items-center justify-between border-b border-zinc-800/80 pb-4">
      <div class="flex items-center gap-3">
        <span class="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 font-mono font-bold flex items-center justify-center text-sm">03</span>
        <h3 class="font-['Rajdhani'] text-2xl font-black uppercase text-white tracking-wide">
          Selecciona tu Setup
        </h3>
      </div>
      <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest hidden sm:inline-block">
        {{ selectedSeatLabel }}
      </span>
    </div>

    <!-- CATEGORÍAS -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <button
        v-for="category in equipmentCategories"
        :key="category.id"
        type="button"
        @click="activeCategory = category.id"
        class="p-4 rounded-xl border text-left transition-all space-y-2 flex flex-col justify-between"
        :class="activeCategory === category.id 
          ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.15)]' 
          : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'"
      >
        <UIcon :name="category.icon" class="w-6 h-6" :class="activeCategory === category.id ? 'text-cyan-400' : 'text-zinc-500'" />
        <div>
          <p class="font-['Rajdhani'] font-black text-base uppercase leading-none">{{ category.name }}</p>
          <p class="text-[10px] font-mono text-zinc-500 mt-1">{{ category.subtitle }}</p>
        </div>
      </button>
    </div>

    <!-- OPCIONES -->
    <div class="pt-4 border-t border-zinc-900">
      <!-- PC STANDARD (1-30) -->
      <div v-if="activeCategory === 'pc_standard'" class="space-y-4">
        <p class="text-xs font-mono text-zinc-400">Haz clic en un PC libre (1 al 30):</p>
        <div class="grid grid-cols-5 sm:grid-cols-10 gap-2.5">
          <button
            v-for="pcNum in 30"
            :key="`pc-${pcNum}`"
            type="button"
            @click="selectSeat('pc_standard', pcNum)"
            class="h-12 rounded-xl border font-mono font-bold text-sm transition-all flex flex-col items-center justify-center gap-0.5"
            :class="isSeatSelected('pc_standard', pcNum) 
              ? 'bg-cyan-400 text-zinc-950 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-cyan-400/50 hover:text-white'"
          >
            <span class="text-[9px] opacity-60 font-sans uppercase">PC</span>
            <span>{{ pcNum }}</span>
          </button>
        </div>
      </div>

      <!-- PC VIP (31-35) -->
      <div v-else-if="activeCategory === 'pc_vip'" class="space-y-4">
        <div class="flex items-center justify-between">
          <p class="text-xs font-mono text-amber-400">Setups Pro VIP Acondicionados (31 al 35):</p>
          <span class="text-[10px] font-mono bg-amber-400/10 border border-amber-400/30 text-amber-400 px-2 py-0.5 rounded">STREAMING READY</span>
        </div>
        <div class="grid grid-cols-5 gap-3">
          <button
            v-for="vipNum in [31, 32, 33, 34, 35]"
            :key="`vip-${vipNum}`"
            type="button"
            @click="selectSeat('pc_vip', vipNum)"
            class="h-16 rounded-xl border font-mono font-bold transition-all flex flex-col items-center justify-center"
            :class="isSeatSelected('pc_vip', vipNum) 
              ? 'bg-amber-400 text-zinc-950 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.4)] scale-105' 
              : 'bg-zinc-900 border-zinc-800 text-amber-300/80 hover:border-amber-400 hover:text-amber-300'"
          >
            <span class="text-[10px] uppercase font-sans tracking-widest opacity-80">VIP</span>
            <span class="text-xl font-black">#{{ vipNum }}</span>
          </button>
        </div>
      </div>

      <!-- CONSOLAS -->
      <div v-else-if="activeCategory === 'consoles'" class="space-y-4">
        <p class="text-xs font-mono text-zinc-400">Consolas de última generación disponibles:</p>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            v-for="consoleItem in consoleList"
            :key="consoleItem.id"
            type="button"
            @click="selectSeat('consoles', consoleItem.id, consoleItem.name)"
            class="p-4 rounded-xl border text-left transition-all flex items-center justify-between"
            :class="isSeatSelected('consoles', consoleItem.id) 
              ? 'bg-cyan-400 text-zinc-950 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-cyan-400/50'"
          >
            <div class="space-y-1">
              <span class="text-xs font-mono uppercase opacity-70 block">{{ consoleItem.brand }}</span>
              <p class="font-['Rajdhani'] font-black text-lg uppercase">{{ consoleItem.name }}</p>
            </div>
            <UIcon :name="consoleItem.icon" class="w-8 h-8 opacity-80" />
          </button>
        </div>
      </div>

      <!-- SIMULADORES -->
      <div v-else-if="activeCategory === 'simulators'" class="space-y-4">
        <p class="text-xs font-mono text-zinc-400">Cockpits con Volante Direct Drive y pedales pro:</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            v-for="simNum in [1, 2]"
            :key="`sim-${simNum}`"
            type="button"
            @click="selectSeat('simulators', simNum, `Simulador SimRacing #${simNum}`)"
            class="p-5 rounded-xl border text-left transition-all flex items-center justify-between"
            :class="isSeatSelected('simulators', simNum) 
              ? 'bg-cyan-400 text-zinc-950 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-cyan-400/50'"
          >
            <div>
              <span class="text-xs font-mono uppercase text-cyan-400 block">SIMRACING PRO</span>
              <p class="font-['Rajdhani'] font-black text-xl uppercase">Simulador #{{ simNum }}</p>
            </div>
            <UIcon name="i-heroicons-trophy" class="w-8 h-8 opacity-80" />
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  seatType: String,
  seatId: [Number, String],
  selectedSeatLabel: String
})

const emit = defineEmits(['select-seat'])

const activeCategory = ref('pc_standard')

const equipmentCategories = [
  { id: 'pc_standard', name: 'PC Standard', subtitle: 'Setups 1 al 30', icon: 'i-heroicons-computer-desktop' },
  { id: 'pc_vip', name: 'PC VIP', subtitle: 'Setups 31 al 35', icon: 'i-heroicons-sparkles' },
  { id: 'consoles', name: 'Consolas', subtitle: 'PS5 / Xbox', icon: 'i-heroicons-device-tablet' },
  { id: 'simulators', name: 'Simuladores', subtitle: 'SimRacing Pro', icon: 'i-heroicons-trophy' }
]

const consoleList = [
  { id: 'ps5_1', brand: 'PlayStation', name: 'PlayStation 5 #1', icon: 'i-heroicons-device-tablet' },
  { id: 'ps5_2', brand: 'PlayStation', name: 'PlayStation 5 #2', icon: 'i-heroicons-device-tablet' },
  { id: 'xbox_1', brand: 'Xbox', name: 'Xbox Series X', icon: 'i-heroicons-device-tablet' }
]

const selectSeat = (type, id, customName = '') => {
  emit('select-seat', { type, id, customName })
}

const isSeatSelected = (type, id) => {
  return props.seatType === type && props.seatId === id
}
</script>