<template>
  <section class="w-full relative bg-zinc-950  overflow-hidden">
    
    <!-- CONTENEDOR DEL MAPA FULLWIDTH EN BLANCO -->
    <div class="w-full h-[450px] sm:h-[700px] relative">
      <iframe
        :src="location.mapEmbedUrl"
        class="w-full h-full"
        style="border:0;"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Ubicación Gaming Project"
      />

      <!-- GRADIENTES DE INTEGRACIÓN EN BORDES SUPERIOR E INFERIOR -->
      <div class="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none" />
      <div class="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

      <!-- TARJETA FLOTANTE DE CONTACTO -->
      <div class="absolute bottom-6 left-4 right-4 sm:left-8 sm:right-auto sm:max-w-md z-10">
        <div class="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl shadow-2xl space-y-5">
          
          <div class="space-y-1">
            <span class="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
              Ubicación de la Arena
            </span>
            <h3 class="font-['Rajdhani'] text-2xl font-black uppercase text-white leading-none">
              Cómo Llegar
            </h3>
          </div>

          <div class="space-y-4 text-sm border-t border-zinc-900 pt-4">
            
            <!-- DIRECCIÓN -->
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-white shrink-0 mt-0.5" />
              <div>
                <p class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Dirección</p>
                <p class="text-zinc-200 font-medium">{{ location.address }}</p>
              </div>
            </div>

            <!-- HORARIO -->
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-clock" class="w-5 h-5 text-white shrink-0 mt-0.5" />
              <div>
                <p class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Horario</p>
                <p class="text-zinc-200 font-medium">{{ location.shortHours }}</p>
              </div>
            </div>

            <!-- TELÉFONO -->
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-phone" class="w-5 h-5 text-white shrink-0 mt-0.5" />
              <div>
                <p class="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Teléfono / WhatsApp</p>
                <p class="text-zinc-200 font-medium">{{ location.phone }}</p>
              </div>
            </div>

          </div>

          <!-- BOTÓN GOOGLE MAPS -->
          <a
            :href="`https://maps.google.com/?q=${encodeURIComponent(location.address)}`"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center gap-2 w-full py-3 bg-white text-black font-['Rajdhani'] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-zinc-200 transition-colors shadow-lg"
          >
            <span>Abrir en Google Maps</span>
            <span class="text-sm">&nearr;</span>
          </a>

        </div>
      </div>

    </div>

  </section>
</template>

<script setup>
const { location } = useInstallations()
</script>