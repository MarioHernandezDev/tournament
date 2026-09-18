<template>
  <button
    type="button"
    @click="$emit('click')"
    class="group/pod relative flex flex-col items-center gap-2.5 transition-transform duration-300 ease-out"
    :class="selected ? 'scale-105' : 'hover:scale-105'"
  >
    <span
      class="relative flex items-center justify-center rounded-full border-2 font-mono font-black transition-all duration-300"
      :class="[sizeClasses, colorClasses]"
    >
      {{ shortLabel }}

      <span
        v-if="selected"
        class="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-md"
      >
        <UIcon name="i-heroicons-check" class="w-3.5 h-3.5" :class="accent === 'amber' ? 'text-amber-600' : 'text-cyan-600'" />
      </span>
    </span>

    <span
      v-if="title"
      class="text-[11px] sm:text-xs font-['Rajdhani'] font-bold uppercase tracking-wide text-center leading-tight max-w-[7rem]"
      :class="selected ? 'text-white' : 'text-zinc-400 group-hover/pod:text-zinc-200'"
    >
      {{ title }}
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  shortLabel: { type: String, default: '' },
  title: { type: String, default: '' },
  selected: { type: Boolean, default: false },
  accent: { type: String, default: 'cyan' },
  size: { type: String, default: 'md' }
})

defineEmits(['click'])

const sizeClasses = computed(() => ({
  sm: 'w-12 h-12 sm:w-14 sm:h-14 text-[11px]',
  md: 'w-16 h-16 sm:w-20 sm:h-20 text-sm',
  lg: 'w-24 h-24 sm:w-28 sm:h-28 text-base'
}[props.size] || 'w-16 h-16 text-sm'))

const colorClasses = computed(() => {
  const isAmber = props.accent === 'amber'

  if (props.selected) {
    return isAmber
      ? 'bg-gradient-to-br from-amber-300 to-amber-500 border-amber-200 text-zinc-950 shadow-[0_0_25px_rgba(251,191,36,0.45)]'
      : 'bg-gradient-to-br from-cyan-300 to-cyan-500 border-cyan-200 text-zinc-950 shadow-[0_0_25px_rgba(34,211,238,0.45)]'
  }

  return isAmber
    ? 'bg-zinc-900 border-zinc-700/80 text-amber-300/70 hover:border-amber-400/60 hover:text-amber-300'
    : 'bg-zinc-900 border-zinc-700/80 text-zinc-300 hover:border-cyan-400/60 hover:text-cyan-200'
})
</script>
