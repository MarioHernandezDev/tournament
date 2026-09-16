<template>
  <section class="max-w-[1380px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
    <div class="flex flex-col items-center text-center mb-12 space-y-3">
      <span class="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">Horarios &amp; Tarifas</span>
      <h2 class="font-['Rajdhani'] text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
        Cuándo Venir <span class="text-zinc-500">&amp;</span> Cuánto Cuesta
      </h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- HORARIO -->
      <div class="lg:col-span-5 rounded-3xl border border-zinc-800/80 bg-zinc-950 p-6 sm:p-8 space-y-5">
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-clock" class="w-5 h-5 text-white" />
          <h3 class="font-['Rajdhani'] text-xl font-black uppercase tracking-wide text-white">Horario de Apertura</h3>
        </div>

        <ul class="divide-y divide-zinc-900">
          <li
            v-for="entry in schedule.hours"
            :key="entry.day"
            class="flex items-center justify-between py-3 text-sm"
          >
            <span class="text-zinc-400 font-medium">{{ entry.day }}</span>
            <span class="font-mono text-zinc-200">{{ entry.open }} &ndash; {{ entry.close }}</span>
          </li>
        </ul>
      </div>

      <!-- PRECIOS -->
      <div class="lg:col-span-7 rounded-3xl border border-zinc-800/80 bg-zinc-950 p-6 sm:p-8 space-y-5">
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-banknotes" class="w-5 h-5 text-white" />
          <h3 class="font-['Rajdhani'] text-xl font-black uppercase tracking-wide text-white">Precios por Hora</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            v-for="tier in schedule.pricing"
            :key="tier.id"
            class="rounded-2xl bg-zinc-900/70 border border-zinc-800/80 p-5 space-y-2"
          >
            <div class="flex items-baseline justify-between gap-2">
              <span class="font-['Rajdhani'] font-black text-lg text-white uppercase leading-tight">{{ tier.tier }}</span>
              <span class="font-['Rajdhani'] font-black text-2xl text-white shrink-0">{{ tier.pricePerHour.toFixed(2) }}&euro;</span>
            </div>
            <p class="text-xs text-zinc-500">{{ tier.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const schedule = useSchedule()
</script>
