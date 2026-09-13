<template>
  <footer class="relative w-full bg-black border-t border-zinc-800/80 pt-20 pb-12 overflow-hidden text-zinc-300">
    
    <!-- RENDER 3D DE FONDO CON MASCARA -->
    <div class="absolute inset-y-0 right-0 z-0 w-full sm:w-1/2 pointer-events-none select-none opacity-20 lg:opacity-30 flex items-end justify-end">
      <img 
        src="~/assets/img/fotofrente.png" 
        alt="Footer Accent" 
        class="h-full max-h-[500px] w-auto object-contain object-right-bottom filter brightness-75 drop-shadow-[0_0_50px_rgba(255,255,255,0.05)] [mask-image:linear-gradient(to_left,black_40%,transparent_100%)]"
      />
    </div>

    <div class="relative z-10 max-w-[1380px] mx-auto px-6 sm:px-12 space-y-16">
      
      <!-- GRID DE CONTENIDO CON MÁS ESPACIADO -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
        
        <!-- COLUMNA 1: BRANDING -->
        <div class="lg:col-span-5 space-y-6">
          <NuxtLink to="/" class="inline-flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-inner">
              <UIcon name="i-heroicons-trophy" class="w-6 h-6" />
            </div>
            <span class="font-['Rajdhani'] font-black text-3xl tracking-wider text-white uppercase">
              NEXUS<span class="text-zinc-500">ARENA</span>
            </span>
          </NuxtLink>

          <p class="text-base text-zinc-400 max-w-sm leading-relaxed font-normal">
            La plataforma definitiva para dominar en torneos competitivos de eSports. Compite y escala en el ranking.
          </p>
        </div>

        <!-- COLUMNA 2: JUEGOS -->
        <div class="lg:col-span-3 space-y-5">
          <h3 class="font-['Rajdhani'] font-extrabold text-white text-lg uppercase tracking-wider">
            Torneos
          </h3>
          <ul class="space-y-3 text-base">
            <li>
              <NuxtLink to="/valorant" class="hover:text-white transition-colors duration-200">
                Valorant
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/league-of-legends" class="hover:text-white transition-colors duration-200">
                League of Legends
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/rankings" class="hover:text-white transition-colors duration-200">
                Rankings Globales
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- COLUMNA 3: COMUNIDAD Y REDES -->
        <div class="lg:col-span-4 space-y-5">
          <h3 class="font-['Rajdhani'] font-extrabold text-white text-lg uppercase tracking-wider">
            Comunidad
          </h3>
          <p class="text-sm text-zinc-400">
            Únete a nuestros canales oficiales para enterarte de nuevos torneos y eventos.
          </p>

          <!-- Iconos Sociales Más Grandes -->
          <div class="flex items-center gap-4 pt-2">
            <a 
              href="https://discord.gg" 
              target="_blank" 
              rel="noopener"
              aria-label="Discord"
              class="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-500 hover:text-white flex items-center justify-center transition-all duration-300"
            >
              <UIcon name="i-simple-icons-discord" class="w-6 h-6" />
            </a>
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener"
              aria-label="Twitter X"
              class="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-500 hover:text-white flex items-center justify-center transition-all duration-300"
            >
              <UIcon name="i-simple-icons-x" class="w-6 h-6" />
            </a>
            <a 
              href="https://twitch.tv" 
              target="_blank" 
              rel="noopener"
              aria-label="Twitch"
              class="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-500 hover:text-white flex items-center justify-center transition-all duration-300"
            >
              <UIcon name="i-simple-icons-twitch" class="w-6 h-6" />
            </a>
          </div>
        </div>

      </div>

      <!-- COPYRIGHT Y PIE INFERIOR -->
      <div class="border-t border-zinc-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500 font-normal">
        <p>© 2026 Nexus Arena. Todos los derechos reservados.</p>
        <p class="text-xs text-zinc-600">
          No afiliado con Riot Games ni desarrolladores oficiales.
        </p>
      </div>

    </div>
  </footer>
</template>