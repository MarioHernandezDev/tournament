<template>
  <div>
    <!-- HERO FULLWIDTH (Fuera del contenedor centrado) -->
    <MiniHero
      title="Torneos de Valorant"
      description="Demuestra tu puntería, coordinación táctica y domina el campo de batalla en el tactical shooter competitivo de Riot Games."
      icon-name="i-simple-icons-valorant"
      bg-image="/img/valorant-hero.png"
      theme="red"
      button-text="Crear Torneo Valorant"
      button-link="/tournaments/create?game=valorant"
    />

    <!-- RESTO DE CONTENIDO (Dentro del contenedor centrado) -->
    <div class="max-w-[1380px] mx-auto px-4 sm:px-6 py-10 space-y-14">
      <UserDashboardSummary game="valorant" />
      <TournamentTabs game="valorant" />
      <MonthlyRankingTable game="valorant" />
    </div>
  </div>
</template>