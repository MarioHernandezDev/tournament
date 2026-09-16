<template>
  <div>
    <MiniHero
      title="Instalaciones"
      bg-text="instalaciones"
      description="Un local pensado para competir: setups de alto rendimiento, sala de torneos y un ambiente hecho por y para gamers."
      icon-name="i-heroicons-building-storefront"
      bg-image="/img/ezreal.png"
      theme="gold"
      button-text="Reservar PC"
      button-link="#ubicacion"
      secondary-button-text="Ver Torneos"
      secondary-button-link="/torneos"
    />

    <div class="max-w-[1380px] mx-auto px-4 sm:px-6 py-14 space-y-16">
      <InstallationsGalleryGrid />
      <InstallationsPcSpecs />
      <div id="ubicacion">
        <InstallationsLocationMap />
      </div>
    </div>
  </div>
</template>
