<template>
  <section class="space-y-6">
    <h2 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
      Nuestras Instalaciones
    </h2>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="photo in gallery"
        :key="photo.id"
        class="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950"
      >
        <img
          :src="photo.src"
          :alt="photo.alt"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span class="absolute bottom-3 left-3 right-3 text-xs sm:text-sm text-zinc-200 font-medium">
          {{ photo.alt }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
const { gallery } = useInstallations()
</script>
