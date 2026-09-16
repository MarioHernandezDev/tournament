<template>
  <section class="relative w-full overflow-hidden bg-black pt-16 pb-20 lg:py-24 min-h-[640px] lg:min-h-[720px] flex items-center">
    
    <!-- CAPA 0 (z-0): CANVAS CON ANIMACIÓN DE PARTÍCULAS -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <canvas ref="heroCanvas" class="w-full h-full block opacity-60"></canvas>
    </div>

    <!-- CAPA 10 (z-10): TEXTO COLOSAL DE FONDO -->
    <div class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <h1 
        class="w-full text-center font-['Rajdhani'] font-black uppercase text-[20vw] sm:text-[22vw] lg:text-[24vw] leading-none tracking-tighter opacity-35 whitespace-nowrap transition-all"
        :class="bgTextGlowClass"
      >
        {{ bgText || title }}
      </h1>
    </div>

    <!-- CAPA 20 (z-20): PERSONAJE PNG (LIMPIO Y SIN CAPAS NEGRAS ENCIMA) -->
    <div class="absolute inset-y-0 right-0 z-20 w-full md:w-3/4 lg:w-3/5 pointer-events-none select-none overflow-hidden flex items-end justify-end">
      <img 
        :src="bgImage" 
        :alt="title" 
        class="h-full w-auto max-w-none object-contain object-bottom object-right filter brightness-105 contrast-105 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] scale-100 transition-transform duration-700"
      />
    </div>

    <!-- CAPA 30 (z-30): CONTENIDO PRINCIPAL (TEXTO Y BOTONES) -->
    <div class="relative z-30 max-w-[1380px] mx-auto w-full px-6 sm:px-10 lg:px-12">
      <div class="max-w-xl space-y-6">
        
        <!-- TITULAR E ICONO -->
        <div class="space-y-4">
          <h2 class="font-['Rajdhani'] text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none flex items-center gap-4 drop-shadow-2xl">
            <UIcon :name="iconName" :class="colorIconClass" />
            <span>{{ title }}</span>
          </h2>
          
          <p class="text-zinc-300 text-base sm:text-lg leading-relaxed font-normal max-w-lg drop-shadow-md">
            {{ description }}
          </p>
        </div>

        <!-- BOTONES DE ACCIÓN -->
        <div class="pt-2 flex flex-wrap items-center gap-4">
          <a 
            :href="secondaryButtonLink" 
            class="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-['Rajdhani'] font-black text-base uppercase tracking-wider text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 transition-all duration-300 shadow-lg backdrop-blur-md"
          >
            <UIcon name="i-heroicons-user-group" class="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            <span>{{ secondaryButtonText }}</span>
          </a>

          <NuxtLink 
            :to="buttonLink" 
            :class="buttonClass"
          >
            <UIcon name="i-heroicons-plus-circle" class="w-5 h-5" />
            <span>{{ buttonText }}</span>
          </NuxtLink>
        </div>

      </div>
    </div>

  </section>
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
  iconName: {
    type: String,
    default: 'i-heroicons-trophy'
  },
  bgImage: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    default: 'red',
    validator: (v) => ['red', 'blue', 'gold', 'emerald'].includes(v)
  },
  buttonText: {
    type: String,
    default: 'Crear Torneo'
  },
  buttonLink: {
    type: String,
    default: '/register'
  },
  secondaryButtonText: {
    type: String,
    default: 'Unirse a Torneo'
  },
  secondaryButtonLink: {
    type: String,
    default: '#torneos'
  }
})

// Brillo y color del texto colosal
const bgTextGlowClass = computed(() => {
  switch (props.theme) {
    case 'red': return 'text-red-500 drop-shadow-[0_0_80px_rgba(239,68,68,0.4)]'
    case 'blue': return 'text-cyan-400 drop-shadow-[0_0_80px_rgba(34,211,238,0.4)]'
    case 'gold': return 'text-amber-400 drop-shadow-[0_0_80px_rgba(251,191,36,0.4)]'
    default: return 'text-white'
  }
})

const colorIconClass = computed(() => {
  const base = 'w-10 h-10 sm:w-14 sm:h-14 shrink-0 '
  switch (props.theme) {
    case 'red': return base + 'text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]'
    case 'blue': return base + 'text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]'
    case 'gold': return base + 'text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]'
    default: return base + 'text-white'
  }
})

const buttonClass = computed(() => {
  const base = 'group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-["Rajdhani"] font-black text-base uppercase tracking-wider transition-all duration-300 shadow-xl '
  switch (props.theme) {
    case 'red': return base + 'bg-red-600 hover:bg-red-500 text-white shadow-red-600/25 hover:shadow-red-600/40'
    case 'blue': return base + 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-cyan-400/25 hover:shadow-cyan-400/40'
    case 'gold': return base + 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/25 hover:shadow-amber-400/40'
    default: return base + 'bg-white hover:bg-zinc-200 text-black shadow-white/10'
  }
})

// Canvas Partículas
const heroCanvas = ref(null)
let animationFrameId = null

onMounted(() => {
  const canvas = heroCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let width = (canvas.width = canvas.offsetWidth)
  let height = (canvas.height = canvas.offsetHeight)

  const particleCount = width < 768 ? 25 : 50
  const particles = []

  const particleColorMap = {
    red: 'rgba(239, 68, 68, ',
    blue: 'rgba(34, 211, 238, ',
    gold: 'rgba(251, 191, 36, '
  }
  const baseColor = particleColorMap[props.theme] || 'rgba(255, 255, 255, '

  class Particle {
    constructor() {
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.vx = (Math.random() - 0.5) * 0.4
      this.vy = -Math.random() * 0.5 - 0.2
      this.radius = Math.random() * 2 + 0.8
      this.alpha = Math.random() * 0.6 + 0.2
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.y < 0) {
        this.y = height
        this.x = Math.random() * width
      }
      if (this.x < 0 || this.x > width) this.vx *= -1
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = `${baseColor}${this.alpha})`
      ctx.fill()
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  const animate = () => {
    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
    }

    animationFrameId = requestAnimationFrame(animate)
  }

  animate()

  const handleResize = () => {
    if (!canvas) return
    width = canvas.width = canvas.offsetWidth
    height = canvas.height = canvas.offsetHeight
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
  })
})
</script>