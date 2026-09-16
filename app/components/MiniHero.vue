<template>
  <header class="relative w-full bg-zinc-950 pt-16 pb-20 sm:pt-20 sm:pb-24 overflow-hidden min-h-[500px] lg:min-h-[580px] flex items-end">
    
    <!-- 1. FOTO DE FONDO CON TRANSICIÓN -->
    <Transition name="fade" mode="out-in">
      <div :key="bgBanner" class="absolute inset-0 z-0">
        <img 
          :src="bgBanner" 
          class="w-full h-full object-cover object-center opacity-20 scale-105 transition-all duration-1000 blur-xs"
          alt="Game Scene Background"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
      </div>
    </Transition>

    <!-- 2. TEXTO COLOSAL DE FONDO -->
    <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <h1 
        class="font-['Rajdhani'] font-black uppercase text-[22vw] sm:text-[25vw] lg:text-[28vw] leading-none tracking-tighter transition-all duration-700 whitespace-nowrap select-none"
        :class="bgTextGlowClass"
      >
        {{ bgText || title }}
      </h1>
    </div>

    <!-- 3. ESPIRAL / PARTÍCULAS INTERACTIVAS -->
    <canvas 
      ref="canvasRef" 
      class="absolute inset-0 pointer-events-none z-10 w-full h-full opacity-60 mix-blend-screen"
    />

    <!-- AURA AMBIENTAL CENTRAL DE COLOR -->
    <div 
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] blur-[160px] rounded-full pointer-events-none z-10 opacity-25 transition-all duration-700"
      :class="ambientAuraClass"
    />

    <!-- 4. PERSONAJE PNG EN SOBREPOSICIÓN 3D (SOLO SI SE PASA LA PROP bgImage) -->
    <div 
      v-if="bgImage" 
      class="absolute inset-y-0 right-0 z-20 w-full md:w-3/4 lg:w-3/5 pointer-events-none select-none overflow-hidden flex items-end justify-end"
    >
      <div class="relative w-full h-full flex items-end justify-end [mask-image:linear-gradient(to_left,black_65%,transparent_100%)]">
        <img 
          :src="bgImage" 
          :alt="title" 
          class="h-full w-auto max-w-none object-contain object-bottom object-right filter brightness-105 contrast-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-all duration-700 scale-100"
        />
      </div>
      <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
    </div>

    <!-- 5. CONTENIDO INTERACTIVO DE PRIMER PLANO -->
    <div class="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-30 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10">
      
      <!-- TITULAR Y DESCRIPCIÓN -->
      <div class="space-y-4 max-w-3xl">
        <h2 class="font-['Rajdhani'] text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none drop-shadow-2xl">
          <span :class="titleGradientClass">{{ title }}</span>
        </h2>
        
        <p class="text-zinc-300 text-base sm:text-xl leading-relaxed font-light max-w-2xl drop-shadow-md">
          {{ description }}
        </p>
      </div>

      <!-- BOTONES DE ACCIÓN (PÍLDORAS) -->
      <div class="flex items-center gap-3 shrink-0 flex-wrap">
        <a 
          :href="secondaryButtonLink" 
          class="inline-flex items-center justify-center px-7 py-3.5 rounded-full font-['Rajdhani'] font-bold text-sm uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 backdrop-blur-md shadow-lg"
        >
          {{ secondaryButtonText }}
        </a>

        <NuxtLink 
          :to="buttonLink" 
          :class="actionButtonClass"
        >
          {{ buttonText }}
        </NuxtLink>
      </div>

    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

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
    default: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80'
  },
  // OPCIONAL: Si no se pasa, no se carga la imagen ni el contenedor 3D
  bgImage: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: 'red',
    validator: (v) => ['red', 'blue', 'gold', 'emerald', 'white'].includes(v)
  },
  buttonText: {
    type: String,
    default: 'Reservar'
  },
  buttonLink: {
    type: String,
    default: '/instalaciones#ubicacion'
  },
  secondaryButtonText: {
    type: String,
    default: 'Ver más'
  },
  secondaryButtonLink: {
    type: String,
    default: '#'
  }
})

// Estilos dinámicos
const bgTextGlowClass = computed(() => {
  switch (props.theme) {
    case 'red': return 'text-rose-500/[0.06] drop-shadow-[0_0_80px_rgba(244,63,94,0.1)]'
    case 'blue': return 'text-cyan-400/[0.06] drop-shadow-[0_0_80px_rgba(34,211,238,0.1)]'
    case 'gold': return 'text-amber-500/[0.06] drop-shadow-[0_0_80px_rgba(251,191,36,0.1)]'
    case 'emerald': return 'text-emerald-400/[0.06] drop-shadow-[0_0_80px_rgba(52,211,153,0.1)]'
    case 'white': return 'text-white/[0.08] drop-shadow-[0_0_80px_rgba(255,255,255,0.15)]'
    default: return 'text-white/[0.06]'
  }
})

const titleGradientClass = computed(() => {
  switch (props.theme) {
    case 'red': return 'text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-rose-500 to-red-600'
    case 'blue': return 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-600'
    case 'gold': return 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600'
    case 'emerald': return 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-emerald-400 to-teal-600'
    case 'white': return 'text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500'
    default: return 'text-white'
  }
})

const ambientAuraClass = computed(() => {
  switch (props.theme) {
    case 'red': return 'bg-rose-500'
    case 'blue': return 'bg-cyan-500'
    case 'gold': return 'bg-amber-500'
    case 'emerald': return 'bg-emerald-500'
    case 'white': return 'bg-white'
    default: return 'bg-white'
  }
})

const actionButtonClass = computed(() => {
  const base = 'inline-flex items-center justify-center px-8 py-3.5 rounded-full font-["Rajdhani"] font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:translate-y-0 '
  switch (props.theme) {
    case 'red': return base + 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white shadow-rose-600/30'
    case 'blue': return base + 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-950 shadow-cyan-400/30'
    case 'gold': return base + 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 shadow-amber-400/30'
    case 'emerald': return base + 'bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-zinc-950 shadow-emerald-400/30'
    case 'white': return base + 'bg-gradient-to-r from-zinc-100 to-zinc-300 hover:from-white hover:to-zinc-200 text-zinc-950 shadow-white/20'
    default: return base + 'bg-white hover:bg-zinc-200 text-zinc-950 shadow-white/20'
  }
})

// Canvas interactivo
const canvasRef = ref(null)
let animId = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let width = (canvas.width = canvas.offsetWidth)
  let height = (canvas.height = canvas.offsetHeight)

  const handleResize = () => {
    if (!canvas) return
    width = canvas.width = canvas.offsetWidth
    height = canvas.height = canvas.offsetHeight
  }

  window.addEventListener('resize', handleResize)

  const themeColors = {
    red: '#f43f5e',
    blue: '#22d3ee',
    gold: '#fbbf24',
    emerald: '#34d399',
    white: '#ffffff'
  }
  const currentHex = themeColors[props.theme] || '#ffffff'

  const numParticles = 80
  const particles = []

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * (width * 0.35) + 50,
      speed: Math.random() * 0.005 + 0.002,
      y: Math.random() * height,
      velocityY: Math.random() * 0.4 + 0.1,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.8 + 0.2
    })
  }

  const render = () => {
    ctx.clearRect(0, 0, width, height)

    const centerX = width * 0.65

    particles.forEach((p) => {
      p.angle += p.speed
      p.y -= p.velocityY

      if (p.y < 0) {
        p.y = height
        p.radius = Math.random() * (width * 0.35) + 50
      }

      const x = centerX + Math.cos(p.angle) * p.radius
      const y = p.y + Math.sin(p.angle) * (p.radius * 0.3)

      ctx.beginPath()
      ctx.arc(x, y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = currentHex
      ctx.globalAlpha = p.alpha
      ctx.shadowBlur = 10
      ctx.shadowColor = currentHex
      ctx.fill()
      ctx.globalAlpha = 1.0
    })

    animId = requestAnimationFrame(render)
  }

  render()

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (animId) cancelAnimationFrame(animId)
  })
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
</style>  