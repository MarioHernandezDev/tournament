<template>
  <section ref="ctaSectionRef" class="relative w-full py-24 sm:py-36 overflow-hidden bg-black text-center">
    
    <!-- IMAGEN DE FONDO A PANTALLA COMPLETA CON OVERLAY -->
    <div class="absolute inset-0 z-0 select-none pointer-events-none">
      <AppImage 
        src="/img/fotofrente.png" 
        alt="CTA Background" 
        width="1536"
        height="1024"
        sizes="xs:1000px sm:1536px"
        densities="x1"
        quality="55"
        class="w-full h-full object-cover object-center filter brightness-30 contrast-125 scale-105 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
      />
      <!-- Gradientes neutros -->
      <div class="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      <div class="absolute inset-0 bg-radial from-transparent via-black/90 to-black" />
    </div>

    <!-- CANVAS PARA LA ANIMACIÓN (POR ENCIMA DEL FONDO Y GRADIENTES - VISIBLE) -->
    <div class="absolute inset-0 z-10 overflow-hidden pointer-events-none select-none">
      <canvas ref="ctaCanvas" class="w-full h-full block opacity-80"></canvas>
    </div>

    <!-- CONTENIDO CENTRAL DEL CTA -->
    <div class="relative z-20 max-w-4xl mx-auto px-6 sm:px-10 space-y-8">
      
      <!-- TITULAR IMPACTANTE EN ESCALA DE GRISES -->
      <div class="cta-header space-y-4">
        <h2 class="font-['Rajdhani'] text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
          Ven y disfruta en <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500">el ciber de Granada</span>
        </h2>

        <!-- DESCRIPCIÓN -->
        <p class="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Únete a la comunidad, juega con los mejores setups de la ciudad y vive el ambiente gamer, siempre con nosotros.
        </p>
      </div>

      <!-- BOTONES DE ACCIÓN (MONOCROMO) -->
      <div class="cta-actions flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">

        <!-- Botón Principal: Reservar PC -->
        <NuxtLink
          to="/instalaciones"
          class="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white hover:bg-zinc-200 text-black font-['Rajdhani'] font-black text-lg uppercase tracking-wider transition-all duration-300 shadow-xl shadow-white/10 w-full sm:w-auto"
        >
          <span>Reserva</span>
          <UIcon name="i-heroicons-arrow-right" class="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
        </NuxtLink>

        <!-- Botón WhatsApp -->
        <a
          href="https://wa.me/34600000000"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-['Rajdhani'] font-extrabold text-lg uppercase tracking-wider backdrop-blur-md hover:bg-emerald-500 hover:text-black hover:border-emerald-400 transition-all duration-300 w-full sm:w-auto"
        >
          <UIcon name="i-simple-icons-whatsapp" class="w-6 h-6" />
          <span>WhatsApp</span>
        </a>

        <!-- Botón Secundario Glass Neutro -->
        <a
          href="https://discord.gg"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-zinc-900/80 border border-zinc-700/80 text-zinc-200 font-['Rajdhani'] font-extrabold text-lg uppercase tracking-wider backdrop-blur-md hover:bg-zinc-800 hover:text-white hover:border-zinc-500 transition-all duration-300 w-full sm:w-auto"
        >
          <UIcon name="i-simple-icons-discord" class="w-6 h-6 text-zinc-300" />
          <span>Comunidad Discord</span>
        </a>

      </div>

      <!-- FORMULARIO DE CONTACTO (SOLO UI, SIN BACKEND) -->
      <div class="cta-form pt-14 max-w-xl mx-auto text-left">
        <div class="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 sm:backdrop-blur-md p-6 sm:p-8 space-y-5">
          <h3 class="font-['Rajdhani'] text-xl sm:text-2xl font-black uppercase tracking-wide text-white text-center">
            ¿Tienes dudas? Escríbenos
          </h3>

          <form class="space-y-4" @submit.prevent="handleContactSubmit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                v-model="contactForm.name"
                type="text"
                placeholder="Tu nombre"
                required
                class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              >
              <input
                v-model="contactForm.email"
                type="email"
                placeholder="Tu email"
                required
                class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              >
            </div>
            <textarea
              v-model="contactForm.message"
              rows="3"
              placeholder="Cuéntanos en qué podemos ayudarte..."
              required
              class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 resize-none"
            />

            <button
              type="submit"
              class="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-black font-['Rajdhani'] font-black text-sm uppercase tracking-wider transition-all"
            >
              <UIcon v-if="contactSent" name="i-heroicons-check-circle" class="w-4 h-4" />
              {{ contactSent ? 'Mensaje Enviado' : 'Enviar Mensaje' }}
            </button>
          </form>
        </div>
      </div>

    </div>

  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// TODO Supabase: sustituir por un INSERT en la tabla `contact_messages` (name, email, message, created_at)
const contactForm = reactive({ name: '', email: '', message: '' })
const contactSent = ref(false)

const handleContactSubmit = () => {
  contactSent.value = true
  contactForm.name = ''
  contactForm.email = ''
  contactForm.message = ''
  setTimeout(() => { contactSent.value = false }, 2500)
}

const ctaSectionRef = ref(null)
const ctaCanvas = ref(null)
let animationFrameId = null
let gsapCtx = null
let canvasObserver = null
let resizeTimer = null
let refreshTimer = null
let removeCanvasListeners = null
let isUnmounted = false

onMounted(async () => {
  // Inicialización del Canvas de partículas
  const canvas = ctaCanvas.value
  if (canvas) {
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const isMobile = width < 768
    const particleCount = isMobile ? 35 : 70
    const maxDistance = isMobile ? 110 : 140
    const maxDistanceSq = maxDistance * maxDistance
    const LINE_BUCKETS = 12
    const FRAME_MS = 1000 / 60
    const particles = []

    // El brillo (shadowBlur) es muy caro por frame: se pinta una vez en un sprite y se reutiliza
    const createSprite = (radius) => {
      const pad = 24
      const size = Math.ceil(radius * 2 + pad * 2)
      const sprite = document.createElement('canvas')
      sprite.width = sprite.height = size
      const sctx = sprite.getContext('2d')
      sctx.beginPath()
      sctx.arc(size / 2, size / 2, radius, 0, Math.PI * 2)
      sctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      sctx.shadowBlur = 10
      sctx.shadowColor = 'rgba(255, 255, 255, 1)'
      sctx.fill()
      return sprite
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.7
        this.vy = (Math.random() - 0.5) * 0.7
        this.radius = Math.random() * 2.2 + 1.2
        this.sprite = createSprite(this.radius)
        this.half = this.sprite.width / 2
      }

      update(step) {
        this.x += this.vx * step
        this.y += this.vy * step

        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1
      }

      draw() {
        ctx.drawImage(this.sprite, this.x - this.half, this.y - this.half)
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Las líneas se agrupan por transparencia: un solo trazo por grupo en vez de uno por línea
    const buckets = Array.from({ length: LINE_BUCKETS }, () => [])
    let lastTime = 0

    const animate = (time) => {
      animationFrameId = requestAnimationFrame(animate)

      const delta = time - lastTime
      if (delta < FRAME_MS - 2) return // máx. ~60fps aunque la pantalla sea de 120Hz
      lastTime = time
      const step = Math.min(delta, 50) / FRAME_MS

      ctx.clearRect(0, 0, width, height)
      for (let b = 0; b < LINE_BUCKETS; b++) buckets[b].length = 0

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.update(step)
        p.draw()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const distSq = dx * dx + dy * dy

          if (distSq < maxDistanceSq) {
            const strength = 1 - Math.sqrt(distSq) / maxDistance
            const bucket = Math.min(LINE_BUCKETS - 1, Math.floor(strength * LINE_BUCKETS))
            buckets[bucket].push(p.x, p.y, q.x, q.y)
          }
        }
      }

      ctx.lineWidth = 1.1
      for (let b = 0; b < LINE_BUCKETS; b++) {
        const lines = buckets[b]
        if (!lines.length) continue
        ctx.strokeStyle = `rgba(255, 255, 255, ${((b + 0.5) / LINE_BUCKETS) * 0.45})`
        ctx.beginPath()
        for (let k = 0; k < lines.length; k += 4) {
          ctx.moveTo(lines[k], lines[k + 1])
          ctx.lineTo(lines[k + 2], lines[k + 3])
        }
        ctx.stroke()
      }
    }

    const start = () => {
      if (animationFrameId) return
      lastTime = 0
      animationFrameId = requestAnimationFrame(animate)
    }

    const stop = () => {
      if (!animationFrameId) return
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }

    // El bucle solo corre mientras la sección es visible y la pestaña está activa
    let inView = false
    const syncLoop = () => (inView && !document.hidden ? start() : stop())

    canvasObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      syncLoop()
    })
    canvasObserver.observe(canvas)

    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        width = canvas.width = canvas.offsetWidth
        height = canvas.height = canvas.offsetHeight
      }, 150)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    document.addEventListener('visibilitychange', syncLoop)

    removeCanvasListeners = () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', syncLoop)
    }
  }

  // Animaciones de GSAP ScrollTrigger
  await nextTick()
  if (isUnmounted) return
  gsap.registerPlugin(ScrollTrigger)

  gsapCtx = gsap.context(() => {
    const createScrollAnimation = (targets, triggerTarget) => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: triggerTarget,
            start: 'top 88%',
            once: true
          }
        }
      )
    }

    createScrollAnimation('.cta-header', '.cta-header')
    createScrollAnimation('.cta-actions', '.cta-actions')
    createScrollAnimation('.cta-form', '.cta-form')

    refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

  }, ctaSectionRef.value)
})

onUnmounted(() => {
  isUnmounted = true
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (canvasObserver) canvasObserver.disconnect()
  if (removeCanvasListeners) removeCanvasListeners()
  clearTimeout(resizeTimer)
  clearTimeout(refreshTimer)
  if (gsapCtx) gsapCtx.revert()
})
</script>