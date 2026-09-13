<template>
  <section class="relative w-full overflow-hidden bg-black border-b border-zinc-800/80 pt-12 pb-16 lg:py-20 min-h-[500px] lg:min-h-[580px] flex items-center">
    
    <!-- CANVAS CON ANIMACIÓN DE PARTÍCULAS -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <canvas ref="heroCanvas" class="w-full h-full block opacity-60"></canvas>
    </div>

    <!-- ILUSTRACIÓN / RENDER 3D (MÁS VISIBLE Y MÁS GRANDE) -->
    <div class="absolute inset-y-0 right-0 z-10 w-full md:w-4/5 lg:w-2/3 pointer-events-none select-none overflow-hidden flex items-center justify-end">
      <img 
        :src="bgImage" 
        :alt="title" 
        class="h-full w-auto max-w-none object-contain object-right filter brightness-105 contrast-110 drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] [mask-image:linear-gradient(to_left,black_70%,transparent_100%)] scale-110 translate-x-6 sm:translate-x-0 transition-transform duration-700"
      />
      <!-- Degradados suaves para integrarlo con el fondo sin opacar el personaje -->
      <div class="absolute inset-0 bg-gradient-to-r from-black via-black/60 sm:via-black/30 to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
    </div>

    <!-- CONTENIDO DEL MINIHERO -->
    <div class="relative z-20 max-w-[1380px] mx-auto w-full px-6 sm:px-10 lg:px-12">
      <div class="max-w-xl space-y-6">
        
        <!-- TAG BADGE CATEGORÍA -->

        <!-- TITULAR E ICONO -->
        <div class="space-y-4">
          <h1 class="font-['Rajdhani'] text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none flex items-center gap-4">
            <UIcon :name="iconName" :class="colorIconClass" />
            <span>{{ title }}</span>
          </h1>
          
          <p class="text-zinc-300 text-base sm:text-lg leading-relaxed font-normal max-w-lg">
            {{ description }}
          </p>
        </div>

        <!-- BOTONES DE ACCIÓN (CREAR Y UNIRSE) -->
        <div class="pt-2 flex flex-wrap items-center gap-4">
          
          <!-- Botón Secundario: Unirse a Torneo -->
          <a 
            :href="secondaryButtonLink" 
            class="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-['Rajdhani'] font-black text-base uppercase tracking-wider text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 transition-all duration-300 shadow-lg backdrop-blur-md"
          >
            <UIcon name="i-heroicons-user-group" class="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            <span>{{ secondaryButtonText }}</span>
          </a>

          <!-- Botón Principal: Crear Torneo -->
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

// Animación de partículas Canvas
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