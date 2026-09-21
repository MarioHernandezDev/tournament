<template>
  <section ref="sectionRef" class="relative w-full bg-black text-zinc-100 font-sans overflow-hidden py-20 sm:py-28 px-6 sm:px-12 lg:px-20">
    
    <!-- TRIÁNGULO EN DIAGONAL COMPLETO DE FONDO -->
    <div 
      class="absolute inset-0 pointer-events-none z-0 bg-gradient-to-bl from-zinc-800/80 via-zinc-900/50 to-zinc-900/20"
      style="clip-path: polygon(100% 0, 100% 100%, 0 100%);"
    />

    <div class="relative z-10 w-full max-w-[1500px] mx-auto space-y-12 sm:space-y-16">

      <!-- ENCABEZADO DE SECCIÓN -->
      <div class="videos-header flex flex-col items-start space-y-4 border-l-2 border-cyan-400 pl-6 sm:pl-8">
        <h2 class="font-['Rajdhani'] text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
          GAMEPLAY & ATMÓSFERA
        </h2>
      </div>

      <!-- GRID DE VÍDEOS ESTILO HUD / INDUSTRIAL -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full">
        
        <div 
          v-for="(video, index) in videos" 
          :key="index"
          class="video-card group relative bg-zinc-950/90 border border-zinc-800/80 hover:border-cyan-400/80 p-3 sm:p-4 transition-all duration-300 shadow-2xl hover:shadow-[0_0_35px_rgba(34,211,238,0.2)] overflow-hidden"
          style="clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px));"
        >
          <!-- Detalle de esquina biselada estilo HUD -->
          <div class="absolute top-0 right-0 w-5 h-5 bg-cyan-400/20 group-hover:bg-cyan-400 transition-colors z-30 pointer-events-none" />

          <!-- Contenedor del reproductor -->
          <div class="relative w-full h-[320px] sm:h-[420px] bg-black overflow-hidden">
            
            <video 
              :ref="el => setVideoRef(el, index)"
              class="w-full h-full object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
              loop
              muted
              playsinline
              autoplay
              :src="video.src"
              @click="togglePlay(index)"
            />

            <!-- Gradiente decorativo superior e inferior -->
            <div class="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-10" />
            <div class="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

            <!-- Insignia / Tag flotante -->
            

            <!-- Overlay cuando está pausado -->
            <div 
              v-if="!videoState[index]?.isPlaying" 
              @click="togglePlay(index)"
              class="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center cursor-pointer z-20 transition-opacity"
            >
              <div class="w-16 h-16 rounded-full bg-cyan-400 text-zinc-950 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-110 transition-transform">
                <UIcon name="i-heroicons-play-20-solid" class="w-8 h-8 ml-1" />
              </div>
            </div>

            <!-- Barra de Controles en Hover -->
            <div class="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
              <div class="flex items-center gap-3">
                <button 
                  @click="togglePlay(index)" 
                  class="w-10 h-10 rounded-full bg-black/60 border border-zinc-700 hover:border-cyan-400 hover:bg-cyan-400 hover:text-zinc-950 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                  :aria-label="videoState[index]?.isPlaying ? 'Pausar' : 'Reproducir'"
                >
                  <UIcon :name="videoState[index]?.isPlaying ? 'i-heroicons-pause-20-solid' : 'i-heroicons-play-20-solid'" class="w-5 h-5" />
                </button>

                <button 
                  @click="toggleMute(index)" 
                  class="w-10 h-10 rounded-full bg-black/60 border border-zinc-700 hover:border-cyan-400 hover:bg-cyan-400 hover:text-zinc-950 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                  :aria-label="videoState[index]?.isMuted ? 'Activar Sonido' : 'Silenciar'"
                >
                  <UIcon :name="videoState[index]?.isMuted ? 'i-heroicons-speaker-x-mark-20-solid' : 'i-heroicons-speaker-wave-20-solid'" class="w-5 h-5" />
                </button>
              </div>

              <button 
                @click="toggleFullScreen(index)" 
                class="w-10 h-10 rounded-full bg-black/60 border border-zinc-700 hover:border-cyan-400 hover:bg-cyan-400 hover:text-zinc-950 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                aria-label="Pantalla completa"
              >
                <UIcon name="i-heroicons-arrows-pointing-out-20-solid" class="w-5 h-5" />
              </button>
            </div>

          </div>

          

        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const sectionRef = ref(null)

useScrollReveal(sectionRef, ({ reveal, batch }) => {
  reveal('.videos-header')
  batch('.video-card', { start: 'top 90%', stagger: 0.12 })
})

const videos = [
  {
    title: 'GAMEPLAY DEMO',
    subtitle: 'Rendimiento Inmersivo 240Hz',
    src: '/video/gameplay-demo.mp4'
  },
  {
    title: 'NUESTRO LOCAL',
    subtitle: 'Ambiente & Setups Pro',
    src: '/video/gameplay-demo.mp4'
  }
]

const videoRefs = ref([])
const videoState = reactive(
  videos.map(() => ({
    isPlaying: true,
    isMuted: true
  }))
)

const setVideoRef = (el, index) => {
  if (el) videoRefs.value[index] = el
}

const togglePlay = (index) => {
  const el = videoRefs.value[index]
  if (!el) return

  if (el.paused) {
    el.play()
    videoState[index].isPlaying = true
  } else {
    el.pause()
    videoState[index].isPlaying = false
  }
}

const toggleMute = (index) => {
  const el = videoRefs.value[index]
  if (!el) return

  el.muted = !el.muted
  videoState[index].isMuted = el.muted
}

const toggleFullScreen = (index) => {
  const el = videoRefs.value[index]
  if (!el) return

  if (el.requestFullscreen) {
    el.requestFullscreen()
  }
}
</script>