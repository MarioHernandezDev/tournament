<template>
  <section class="relative w-full py-24 sm:py-36 overflow-hidden bg-black border-t border-zinc-800/60 text-center">
    
    <!-- IMAGEN DE FONDO A PANTALLA COMPLETA CON OVERLAY -->
    <div class="absolute inset-0 z-0 select-none pointer-events-none">
      <img 
        src="~/assets/img/fotofrente.png" 
        alt="CTA Background" 
        class="w-full h-full object-cover object-center filter brightness-40 contrast-125 scale-105 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
      />
      <!-- Gradientes neutros -->
      <div class="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
      <div class="absolute inset-0 bg-radial from-transparent via-black/80 to-black" />
    </div>

    <!-- CONTENIDO CENTRAL DEL CTA -->
    <div class="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 space-y-8">
      
      <!-- TITULAR IMPACTANTE EN ESCALA DE GRISES -->
      <h2 class="font-['Rajdhani'] text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
        Demuestra De Qué Estás Hecho En <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500">El Campo De Batalla</span>
      </h2>

      <!-- DESCRIPCIÓN -->
      <p class="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
        Únete a miles de jugadores, compite en torneos semanales con premios en metálico y escala en el ranking de la comunidad.
      </p>

      <!-- BOTONES DE ACCIÓN (MONOCROMO) -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
        
        <!-- Botón Principal Blanco -->
        <NuxtLink 
          to="/register" 
          class="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white hover:bg-zinc-200 text-black font-['Rajdhani'] font-black text-lg uppercase tracking-wider transition-all duration-300 shadow-xl shadow-white/10 w-full sm:w-auto"
        >
          <span>Unirme Ahora</span>
          <UIcon name="i-heroicons-arrow-right" class="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
        </NuxtLink>

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

    </div>

  </section>
</template>