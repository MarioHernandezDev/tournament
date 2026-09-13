<template>
  <div>
    <!-- HERO FULLWIDTH (Fuera del contenedor centrado) -->
    <MiniHero
      title="Torneos de Lolete"
      description="Forja tu leyenda en la Grieta del Invocador. Compite en torneos 5v5, demuestra tu nivel estratégico y escala posiciones."
      icon-name="i-simple-icons-leagueoflegends"
      bg-image="/img/lol-hero.png"
      theme="blue"
      button-text="Crear Torneo LoL"
      button-link="/tournaments/create?game=lol"
    />

    <!-- RESTO DE CONTENIDO (Dentro del contenedor centrado) -->
    <div class="max-w-[1380px] mx-auto px-4 sm:px-6 py-10 space-y-14">
      <UserDashboardSummary game="lol" />
      <TournamentTabs game="lol" />
      <MonthlyRankingTable game="lol" />
    </div>
  </div>
</template>