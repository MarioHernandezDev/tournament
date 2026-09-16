<template>
  <div class="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black pb-24 overflow-hidden">
    
    <!-- ANIMACIÓN DE PARTÍCULAS ESTILO HERO (CANVAS) -->
    <BackgroundBlackhole :theme="selectedGame === 'valorant' ? 'gold' : 'blue'" />

    <!-- OVERLAY DE REJILLA TÁCTICA Y GRADIENTE DE PROFUNDIDAD -->
    <div class="pointer-events-none fixed inset-0 z-0">
      <div class="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px]" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
    </div>

    <!-- CONTENIDO DE LA PÁGINA -->
    <div class="relative z-10">
      <RanksHeader v-model:selectedGame="selectedGame" />

      <div class="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-12">
        <RanksPodium :teams="topThreeTeams" />

        <div class="space-y-6">
          <div class="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase tracking-wider text-white flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              Clasificación General <span class="text-zinc-600">//</span> {{ selectedGame === 'valorant' ? 'VALORANT' : 'LEAGUE OF LEGENDS' }}
            </h2>
            <span class="text-xs font-mono text-zinc-400 hidden sm:inline-block">
              DESPLEGAR FILA PARA CONSULTAR ROSTER
            </span>
          </div>

          <RanksLeaderboardTable :teams="leaderboardList" />
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedGame = ref('valorant')

// Mocks con URLs de imágenes de logotipos e insignias de rango
const leaderboardData = ref({
  valorant: [
    { 
      rank: 1, 
      name: 'KRÜ Esports', 
      tag: 'KRU', 
      points: 2850, 
      tier: 'Radiante', 
      tierBadge: 'https://raw.githubusercontent.com/PKHetag/valorant-ranks-svg/main/ranks/radiant.svg',
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=KRU',
      winrate: 78, 
      tournamentsWon: 5, 
      matchesPlayed: 42, 
      trend: 'up', 
      roster: ['Nagzet', 'Klaus', 'Melser', 'keznit', 'Heat'] 
    },
    { 
      rank: 2, 
      name: 'Fnatic Academy', 
      tag: 'FNC', 
      points: 2620, 
      tier: 'Radiante', 
      tierBadge: 'https://raw.githubusercontent.com/PKHetag/valorant-ranks-svg/main/ranks/radiant.svg',
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=FNC',
      winrate: 74, 
      tournamentsWon: 4, 
      matchesPlayed: 38, 
      trend: 'same', 
      roster: ['Boaster', 'Derke', 'Chronicle', 'Alfajer', 'Leo'] 
    },
    { 
      rank: 3, 
      name: 'KOI Tactics', 
      tag: 'KOI', 
      points: 2410, 
      tier: 'Ascendente III', 
      tierBadge: 'https://raw.githubusercontent.com/PKHetag/valorant-ranks-svg/main/ranks/ascendant_3.svg',
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=KOI',
      winrate: 69, 
      tournamentsWon: 3, 
      matchesPlayed: 35, 
      trend: 'up', 
      roster: ['Marky', 'Shadow', 'Grubinho', 'kamyk', 'Patitek'] 
    },
    { 
      rank: 4, 
      name: 'Heretics Rising', 
      tag: 'TH', 
      points: 2180, 
      tier: 'Ascendente II', 
      tierBadge: 'https://raw.githubusercontent.com/PKHetag/valorant-ranks-svg/main/ranks/ascendant_2.svg',
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=TH',
      winrate: 65, 
      tournamentsWon: 2, 
      matchesPlayed: 30, 
      trend: 'down', 
      roster: ['Boo', 'benjyfishy', 'riens', 'Wo0t', 'paTiTek'] 
    }
  ],
  lol: [
    { 
      rank: 1, 
      name: 'T1 Challengers', 
      tag: 'T1', 
      points: 3100, 
      tier: 'Challenger', 
      tierBadge: 'https://raw.githubusercontent.com/PKHetag/valorant-ranks-svg/main/ranks/radiant.svg',
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=T1',
      winrate: 82, 
      tournamentsWon: 6, 
      matchesPlayed: 40, 
      trend: 'same', 
      roster: ['Zeus', 'Oner', 'Faker', 'Gumayusi', 'Keria'] 
    },
    { 
      rank: 2, 
      name: 'G2 Esports', 
      tag: 'G2', 
      points: 2790, 
      tier: 'Grandmaster', 
      tierBadge: 'https://raw.githubusercontent.com/PKHetag/valorant-ranks-svg/main/ranks/ascendant_3.svg',
      logo: 'https://api.dicebear.com/7.x/identicon/svg?seed=G2',
      winrate: 76, 
      tournamentsWon: 4, 
      matchesPlayed: 36, 
      trend: 'up', 
      roster: ['BB', 'Yike', 'Caps', 'Hans Sama', 'Mikyx'] 
    }
  ]
})

const leaderboardList = computed(() => leaderboardData.value[selectedGame.value] || [])
const topThreeTeams = computed(() => leaderboardList.value.slice(0, 3))
</script>