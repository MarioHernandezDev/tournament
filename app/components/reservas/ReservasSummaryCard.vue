<template>
  <div class="bg-zinc-950 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_30px_rgba(34,211,238,0.08)] space-y-6">
    <div class="border-b border-zinc-800 pb-4">
      <span class="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">RESUMEN DE RESERVA</span>
      <h3 class="font-['Rajdhani'] text-3xl font-black uppercase text-white">Tu Ticket</h3>
    </div>

    <div class="space-y-4 text-sm font-mono">
      <div class="flex justify-between border-b border-zinc-900 pb-2">
        <span class="text-zinc-500">JUGADOR:</span>
        <span class="text-white font-bold">{{ username || '---' }}</span>
      </div>
      <div class="flex justify-between border-b border-zinc-900 pb-2">
        <span class="text-zinc-500">FECHA:</span>
        <span class="text-cyan-400 font-bold">{{ date || '---' }}</span>
      </div>
      <div class="flex justify-between border-b border-zinc-900 pb-2">
        <span class="text-zinc-500">HORA INICIO:</span>
        <span class="text-cyan-400 font-bold">{{ time || '---' }}</span>
      </div>
      <div class="flex justify-between border-b border-zinc-900 pb-2">
        <span class="text-zinc-500">EQUIPO / SEAT:</span>
        <span class="text-white font-bold text-right">{{ seatLabel }}</span>
      </div>
    </div>

    <!-- BOTÓN DE CONFIRMACIÓN -->
    <button
      type="submit"
      :disabled="isSubmitting"
      class="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-950 font-['Rajdhani'] font-black text-lg uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
    >
      <UIcon v-if="isSubmitting" name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin" />
      <span>{{ isSubmitting ? 'Procesando...' : 'Confirmar Reserva' }}</span>
    </button>

    <!-- BOTÓN WHATSAPP -->
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener"
      class="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-emerald-400 font-['Rajdhani'] font-black text-sm uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 group"
    >
      <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5 group-hover:scale-110 transition-transform" />
      <span>Consultar por WhatsApp</span>
    </a>

    <!-- MENSAJE DE FEEDBACK -->
    <div v-if="successMessage" class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs text-center font-mono">
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  username: String,
  date: String,
  time: String,
  seatLabel: String,
  isSubmitting: Boolean,
  successMessage: String
})

const whatsappUrl = computed(() => {
  const phone = '34600000000' // Reemplazar por número real
  const text = `Hola Gaming Project, quiero consultar/reservar:\n- Jugador: ${props.username || 'Sin indicar'}\n- Fecha: ${props.date}\n- Hora: ${props.time}\n- Puesto: ${props.seatLabel}`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
})
</script>