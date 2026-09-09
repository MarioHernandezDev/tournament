<template>
  <section class="w-full bg-black overflow-hidden pt-16 sm:pt-24">
    
    <!-- GRID 100% ANCHO (EDGE-TO-EDGE) SIN ESPACIOS -->
    <div class="grid grid-cols-1 md:grid-cols-2 w-full">
      
      <!-- BLOQUE 1: VALORANT -->
      <NuxtLink 
        to="/valorant"
        class="group relative w-full h-[450px] sm:h-[550px] lg:h-[650px] overflow-hidden text-left block"
      >
        <!-- Imagen a pantalla completa -->
        <img 
          src="~/assets/img/imagenvalorant.webp" 
          alt="Valorant League" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 contrast-110"
        />
        
        <!-- Degradado inferior constante y overlay al hacer hover -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 transition-opacity" />
        <div class="absolute inset-0 bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <!-- Capa Superpuesta con Contenido -->
        <div class="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end items-start z-10">

          <!-- Botón e Información Inferior -->
          <div class="w-full flex items-end justify-between gap-4 pt-6 border-t border-white/10 backdrop-blur-sm">
            <div class="space-y-1">
              <h3 class="font-['Rajdhani'] text-3xl sm:text-5xl font-black text-white uppercase group-hover:text-red-400 transition-colors">
                Valorant
              </h3>
            </div>

            <!-- Botón Píldora Elegante -->
            <span class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-red-500/20 border border-red-500/50 text-red-400 font-['Rajdhani'] font-extrabold text-sm uppercase tracking-wider backdrop-blur-md group-hover:bg-red-500 group-hover:text-white transition-all shadow-xl shadow-red-500/20 shrink-0">
              <span>Ver Torneos</span>
              <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>

        </div>
      </NuxtLink>

      <!-- BLOQUE 2: LEAGUE OF LEGENDS -->
      <NuxtLink 
        to="/lol"
        class="group relative w-full h-[450px] sm:h-[550px] lg:h-[650px] overflow-hidden text-left block"
      >
        <!-- Imagen a pantalla completa -->
        <img 
          src="~/assets/img/imagenlol.webp" 
          alt="League of Legends" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 contrast-110"
        />
        
        <!-- Degradado inferior constante y overlay al hacer hover -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 transition-opacity" />
        <div class="absolute inset-0 bg-cyan-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <!-- Capa Superpuesta con Contenido -->
        <div class="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end items-start z-10">

          <!-- Botón e Información Inferior -->
          <div class="w-full flex items-end justify-between gap-4 pt-6 border-t border-white/10 backdrop-blur-sm">
            <div class="space-y-1">
              <h3 class="font-['Rajdhani'] text-3xl sm:text-5xl font-black text-white uppercase group-hover:text-cyan-400 transition-colors">
                League of Legends
              </h3>
            </div>

            <!-- Botón Píldora Elegante -->
            <span class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-['Rajdhani'] font-extrabold text-sm uppercase tracking-wider backdrop-blur-md group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-all shadow-xl shadow-cyan-500/20 shrink-0">
              <span>Ver Torneos</span>
              <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>

        </div>
      </NuxtLink>

    </div>

  </section>
</template>