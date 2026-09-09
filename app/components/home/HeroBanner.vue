<template>
  <div class="w-full space-y-6">
    
    <!-- CANVAS PRINCIPAL FULLWIDTH -->
    <section class="relative w-full min-h-[620px] sm:min-h-[700px] bg-gradient-to-b from-sky-950/30 via-slate-950 to-slate-950 border-b border-slate-800/80 overflow-hidden px-6 sm:px-12 lg:px-20 pt-6 pb-10 flex flex-col justify-between">
      
     

      <!-- TEXTO MASIVO DE FONDO -->
      <div class="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 class="font-['Rajdhani'] font-black uppercase text-slate-800/35 text-[26vw] leading-none tracking-tighter">
          GAMING
        </h1>
      </div>

      <!-- PERSONAJE / RENDER 3D RECORTADO -->
      <div class="absolute inset-x-0 bottom-0 z-10 h-[88%] sm:h-[94%] flex items-end justify-center pointer-events-none">
        <img 
          src="~/assets/img/fotofrente.png" 
          alt="Gaming Player" 
          class="h-full object-contain object-bottom filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
        />
      </div>

      <!-- CONTENIDO FLOTANTE INFERIOR -->
      <div class="relative z-20 mt-auto max-w-[1500px] mx-auto w-full flex items-end justify-between">
        
        <div class="max-w-sm space-y-4 text-left">
          <h2 class="font-['Rajdhani'] text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
            Compite y Domina <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400">
              Los Torneos
            </span>
          </h2>

          <div class="flex items-center gap-3 pt-2">
            <UButton 
              to="/valorant" 
              size="lg" 
              color="cyan" 
              class="rounded-full font-bold font-['Rajdhani'] uppercase tracking-wider shadow-lg shadow-cyan-500/20 px-8 py-3"
              icon="i-heroicons-arrow-up-right"
              trailing
            >
              Crear Torneo
            </UButton>
          </div>
        </div>

        <!-- WIDGET FLOTANTE DERECHO (Formato Píldora Gigante Horizontal) -->
        <div class="hidden lg:flex items-center gap-4 bg-slate-900/90 backdrop-blur-md border border-slate-800/80 p-2.5 pr-6 rounded-full shadow-2xl">
          <div class="w-11 h-11 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <UIcon name="i-heroicons-trophy" class="w-5 h-5" />
          </div>
          <div class="text-left">
            <p class="font-['Rajdhani'] font-bold text-sm text-slate-100 leading-tight">Copa Valorant #4</p>
            <p class="text-[10px] text-slate-400 font-mono">Bolsa: $500 RP/VP</p>
          </div>
          <UButton to="/valorant" color="cyan" variant="soft" size="xs" class="rounded-full font-bold px-4 ml-2">
            Ver Bracket
          </UButton>
        </div>

      </div>

    </section>

    <!-- BANDA INFERIOR EDITORIAL (Encuadrada y redondeada estilo Píldora) -->
    <div class="max-w-[1380px] mx-auto px-4 sm:px-6">
      <section class="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        <!-- Bloque Izquierdo: Social Proof en formato Píldora -->
        <div class="md:col-span-5 lg:col-span-4 bg-slate-900 border border-slate-800/80 rounded-full py-4 px-6 flex items-center justify-between shadow-md">
          <div class="flex -space-x-2.5">
            <span class="w-9 h-9 rounded-full border-2 border-slate-900 bg-red-500 flex items-center justify-center text-xs font-bold text-white shadow">V</span>
            <span class="w-9 h-9 rounded-full border-2 border-slate-900 bg-cyan-500 flex items-center justify-center text-xs font-bold text-white shadow">L</span>
            <span class="w-9 h-9 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-mono text-slate-300 font-bold">+50</span>
          </div>
          <div class="text-right">
            <p class="text-[11px] font-mono text-slate-400 uppercase">Organizaciones</p>
            <p class="font-['Rajdhani'] font-bold text-slate-200 text-sm">Verificadas</p>
          </div>
        </div>

        <!-- Bloque Derecho: Descripción en Píldora -->
        <div class="md:col-span-7 lg:col-span-8 bg-slate-900/60 border border-slate-800/80 rounded-3xl md:rounded-full py-4 px-8 flex items-center">
          <p class="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal text-left">
            Explora el ecosistema de torneos eSports clasificados por disciplina, modalidades únicas, seguimiento de brackets en vivo e historial competitivo sin complicaciones.
          </p>
        </div>

      </section>
    </div>

  </div>
</template>