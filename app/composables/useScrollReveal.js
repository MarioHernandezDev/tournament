import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CLEAR = 'opacity,transform,transition'

export const useScrollReveal = (rootRef, setup) => {
  let ctx

  onMounted(async () => {
    await nextTick()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    ctx = gsap.context(() => {
      // Aparición sutil: fade + 15px, se dispara una sola vez al entrar en pantalla.
      const reveal = (targets, trigger = targets, { y = 15, stagger = 0.08, delay = 0, start = 'top 88%' } = {}) => {
        gsap.fromTo(
          targets,
          { opacity: 0, y, transition: 'none' },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay,
            stagger,
            ease: 'power3.out',
            clearProps: CLEAR,
            scrollTrigger: { trigger, start, once: true }
          }
        )
      }

      // Igual que reveal, pero cada elemento se dispara al llegar él mismo (rejillas largas).
      const batch = (targets, { y = 15, stagger = 0.08, start = 'top 92%' } = {}) => {
        gsap.set(targets, { opacity: 0, y, transition: 'none' })
        ScrollTrigger.batch(targets, {
          start,
          once: true,
          onEnter: (els) => gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger,
            ease: 'power3.out',
            clearProps: CLEAR,
            overwrite: true
          })
        })
      }

      setup({ gsap, ScrollTrigger, reveal, batch, root: rootRef?.value })
    }, rootRef?.value ?? undefined)

    setTimeout(() => ScrollTrigger.refresh(), 150)
  })

  onUnmounted(() => {
    if (ctx) ctx.revert()
  })
}
