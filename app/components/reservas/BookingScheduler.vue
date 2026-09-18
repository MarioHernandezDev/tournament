<template>
  <div class="space-y-8">
    <!-- PASO DÍA -->
    <div class="space-y-3">
      <div class="flex items-center gap-2.5">
        <span class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-mono font-black" :class="stepBadgeClass">{{ dayStepNum }}</span>
        <h5 class="font-['Rajdhani'] text-lg sm:text-xl font-bold text-zinc-100">¿Qué día quieres venir?</h5>
      </div>

      <div class="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 custom-scrollbar snap-x snap-mandatory">
        <button
          v-for="day in dayOptions"
          :key="day.value"
          type="button"
          @click="localDate = day.value"
          class="snap-start shrink-0 w-23 sm:w-28  border-2 px-3 py-4 flex flex-col items-center gap-1.5 transition-all duration-300"
          :class="localDate === day.value ? selectedDayClass : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'"
        >
          <span class="text-xs font-mono uppercase tracking-widest opacity-80">{{ day.weekday }}</span>
          <span class="font-['Rajdhani'] text-2xl font-black leading-none">{{ day.dayNum }}</span>
          <span class="text-xs font-mono uppercase opacity-70">{{ day.month }}</span>
          
        </button>
      </div>

      
    </div>

    <!-- PASO HORA (aparece tras elegir día) -->
    <Transition name="step-reveal">
      <div v-if="localDate" class="step-reveal-outer">
        <div class="step-reveal-inner">
          <div class="space-y-4 pt-1">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <span class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-mono font-black" :class="stepBadgeClass">{{ timeStepNum }}</span>
                <h5 class="font-['Rajdhani'] text-lg sm:text-xl font-bold text-zinc-100">¿Cuánto tiempo te quedas?</h5>
              </div>
              
            </div>

            <div class=" border border-zinc-800/80 bg-zinc-900/50 p-5 sm:p-7 space-y-6">
              <div v-for="group in timeGroups" :key="group.label" class="space-y-3">
                <span class="text-sm font-mono uppercase tracking-widest text-zinc-400 font-bold">{{ group.label }}</span>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="time in group.slots"
                    :key="time"
                    type="button"
                    @click="selectTime(time)"
                    class="px-4 py-2.5 rounded-full border font-mono text-sm font-bold transition-all duration-200"
                    :class="slotClass(time)"
                  >
                    {{ time }}
                  </button>
                </div>
              </div>

              <div v-if="startTime && !endTime" class="flex flex-wrap items-center gap-2.5 pt-4 border-t border-zinc-800/70">
                <span class="text-sm font-mono text-zinc-400">Duración rápida:</span>
                <button
                  v-for="q in quickDurations"
                  :key="q"
                  type="button"
                  @click="setQuickDuration(q)"
                  class="px-4 py-2 rounded-full text-sm font-mono font-bold border transition-all"
                  :class="quickDurationClass"
                >
                  {{ q }}h
                </button>
              </div>

              <p class="text-sm text-zinc-400 flex items-center gap-2 pt-1">
                <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="accentBgClass" />
                Horario disponible este día: <span class="text-zinc-200 font-bold">{{ closesLabelFull }}</span>
              </p>
            </div>


          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  date: { type: String, default: null },
  startTime: { type: String, default: null },
  endTime: { type: String, default: null },
  accent: { type: String, default: 'cyan' },
  pricePerHour: { type: Number, default: 0 },
  seatsCount: { type: Number, default: 0 },
  startStep: { type: Number, default: 1 }
})

const dayStepNum = computed(() => props.startStep)
const timeStepNum = computed(() => props.startStep + 1)

const emit = defineEmits(['update:date', 'update:startTime', 'update:endTime'])

const localDate = computed({
  get: () => props.date,
  set: (value) => emit('update:date', value)
})

const isWeekendNight = (dateStr) => {
  if (!dateStr) return false
  const [year, month, day] = dateStr.split('-').map(Number)
  const dayOfWeek = new Date(year, month - 1, day).getDay()
  return dayOfWeek === 5 || dayOfWeek === 6
}

const closesLabel = (dateStr) => (isWeekendNight(dateStr) ? 'Hasta 01:00' : 'Hasta 23:00')
const closesLabelFull = computed(() => (isWeekendNight(props.date) ? '11:00 a 01:00' : '11:00 a 23:00'))

const dayOptions = computed(() => {
  const options = []
  const base = new Date()
  base.setHours(0, 0, 0, 0)

  for (let i = 0; i < 8; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    const value = d.toISOString().split('T')[0]

    options.push({
      value,
      weekday: d.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', ''),
      dayNum: d.getDate(),
      month: d.toLocaleDateString('es-ES', { month: 'short' }).replace('.', ''),
      closesLabel: closesLabel(value)
    })
  }

  return options
})

const availableTimeSlots = computed(() => {
  if (!props.date) return []
  const slots = []

  for (let hour = 11; hour <= 23; hour++) {
    const h = hour < 10 ? `0${hour}` : `${hour}`
    slots.push(`${h}:00`, `${h}:30`)
  }

  if (isWeekendNight(props.date)) {
    slots.push('00:00', '00:30', '01:00')
  }

  return slots
})

const timeGroups = computed(() => {
  const slots = availableTimeSlots.value
  const groups = [
    { label: 'Tarde · 11:00 - 17:00', test: (h) => h >= 11 && h < 17 },
    { label: 'Noche · 17:00 - 21:00', test: (h) => h >= 17 && h < 21 },
    { label: 'Madrugada · 21:00 - Cierre', test: (h) => h >= 21 || h < 11 }
  ]

  return groups
    .map((group) => ({
      label: group.label,
      slots: slots.filter((time) => group.test(Number(time.split(':')[0])))
    }))
    .filter((group) => group.slots.length)
})

const timeToMinutes = (timeStr) => {
  if (!timeStr) return -1
  const [h, m] = timeStr.split(':').map(Number)
  const hourVal = h < 11 ? h + 24 : h
  return hourVal * 60 + m
}

const minutesToTime = (mins) => {
  const total = ((mins % 1440) + 1440) % 1440
  const hh = Math.floor(total / 60) % 24
  const mm = total % 60
  return `${hh < 10 ? '0' + hh : hh}:${mm < 10 ? '0' + mm : mm}`
}

const selectTime = (time) => {
  if (!props.startTime || (props.startTime && props.endTime)) {
    emit('update:startTime', time)
    emit('update:endTime', null)
    return
  }

  if (timeToMinutes(time) < timeToMinutes(props.startTime)) {
    emit('update:startTime', time)
    emit('update:endTime', null)
    return
  }

  if (time === props.startTime) {
    emit('update:startTime', null)
    emit('update:endTime', null)
    return
  }

  emit('update:endTime', time)
}

const slotClass = (time) => {
  const cur = timeToMinutes(time)
  const startMin = timeToMinutes(props.startTime)
  const endMin = timeToMinutes(props.endTime)
  const isStart = props.startTime === time
  const isEnd = props.endTime === time
  const inRange = startMin !== -1 && endMin !== -1 && cur > startMin && cur < endMin

  if (isStart || isEnd) {
    return props.accent === 'amber'
      ? 'bg-amber-400 text-zinc-950 border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-105'
      : 'bg-cyan-400 text-zinc-950 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] scale-105'
  }
  if (inRange) {
    return props.accent === 'amber'
      ? 'bg-amber-400/15 text-amber-200 border-amber-400/40'
      : 'bg-cyan-400/15 text-cyan-200 border-cyan-400/40'
  }
  return 'bg-zinc-950/60 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
}

const quickDurations = [1, 2, 3, 4]

const setQuickDuration = (hours) => {
  if (!props.startTime) return
  const candidate = minutesToTime(timeToMinutes(props.startTime) + hours * 60)
  const slots = availableTimeSlots.value
  const target = slots.includes(candidate) ? candidate : slots[slots.length - 1]
  emit('update:endTime', target)
}

const quickDurationClass = computed(() =>
  props.accent === 'amber'
    ? 'bg-zinc-950 border-zinc-700 text-zinc-300 hover:border-amber-400/60 hover:text-amber-200'
    : 'bg-zinc-950 border-zinc-700 text-zinc-300 hover:border-cyan-400/60 hover:text-cyan-200'
)

const durationLabel = computed(() => {
  if (!props.startTime || !props.endTime) return ''
  const diff = timeToMinutes(props.endTime) - timeToMinutes(props.startTime)
  if (diff <= 0) return ''
  const h = Math.floor(diff / 60)
  const m = diff % 60
  return m ? `${h}h ${m}min` : `${h}h`
})

const priceEstimate = computed(() => {
  if (!props.startTime || !props.endTime || !props.pricePerHour || !props.seatsCount) return ''
  const diff = timeToMinutes(props.endTime) - timeToMinutes(props.startTime)
  if (diff <= 0) return ''
  const hours = diff / 60
  const total = hours * props.pricePerHour * props.seatsCount
  return `${total.toFixed(2)}€`
})

const stepBadgeClass = computed(() =>
  props.accent === 'amber'
    ? 'bg-amber-400/15 text-amber-300 border border-amber-400/40'
    : 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/40'
)
const accentTextClass = computed(() => (props.accent === 'amber' ? 'text-amber-300' : 'text-cyan-300'))
const accentBgClass = computed(() => (props.accent === 'amber' ? 'bg-amber-400' : 'bg-cyan-400'))
const summaryBorderClass = computed(() =>
  props.accent === 'amber' ? 'border-amber-500/30 bg-amber-950/30' : 'border-cyan-500/30 bg-cyan-950/40'
)
const selectedDayClass = computed(() =>
  props.accent === 'amber'
    ? 'bg-gradient-to-b from-amber-300 to-amber-500 border-amber-200 text-zinc-950 shadow-[0_0_20px_rgba(251,191,36,0.35)]'
    : 'bg-gradient-to-b from-cyan-300 to-cyan-500 border-cyan-200 text-zinc-950 shadow-[0_0_20px_rgba(34,211,238,0.35)]'
)
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.25);
  border-radius: 999px;
}

/* Revelado del paso de hora tras elegir día, sin saltos de altura */
.step-reveal-outer {
  display: grid;
  grid-template-rows: 1fr;
}

.step-reveal-enter-active,
.step-reveal-leave-active {
  transition: grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
  opacity: 1;
}

.step-reveal-enter-from,
.step-reveal-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}

.step-reveal-inner {
  overflow: hidden;
  min-height: 0;
}
</style>
