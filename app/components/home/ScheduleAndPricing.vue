<template>
  <section ref="sectionRef" class="w-full bg-black text-zinc-100 font-sans relative overflow-hidden">
    
    <!-- TRIÁNGULO EN DIAGONAL COMPLETO -->
    <div 
      class="absolute inset-0 pointer-events-none z-0 bg-gradient-to-bl from-zinc-800/80 via-zinc-900/50 to-zinc-900/20"
      style="clip-path: polygon(100% 0, 100% 100%, 0 100%);"
    />

    <div class="relative z-10 w-full pb-20 space-y-16 sm:space-y-20">

      <!-- ==================== 1. GRID DE FOTOS DE ZONAS / INSTALACIONES ==================== -->
      <div class="w-full space-y-10">
        <div class="zones-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
          <div 
            v-for="zone in schedule.zones" 
            :key="zone.id"
            @click="openModal(zone)"
            class="zone-card group relative w-full h-[400px] sm:h-[480px] overflow-hidden cursor-pointer border-b sm:border-b-0 sm:border-r border-zinc-900 last:border-none"
          >
            <AppImage 
              :src="zone.image" 
              :alt="zone.name"
              width="854"
              height="480"
              sizes="xs:711px sm:854px"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 contrast-110"
            />
            
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

            <div class="absolute inset-0 p-8 flex items-end z-10">
              <h3 class="font-['Rajdhani'] text-3xl font-black text-white uppercase group-hover:text-cyan-300 transition-colors">
                {{ zone.name }}
              </h3>
            </div>
          </div>
        </div>

        <!-- BOTÓN DE NAVEGACIÓN A INSTALACIONES -->
        <div class="zones-btn flex justify-center pt-4 px-6">
          <NuxtLink
            to="/instalaciones"
            class="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-zinc-950 font-['Rajdhani'] font-black text-lg uppercase tracking-wider transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Ver Instalaciones Completas</span>
            <UIcon 
              name="i-heroicons-arrow-up-right" 
              class="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
            />
          </NuxtLink>
        </div>
      </div>

      <!-- SEPARADOR ESTILO INDUSTRIAL -->
      <div class="w-full px-6 sm:px-12 lg:px-20 flex items-center gap-6">
        <div class="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent flex-1" />
      </div>

      <!-- ==================== 2. SECCIÓN DE TARIFAS Y PRECIOS ==================== -->
      <div class="w-full px-4 sm:px-8 lg:px-20 space-y-12">
        <div class="pricing-header flex flex-col items-center text-center space-y-3">
          <h2 class="font-['Rajdhani'] text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            PRECIOS POR ZONA
          </h2>
          <p class="text-zinc-400 text-sm sm:text-base max-w-2xl font-medium">
            Tarifas transparentes adaptadas a cada configuración. Elige tu zona y salta a la partida.
          </p>
        </div>

        <!-- BANDA DE PRECIOS CONTINUA -->
        <div class="pricing-container space-y-6 max-w-6xl mx-auto">
          <div 
            v-for="pricing in prices" 
            :key="pricing.zone"
            class="price-row group relative bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 border-y sm:border border-zinc-800/80 hover:border-cyan-400/60 p-6 sm:p-8 transition-all duration-500 shadow-2xl overflow-hidden"
            style="clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px));"
          >
            <!-- Detalle decorativo de esquina biselada -->
            <div class="absolute top-0 right-0 w-4 h-4 bg-cyan-400/20 group-hover:bg-cyan-400 transition-colors duration-300" />

            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              
              <!-- TÍTULO DE LA ZONA -->
              <div class="lg:w-1/4 shrink-0 border-l-4 border-cyan-400 pl-4">
                <h3 class="font-['Rajdhani'] text-3xl sm:text-4xl font-black uppercase tracking-wide text-white group-hover:text-cyan-400 transition-colors">
                  {{ pricing.zone }}
                </h3>
              </div>

              <!-- BANDA CONTINUA INTEGRADA -->
              <div class="flex-1 w-full overflow-x-auto no-scrollbar">
                <div class="flex items-center divide-x divide-zinc-800/80 w-full min-w-[500px] lg:min-w-0">
                  <div 
                    v-for="tier in pricing.tiers" 
                    :key="tier.hours"
                    class="flex-1 px-4 py-2 text-center flex flex-col justify-center items-center group/item hover:bg-cyan-500/5 transition-colors duration-200"
                  >
                    <!-- HORAS -->
                    <span class="font-['Rajdhani'] text-xs sm:text-sm text-zinc-400 font-bold uppercase tracking-wider mb-1 group-hover/item:text-cyan-300 transition-colors">
                      {{ tier.hours }}
                    </span>
                    
                    <!-- PRECIO GIGANTE -->
                    <div class="font-['Rajdhani'] font-black text-4xl sm:text-5xl xl:text-6xl text-cyan-400 tracking-tight leading-none my-1 drop-shadow-[0_0_12px_rgba(34,211,238,0.25)]">
                      {{ tier.price }}<span class="text-2xl sm:text-3xl text-white font-bold ml-0.5">€</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- BOTÓN INDUSTRIAL RESERVAR -->
              <div class="shrink-0 flex items-center justify-end">
                <NuxtLink
                  to="/reservas"
                  class="w-full sm:w-auto px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-['Rajdhani'] font-black text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]"
                  style="clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);"
                >
                  <span>Reservar Zona</span>
                  <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                </NuxtLink>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- SEPARADOR ESTILO INDUSTRIAL -->
      <div class="w-full px-6 sm:px-12 lg:px-20 flex items-center gap-6">
        <div class="h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent flex-1" />
      </div>

      <!-- ==================== 3. HORARIOS ==================== -->
      <div class="schedule-section w-full px-6 sm:px-12 lg:px-20 space-y-10">
        <div class="schedule-header flex flex-col items-start space-y-4 border-l-2 border-cyan-400 pl-6 sm:pl-8">
          <h2 class="font-['Rajdhani'] text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            NUESTRO HORARIO
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          <div 
            v-for="entry in schedule.hours" 
            :key="entry.days"
            class="schedule-card relative bg-zinc-950/90 border border-cyan-500/30 p-8 sm:p-10 transition-all duration-300 group hover:border-cyan-400 hover:bg-cyan-950/20 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]"
          >
            <div class="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div class="flex items-center justify-between mb-8">
              <span v-if="entry.isToday" class="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400 text-zinc-950 font-['Rajdhani'] font-black text-xs uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                <span class="w-1.5 h-1.5 rounded-full bg-zinc-950 animate-ping" />
                Hoy Abierto
              </span>
            </div>

            <div class="space-y-3">
              <h3 class="font-['Rajdhani'] text-2xl font-black uppercase tracking-wide text-white-400 group-hover:text-cyan-300 transition-colors">
                {{ entry.days }}
              </h3>
              <div class="font-mono text-3xl sm:text-4xl font-black text-white tracking-tight pt-2">
                {{ entry.open }} <span class="text-cyan-500/60 font-light">&mdash;</span> {{ entry.close }}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ==================== MODAL VISOR DE IMAGEN LIMPIO ==================== -->
    <Transition name="fade">
      <div 
        v-if="activeModalZone" 
        @click="closeModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-black/95 sm:backdrop-blur-md cursor-pointer"
      >
        <AppImage 
          :src="activeModalZone.image" 
          :alt="activeModalZone.name"
          sizes="xs:640px sm:1500px"
          densities="x1"
          priority
          class="max-w-full max-h-full object-contain pointer-events-none shadow-2xl"
        />
      </div>
    </Transition>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
const activeModalZone = ref(null)
const isAppLoaded = useAppLoaded()

let ctx
let unmounted = false
let refreshTimer

const prices = ref([
  {
    zone: 'PRINCIPAL',
    subtitle: 'PC Gaming High-End (240Hz / RTX)',
    tiers: [
      { hours: '1 HORA', price: '3.5', unitPrice: '3.50' },
      { hours: '2 HORAS', price: '6', unitPrice: '3.00' },
      { hours: '4 HORAS', price: '10', unitPrice: '2.50' },
      { hours: '10 HORAS', price: '20', unitPrice: '2.00' },
      { hours: '24 HORAS', price: '40', unitPrice: '1.66' }
    ]
  },
  {
    zone: 'VIP',
    subtitle: 'Zonas privadas eSports Premium',
    tiers: [
      { hours: '1 HORA', price: '4', unitPrice: '4.00' },
      { hours: '2 HORAS', price: '7', unitPrice: '3.50' },
      { hours: '4 HORAS', price: '12', unitPrice: '3.00' },
      { hours: '10 HORAS', price: '25', unitPrice: '2.50' },
      { hours: '25 HORAS', price: '50', unitPrice: '2.00' }
    ]
  },
  {
    zone: 'PS5',
    subtitle: 'Consolas 4K + Mandos DualSense',
    tiers: [
      { hours: '1 HORA', price: '4.5', unitPrice: '4.50' },
      { hours: '2 HORAS', price: '8', unitPrice: '4.00' },
      { hours: '3 HORAS', price: '10.5', unitPrice: '3.50' }
    ]
  },
  {
    zone: 'SIMULADOR',
    subtitle: 'Cockpit completo Fanatec + VR',
    tiers: [
      { hours: '1 HORA', price: '4.5', unitPrice: '4.50' },
      { hours: '2 HORAS', price: '8', unitPrice: '4.00' },
      { hours: '3 HORAS', price: '10.5', unitPrice: '3.50' }
    ]
  }
])

const schedule = ref({
  hours: [
    { days: 'LUNES A JUEVES', open: '11:00', close: '23:00', isToday: false },
    { days: 'VIERNES Y SÁBADOS', open: '11:00', close: '01:00', isToday: false },
    { days: 'DOMINGOS', open: '11:00', close: '23:00', isToday: false }
  ],
  zones: [
    { id: 'principal', name: 'SALA PRINCIPAL', image: '/img/sala-principal.jpg' },
    { id: 'vip', name: 'SALA VIP', image: '/img/sala-vip.jpg' },
    { id: 'ps5', name: 'PLAYSTATION 5', image: '/img/play.jpg' },
    { id: 'simulador', name: 'SIMULADORES', image: '/img/simuladores.jpg' }
  ]
})

const openModal = (zone) => { activeModalZone.value = zone }
const closeModal = () => { activeModalZone.value = null }

const handleKeydown = (e) => {
  if (e.key === 'Escape') closeModal()
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)

  await nextTick()
  // Las animaciones de entrada esperan a que el preloader haya terminado
  await waitForAppLoaded(isAppLoaded)
  if (unmounted) return

  gsap.registerPlugin(ScrollTrigger)

  ctx = gsap.context(() => {
    // Función optimizada para una aparición sutil y persistente (aparece una vez y se queda)
    const createScrollAnimation = (targets, triggerTarget) => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: triggerTarget,
            start: 'top 88%',
            once: true
          }
        }
      )
    }

    // 1. INSTALACIONES
    createScrollAnimation('.zone-card', '.zones-grid')
    createScrollAnimation('.zones-btn', '.zones-btn')

    // 2. PRECIOS
    createScrollAnimation('.pricing-header', '.pricing-header')
    createScrollAnimation('.price-row', '.pricing-container')

    // 3. HORARIOS
    createScrollAnimation('.schedule-header', '.schedule-section')
    createScrollAnimation('.schedule-card', '.schedule-section')

    refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)

  }, sectionRef.value)
})

onUnmounted(() => {
  unmounted = true
  window.removeEventListener('keydown', handleKeydown)
  clearTimeout(refreshTimer)
  if (ctx) ctx.revert()
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>