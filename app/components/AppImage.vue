<template>
  <NuxtPicture
    :src="src"
    :width="width"
    :height="height"
    :sizes="resolvedSizes"
    :densities="densities"
    :quality="quality"
    :fit="fit"
    format="webp"
    :alt="alt"
    :loading="priority ? 'eager' : 'lazy'"
    decoding="async"
    :img-attrs="imgAttrs"
  />
</template>

<script setup>
defineOptions({ inheritAttrs: false })

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: undefined },
  height: { type: [String, Number], default: undefined },
  sizes: { type: String, default: undefined },
  densities: { type: String, default: undefined },
  quality: { type: [String, Number], default: undefined },
  fit: { type: String, default: 'inside' },
  priority: { type: Boolean, default: false }
})

const attrs = useAttrs()

// NuxtPicture sin `sizes` genera candidatos para todas las pantallas; con `width` usamos un único tamaño fijo
const resolvedSizes = computed(() => props.sizes ?? (props.width ? `xs:${props.width}px` : undefined))

const imgAttrs = computed(() => ({
  ...attrs,
  ...(props.priority ? { fetchpriority: 'high' } : {})
}))
</script>
