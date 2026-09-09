<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-red-500 selection:text-white flex flex-col">
    <AppHeader />

    <main class="flex-grow">
      <NuxtPage />
    </main>

    <AppFooter />
  </div>
</template>