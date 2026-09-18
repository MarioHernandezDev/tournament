<template>
  <section class="relative w-full bg-black text-zinc-100 font-sans overflow-hidden py-24 sm:py-28 lg:py-32 px-6 sm:px-12 lg:px-20">
    
    <!-- TRIÁNGULO EN DIAGONAL COMPLETO DE FONDO -->
    <div 
      class="absolute inset-0 pointer-events-none z-0 bg-gradient-to-bl from-zinc-800/80 via-zinc-900/50 to-zinc-900/20"
      style="clip-path: polygon(100% 0, 100% 100%, 0 100%);"
    />

    <div class="relative z-10 w-full max-w-[1500px] mx-auto space-y-16 sm:space-y-20">

      <!-- ENCABEZADO DE SECCIÓN -->
      <div class="flex flex-col items-start space-y-4 border-l-2 border-cyan-400 pl-6 sm:pl-8">

        <h2 class="font-['Rajdhani'] text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
          EQUIPAMIENTO DE ALTA GAMA
        </h2>
      </div>

      <!-- GRID CON EFECTO FLIP -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
        
        <div 
          v-for="card in cards" 
          :key="card.id"
          class="h-[580px] sm:h-[640px] lg:h-[700px] [perspective:1000px] cursor-pointer select-none"
          @click="toggleCard(card.id)"
        >
          <div 
            class="relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform"
            :class="{ '[transform:rotateY(180deg)]': flippedCards.includes(card.id) }"
          >
            <!-- ================= FRENTE DE LA CARD ================= -->
            <div 
              class="absolute inset-0 w-full h-full bg-zinc-950/90 border border-zinc-800/80 overflow-hidden flex flex-col justify-end p-8 sm:p-10 [backface-visibility:hidden] hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(34,211,238,0.1)] transition-all duration-300"
            >
              <img 
                :src="card.image" 
                :alt="card.title" 
                class="absolute inset-0 w-full h-full object-cover object-center"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-40% to-transparent" />

              <div class="relative z-10 space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="font-['Rajdhani'] text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white leading-tight">
                    {{ card.title }}
                  </h3>
                  <div class="w-8 h-8 rounded-full bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shrink-0">
                    <UIcon name="i-heroicons-arrow-path" class="w-4 h-4" />
                  </div>
                </div>
                <p class="text-sm sm:text-base text-zinc-300 font-light leading-relaxed line-clamp-3">
                  {{ card.description }}
                </p>
              </div>
            </div>

            <!-- ================= REVERSO DE LA CARD (SPECS) ================= -->
            <div 
              class="absolute inset-0 w-full h-full bg-zinc-950 border border-cyan-500/50 p-8 sm:p-10 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >
              <!-- Línea estética superior -->
              <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400" />

              <div class="space-y-6">
                <div class="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <h4 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase text-cyan-400">
                    ESPECIFICACIONES
                  </h4>
                  <span class="text-xs font-mono text-zinc-500">VOLVER ↺</span>
                </div>

                <ul class="space-y-4 font-mono text-xs sm:text-sm">
                  <li 
                    v-for="(spec, index) in card.specs" 
                    :key="index"
                    class="flex flex-col border-b border-zinc-900 pb-2"
                  >
                    <span class="text-zinc-500 text-[10px] uppercase tracking-wider">{{ spec.label }}</span>
                    <span class="text-zinc-100 font-semibold">{{ spec.value }}</span>
                  </li>
                </ul>
              </div>

              <div class="pt-4 border-t border-zinc-900 flex items-center justify-between text-zinc-400 text-xs font-mono">
                <span>PROJECT GAMING</span>
                <span class="text-cyan-400">PRO-GEAR</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- ================= BOTÓN CTA DE RESERVAS ================= -->
      <div class="flex justify-center pt-4">
        <NuxtLink
          to="/reservas"
          class="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-950 font-['Rajdhani'] font-black text-lg uppercase tracking-wider transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:-translate-y-1 active:translate-y-0"
        >
          <span>Reservar tu Puesto</span>
          <UIcon 
            name="i-heroicons-arrow-up-right" 
            class="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
          />
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const flippedCards = ref([])

const toggleCard = (id) => {
  if (flippedCards.value.includes(id)) {
    flippedCards.value = flippedCards.value.filter(cardId => cardId !== id)
  } else {
    flippedCards.value.push(id)
  }
}

const cards = ref([
  {
    id: 'pc',
    title: 'Ordenadores Gaming',
    description: 'Puestos individuales optimizados para máxima tasa de refresco y respuesta inmediata.',
    image: '/img/ezreal.png',
    specs: [
      { label: 'Procesador', value: 'Intel Core i9-14900K' },
      { label: 'Tarjeta Gráfica', value: 'NVIDIA RTX 4080 Super 16GB' },
      { label: 'Memoria RAM', value: '32GB DDR5 6000MHz Corsair' },
      { label: 'Almacenamiento', value: '2TB NVMe M.2 Gen4 (7000 MB/s)' },
      { label: 'Refrigeración', value: 'Líquida 360mm ARGB' }
    ]
  },
  {
    id: 'perifericos',
    title: 'Periféricos GAMING',
    description: 'Pantallas de alta frecuencia e instrumental mecánico para eSports de primer nivel.',
    image: '/img/chamber.png',
    specs: [
      { label: 'Monitores', value: 'ZOWIE XL2566K 360Hz DyAc⁺' },
      { label: 'Teclados', value: 'Wooting 60HE Analógico Magnético' },
      { label: 'Ratones', value: 'Logitech G Pro X Superlight 2' },
      { label: 'Auriculares', value: 'HyperX Cloud II Wireless' },
      { label: 'Alfombrillas', value: 'Artisan FX Zero XL Extra Soft' }
    ]
  },
  {
    id: 'vip',
    title: 'Sala VIP',
    description: 'Privacidad total, máxima tasa de refresco y acondicionamiento pro para creadores.',
    image: '/img/valorant-hero.png',
    specs: [
      { label: 'Sillas', value: 'Secretlab TITAN Evo 2024 Series' },
      { label: 'Streaming', value: 'Elgato Stream Deck + Cam Link 4K' },
      { label: 'Micrófono', value: 'Shure SM7B + GoXLR Mixer' },
      { label: 'Iluminación', value: 'Elgato Key Light Air + RGB Inmersivo' },
      { label: 'Aislamiento', value: 'Paneles acústicos profesionales' }
    ]
  }
])
</script>