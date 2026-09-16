<template>
  <div class="max-w-[1380px] mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-14">
    <ProfileBanner />
    <ProfileTournamentWidgets :tournaments="myTournaments" title="Mis Torneos" />
    <ProfileRewardsShop />
  </div>
</template>

<script setup>
const myTournaments = useMyTournaments()
</script>
