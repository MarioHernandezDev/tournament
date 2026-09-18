<template>
  <div class="w-full bg-zinc-950 border-y border-zinc-800/80 py-10 transition-all">
    <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
      
      <!-- CABECERA DE PASO Y ACCIÓN WHATSAPP -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-900 pb-6">
        <div class="space-y-1">

          <h2 class="font-['Rajdhani'] text-3xl sm:text-4xl font-black uppercase text-white tracking-wide">
            Identificación del Jugador
          </h2>
        </div>

        <div v-if="!username" class="flex flex-wrap items-center gap-4 bg-zinc-900/60 border border-zinc-800/80 px-5 py-3 rounded-full">
          <span class="text-xs font-mono text-zinc-400">¿No tienes cuenta aún?</span>
          <a 
            :href="whatsappUrl" 
            target="_blank"
            class="px-5 py-2 bg-cyan-400 text-black font-mono font-black text-xs uppercase rounded-full hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.25)] flex items-center gap-2"
          >
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-4 h-4" />
            Reserva por WhatsApp
          </a>
        </div>
      </div>

      <!-- FORMULARIO DE IDENTIFICACIÓN -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        <div :class="activeStep === 'details' ? 'md:col-span-8' : 'md:col-span-12'" class="space-y-2">
          
          <div class="relative">
            <UIcon name="i-heroicons-user" class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
            <input
              :value="username"
              @input="$emit('update:username', $event.target.value)"
              type="text"
              placeholder="Ej. Faker_GR, Alex99"
              class="w-full bg-zinc-900 border border-zinc-800 rounded-full py-4 pl-14 pr-6 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-all font-mono text-sm tracking-wide"
            />
          </div>
        </div>

        <!-- BOTÓN VOLVER / CAMBIAR PUESTO (SÓLO EN VISTA DETALLES) -->
        <div v-if="activeStep === 'details'" class="md:col-span-4">
          <button
            @click="$emit('change-step', 'category')"
            type="button"
            class="w-full py-4 bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono font-bold text-xs uppercase rounded-full hover:bg-zinc-800 hover:text-white hover:border-cyan-400/50 transition-all flex items-center justify-center gap-2"
          >
            <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 text-cyan-400" />
            Cambiar Puesto
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  username: String,
  activeStep: String,
  whatsappUrl: String
})

defineEmits(['update:username', 'change-step'])
</script>