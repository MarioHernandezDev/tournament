<template>
  <section class="space-y-6">
    <h2 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
      Cómo Llegar
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8 rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 aspect-video">
        <iframe
          :src="location.mapEmbedUrl"
          class="w-full h-full"
          style="border:0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Mapa de ubicación"
        />
      </div>

      <div class="lg:col-span-4 rounded-2xl border border-zinc-800/80 bg-zinc-950 p-6 space-y-5">
        <div class="flex items-start gap-3">
          <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-white shrink-0 mt-0.5" />
          <div>
            <p class="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">Dirección</p>
            <p class="text-sm text-zinc-200">{{ location.address }}</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <UIcon name="i-heroicons-clock" class="w-5 h-5 text-white shrink-0 mt-0.5" />
          <div>
            <p class="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">Horario</p>
            <p class="text-sm text-zinc-200">{{ location.shortHours }}</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <UIcon name="i-heroicons-phone" class="w-5 h-5 text-white shrink-0 mt-0.5" />
          <div>
            <p class="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">Teléfono</p>
            <p class="text-sm text-zinc-200">{{ location.phone }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { location } = useInstallations()
</script>
