<template>
  <section ref="arenaSectionRef" class="w-full relative overflow-hidden bg-zinc-950 border-t border-zinc-900 py-40 sm:py-56 lg:py-64">
    
    <!-- FOTO DE FONDO FULLWIDTH (Ambiente de la arena / Evento / Torneo) -->
    <div class="absolute inset-0 z-0">
      <AppImage 
        src="/img/lol-hero.png" 
        alt="Gaming Project Arena Community" 
        width="1920"
        height="1080"
        sizes="xs:1200px sm:1920px"
        densities="x1"
        quality="55"
        class="w-full h-full object-cover object-center filter brightness-50 contrast-125 scale-105"
      />
      <!-- Capas de degradado para integrarlo al tema negro eSports -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/80" />
      <div class="absolute inset-0 bg-black/40 sm:backdrop-blur-[2px]" />
    </div>

    <!-- Textura de cuadrícula sutil -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25 pointer-events-none z-0" />

    <!-- CONTENIDO CENTRALIZADO MONUMENTAL -->
    <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">

      <!-- TÍTULO MONUMENTAL -->
      <div class="arena-header space-y-4">
        <h2 class="font-['Rajdhani'] text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none">
          ÚNETE A LA ARENA
        </h2>
        <p class="text-zinc-300 max-w-xl mx-auto text-sm sm:text-base font-sans font-light leading-relaxed">
          Forma parte de la mayor comunidad gaming de Granada. Entérate de promociones, únete al Discord o echa un vistazo al ambiente en nuestro Instagram.
        </p>
      </div>

      <!-- BOTONES DE ACCIÓN (INSTAGRAM & DISCORD) -->
      <div class="arena-buttons flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        
        <!-- BOTÓN INSTAGRAM -->
        <a 
          href="https://www.instagram.com/gamingproject.es/" 
          target="_blank" 
          rel="noopener"
          class="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-['Rajdhani'] font-black text-sm uppercase tracking-wider hover:bg-gradient-to-r hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white transition-all duration-300 shadow-2xl"
        >
          <div class="w-6 h-6 rounded-full bg-black/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
            <UIcon name="i-simple-icons-instagram" class="w-3.5 h-3.5" />
          </div>
          <span>INSTAGRAM @gamingproject.es</span>
          <span class="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">&nearr;</span>
        </a>

        <!-- BOTÓN DISCORD -->
        <a 
          href="https://discord.gg/gamingproject" 
          target="_blank" 
          rel="noopener"
          class="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-zinc-900/80 border border-zinc-700/80 text-white font-['Rajdhani'] font-black text-sm uppercase tracking-wider hover:bg-indigo-600 hover:border-indigo-500 backdrop-blur-md transition-all duration-300 shadow-2xl"
        >
          <div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <UIcon name="i-simple-icons-discord" class="w-3.5 h-3.5" />
          </div>
          <span>SERVIDOR DE DISCORD</span>
          <span class="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">&nearr;</span>
        </a>

      </div>

    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const arenaSectionRef = ref(null)
let ctx
let refreshTimer

onMounted(async () => {
  await nextTick()

  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    const createScrollAnimation = (targets, triggerTarget) => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: triggerTarget,
            start: 'top 88%',
            once: true
          }
        }
      )
    }

    createScrollAnimation('.arena-header', '.arena-header')
    createScrollAnimation('.arena-buttons', '.arena-buttons')

    refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

  }, arenaSectionRef.value)
})

onUnmounted(() => {
  clearTimeout(refreshTimer)
  if (ctx) ctx.revert()
})
</script>