<template>
  <section class="w-full bg-black text-zinc-100 py-24 font-sans relative overflow-hidden">
    
    <!-- FONDO EN FORMA DE TRIÁNGULO DIAGONAL (Borde derecho a inferior) -->
    <div 
      class="absolute inset-0 pointer-events-none z-0 bg-gradient-to-bl from-zinc-900/60 via-zinc-900/20 to-transparent"
      style="clip-path: polygon(100% 15%, 100% 100%, 0 100%);"
    />

    <!-- Textura de cuadrícula sutil en el fondo -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none z-0" />

    <div class="space-y-24 relative z-10">
      
      <!-- ==================== HORARIOS (ESTILO INDUSTRIAL / ESPORTS) ==================== -->
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <!-- HEADER MONUMENTAL -->
        <div class="flex flex-col items-start space-y-3 border-l-2 border-white pl-6">
          <h2 class="font-['Rajdhani'] text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            NUESTRO HORARIO
          </h2>
        </div>

        <!-- GRID DE HORARIOS INTEGRADO CON EL FONDO -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            v-for="(entry, index) in schedule.hours" 
            :key="entry.days"
            class="relative bg-zinc-950/80 border border-zinc-800/80 p-8 rounded-none transition-all duration-300 group hover:border-zinc-500"
          >
            <!-- Acento visual superior -->
            <div class="absolute top-0 left-0 w-8 h-[2px] bg-zinc-700 group-hover:w-full group-hover:bg-white transition-all duration-500" />
            
            <div class="flex items-center justify-between mb-8">
              <span v-if="entry.isToday" class="inline-flex items-center gap-2 px-3 py-1 bg-white text-black font-['Rajdhani'] font-black text-xs uppercase tracking-wider rounded-full">
                <span class="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                Hoy Abierto
              </span>
            </div>

            <div class="space-y-2">
              <h3 class="font-['Rajdhani'] text-2xl font-black uppercase tracking-wide text-zinc-300 group-hover:text-white transition-colors">
                {{ entry.days }}
              </h3>
              <div class="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight pt-2">
                {{ entry.open }} <span class="text-zinc-600 font-light">&mdash;</span> {{ entry.close }}
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- SEPARADOR ESTILO INDUSTRIAL -->
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center gap-4">
        <div class="h-px bg-zinc-800 flex-1" />
        <span class="font-mono text-xs text-zinc-600 tracking-widest">// ARENA ZONES</span>
        <div class="h-px bg-zinc-800 flex-1" />
      </div>

      <!-- ==================== TARIFAS / TARJETAS DE ZONA (4 COLUMNAS PARA TODO MENOS MÓVIL) ==================== -->
      <div class="space-y-12">
        
        <!-- HEADER TARIFAS -->
        <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-3">
          <h2 class="font-['Rajdhani'] text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            ELIGE TU ZONA
          </h2>
          <p class="text-zinc-400 max-w-md text-xs font-mono uppercase tracking-wider">
            Selecciona la estación de juego para consultar detalles y precios.
          </p>
        </div>

        <!-- GRID 1 COLUMNA EN MÓVIL, 4 COLUMNAS EN SM Y SUPERIORES -->
        <div class="grid grid-cols-1 sm:grid-cols-4 w-full">
          
          <div 
            v-for="zone in schedule.zones" 
            :key="zone.id"
            @click="openModal(zone)"
            class="group relative w-full h-[500px] sm:h-[550px] lg:h-[620px] overflow-hidden text-left block cursor-pointer select-none border-b sm:border-b-0 sm:border-r border-zinc-900 last:border-none"
          >
            <!-- INSIGNIA DESTACADA -->
            <div 
              v-if="zone.isFeatured" 
              class="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white text-black font-['Rajdhani'] font-black text-[10px] uppercase px-3 py-1 tracking-widest z-20 shadow-xl rounded-full"
            >
              POPULAR
            </div>

            <!-- IMAGEN A PANTALLA COMPLETA -->
            <img 
              :src="zone.image || '/img/lol-hero.png'" 
              :alt="zone.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 contrast-110"
            />
            
            <!-- OVERLAYS Y GRADIENTES -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity" />
            <div class="absolute inset-0 bg-zinc-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <!-- CAPA SUPERPUESTA CON CONTENIDO -->
            <div class="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-end items-start z-10 space-y-3">

              <!-- SELECTOR RÁPIDO DE BONOS DE HORAS -->
              <div class="flex flex-wrap items-center gap-1.5" @click.stop>
                <button
                  v-for="tier in zone.pricing"
                  :key="tier.hoursNum"
                  @click="selectedTiers[zone.id] = tier.hoursNum"
                  class="px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-bold transition-all rounded-full backdrop-blur-md border"
                  :class="getSelectedHours(zone.id) === tier.hoursNum
                    ? 'bg-white border-white text-black shadow-lg'
                    : 'bg-black/60 border-white/20 text-zinc-300 hover:text-white hover:border-white/50'"
                >
                  {{ tier.hoursNum }}h
                </button>
              </div>

              <!-- BOTÓN E INFORMACIÓN INFERIOR -->
              <div class="w-full flex flex-col justify-between gap-3 pt-3 border-t border-white/10 backdrop-blur-sm">
                
                <div class="space-y-1">
                  <!-- SPECS Y PRECIO -->
                  <span class="font-mono text-[10px] sm:text-[11px] text-zinc-400 uppercase tracking-widest block truncate">
                    {{ zone.specs }} &bull; <strong class="text-white">{{ getSelectedPricing(zone).price }}&euro;</strong>
                  </span>

                  <!-- NOMBRE DE LA ZONA -->
                  <h3 class="font-['Rajdhani'] text-xl sm:text-2xl lg:text-3xl font-black text-white uppercase group-hover:text-zinc-200 transition-colors leading-tight">
                    {{ zone.name }}
                  </h3>
                </div>

                <!-- BOTÓN PÍLDORA ELEGANTE (RESERVAR) -->
                <span class="inline-flex items-center justify-between px-5 py-2.5 rounded-full bg-white/10 border border-white/30 text-white font-['Rajdhani'] font-extrabold text-xs uppercase tracking-wider backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all shadow-xl shrink-0 w-full">
                  <span>RESERVAR</span>
                  <span class="text-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">&nearr;</span>
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- ==================== MODAL FLOTANTE / VENTANA AMPLIADA ==================== -->
    <Transition name="modal-bounce">
      <div 
        v-if="activeModalZone" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        <!-- Backdrop oscuro -->
        <div 
          class="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" 
          @click="closeModal"
        />

        <!-- Contenido Modal -->
        <div class="relative w-full max-w-xl bg-zinc-950 border border-zinc-700 rounded-3xl shadow-2xl overflow-hidden z-10 space-y-6">
          
          <!-- Botón Cerrar (X) -->
          <button 
            @click="closeModal"
            class="absolute top-4 right-4 z-30 w-10 h-10 bg-black/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-white flex items-center justify-center font-mono text-sm transition-all rounded-full"
          >
            &#x2715;
          </button>

          <!-- Imagen Header Modal A Color -->
          <div class="relative w-full h-64 overflow-hidden bg-zinc-900">
            <img 
              :src="activeModalZone.image || '/img/lol-hero.png'" 
              :alt="activeModalZone.name"
              class="w-full h-full object-cover object-center"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
          </div>

          <!-- Detalles Internos -->
          <div class="p-8 pt-0 space-y-6">
            <div class="space-y-1">
              <span class="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                {{ activeModalZone.specs }}
              </span>
              <h3 class="font-['Rajdhani'] text-4xl font-black uppercase tracking-wide text-white">
                {{ activeModalZone.name }}
              </h3>
              <p class="text-sm text-zinc-400 font-light leading-relaxed pt-2">
                Puestos de máxima calidad equipados con tecnología gaming de última generación para partidas profesionales e inmersivas.
              </p>
            </div>

            <!-- Selector de horas ampliado -->
            <div class="bg-zinc-900/60 p-5 border border-zinc-800 rounded-2xl space-y-3">
              <span class="block text-xs uppercase font-mono tracking-widest text-zinc-400">
                DURACIÓN DEL BONO:
              </span>
              <div class="flex flex-wrap items-center gap-2">
                <button
                  v-for="tier in activeModalZone.pricing"
                  :key="tier.hoursNum"
                  @click="selectedTiers[activeModalZone.id] = tier.hoursNum"
                  class="px-5 py-2 font-mono text-sm font-bold transition-all border rounded-full"
                  :class="getSelectedHours(activeModalZone.id) === tier.hoursNum
                    ? 'bg-white border-white text-black'
                    : 'bg-black border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'"
                >
                  {{ tier.hoursNum }}h
                </button>
              </div>
            </div>

            <!-- Precio Total -->
            <div class="flex items-center justify-between pt-2 border-t border-zinc-900">
              <div>
                <span class="text-xs uppercase font-mono text-zinc-500 block">TOTAL A PAGAR</span>
                <span class="text-xs font-mono text-zinc-400 font-semibold">
                  {{ (getSelectedPricing(activeModalZone).price / getSelectedPricing(activeModalZone).hoursNum).toFixed(2) }}&euro; / hora
                </span>
              </div>
              <div class="font-['Rajdhani'] font-black text-5xl text-white tracking-tight">
                {{ getSelectedPricing(activeModalZone).price }}<span class="text-zinc-500 text-3xl font-bold">&euro;</span>
              </div>
            </div>

            <!-- Botón Final de Reserva (Píldora grande) -->
            <a 
              href="#ubicacion"
              @click="closeModal"
              class="w-full inline-flex items-center justify-between py-4 px-8 font-['Rajdhani'] font-black uppercase tracking-widest text-sm bg-white hover:bg-zinc-200 text-black rounded-full transition-all shadow-lg"
            >
              <span>RESERVAR</span>
              <span class="text-base">&nearr;</span>
            </a>
          </div>

        </div>
      </div>
    </Transition>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeModalZone = ref(null)

const selectedTiers = ref({
  principal: 10,
  vip: 10,
  ps5: 1,
  simulador: 1
})

const schedule = ref({
  hours: [
    { days: 'LUNES A JUEVES', open: '11:00', close: '23:00', isToday: false },
    { days: 'VIERNES Y SÁBADOS', open: '11:00', close: '01:00', isToday: false },
    { days: 'DOMINGOS', open: '11:00', close: '23:00', isToday: false }
  ],
  zones: [
    {
      id: 'principal',
      name: 'SALA PRINCIPAL',
      specs: 'RTX 4070 • 240HZ',
      image: '/img/lol-hero.png',
      isFeatured: true,
      pricing: [
        { hoursNum: 1, price: 3.50 },
        { hoursNum: 2, price: 6.00 },
        { hoursNum: 4, price: 10.00 },
        { hoursNum: 10, price: 20.00 },
        { hoursNum: 24, price: 40.00 }
      ]
    },
    {
      id: 'vip',
      name: 'SALA VIP',
      specs: 'RTX 4080 • 360HZ',
      image: '/img/lol-hero.png',
      isFeatured: false,
      pricing: [
        { hoursNum: 1, price: 4.00 },
        { hoursNum: 2, price: 7.00 },
        { hoursNum: 4, price: 12.00 },
        { hoursNum: 10, price: 25.00 },
        { hoursNum: 25, price: 50.00 }
      ]
    },
    {
      id: 'ps5',
      name: 'PLAYSTATION 5',
      specs: 'TV 4K OLED 65"',
      image: '/img/lol-hero.png',
      isFeatured: false,
      pricing: [
        { hoursNum: 1, price: 4.50 },
        { hoursNum: 2, price: 8.00 },
        { hoursNum: 3, price: 10.50 }
      ]
    },
    {
      id: 'simulador',
      name: 'SIMULADORES',
      specs: 'FANATEC DIRECT DRIVE',
      image: '/img/lol-hero.png',
      isFeatured: false,
      pricing: [
        { hoursNum: 1, price: 4.50 },
        { hoursNum: 2, price: 8.00 },
        { hoursNum: 3, price: 10.50 }
      ]
    }
  ]
})

const getSelectedHours = (zoneId) => {
  return selectedTiers.value[zoneId] || 1
}

const getSelectedPricing = (zone) => {
  const hours = getSelectedHours(zone.id)
  return zone.pricing.find(p => p.hoursNum === hours) || zone.pricing[0]
}

const openModal = (zone) => {
  activeModalZone.value = zone
}

const closeModal = () => {
  activeModalZone.value = null
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.modal-bounce-enter-active,
.modal-bounce-leave-active {
  transition: all 0.25s ease-out;
}

.modal-bounce-enter-from,
.modal-bounce-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>