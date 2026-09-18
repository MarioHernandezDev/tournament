<template>
  <div class="space-y-6">
    <!-- PASO 1: DATOS PERSONALES -->
    <div class="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
      <div class="flex items-center gap-3 border-b border-zinc-800/80 pb-4">
        <span class="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 font-mono font-bold flex items-center justify-center text-sm">01</span>
        <h3 class="font-['Rajdhani'] text-2xl font-black uppercase text-white tracking-wide">
          Datos del Jugador
        </h3>
      </div>

      <div>
        <label class="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
          Nombre de usuario / Gamer Tag <span class="text-cyan-400">*</span>
        </label>
        <div class="relative">
          <UIcon name="i-heroicons-user" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            :value="username"
            @input="$emit('update:username', $event.target.value)"
            type="text"
            required
            placeholder="Ej. Faker_GR, Alex99"
            class="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors font-medium"
          />
        </div>
      </div>
    </div>

    <!-- PASO 2: DÍA Y HORA -->
    <div class="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-6">
      <div class="flex items-center gap-3 border-b border-zinc-800/80 pb-4">
        <span class="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 font-mono font-bold flex items-center justify-center text-sm">02</span>
        <h3 class="font-['Rajdhani'] text-2xl font-black uppercase text-white tracking-wide">
          Fecha y Hora de la Sesión
        </h3>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
            Día de la reserva <span class="text-cyan-400">*</span>
          </label>
          <div class="relative">
            <UIcon name="i-heroicons-calendar" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
            <input
              :value="date"
              @input="$emit('update:date', $event.target.value)"
              type="date"
              :min="todayDate"
              required
              class="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors font-medium [color-scheme:dark]"
            />
          </div>
        </div>

        <div>
          <label class="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
            Hora de inicio <span class="text-cyan-400">*</span>
          </label>
          <div class="relative">
            <UIcon name="i-heroicons-clock" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
            <input
              :value="time"
              @input="$emit('update:time', $event.target.value)"
              type="time"
              required
              class="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors font-mono text-lg font-bold [color-scheme:dark]"
            />
          </div>
        </div>
      </div>

      <div class="space-y-2 pt-2">
        <span class="text-xs font-mono text-zinc-500 block uppercase tracking-wider">Horarios de turno habituales:</span>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="preset in timePresets"
            :key="preset"
            type="button"
            @click="$emit('update:time', preset)"
            class="px-3 py-1.5 rounded-lg border text-xs font-mono transition-all"
            :class="time === preset ? 'bg-cyan-400/20 border-cyan-400 text-cyan-300' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'"
          >
            {{ preset }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  username: String,
  date: String,
  time: String
})

defineEmits(['update:username', 'update:date', 'update:time'])

const todayDate = new Date().toISOString().split('T')[0]
const timePresets = ['16:00', '17:30', '19:00', '20:30', '22:00']
</script>