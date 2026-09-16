<template>
  <section class="w-full bg-black text-zinc-100 font-sans relative overflow-hidden">
    
    <!-- TRIÁNGULO EN DIAGONAL COMPLETO (Esq. Sup. Derecha a Esq. Inf. Izquierda) -->
    <div 
      class="absolute inset-0 pointer-events-none z-0 bg-gradient-to-bl from-zinc-800/80 via-zinc-900/50 to-zinc-900/20"
      style="clip-path: polygon(100% 0, 100% 100%, 0 100%);"
    />

    <div class="relative z-10 w-full pb-20">
      
      <!-- ==================== 1. REPRODUCTOR DE VÍDEO GAMEPLAY ==================== -->
      <div class="w-full space-y-4">
        <div class="relative w-full h-[55vh] sm:h-[70vh] lg:h-[90vh] max-h-[90vh] bg-zinc-950 group shadow-2xl overflow-hidden">
          
          <video 
            ref="videoRef"
            class="w-full h-full object-cover cursor-pointer"
            loop
            muted
            playsinline
            autoplay
            src="/video/gameplay-demo.mp4"
            @click="togglePlay"
          />

          <!-- DEGRADADO SUPERIOR DE FUSIÓN CON EL HERO -->
          <div class="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-10" />

          <!-- Overlay de Pausa -->
          <div 
            v-if="!isPlaying" 
            @click="togglePlay"
            class="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center cursor-pointer z-20 transition-opacity"
          >
            <div class="w-20 h-20 rounded-full bg-cyan-400 text-zinc-950 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.5)] hover:scale-110 transition-transform">
              <UIcon name="i-heroicons-play-20-solid" class="w-10 h-10 ml-1" />
            </div>
          </div>

          <!-- Controles en Hover -->
          <div class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 sm:px-12 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
            <div class="flex items-center gap-4">
              <button 
                @click="togglePlay" 
                class="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                :aria-label="isPlaying ? 'Pausar' : 'Reproducir'"
              >
                <UIcon :name="isPlaying ? 'i-heroicons-pause-20-solid' : 'i-heroicons-play-20-solid'" class="w-5 h-5" />
              </button>

              <button 
                @click="toggleMute" 
                class="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                :aria-label="isMuted ? 'Activar Sonido' : 'Silenciar'"
              >
                <UIcon :name="isMuted ? 'i-heroicons-speaker-x-mark-20-solid' : 'i-heroicons-speaker-wave-20-solid'" class="w-5 h-5" />
              </button>

              <span class="font-mono text-xs text-zinc-300 uppercase tracking-widest hidden sm:block">
                PROJECT GAMING
              </span>
            </div>

            <button 
              @click="toggleFullScreen" 
              class="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
              aria-label="Pantalla completa"
            >
              <UIcon name="i-heroicons-arrows-pointing-out-20-solid" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- ==================== 2. GRID DE FOTOS DE ZONAS ==================== -->
      <div class="w-full">
        <!-- TÍTULO CENTRADO VERTICALMENTE -->
        <div class="w-full px-6 sm:px-12 lg:px-20 min-h-[35vh] sm:min-h-[45vh] lg:min-h-[50vh] flex flex-col items-center justify-center text-center">
          <h2 class="font-['Rajdhani'] text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            NUESTRAS ZONAS
          </h2>
        </div>

        <!-- GRID DE IMÁGENES -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
          <div 
            v-for="zone in schedule.zones" 
            :key="zone.id"
            @click="openModal(zone)"
            class="group relative w-full h-[450px] sm:h-[550px] overflow-hidden cursor-pointer border-b sm:border-b-0 sm:border-r border-zinc-900 last:border-none"
          >
            <img 
              :src="zone.image" 
              :alt="zone.name"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 contrast-110"
            />
            
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

            <div class="absolute inset-0 p-8 flex items-end z-10">
              <h3 class="font-['Rajdhani'] text-3xl font-black text-white uppercase group-hover:text-cyan-300 transition-colors">
                {{ zone.name }}
              </h3>
            </div>
          </div>
        </div>

        <!-- BOTÓN CON EXACTAMENTE EL MISMO ESTILO DEL HERO -->
        <div class="flex justify-center pt-16 sm:pt-20 px-6">
          <NuxtLink
            to="/reservas"
            class="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-950 font-['Rajdhani'] font-black text-lg uppercase tracking-wider transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Ir a la Página de Reservas</span>
            <UIcon 
              name="i-heroicons-arrow-up-right" 
              class="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
            />
          </NuxtLink>
        </div>
      </div>

      <!-- SEPARADOR ESTILO INDUSTRIAL -->
      <div class="w-full px-6 sm:px-12 lg:px-20 flex items-center gap-6 my-24 sm:my-32">

      </div>

      <!-- ==================== 3. HORARIOS ==================== -->
      <div class="w-full px-6 sm:px-12 lg:px-20 space-y-14 sm:space-y-16">
        <div class="flex flex-col items-start space-y-4 border-l-2 border-cyan-400 pl-6 sm:pl-8">
          <h2 class="font-['Rajdhani'] text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            NUESTRO HORARIO
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          <div 
            v-for="entry in schedule.hours" 
            :key="entry.days"
            class="relative bg-zinc-950/90 border border-cyan-500/30 p-8 sm:p-10 transition-all duration-300 group hover:border-cyan-400 hover:bg-cyan-950/20 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]"
          >
            <!-- Línea superior resplandeciente -->
            <div class="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div class="flex items-center justify-between mb-8">
              <span v-if="entry.isToday" class="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400 text-zinc-950 font-['Rajdhani'] font-black text-xs uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                <span class="w-1.5 h-1.5 rounded-full bg-zinc-950 animate-ping" />
                Hoy Abierto
              </span>
            </div>

            <div class="space-y-3">
              <h3 class="font-['Rajdhani'] text-2xl font-black uppercase tracking-wide text-cyan-400 group-hover:text-cyan-300 transition-colors">
                {{ entry.days }}
              </h3>
              <div class="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight pt-2">
                {{ entry.open }} <span class="text-cyan-500/60 font-light">&mdash;</span> {{ entry.close }}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ==================== MODAL VISOR DE IMAGEN LIMPIO ==================== -->
    <Transition name="fade">
      <div 
        v-if="activeModalZone" 
        @click="closeModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-black/95 backdrop-blur-md cursor-pointer"
      >
        <img 
          :src="activeModalZone.image" 
          :alt="activeModalZone.name"
          class="max-w-full max-h-full object-contain pointer-events-none shadow-2xl"
        />
      </div>
    </Transition>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeModalZone = ref(null)
const videoRef = ref(null)
const isPlaying = ref(true)
const isMuted = ref(true)

const schedule = ref({
  hours: [
    { days: 'LUNES A JUEVES', open: '11:00', close: '23:00', isToday: false },
    { days: 'VIERNES Y SÁBADOS', open: '11:00', close: '01:00', isToday: false },
    { days: 'DOMINGOS', open: '11:00', close: '23:00', isToday: false }
  ],
  zones: [
    { id: 'principal', name: 'SALA PRINCIPAL', image: '/img/sala-principal.jpg' },
    { id: 'vip', name: 'SALA VIP', image: '/img/sala-vip.jpg' },
    { id: 'ps5', name: 'PLAYSTATION 5', image: '/img/play.jpg' },
    { id: 'simulador', name: 'SIMULADORES', image: '/img/simuladores.jpg' }
  ]
})

const togglePlay = () => {
  if (!videoRef.value) return
  if (videoRef.value.paused) {
    videoRef.value.play()
    isPlaying.value = true
  } else {
    videoRef.value.pause()
    isPlaying.value = false
  }
}

const toggleMute = () => {
  if (!videoRef.value) return
  videoRef.value.muted = !videoRef.value.muted
  isMuted.value = videoRef.value.muted
}

const toggleFullScreen = () => {
  if (!videoRef.value) return
  if (videoRef.value.requestFullscreen) {
    videoRef.value.requestFullscreen()
  }
}

const openModal = (zone) => { activeModalZone.value = zone }
const closeModal = () => { activeModalZone.value = null }

const handleKeydown = (e) => {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => { window.addEventListener('keydown', handleKeydown) })
onUnmounted(() => { window.removeEventListener('keydown', handleKeydown) })
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>