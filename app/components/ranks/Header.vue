<template>
  <header class="relative w-full  bg-zinc-950 pt-16 pb-20 sm:pt-20 sm:pb-24 overflow-hidden min-h-[460px] lg:min-h-[520px] flex items-end">
    
    <!-- ARTE DE FONDO CON TRANSICIÓN DE JUEGO -->
    <Transition name="fade" mode="out-in">
      <div :key="selectedGame" class="absolute inset-0 z-0">
        <img 
          :src="selectedGame === 'valorant' 
            ? 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80' 
            : 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1920&q=80'" 
          class="w-full h-full object-cover object-center opacity-15 scale-105 transition-all duration-1000 blur-sm"
          alt="Game Art Background"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>
    </Transition>

    <!-- TEXTO COLOSAL DE FONDO (EFECTO HERO PRINCIPAL) -->
    <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <h1 class="font-['Rajdhani'] font-black uppercase text-amber-500/[0.06] drop-shadow-[0_0_80px_rgba(251,191,36,0.1)] text-[22vw] sm:text-[25vw] lg:text-[28vw] leading-none tracking-tighter transition-all">
        RANKINGS
      </h1>
    </div>

    <!-- CANVAS INTERACTIVO: ESPIRAL DE PARTÍCULAS DORADAS -->
    <canvas 
      ref="canvasRef" 
      class="absolute inset-0 pointer-events-none z-10 w-full h-full opacity-60 mix-blend-screen"
    />

    <!-- AURA AMBIENTAL CENTRAL -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/15 blur-[160px] rounded-full pointer-events-none z-10" />

    <!-- CONTENIDO EN SEGUNDO PLANO (DELANTE DEL TEXTO COLOSAL Y ESPIRAL) -->
    <div class="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10">
      
      <!-- TITULAR Y DESCRIPCIÓN -->
      <div class="space-y-4 max-w-3xl">
        

        <h2 class="font-['Rajdhani'] text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none drop-shadow-2xl">
          HALL OF <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">LEGENDS</span>
        </h2>
        
        <p class="text-zinc-300 text-base sm:text-xl leading-relaxed font-light max-w-2xl">
          El Olimpo de los mejores jugadores. Consulta las escuadras dominantes y la élite que lidera la clasificación oficial.
        </p>
      </div>

      <!-- SELECTOR DE JUEGO (HUD VIP) -->
      <div class="flex items-center p-2 rounded-2xl bg-zinc-950/90 border border-amber-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(251,191,36,0.1)] shrink-0">
        <button
          @click="$emit('update:selectedGame', 'valorant')"
          class="flex items-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-['Rajdhani'] font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-300"
          :class="selectedGame === 'valorant' 
            ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-400/30 scale-105' 
            : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'"
        >
          <UIcon name="i-simple-icons-valorant" class="w-5 h-5" />
          <span>Valorant</span>
        </button>

        <button
          @click="$emit('update:selectedGame', 'lol')"
          class="flex items-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-['Rajdhani'] font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-300"
          :class="selectedGame === 'lol' 
            ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-400/30 scale-105' 
            : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'"
        >
          <UIcon name="i-simple-icons-leagueoflegends" class="w-5 h-5" />
          <span>League of Legends</span>
        </button>
      </div>

    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  selectedGame: {
    type: String,
    required: true
  }
})

defineEmits(['update:selectedGame'])

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
    const centerY = height * 0.5

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
      ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha})`
      ctx.shadowBlur = 10
      ctx.shadowColor = '#fbbf24'
      ctx.fill()
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