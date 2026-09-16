<template>
  <section class="w-full max-w-7xl mx-auto px-4 py-6">
    <!-- Encabezado de sección -->
    <div class="flex flex-col items-center text-center mb-16">
      <div class="h-1 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-4"></div>
    </div>

    <!-- Estructura del Podio Creativo -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      
      <!-- 2º PUESTO (Plata - Izquierda) -->
      <div 
        v-if="teams[1]" 
        @click="$emit('select', teams[1])"
        class="group relative bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-white/10 hover:border-zinc-400/50 transition-all duration-500 cursor-pointer shadow-2xl transform md:-translate-y-4"
      >
        <div class="absolute top-4 right-6 font-['Rajdhani'] text-6xl font-black text-white/5 select-none">
          02
        </div>
        <div class="flex items-center justify-between mb-8">
          <span class="font-mono text-[10px] tracking-widest uppercase bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
            Subcampeón
          </span>
          <span class="font-mono text-sm font-bold text-zinc-400">
            {{ teams[1].points }} PTS
          </span>
        </div>

        <div class="flex flex-col items-center text-center">
          <div class="w-24 h-24 rounded-2xl bg-black/60 border border-white/10 p-4 mb-6 shadow-inner group-hover:scale-105 transition-transform duration-500">
            <img :src="teams[1].logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop'" :alt="teams[1].name" class="w-full h-full object-contain" />
          </div>
          <span class="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{{ teams[1].tier }}</span>
          <h3 class="font-['Rajdhani'] text-3xl font-black uppercase text-white mb-4">{{ teams[1].name }}</h3>
          <div class="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1">
            Explorar equipo &rarr;
          </div>
        </div>
      </div>

      <!-- 1º PUESTO (Oro - Centro / Destacado) -->
      <div 
        v-if="teams[0]" 
        @click="$emit('select', teams[0])"
        class="group relative bg-gradient-to-b from-zinc-900 via-zinc-950 to-black rounded-3xl p-8 sm:p-10 border-2 border-amber-400/40 hover:border-amber-400 transition-all duration-500 cursor-pointer shadow-[0_0_50px_rgba(245,158,11,0.15)] transform md:-translate-y-10 z-10"
      >
        <div class="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-400 text-black font-mono text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
          ★ Campeón de la Temporada ★
        </div>

        <div class="absolute top-4 right-6 font-['Rajdhani'] text-7xl font-black text-amber-400/10 select-none">
          01
        </div>

        <div class="flex items-center justify-between mb-8 mt-2">
          <span class="font-mono text-[10px] tracking-widest uppercase bg-amber-400/10 text-amber-300 border border-amber-400/20 px-3 py-1 rounded-full">
            Líder Absoluto
          </span>
          <span class="font-mono text-lg font-bold text-amber-400">
            {{ teams[0].points }} PTS
          </span>
        </div>

        <div class="flex flex-col items-center text-center">
          <div class="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-black/80 border-2 border-amber-400/50 p-5 mb-6 shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover:scale-110 transition-transform duration-500">
            <img :src="teams[0].logo || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=300&auto=format&fit=crop'" :alt="teams[0].name" class="w-full h-full object-contain" />
          </div>
          <span class="font-mono text-xs text-amber-400/70 uppercase tracking-widest mb-1">{{ teams[0].tier }}</span>
          <h1 class="font-['Rajdhani'] text-4xl sm:text-5xl font-black uppercase text-white mb-6 tracking-wide">{{ teams[0].name }}</h1>
          <button class="bg-amber-400 hover:bg-amber-300 text-black font-['Rajdhani'] font-bold uppercase tracking-wider text-sm px-6 py-2.5 rounded-xl transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            Ver Plantilla Oficial
          </button>
        </div>
      </div>

      <!-- 3º PUESTO (Bronce - Derecha) -->
      <div 
        v-if="teams[2]" 
        @click="$emit('select', teams[2])"
        class="group relative bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-white/10 hover:border-amber-700/50 transition-all duration-500 cursor-pointer shadow-2xl"
      >
        <div class="absolute top-4 right-6 font-['Rajdhani'] text-6xl font-black text-white/5 select-none">
          03
        </div>
        <div class="flex items-center justify-between mb-8">
          <span class="font-mono text-[10px] tracking-widest uppercase bg-amber-950/40 text-amber-600 border border-amber-900/30 px-3 py-1 rounded-full">
            Tercer Puesto
          </span>
          <span class="font-mono text-sm font-bold text-zinc-400">
            {{ teams[2].points }} PTS
          </span>
        </div>

        <div class="flex flex-col items-center text-center">
          <div class="w-24 h-24 rounded-2xl bg-black/60 border border-white/10 p-4 mb-6 shadow-inner group-hover:scale-105 transition-transform duration-500">
            <img :src="teams[2].logo || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=300&auto=format&fit=crop'" :alt="teams[2].name" class="w-full h-full object-contain" />
          </div>
          <span class="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{{ teams[2].tier }}</span>
          <h3 class="font-['Rajdhani'] text-3xl font-black uppercase text-white mb-4">{{ teams[2].name }}</h3>
          <div class="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1">
            Explorar equipo &rarr;
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
defineProps({
  teams: {
    type: Array,
    required: true,
    default: () => []
  }
})

defineEmits(['select'])
</script>