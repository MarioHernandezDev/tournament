<template>
  <div class="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
    <div class="flex items-center gap-2">
      <UButton color="cyan" variant="soft" size="sm" class="font-bold">Todos</UButton>
      <UButton color="gray" variant="ghost" size="sm">5v5 Grieta</UButton>
      <UButton color="gray" variant="ghost" size="sm">ARAM</UButton>
      <UButton color="gray" variant="ghost" size="sm">1v1 Howling Abyss</UButton>
    </div>
    <UInput icon="i-heroicons-magnifying-glass" placeholder="Buscar torneo..." class="w-full md:w-64" />
  </div>
</template>