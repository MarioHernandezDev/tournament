<template>
  <section class="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950">
    <!-- BANNER EDITABLE -->
    <div class="relative w-full aspect-[21/6] sm:aspect-[21/5] bg-zinc-900 overflow-hidden">
      <img :src="profile.banner" alt="Banner del perfil" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

      <label
        class="absolute top-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 border border-white/20 text-xs font-semibold text-zinc-200 hover:text-white hover:border-white/40 cursor-pointer backdrop-blur-md transition-colors"
      >
        <UIcon name="i-heroicons-camera" class="w-4 h-4" />
        Cambiar banner
        <input type="file" accept="image/*" class="hidden" @change="onBannerChange">
      </label>
    </div>

    <div class="relative z-10 px-6 sm:px-10 pb-8 -mt-14 sm:-mt-16">
      <div class="flex flex-col sm:flex-row sm:items-end gap-6">
        <!-- AVATAR -->
        <img
          :src="profile.avatar"
          :alt="profile.name"
          class="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-zinc-950 shadow-2xl shrink-0"
        >

        <div class="flex-1 space-y-4 pb-1">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 class="font-['Rajdhani'] text-3xl sm:text-4xl font-black uppercase text-white tracking-wide leading-none">
                {{ profile.name }}
              </h1>
              <p class="text-sm text-zinc-400 mt-1 flex items-center gap-1.5">
                <UIcon name="i-heroicons-user-group" class="w-4 h-4" />
                {{ profile.team }}
              </p>
            </div>

            <!-- REDES SOCIALES -->
            <div class="flex items-center gap-2">
              <a
                v-for="social in profile.socials"
                :key="social.id"
                :href="social.url"
                target="_blank"
                rel="noopener"
                class="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-500 hover:text-white text-zinc-400 flex items-center justify-center transition-colors"
              >
                <UIcon :name="social.icon" class="w-4 h-4" />
              </a>
            </div>
          </div>

          <!-- FIABILIDAD -->
          <div class="space-y-1.5 max-w-sm">
            <div class="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span class="flex items-center gap-1.5">
                <UIcon name="i-heroicons-shield-check" class="w-4 h-4 text-emerald-400" />
                FIABILIDAD
              </span>
              <span class="font-bold text-white font-mono text-sm">{{ profile.reliability }}%</span>
            </div>
            <div class="w-full h-2.5 rounded-full bg-zinc-900 border border-zinc-800/80 overflow-hidden">
              <div
                class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-1000"
                :style="{ width: profile.reliability + '%' }"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- BADGES -->
      <div class="mt-6 flex flex-wrap gap-2">
        <span
          v-for="badge in profile.badges"
          :key="badge.id"
          class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-bold uppercase tracking-wide"
        >
          <UIcon :name="badge.icon" class="w-3.5 h-3.5" />
          {{ badge.label }}
        </span>
      </div>

      <!-- RANGOS POR JUEGO -->
      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
        <div
          v-for="game in gameRanks"
          :key="game.id"
          class="flex items-center gap-3 rounded-2xl border p-4"
          :class="[game.theme.border, game.theme.bgSoft]"
        >
          <UIcon :name="game.config.icon" class="w-8 h-8" :class="game.theme.text" />
          <div>
            <p class="text-[11px] uppercase tracking-wider text-zinc-400">{{ game.config.shortLabel }}</p>
            <p class="font-['Rajdhani'] font-black text-lg text-white leading-none">{{ game.tier }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { profile, updateBanner } = useProfile()

const gameRanks = GAME_LIST.map((config) => ({
  id: config.id,
  config,
  theme: useGameTheme(config.theme),
  tier: profile.value.ranks[config.id]?.tier ?? 'Sin clasificar'
}))

const onBannerChange = (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  updateBanner(URL.createObjectURL(file))
}
</script>
