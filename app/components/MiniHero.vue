<template>
  <header class="relative w-full bg-zinc-950 pt-16 pb-20 sm:pt-20 sm:pb-24 overflow-hidden min-h-[500px] lg:min-h-[580px] flex items-end">
    
    <!-- 1. FOTO DE FONDO CON TRANSICIÓN -->
    <Transition name="fade" mode="out-in">
      <div :key="bgBanner" class="absolute inset-0 z-0 pointer-events-none select-none">
        <img 
          :src="bgBanner" 
          class="w-full h-full object-cover object-center opacity-70 filter brightness-95 contrast-105 transition-all duration-700"
          alt="Game Scene Background"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-transparent to-zinc-950/70" />
      </div>
    </Transition>

    <!-- 2. AURA AMBIENTAL PULSANTE (RESPIRACIÓN) -->
    <div 
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[400px] blur-[160px] rounded-full pointer-events-none z-10 opacity-30 animate-pulse duration-10000"
      :class="ambientAuraClass"
    />

    <!-- 3. TEXTO COLOSAL DE FONDO "PROJECT" / CUSTOM -->
    <div class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <h1 
        class="font-['Rajdhani'] font-black uppercase text-[25vw] sm:text-[28vw] lg:text-[32vw] leading-none tracking-tighter whitespace-nowrap select-none transition-all duration-700"
        :class="bgTextGlowClass"
      >
        {{ bgText || title }}
      </h1>
    </div>

    <!-- 4. PERSONAJE PNG EN SOBREPOSICIÓN 3D CON ANIMACIÓN DE FLOTACIÓN -->
    <div 
      v-if="bgImage" 
      class="absolute inset-y-0 right-0 z-20 w-full md:w-3/4 lg:w-3/5 pointer-events-none select-none overflow-hidden flex items-end justify-end"
    >
      <div class="relative w-full h-full flex items-end justify-end [mask-image:linear-gradient(to_left,black_65%,transparent_100%)]">
        <img 
          :src="bgImage" 
          :alt="title" 
          class="h-full w-auto max-w-none object-contain object-bottom object-right filter brightness-105 contrast-110 drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] transition-all duration-700 scale-100 animate-float"
        />
      </div>
      <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </div>

    <!-- 5. CONTENIDO INTERACTIVO DE PRIMER PLANO -->
    <div class="max-w-[1500px] mx-auto px-6 sm:px-12 lg:px-20 relative z-30 w-full">
      
      <!-- TITULAR CON ESCÁNER DE LUZ (SHIMMER) Y DESCRIPCIÓN -->
      <div class="space-y-4 max-w-3xl">
        <h2 class="font-['Rajdhani'] text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95] drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
          <span :class="titleGradientClass" class="animate-shimmer bg-[length:200%_auto]">{{ title }}</span>
        </h2>
        
        <p class="text-zinc-200 text-base sm:text-lg font-light leading-relaxed max-w-md drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
          {{ description }}
        </p>
      </div>

    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  bgText: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  bgBanner: {
    type: String,
    default: '/img/hero.jpg'
  },
  bgImage: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: 'blue',
    validator: (v) => ['red', 'blue', 'gold', 'emerald', 'white'].includes(v)
  }
})

// Estilos dinámicos
const bgTextGlowClass = computed(() => {
  switch (props.theme) {
    case 'red': return 'text-rose-500/[0.08] drop-shadow-[0_0_90px_rgba(244,63,94,0.2)]'
    case 'blue': return 'text-cyan-400/[0.09] drop-shadow-[0_0_90px_rgba(34,211,238,0.2)]'
    case 'gold': return 'text-amber-500/[0.08] drop-shadow-[0_0_90px_rgba(251,191,36,0.2)]'
    case 'emerald': return 'text-emerald-400/[0.08] drop-shadow-[0_0_90px_rgba(52,211,153,0.2)]'
    case 'white': return 'text-white/[0.08] drop-shadow-[0_0_90px_rgba(255,255,255,0.2)]'
    default: return 'text-white/[0.08]'
  }
})

const titleGradientClass = computed(() => {
  switch (props.theme) {
    case 'red': return 'text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-rose-500 to-red-600'
    case 'blue': return 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500'
    case 'gold': return 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600'
    case 'emerald': return 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-emerald-400 to-teal-600'
    case 'white': return 'text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500'
    default: return 'text-white'
  }
})

const ambientAuraClass = computed(() => {
  switch (props.theme) {
    case 'red': return 'bg-rose-500/20'
    case 'blue': return 'bg-cyan-500/20'
    case 'gold': return 'bg-amber-500/20'
    case 'emerald': return 'bg-emerald-500/20'
    case 'white': return 'bg-white/20'
    default: return 'bg-cyan-500/20'
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animación de escáner de luz sobre el texto */
@keyframes shimmer {
  0% { bg-position: 0% center; }
  100% { bg-position: 200% center; }
}
.animate-shimmer {
  animation: shimmer 6s linear infinite;
}

/* Animación de flotación suave para el personaje */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
.animate-float {
  animation: float 5s ease-in-out infinite;
}
</style>