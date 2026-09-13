<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
    <!-- CABECERA -->
    <div class="space-y-2">
      <div class="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
        <UIcon :name="gameConfig.icon" class="w-4 h-4" :class="theme.text" />
        <span>{{ gameConfig.label }}</span>
      </div>
      <h1 class="font-['Rajdhani'] text-3xl sm:text-4xl font-black uppercase tracking-wide text-white">
        Crear Torneo
      </h1>
      <p class="text-zinc-400 text-sm sm:text-base">Configura tu torneo en 4 sencillos pasos.</p>
    </div>

    <!-- INDICADOR DE PASOS -->
    <div class="flex items-center">
      <template v-for="(step, index) in steps" :key="step.id">
        <div class="flex flex-col items-center gap-2 shrink-0">
          <div
            class="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-['Rajdhani'] font-black text-sm transition-all duration-300 border"
            :class="stepCircleClass(step.id)"
          >
            <UIcon v-if="step.id < currentStep" name="i-heroicons-check" class="w-5 h-5" />
            <span v-else>{{ step.id }}</span>
          </div>
          <span
            class="hidden sm:block text-[11px] uppercase tracking-wider font-semibold text-center w-20"
            :class="step.id <= currentStep ? 'text-zinc-300' : 'text-zinc-600'"
          >
            {{ step.label }}
          </span>
        </div>
        <div
          v-if="index < steps.length - 1"
          class="flex-1 h-0.5 mx-1 sm:mx-2 rounded-full transition-colors duration-300"
          :class="step.id < currentStep ? theme.bg : 'bg-zinc-800'"
        />
      </template>
    </div>

    <!-- CONTENIDO DEL PASO -->
    <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-6 sm:p-8 space-y-6">
      <!-- PASO 1: NOMBRE Y BANNER -->
      <div v-if="currentStep === 1" class="space-y-6">
        <h2 class="font-['Rajdhani'] text-xl font-black uppercase tracking-wide text-white">
          Nombre y Banner
        </h2>

        <div class="space-y-2">
          <label class="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Nombre del torneo</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Ej. Baron Nashor Cup #2"
            class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
          >
        </div>

        <div class="space-y-2">
          <label class="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Logo / Banner</label>
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div class="relative w-full sm:w-48 aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0">
              <img :src="bannerPreview || gameConfig.defaultBanner" alt="" class="w-full h-full object-cover">
            </div>
            <label
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-700 text-sm font-semibold text-zinc-300 hover:text-white hover:border-zinc-500 cursor-pointer transition-colors"
            >
              <UIcon name="i-heroicons-arrow-up-tray" class="w-4 h-4" />
              Subir imagen
              <input type="file" accept="image/*" class="hidden" @change="onBannerChange">
            </label>
          </div>
          <p class="text-xs text-zinc-600">Si no subes una imagen se usará el banner por defecto de {{ gameConfig.label }}.</p>
        </div>
      </div>

      <!-- PASO 2: FORMATO -->
      <div v-else-if="currentStep === 2" class="space-y-6">
        <h2 class="font-['Rajdhani'] text-xl font-black uppercase tracking-wide text-white">
          Formato
        </h2>

        <div class="space-y-2">
          <label class="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Tipo de enfrentamiento</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="option in matchTypeOptions"
              :key="option"
              type="button"
              class="px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide border transition-colors"
              :class="form.matchType === option ? [theme.bg, theme.bgSolidText, 'border-transparent'] : 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'"
              @click="form.matchType = option"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Sistema de eliminación</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="option in bracketOptions"
              :key="option"
              type="button"
              class="px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide border transition-colors"
              :class="form.bracketType === option ? [theme.bg, theme.bgSolidText, 'border-transparent'] : 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'"
              @click="form.bracketType = option"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>

      <!-- PASO 3: EQUIPOS Y FECHA -->
      <div v-else-if="currentStep === 3" class="space-y-6">
        <h2 class="font-['Rajdhani'] text-xl font-black uppercase tracking-wide text-white">
          Equipos y Fecha
        </h2>

        <div class="space-y-2">
          <label class="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Máximo de equipos</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="option in maxTeamsOptions"
              :key="option"
              type="button"
              class="px-6 py-2.5 rounded-full text-sm font-bold border transition-colors"
              :class="form.maxTeams === option ? [theme.bg, theme.bgSolidText, 'border-transparent'] : 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600'"
              @click="form.maxTeams = option"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Fecha de inicio</label>
            <input
              v-model="form.startDate"
              type="date"
              class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-600 [color-scheme:dark]"
            >
          </div>
          <div class="space-y-2">
            <label class="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Hora de inicio</label>
            <input
              v-model="form.startTime"
              type="time"
              class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-zinc-600 [color-scheme:dark]"
            >
          </div>
        </div>
      </div>

      <!-- PASO 4: PREMIOS -->
      <div v-else class="space-y-6">
        <h2 class="font-['Rajdhani'] text-xl font-black uppercase tracking-wide text-white">
          Bolsa de Premios
        </h2>

        <div class="space-y-2">
          <label class="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Recompensa para los ganadores</label>
          <input
            v-model="form.prizePool"
            type="text"
            placeholder="Ej. 500.000 RP + Aspectos Exclusivos"
            class="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
          >
        </div>

        <!-- RESUMEN -->
        <div class="rounded-xl border p-5 space-y-2.5" :class="[theme.border, theme.bgSoft]">
          <p class="text-xs uppercase tracking-wider font-semibold" :class="theme.text">Resumen del torneo</p>
          <p class="text-white font-bold font-['Rajdhani'] text-lg">{{ form.name || 'Sin nombre' }}</p>
          <ul class="text-sm text-zinc-400 space-y-1">
            <li>{{ form.matchType }} &middot; {{ form.bracketType }}</li>
            <li>Hasta {{ form.maxTeams }} equipos</li>
            <li v-if="form.startDate && form.startTime">{{ formattedStart }}</li>
            <li v-if="form.prizePool">Premio: {{ form.prizePool }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- NAVEGACIÓN -->
    <div class="flex items-center justify-between gap-4">
      <button
        type="button"
        class="px-6 py-3 rounded-full font-['Rajdhani'] font-black text-sm uppercase tracking-wider border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors disabled:opacity-30 disabled:pointer-events-none"
        :disabled="currentStep === 1"
        @click="currentStep--"
      >
        Anterior
      </button>

      <button
        v-if="currentStep < steps.length"
        type="button"
        class="inline-flex items-center gap-2 px-7 py-3 rounded-full font-['Rajdhani'] font-black text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
        :class="[theme.bg, theme.bgHover, theme.bgSolidText]"
        :disabled="!isStepValid"
        @click="currentStep++"
      >
        Siguiente
        <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
      </button>

      <button
        v-else
        type="button"
        class="inline-flex items-center gap-2 px-7 py-3 rounded-full font-['Rajdhani'] font-black text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
        :class="[theme.bg, theme.bgHover, theme.bgSolidText]"
        :disabled="!isStepValid"
        @click="handleSubmit"
      >
        <UIcon name="i-heroicons-check-circle" class="w-4 h-4" />
        Crear Torneo
      </button>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const gameId = computed(() => (['lol', 'valorant'].includes(route.query.game) ? route.query.game : 'lol'))
const gameConfig = computed(() => useGameConfig(gameId.value))
const theme = computed(() => useGameTheme(gameConfig.value.theme))

const { addTournament } = useTournaments()

const steps = [
  { id: 1, label: 'Nombre y Banner' },
  { id: 2, label: 'Formato' },
  { id: 3, label: 'Equipos y Fecha' },
  { id: 4, label: 'Premios' }
]

const matchTypeOptions = ['1v1', '5v5']
const bracketOptions = ['Eliminación Directa', 'Doble Eliminación']
const maxTeamsOptions = [8, 16, 32]

const currentStep = ref(1)
const bannerPreview = ref('')

const form = reactive({
  name: '',
  matchType: '5v5',
  bracketType: 'Eliminación Directa',
  maxTeams: 16,
  startDate: '',
  startTime: '',
  prizePool: ''
})

const onBannerChange = (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  bannerPreview.value = URL.createObjectURL(file)
}

const formattedStart = computed(() => {
  if (!form.startDate || !form.startTime) return ''
  return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    .format(new Date(`${form.startDate}T${form.startTime}`))
})

const isStepValid = computed(() => {
  if (currentStep.value === 1) return form.name.trim().length > 0
  if (currentStep.value === 2) return Boolean(form.matchType && form.bracketType)
  if (currentStep.value === 3) return Boolean(form.maxTeams && form.startDate && form.startTime)
  return form.prizePool.trim().length > 0
})

const stepCircleClass = (stepId) => {
  if (stepId < currentStep.value) return [theme.value.bg, theme.value.bgSolidText, 'border-transparent']
  if (stepId === currentStep.value) return [theme.value.border, theme.value.text, 'bg-zinc-900']
  return 'border-zinc-800 text-zinc-600 bg-zinc-950'
}

const matchTypeToMode = (matchType) => {
  const found = gameConfig.value.modes.find((mode) => mode.toLowerCase().startsWith(matchType.toLowerCase()))
  return found || gameConfig.value.modes[0]
}

const handleSubmit = () => {
  if (!isStepValid.value) return

  addTournament({
    game: gameId.value,
    name: form.name.trim(),
    banner: bannerPreview.value || gameConfig.value.defaultBanner,
    mode: matchTypeToMode(form.matchType),
    format: form.bracketType,
    maxTeams: form.maxTeams,
    startDate: `${form.startDate}T${form.startTime}:00`,
    prizePool: form.prizePool.trim()
  })

  navigateTo(`/${gameId.value}`)
}
</script>
