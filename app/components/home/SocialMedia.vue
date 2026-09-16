<template>
  <section class="max-w-[1380px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
    <div class="flex flex-col items-center text-center mb-12 space-y-3">
      <span class="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">Comunidad</span>
      <h2 class="font-['Rajdhani'] text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
        Síguenos En Redes
      </h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <a
        v-for="social in socials"
        :key="social.id"
        :href="social.url"
        target="_blank"
        rel="noopener"
        class="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950 p-6 flex flex-col items-start gap-4 hover:border-zinc-600 transition-all duration-300"
      >
        <div class="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center text-zinc-300 group-hover:text-white group-hover:scale-105 transition-all">
          <UIcon :name="social.icon" class="w-6 h-6" />
        </div>

        <div class="space-y-0.5">
          <p class="font-['Rajdhani'] font-black text-lg text-white uppercase tracking-wide">{{ social.label }}</p>
          <p class="text-xs text-zinc-500 font-mono">{{ social.handle }}</p>
        </div>

        <div class="mt-auto pt-2 w-full flex items-center justify-between border-t border-zinc-900">
          <span class="text-sm font-bold text-zinc-200 pt-3">{{ formatFollowers(social.followers) }}</span>
          <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-3" />
        </div>
      </a>
    </div>
  </section>
</template>

<script setup>
const socials = useSocialStats()

const formatFollowers = (n) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace('.0', '')}k seguidores`
  return `${n} seguidores`
}
</script>
