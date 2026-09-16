<template>
  <section class="space-y-6">
    <h2 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
      Setups Disponibles
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div
        v-for="spec in specs"
        :key="spec.id"
        class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-6 space-y-5"
      >
        <div class="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-center">
          <UIcon :name="spec.icon" class="w-6 h-6 text-white" />
        </div>

        <h3 class="font-['Rajdhani'] text-xl font-black uppercase text-white tracking-wide">
          {{ spec.name }}
        </h3>

        <dl class="space-y-2.5 text-sm">
          <div class="flex items-center justify-between gap-3">
            <dt class="text-zinc-500">CPU</dt>
            <dd class="text-zinc-200 font-medium text-right">{{ spec.cpu }}</dd>
          </div>
          <div class="flex items-center justify-between gap-3">
            <dt class="text-zinc-500">GPU</dt>
            <dd class="text-zinc-200 font-medium text-right">{{ spec.gpu }}</dd>
          </div>
          <div class="flex items-center justify-between gap-3">
            <dt class="text-zinc-500">RAM</dt>
            <dd class="text-zinc-200 font-medium text-right">{{ spec.ram }}</dd>
          </div>
          <div class="flex items-center justify-between gap-3">
            <dt class="text-zinc-500">Monitor</dt>
            <dd class="text-zinc-200 font-medium text-right">{{ spec.monitor }}</dd>
          </div>
          <div class="pt-2.5 border-t border-zinc-900">
            <dt class="text-zinc-500 mb-1">Periféricos</dt>
            <dd class="text-zinc-300">{{ spec.peripherals }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script setup>
const { specs } = useInstallations()
</script>
