<template>
  <section class="relative w-full py-24 sm:py-36 overflow-hidden bg-black  text-center">
    
    <!-- IMAGEN DE FONDO A PANTALLA COMPLETA CON OVERLAY -->
    <div class="absolute inset-0 z-0 select-none pointer-events-none">
      <img 
        src="~/assets/img/fotofrente.png" 
        alt="CTA Background" 
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
      <h2 class="font-['Rajdhani'] text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
        Ven y disfruta en <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500">el ciber de Granada</span>
      </h2>

      <!-- DESCRIPCIÓN -->
      <p class="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
        Únete a la comunidad, juega con los mejores setups de la ciudad y vive el ambiente gamer, siempre con nosotros.
      </p>

      <!-- BOTONES DE ACCIÓN (MONOCROMO) -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">

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
      <div class="pt-14 max-w-xl mx-auto text-left">
        <div class="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md p-6 sm:p-8 space-y-5">
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
import { ref, reactive, onMounted, onUnmounted } from 'vue'

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

const ctaCanvas = ref(null)
let animationFrameId = null

onMounted(() => {
  const canvas = ctaCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  let width = (canvas.width = canvas.offsetWidth)
  let height = (canvas.height = canvas.offsetHeight)

  // Configuración de red táctica de partículas
  const particleCount = width < 768 ? 35 : 70
  const particles = []
  const maxDistance = 140

  class Particle {
    constructor() {
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.vx = (Math.random() - 0.5) * 0.7
      this.vy = (Math.random() - 0.5) * 0.7
      this.radius = Math.random() * 2.2 + 1.2
    }

    update() {
      this.x += this.vx
      this.y += this.vy

      if (this.x < 0 || this.x > width) this.vx *= -1
      if (this.y < 0 || this.y > height) this.vy *= -1
    }

    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.shadowBlur = 10
      ctx.shadowColor = 'rgba(255, 255, 255, 1)'
      ctx.fill()
      ctx.shadowBlur = 0
    }
  }

  // Inicializar partículas
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle())
  }

  const animate = () => {
    ctx.clearRect(0, 0, width, height)

    // Dibujar líneas conectoras
    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.45
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.lineWidth = 1.1
          ctx.stroke()
        }
      }
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