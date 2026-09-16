<template>
  <div>
    <MiniHero
      title="Instalaciones"
      bg-text="instalaciones"
      description="Un local pensado para competir: setups de alto rendimiento, sala de torneos y un ambiente hecho por y para gamers."
      icon-name="i-heroicons-building-storefront"
      theme="white" 
      button-text="Reservar PC"
      button-link="#ubicacion"
      secondary-button-text="Ver Torneos"
      secondary-button-link="/torneos"
    />

    <!-- GALERÍA A PANTALLA COMPLETA (FULLWIDTH SIN MÁRGENES) -->
    <InstallationsGalleryGrid />

    <!-- RESTO DE SECCIONES CON MÁRGENES Y ANCHO CONTENIDO -->
    <div class="max-w-[1380px] mx-auto px-4 sm:px-6 py-14 space-y-16">
      <InstallationsPcSpecs />
      
    </div>

    <div id="ubicacion">
        <InstallationsLocationMap />
      </div>

          <HomeFinalCTA />

  </div>
</template>