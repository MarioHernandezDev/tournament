<template>
  <div class="w-full space-y-6">
    
    <!-- HERO PRINCIPAL MINIMALISTA -->
    <section class="relative w-full h-auto bg-zinc-950 overflow-hidden px-6 sm:px-12 lg:px-20 pt-6 pb-6 ">
      
      <!-- 1. FOTO DE FONDO -->
      <div class="absolute inset-0 z-0 pointer-events-none select-none">
        <img 
          src="/img/hero.jpg" 
          alt="Gaming Center Background" 
          class="w-full h-full object-cover object-center opacity-70 filter brightness-95 contrast-105 transition-all duration-700"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-transparent to-zinc-950/70"></div>
      </div>

      <!-- 2. AURA AMBIENTAL AZUL CIAN -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[400px] bg-cyan-500/20 blur-[160px] rounded-full pointer-events-none z-10"></div>

      <!-- 3. TEXTO COLOSAL "PROJECT" -->
      <div class="absolute inset-0 z-10 flex items-center lg:items-start lg:pt-12 justify-center pointer-events-none select-none overflow-hidden">
        <h1 class="font-['Rajdhani'] font-black uppercase text-[25vw] sm:text-[28vw] lg:text-[32vw] leading-none tracking-tighter whitespace-nowrap text-cyan-400/[0.09] drop-shadow-[0_0_90px_rgba(34,211,238,0.2)] transition-all">
          PROJECT
        </h1>
      </div>

      <!-- 4. PERSONAJE / RENDER 3D -->
      <div class="relative z-20 w-full flex items-end justify-center pointer-events-none overflow-hidden">
        <img 
          src="~/assets/img/fotofrente.png" 
          alt="Gaming Player" 
          class="w-full h-auto object-cover object-bottom filter brightness-105 contrast-110 drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] transition-transform duration-1000 ease-in-out"
        />
      </div>

      <!-- 6. CONTENIDO FLOTANTE (TEXTO Y BOTÓN IZQUIERDA) -->
      <div class="absolute inset-x-0 top-[50%] sm:top-[38%] lg:top-[32%] z-30 max-w-[1500px] mx-auto px-6 sm:px-12 lg:px-20 w-full flex items-end justify-between pointer-events-none">
        <div class="max-w-xl w-full space-y-5 text-center sm:text-left pointer-events-auto">
          <h2 class="font-['Rajdhani'] text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95] drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
            La Experiencia <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500">
              Gaming
            </span>
          </h2>

          <p class="text-zinc-200 text-base sm:text-lg font-light leading-relaxed max-w-md hidden sm:block drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            El espacio de gaming preferido en Granada. Vive el máximo rendimiento con nuestra comunidad.
          </p>

          <div class="flex items-center justify-center sm:justify-start gap-3 pt-2">
            <NuxtLink
              to="/instalaciones#ubicacion"
              class="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-950 font-['Rajdhani'] font-black text-lg uppercase tracking-wider transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
            >
              <span>Reservar PC</span>
              <UIcon name="i-heroicons-arrow-up-right" class="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </NuxtLink>
          </div>
        </div>
      </div>

    </section>

  </div>
</template>
