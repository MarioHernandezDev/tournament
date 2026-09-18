<template>
  <div>
    <MiniHero
      title="Instalaciones"
      bg-text="instalaciones"
      description="Un local pensado para jugar en serio: setups de alto rendimiento y un ambiente hecho por y para gamers."
      icon-name="i-heroicons-building-storefront"
      theme="white"
      button-text="Reservar PC"
      button-link="/reservas"
      secondary-button-text="Instagram"
      secondary-button-link="https://www.instagram.com/gamingproject.es/"
    />

    <!-- GALERÍA A PANTALLA COMPLETA -->
    <InstallationsGalleryGrid />

    <!-- SECCIÓN EQUIPAMIENTO / SPECS A PANTALLA COMPLETA (FULL WIDTH) -->
    <InstallationsPcSpecs />

    <!-- RESTO DE SECCIONES CON MÁRGENES Y ANCHO CONTENIDO -->
    <div class="max-w-[1380px] mx-auto px-4 sm:px-6 space-y-16">
      <!-- Agrega aquí otros componentes que requieran margen lateral -->
    </div>

    <div id="ubicacion">
      <InstallationsLocationMap />
    </div>
  </div>
</template>