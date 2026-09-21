import type { RouterConfig } from '@nuxt/schema'
import { START_LOCATION } from 'vue-router'

// Cada cambio de página empieza siempre arriba del todo. El scroll se aplica
// cuando la página anterior ya ha desaparecido (transición out-in), de modo que
// nunca se ve el salto ni un efecto de "subida".
export default <RouterConfig>{
  scrollBehavior (to, from) {
    const nuxtApp = useNuxtApp()

    const target = to.hash
      ? { el: to.hash, top: 96, behavior: 'smooth' as const }
      : { left: 0, top: 0, behavior: 'instant' as const }

    if (to.path === from.path) {
      return to.hash ? target : false
    }

    if (from === START_LOCATION) {
      return to.hash ? { ...target, behavior: 'instant' as const } : target
    }

    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce('page:loading:end', () => {
        const transitionPromise = nuxtApp['~transitionPromise']
        const scroll = () => requestAnimationFrame(() => resolve(to.hash ? { ...target, behavior: 'instant' as const } : target))
        transitionPromise ? transitionPromise.then(scroll) : scroll()
      })
    })
  }
}
