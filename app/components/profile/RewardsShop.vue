<template>
  <section class="space-y-6">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <h2 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
        Tienda de Recompensas
      </h2>
      <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 font-mono font-bold text-sm">
        <UIcon name="i-heroicons-sparkles" class="w-4 h-4" />
        {{ points }} pts
      </span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <div
        v-for="reward in rewards"
        :key="reward.id"
        class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-6 flex flex-col gap-4"
      >
        <div class="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center">
          <UIcon :name="reward.icon" class="w-5 h-5 text-white" />
        </div>

        <div class="space-y-1 grow">
          <h3 class="font-['Rajdhani'] font-black text-white text-lg uppercase leading-tight">{{ reward.name }}</h3>
          <p class="text-xs text-zinc-500 leading-relaxed">{{ reward.description }}</p>
        </div>

        <div class="flex items-center justify-between gap-3 pt-2 border-t border-zinc-900">
          <span class="font-mono font-bold text-amber-400 text-sm">{{ reward.cost }} pts</span>
          <button
            type="button"
            class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            :class="redeemedIds.has(reward.id) ? 'bg-zinc-800 text-zinc-400' : 'bg-white text-black hover:bg-zinc-200'"
            :disabled="points < reward.cost || redeemedIds.has(reward.id)"
            @click="handleRedeem(reward)"
          >
            {{ redeemedIds.has(reward.id) ? 'Canjeado' : 'Canjear' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const { rewards, points, redeem } = useRewards()
const redeemedIds = ref(new Set())

const handleRedeem = (reward) => {
  if (redeem(reward)) {
    redeemedIds.value = new Set(redeemedIds.value).add(reward.id)
  }
}
</script>
