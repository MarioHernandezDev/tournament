<template>
  <canvas 
    ref="canvasRef" 
    class="pointer-events-none fixed inset-0 z-0 w-full h-full block"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // Permite cambiar el esquema de color según la vista
  theme: {
    type: String,
    default: 'gold',
    validator: (v) => ['gold', 'red', 'blue', 'emerald'].includes(v)
  }
})

const canvasRef = ref(null)
let animationFrameId = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)

  // Mapeo de paletas estilo Hero
  const themeRgbMap = {
    gold: '251, 191, 36',
    red: '239, 68, 68',
    blue: '34, 211, 238',
    emerald: '16, 185, 129'
  }
  const baseColor = themeRgbMap[props.theme] || '251, 191, 36'

  // Cantidad adaptativa según el tamaño de la pantalla
  const particleCount = width < 768 ? 40 : 85
  const particles = []

  // Clase Partícula con la física exacta del Hero (Flujo vertical continuo + deriva horizontal)
  class Particle {
    constructor() {
      this.reset(true)
    }

    reset(initial = false) {
      this.x = Math.random() * width
      this.y = initial ? Math.random() * height : height + 10
      this.vx = (Math.random() - 0.5) * 0.4
      this.vy = -Math.random() * 0.6 - 0.2 // Ascenso constante
      this.radius = Math.random() * 2.2 + 0.8
      this.alpha = Math.random() * 0.6 + 0.2
      this.pulseSpeed = Math.random() * 0.015 + 0.005
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      // Variación sutil de opacidad (parpadeo elegante)
      this.alpha += Math.sin(Date.now() * this.pulseSpeed) * 0.005

      // Si sale de la pantalla superior o laterales, reaparece abajo
      if (this.y < -10) {
        this.reset(false)
      }
      if (this.x < -10 || this.x > width + 10) {
        this.vx *= -1
      }
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      
      // Brillo ambiental tipo Hero
      ctx.fillStyle = `rgba(${baseColor}, ${Math.max(0, Math.min(1, this.alpha))})`
      ctx.shadowBlur = 8
      ctx.shadowColor = `rgba(${baseColor}, 0.6)`
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }

  // Inicializar el grupo de partículas
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  // Bucle de animación optimizado
  const animate = () => {
    // Limpieza suave en cada frame
    ctx.clearRect(0, 0, width, height)

    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
    }

    animationFrameId = requestAnimationFrame(animate)
  }

  animate()

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
  })
})
</script>