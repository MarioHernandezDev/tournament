<template>
  <div class="min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-red-500 selection:text-white flex flex-col">
    <AppHeader />

    <main class="flex-grow">
      <NuxtPage />
    </main>

    <AppFooter />
  </div>
</template>