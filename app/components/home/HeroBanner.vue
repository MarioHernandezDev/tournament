<template>
  <div ref="heroContainer" class="w-full space-y-6">
    
    <!-- HERO PRINCIPAL -->
    <section class="relative w-full h-auto min-h-[100dvh] sm:min-h-0 bg-zinc-950 overflow-hidden px-4 sm:px-12 lg:px-20 pt-28 sm:pt-6 pb-12 sm:pb-6 flex flex-col justify-between sm:block">
      
      <!-- 1. FOTO DE FONDO -->
      <div class="hero-bg absolute inset-0 z-0 pointer-events-none select-none">
        <img 
          src="/img/hero.jpg" 
          alt="Gaming Center Background" 
          class="w-full h-full object-cover object-center opacity-70 filter brightness-95 contrast-105 transition-all duration-700"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80"></div>
      </div>

      <!-- 2. AURA AMBIENTAL CIAN -->
      <div class="hero-aura absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[900px] h-[300px] sm:h-[400px] bg-cyan-500/20 blur-[100px] sm:blur-[160px] rounded-full pointer-events-none z-10"></div>

      <!-- 3. TEXTO COLOSAL "PROJECT" (Solo Desktop) -->
      <div class="absolute inset-0 z-10 hidden sm:flex items-center lg:items-start lg:pt-12 justify-center pointer-events-none select-none overflow-hidden">
        <h1 class="hero-project-text font-['Rajdhani'] font-black uppercase text-[25vw] sm:text-[28vw] lg:text-[32vw] leading-none tracking-tighter whitespace-nowrap text-cyan-400/[0.09] drop-shadow-[0_0_90px_rgba(34,211,238,0.2)]">
          PROJECT
        </h1>
      </div>

      <!-- 4. PERSONAJE (Render 3D) -->
      <div class="hero-character absolute inset-x-0 bottom-0 sm:relative z-10 w-full flex items-end justify-center pointer-events-none overflow-hidden h-[55vh] sm:h-auto transform-gpu will-change-transform">
        <img 
          src="~/assets/img/fotofrente.png" 
          alt="Gaming Player" 
          class="character-img h-full sm:h-auto w-auto sm:w-full object-cover object-bottom filter brightness-105 contrast-110 drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] transform-gpu"
        />
        <!-- Sombra en móvil para tapar el cuerpo y que el texto lea perfecto -->
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent sm:hidden"></div>
      </div>

      <!-- 5. CONTENIDO TEXTO + BOTÓN -->
      <div class="relative sm:absolute inset-x-0 sm:top-[35%] lg:top-[30%] z-30 max-w-[1500px] mx-auto px-2 sm:px-12 lg:px-20 w-full flex flex-col sm:flex-row items-center justify-between gap-8 pointer-events-none mt-auto sm:mt-0 pb-6 sm:pb-0">
        
        <!-- LADO IZQUIERDO: TEXTO Y BOTÓN -->
        <div class="max-w-xl w-full space-y-4 sm:space-y-5 text-center sm:text-left pointer-events-auto shrink-0">
          <h2 class="hero-text-item font-['Rajdhani'] text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95] drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
            La Experiencia <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500">
              Gaming
            </span>
          </h2>

          <p class="hero-text-item text-zinc-200 text-sm sm:text-lg font-light leading-relaxed max-w-md mx-auto sm:mx-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            El espacio de gaming preferido en Granada. Vive el máximo rendimiento con nuestra comunidad.
          </p>

          <div class="hero-text-item flex items-center justify-center sm:justify-start gap-3 pt-2">
            <NuxtLink
              to="/reservas"
              class="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-950 font-['Rajdhani'] font-black text-base sm:text-lg uppercase tracking-wider transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            >
              <span>Reservar PC</span>
              <UIcon name="i-heroicons-arrow-up-right" class="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </NuxtLink>
          </div>
        </div>

        <!-- LADO DERECHO: LOGO PARA PC -->
        <div class="hero-logo hidden sm:flex items-center justify-center sm:justify-end w-full sm:w-auto pointer-events-auto shrink-0">
          <img 
            src="/img/logo.webp" 
            alt="Project Gaming Logo" 
            class="w-72 sm:w-[420px] lg:w-[520px] max-w-none h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] opacity-95 hover:opacity-100 transition-all duration-300 hover:scale-105"
          />
        </div>

      </div>

    </section>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const heroContainer = ref(null)
let ctx

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {

    // TIMELINE DE ENTRADA AL CARGAR
    const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.8 } })

    tl.from('.hero-bg', { opacity: 0, duration: 1 })
      .from('.hero-aura', { opacity: 0, duration: 1.2 }, '-=0.8')
      .from('.hero-project-text', { opacity: 0, duration: 1.2 }, '-=1')
      // Animamos únicamente la opacidad de la imagen interna para evitar colisión con ScrollTrigger transform
      .from('.character-img', { opacity: 0, duration: 1, ease: 'power1.out' }, '-=1')
      
      // La columna izquierda aparece con stagger simple
      .from('.hero-text-item', { 
        opacity: 0, 
        y: 15, 
        stagger: 0.12,
        clearProps: 'all'
      }, '-=0.7')
      
      .from('.hero-logo', { opacity: 0, duration: 0.8 }, '-=0.5')

    // PARALLAX ULTRA-SUAVE (Acelerado por GPU)
    gsap.to('.hero-character', {
      y: 40,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: heroContainer.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5 // Añade un ligero amortiguamiento suave al hacer scroll
      }
    })

  }, heroContainer.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>