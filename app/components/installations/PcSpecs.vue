<template>
  <section class="space-y-10 py-6 w-full">


    <!-- CARDS EXPANDIDAS AL MÁXIMO ANCHO -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      
      <!-- CARD 1: SETUPS PC -->
      <div 
        class="group relative h-[520px] bg-zinc-950 border border-zinc-800/80 overflow-hidden flex flex-col justify-end p-8 transition-all duration-500 hover:-translate-y-2 hover:border-zinc-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] cursor-pointer select-none"
      >
        <!-- FOTO TRANSPARENTE EN PARTE SUPERIOR -->
        <img 
          src="/img/ezreal.png" 
          alt="Setups PC" 
          class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        <!-- OVERLAY: TRANSPARENTE ARRIBA, OSCURO SOLO ABAJO -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-40% to-transparent" />

        <!-- CONTENIDO MINIMALISTA -->
        <div class="relative z-10 space-y-3">

          <h3 class="font-['Rajdhani'] text-3xl sm:text-4xl font-black uppercase text-white leading-tight">
            Ordenadores Gaming
          </h3>
          <p class="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed line-clamp-2">
            Puestos individuales optimizados para máxima tasa de refresco y respuesta inmediata.
          </p>
        </div>
      </div>

      <!-- CARD 2: PERIFÉRICOS ARENA -->
      <div 
        class="group relative h-[520px] bg-zinc-950 border border-zinc-800/80 overflow-hidden flex flex-col justify-end p-8 transition-all duration-500 hover:-translate-y-2 hover:border-zinc-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] cursor-pointer select-none"
      >
        <!-- FOTO TRANSPARENTE EN PARTE SUPERIOR -->
        <img 
          src="/img/chamber.png" 
          alt="Periféricos Arena" 
          class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        <!-- OVERLAY: TRANSPARENTE ARRIBA, OSCURO SOLO ABAJO -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-40% to-transparent" />

        <!-- CONTENIDO MINIMALISTA -->
        <div class="relative z-10 space-y-3">

          <h3 class="font-['Rajdhani'] text-3xl sm:text-4xl font-black uppercase text-white leading-tight">
            Periféricos GAMING
          </h3>
          <p class="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed line-clamp-2">
            Pantallas de alta frecuencia e instrumental mecánico para eSports de primer nivel.
          </p>
        </div>
      </div>

      <!-- CARD 3: SALA VIP -->
      <div 
        class="group relative h-[520px] bg-zinc-950 border border-zinc-800/80 overflow-hidden flex flex-col justify-end p-8 transition-all duration-500 hover:-translate-y-2 hover:border-zinc-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] cursor-pointer select-none"
      >
        <!-- FOTO TRANSPARENTE EN PARTE SUPERIOR -->
        <img 
          src="/img/valorant-hero.png" 
          alt="Sala VIP" 
          class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        <!-- OVERLAY: TRANSPARENTE ARRIBA, OSCURO SOLO ABAJO -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-40% to-transparent" />

        <!-- CONTENIDO MINIMALISTA -->
        <div class="relative z-10 space-y-3">

          <h3 class="font-['Rajdhani'] text-3xl sm:text-4xl font-black uppercase text-white leading-tight">
            Sala VIP
          </h3>
          <p class="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed line-clamp-2">
            Privacidad total, máxima tasa de refresco y acondicionamiento pro para creadores.
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
// No requiere lógica extra
</script>