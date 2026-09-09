<template>
  <div class="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
    <div class="flex items-center gap-2">
      <UButton color="red" variant="soft" size="sm" class="font-bold">Todos</UButton>
      <UButton color="gray" variant="ghost" size="sm">5v5 Competitivo</UButton>
      <UButton color="gray" variant="ghost" size="sm">Swiftplay</UButton>
      <UButton color="gray" variant="ghost" size="sm">1v1 Aim Map</UButton>
    </div>
    <UInput icon="i-heroicons-magnifying-glass" placeholder="Buscar por mapa o nombre..." class="w-full md:w-64" />
  </div>
</template>