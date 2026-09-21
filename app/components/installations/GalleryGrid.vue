<template>
  <section ref="sectionRef" class="w-full bg-black border-y border-zinc-900 overflow-hidden">
    <!-- REJILLA FULLWIDTH: 1 COL MÓVIL, 2 COL TABLET, 4 COL DESKTOP (2 FILAS DE 4 = 8 FOTOS) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
      <div
        v-for="(photo, index) in displayGallery"
        :key="photo.id || index"
        @click="openLightbox(index)"
        class="gallery-item group relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 border-b border-r border-zinc-900 cursor-pointer select-none"
      >
        <!-- Imagen en Grid -->
        <AppImage
          :src="photo.src"
          :alt="photo.alt || 'Instalaciones Gaming Project'"
          width="1500"
          height="843"
          sizes="xs:851px sm:680px lg:640px"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-100"
        />

        <!-- Overlay y Lupa al hacer Hover -->
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div class="w-12 h-12 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transform scale-90 group-hover:scale-100 transition-transform">
            <span class="text-xl font-light">&plus;</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ==================== LIGHTBOX / MODAL AMPLIADO ==================== -->
    <Transition name="fade">
      <div
        v-if="activeImageIndex !== null"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 sm:backdrop-blur-md p-4 sm:p-8"
        @click="closeLightbox"
      >
        <!-- Botón CERRAR (X) -->
        <button
          @click.stop="closeLightbox"
          class="absolute top-6 right-6 z-50 w-12 h-12 bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-white rounded-full flex items-center justify-center font-mono text-lg transition-all shadow-xl"
        >
          &#x2715;
        </button>

        <!-- Botón ANTERIOR -->
        <button
          v-if="displayGallery.length > 1"
          @click.stop="prevImage"
          class="absolute left-4 sm:left-8 z-50 w-12 h-12 bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-white rounded-full flex items-center justify-center font-mono text-xl transition-all shadow-xl"
        >
          &larr;
        </button>

        <!-- Contenedor Imagen Ampliada -->
        <div
          class="relative max-w-6xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
          @click.stop
        >
          <AppImage
            :src="displayGallery[activeImageIndex].src"
            :alt="displayGallery[activeImageIndex].alt || 'Instalaciones Gaming Project'"
            sizes="xs:640px sm:1152px"
            priority
            class="max-w-full max-h-full object-contain rounded-lg border border-zinc-800 shadow-2xl"
          />

        </div>

        <!-- Botón SIGUIENTE -->
        <button
          v-if="displayGallery.length > 1"
          @click.stop="nextImage"
          class="absolute right-4 sm:right-8 z-50 w-12 h-12 bg-zinc-900/80 border border-zinc-700 text-zinc-300 hover:text-white hover:border-white rounded-full flex items-center justify-center font-mono text-xl transition-all shadow-xl"
        >
          &rarr;
        </button>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { gallery } = useInstallations()

// Garantizar que la galería siempre tenga 8 elementos
const displayGallery = computed(() => {
  const list = gallery?.value || gallery || []
  return list.slice(0, 8)
})

const sectionRef = ref(null)

useScrollReveal(sectionRef, ({ batch }) => {
  batch('.gallery-item', { start: 'top 94%', stagger: 0.07 })
})

const activeImageIndex = ref(null)

const openLightbox = (index) => {
  activeImageIndex.value = index
}

const closeLightbox = () => {
  activeImageIndex.value = null
}

const nextImage = () => {
  if (activeImageIndex.value !== null) {
    activeImageIndex.value = (activeImageIndex.value + 1) % displayGallery.value.length
  }
}

const prevImage = () => {
  if (activeImageIndex.value !== null) {
    activeImageIndex.value =
      (activeImageIndex.value - 1 + displayGallery.value.length) % displayGallery.value.length
  }
}

const handleKeydown = (e) => {
  if (activeImageIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
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