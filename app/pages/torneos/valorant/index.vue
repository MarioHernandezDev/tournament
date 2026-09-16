<template>
  <div>
    <!-- HERO FULLWIDTH -->
    <MiniHero
      title="Torneos de Valorant"
      bg-text="VALORANT"
      description="Demuestra tu puntería, coordinación táctica y domina el campo de batalla en el tactical shooter competitivo de Riot Games."
      icon-name="i-simple-icons-valorant"
      bg-image="/img/chamber.png"
      theme="red"
      button-text="Crear Torneo Valorant"
      button-link="/tournaments/create?game=valorant"
    />

    <!-- RESTO DE CONTENIDO -->
    <div class="max-w-[1380px] mx-auto px-4 sm:px-6 py-10 space-y-14">
      <UserDashboardSummary game="valorant" />
      <TournamentTabs game="valorant" />
      <MonthlyRankingTable game="valorant" />
    </div>
  </div>
</template>