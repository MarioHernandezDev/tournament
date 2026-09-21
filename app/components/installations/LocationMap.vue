<template>
  <section ref="sectionRef" class="w-full relative bg-zinc-950 m-0 p-0 overflow-hidden">
    
    <!-- CONTENEDOR DEL MAPA EN MODO DARK REAL -->
    <div class="w-full h-[450px] sm:h-[700px] relative overflow-hidden bg-black">
      <iframe
        :src="location.mapEmbedUrl"
        class="w-full h-full filter invert drop-shadow-md hue-rotate-180 contrast-125 brightness-75 saturate-50"
        style="border:0;"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Ubicación Gaming Project"
      />

      <!-- GRADIENTES DE INTEGRACIÓN (El superior conecta 100% con la sección anterior) -->
      <div class="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none" />
      <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent pointer-events-none" />

      <!-- TARJETA FLOTANTE -->
      <div class="map-card absolute bottom-6 left-4 right-4 sm:left-8 sm:right-auto sm:max-w-md z-10">
        <div class="bg-zinc-950/90 border border-zinc-800 p-6 rounded-2xl shadow-2xl sm:backdrop-blur-md space-y-5">
          
          <div class="space-y-1">
            <span class="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
              UBICACIÓN DE LA ARENA
            </span>
            <h3 class="font-['Rajdhani'] text-2xl font-black uppercase text-white leading-none">
              Cómo Llegar
            </h3>
          </div>

          <div class="space-y-4 text-sm border-t border-zinc-900 pt-4">
            
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Dirección</p>
                <p class="text-zinc-200 font-medium">{{ location.address }}</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-clock" class="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Horario</p>
                <p class="text-zinc-200 font-medium">{{ location.shortHours }}</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-phone" class="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Teléfono / WhatsApp</p>
                <p class="text-zinc-200 font-medium">{{ location.phone }}</p>
              </div>
            </div>

          </div>

          <a
            :href="`https://maps.google.com/?q=${encodeURIComponent(location.address)}`"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 hover:bg-cyan-400 text-zinc-100 hover:text-zinc-950 border border-zinc-800 hover:border-cyan-400 font-['Rajdhani'] font-black text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-lg group"
          >
            <span>Abrir en Google Maps</span>
            <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

        </div>
      </div>

    </div>

  </section>
</template>

<script setup>
const { location } = useInstallations()

const sectionRef = ref(null)

useScrollReveal(sectionRef, ({ reveal }) => {
  reveal('.map-card', '.map-card', { start: 'top 95%' })
})
</script>