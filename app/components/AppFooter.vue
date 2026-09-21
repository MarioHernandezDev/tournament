<template>
  <footer ref="footerRef" class="relative w-full bg-zinc-950 border-t border-zinc-900 pt-20 pb-12 overflow-hidden text-zinc-300">
    
    <!-- ACCENTO DE FONDO Y GRADIENTE -->
    <div class="absolute inset-y-0 right-0 z-0 w-full sm:w-1/2 pointer-events-none select-none opacity-15 lg:opacity-25 flex items-end justify-end">
      <img 
        src="~/assets/img/fotofrente.png" 
        alt="Footer Accent" 
        class="h-full max-h-[480px] w-auto object-contain object-right-bottom filter brightness-75 drop-shadow-[0_0_50px_rgba(255,255,255,0.05)] [mask-image:linear-gradient(to_left,black_30%,transparent_100%)]"
      />
    </div>

    <div class="relative z-10 max-w-[1500px] mx-auto px-6 sm:px-12 space-y-16">
      
      <!-- GRID DE CONTENIDO -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
        
        <!-- COLUMNA 1: BRANDING & LOGO CIRCULAR -->
        <div class="footer-col lg:col-span-5 space-y-6">
          <NuxtLink to="/" class="inline-flex items-center gap-3.5 group">
            <div class="w-12 h-12 rounded-full bg-black flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img 
                src="/img/logo.png" 
                alt="Logo" 
                class="w-full h-full object-cover"
                @error="(e) => e.target.style.display = 'none'"
              />
            </div>
            <span class="font-['Rajdhani'] font-black text-3xl tracking-wider text-white uppercase">
              PROJECT<span class="text-zinc-500 group-hover:text-white transition-colors">GAMING</span>
            </span>
          </NuxtLink>

          <p class="text-base text-zinc-400 max-w-sm leading-relaxed font-light">
            El local gaming de referencia en Granada. Setups de alto rendimiento, ambiente único y todo lo que necesitas para jugar en serio.
          </p>
        </div>

        <!-- COLUMNA 2: NAVEGACIÓN -->
        <div class="footer-col lg:col-span-3 space-y-5">
          <h3 class="font-['Rajdhani'] font-extrabold text-white text-lg uppercase tracking-wider">
            Explora
          </h3>
          <ul class="space-y-3 font-['Rajdhani'] text-base font-bold uppercase tracking-wider">
            <li>
              <NuxtLink to="/" class="text-zinc-400 hover:text-white transition-colors duration-200">
                Inicio
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/instalaciones" class="text-zinc-400 hover:text-white transition-colors duration-200">
                Instalaciones
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/ranks" class="text-zinc-400 hover:text-white transition-colors duration-200">
                Rankings Globales
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- COLUMNA 3: COMUNIDAD Y REDES (PÍLDORAS) -->
        <div class="footer-col lg:col-span-4 space-y-5">
          <h3 class="font-['Rajdhani'] font-extrabold text-white text-lg uppercase tracking-wider">
            Comunidad
          </h3>
          <p class="text-sm text-zinc-400 font-light">
            Sigue nuestros canales oficiales para enterarte de promociones, eventos y novedades del local.
          </p>

          <!-- Iconos Sociales Circulares -->
          <div class="flex items-center gap-3 pt-2">
            <a 
              href="https://discord.gg" 
              target="_blank" 
              rel="noopener"
              aria-label="Discord"
              class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <UIcon name="i-simple-icons-discord" class="w-5 h-5" />
            </a>
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener"
              aria-label="Twitter X"
              class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-zinc-800 flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <UIcon name="i-simple-icons-x" class="w-5 h-5" />
            </a>
            <a 
              href="https://twitch.tv" 
              target="_blank" 
              rel="noopener"
              aria-label="Twitch"
              class="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <UIcon name="i-simple-icons-twitch" class="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>

      <!-- COPYRIGHT Y BARRA INFERIOR -->
      <div class="footer-col border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500 font-light">
        <p>© 2026 Project Gaming. Todos los derechos reservados.</p>
        <p class="text-xs text-zinc-600">
          Project Gaming no está avalado por Riot Games ni por desarrolladores oficiales.
        </p>
      </div>

    </div>
  </footer>
</template>

<script setup>
const footerRef = ref(null)

useScrollReveal(footerRef, ({ reveal, root }) => {
  reveal('.footer-col', root, { stagger: 0.1, start: 'top 92%' })
})
</script>
