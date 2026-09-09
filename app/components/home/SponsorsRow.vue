<template>
  <div class="w-full bg-black border-y border-zinc-900 py-12 overflow-hidden select-none">
    
    <!-- BANNER CON SCROLL INFINITO (MARQUEE) -->
    <div class="relative w-full overflow-hidden flex">
      
      <!-- Degradados laterales para suavizar la entrada y salida de las marcas -->
      <div class="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div class="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <!-- PISTA DE ANIMACIÓN -->
      <div class="flex shrink-0 items-center gap-16 sm:gap-24 animate-marquee whitespace-nowrap">
        
        <!-- PRIMERA TANDA DE MARCAS -->
        <div 
          v-for="(sponsor, index) in sponsors" 
          :key="'a-' + index"
          class="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors duration-300 opacity-60 hover:opacity-100 cursor-pointer group"
        >
          <UIcon :name="sponsor.icon" class="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform" />
          <span class="font-['Rajdhani'] font-black text-2xl sm:text-3xl uppercase tracking-wider">
            {{ sponsor.name }}
          </span>
        </div>

        <!-- SEGUNDA TANDA DUPLICADA (Para bucle infinito perfecto) -->
        <div 
          v-for="(sponsor, index) in sponsors" 
          :key="'b-' + index"
          class="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors duration-300 opacity-60 hover:opacity-100 cursor-pointer group"
        >
          <UIcon :name="sponsor.icon" class="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform" />
          <span class="font-['Rajdhani'] font-black text-2xl sm:text-3xl uppercase tracking-wider">
            {{ sponsor.name }}
          </span>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
const sponsors = [
  { name: 'Twitch', icon: 'i-simple-icons-twitch' },
  { name: 'Discord', icon: 'i-simple-icons-discord' },
  { name: 'Nvidia', icon: 'i-simple-icons-nvidia' },
  { name: 'Logitech', icon: 'i-simple-icons-logitech' },
  { name: 'Red Bull', icon: 'i-simple-icons-redbull' },
  { name: 'Riot Games', icon: 'i-simple-icons-riotgames' },
  { name: 'Intel', icon: 'i-simple-icons-intel' }
]
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 25s linear infinite;
}

/* Pausa el desplazamiento cuando el usuario pasa el ratón por encima */
.animate-marquee:hover {
  animation-play-state: paused;
}
</style>