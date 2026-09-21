<template>
  <div
    v-if="!isAppLoaded"
    ref="rootRef"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 touch-none overscroll-none select-none"
    :class="{ 'pointer-events-none': leaving }"
    role="progressbar"
    aria-label="Cargando Project Gaming"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-valuenow="0"
  >
    <div class="relative flex flex-col items-center gap-10 px-6">
      <!-- LOGO WEBP NÍTIDO (SIN COMPRESIÓN NI REESCALADO DE IPX) -->
      <img
        src="/img/logo.webp"
        alt="Project Gaming Logo"
        class="preloader-logo h-12 sm:h-14 w-auto object-contain opacity-90 transition-opacity"
      />

      <!-- BARRA DE CARGA ULTRA FINA Y CONTADOR ELEGANTE -->
      <div class="w-48 sm:w-64 space-y-3">
        <div class="h-[1.5px] w-full rounded-full bg-zinc-900 overflow-hidden">
          <div
            ref="barRef"
            class="h-full w-full origin-left rounded-full bg-zinc-100"
            style="transform: scaleX(0)"
          ></div>
        </div>
        
        <div class="flex items-center justify-between font-['Rajdhani'] font-medium uppercase tracking-[0.4em] text-[10px] text-zinc-500">
          <span>Cargando</span>
          <span class="text-zinc-300 font-mono tabular-nums"><span ref="percentRef">0</span>%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const MIN_DURATION = 1000 // ms mínimos en pantalla
const MAX_DURATION = 6000 // ms máximos de espera (failsafe)

const isAppLoaded = useAppLoaded()

const rootRef = ref(null)
const barRef = ref(null)
const percentRef = ref(null)
const leaving = ref(false)

// Bloqueo de scroll mientras el preloader está activo
useHead({
  htmlAttrs: { class: computed(() => (isAppLoaded.value ? '' : 'is-preloading')) }
})

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const pageLoaded = () => new Promise((resolve) => {
  if (document.readyState === 'complete') return resolve()
  window.addEventListener('load', resolve, { once: true })
})

let ctx
let unmounted = false

onMounted(() => {
  if (isAppLoaded.value || !rootRef.value) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const counter = { value: 0 }

  const render = () => {
    const value = Math.round(counter.value)
    if (percentRef.value) percentRef.value.textContent = value
    if (barRef.value) barRef.value.style.transform = `scaleX(${counter.value / 100})`
    if (rootRef.value) rootRef.value.setAttribute('aria-valuenow', value)
  }

  const exit = () => {
    leaving.value = true
    ctx.add(() => {
      gsap.to(rootRef.value, {
        opacity: 0,
        y: reduceMotion ? 0 : -20,
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: () => { isAppLoaded.value = true }
      })
    })
  }

  ctx = gsap.context(() => {
    // Progreso suave simulado hasta el 90%
    const crawl = gsap.to(counter, { value: 90, duration: 2.8, ease: 'power2.out', onUpdate: render })

    const resourcesReady = Promise.race([
      Promise.all([pageLoaded(), document.fonts?.ready]),
      wait(MAX_DURATION)
    ])

    Promise.all([resourcesReady, wait(MIN_DURATION)]).then(() => {
      if (unmounted) return
      crawl.kill()
      ctx.add(() => {
        gsap.to(counter, { value: 100, duration: 0.35, ease: 'power1.out', onUpdate: render, onComplete: exit })
      })
    })
  }, rootRef.value)
})

onBeforeUnmount(() => {
  unmounted = true
  if (ctx) ctx.revert()
})
</script>

<style>
/* Bloqueo de scroll para evitar saltos de layout durante la carga */
html.is-preloading,
html.is-preloading body {
  overflow: hidden;
}

html.is-preloading {
  scrollbar-gutter: stable;
  background-color: #09090b; /* zinc-950 */
}
</style>