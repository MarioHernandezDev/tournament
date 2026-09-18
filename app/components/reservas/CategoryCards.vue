<template>
  <div class="w-full space-y-12">

    <div class="w-full space-y-12">

      <!-- CARD 1: CONSOLAS (PS5 & XBOX) -->
      <div
        class="group relative w-full bg-zinc-950 border-y border-zinc-800/80 transition-all duration-500 hover:bg-zinc-900/40 min-h-[460px] flex flex-col justify-center overflow-visible cursor-pointer"
        :class="expandedCategory === 'consoles' ? 'bg-zinc-900/60 border-cyan-400/50' : ''"
        @click="toggleCategory('consoles')"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-950/20 via-transparent to-blue-950/20 pointer-events-none" />

        <div class="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div class="relative w-full md:w-1/2 h-72 md:h-auto flex items-center justify-center order-1">
            <div class="relative md:absolute md:-top-36 md:-bottom-20 w-full flex items-center justify-center pointer-events-none">
              <img
                src="/images/booking/console-ps5.png"
                alt="PS5 & Xbox"
                class="w-auto h-96 sm:h-[420px] md:h-[500px] max-w-none object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.95)] transition-all duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div class="relative z-10 w-full md:w-1/2 space-y-6 order-2 md:pl-8">
            <h4 class="font-['Rajdhani'] text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-wide group-hover:text-cyan-400 transition-colors">
              PS5 & Xbox Series X
            </h4>
            <p class="text-base text-zinc-300 font-sans leading-relaxed max-w-xl">
              Zona tipo lounge con sofás ergonómicos y pantallas OLED 4K HDR para partidas casuales o competitivas.
            </p>
            <div class="pt-4 flex flex-wrap items-center justify-between gap-6 border-t border-zinc-900/80">
              <span class="font-mono text-2xl font-black text-cyan-300">Desde 4.50€/h</span>
              <button
                @click.stop="toggleCategory('consoles')"
                class="px-9 py-4 bg-cyan-400 text-black font-mono font-black text-sm uppercase rounded-full hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.3)]"
              >
                {{ expandedCategory === 'consoles' ? 'Cerrar Selección' : 'Desplegar Puestos' }}
                <UIcon :name="expandedCategory === 'consoles' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- PANEL DESPLEGABLE CONSOLAS -->
        <Transition name="panel-expand">
          <div v-if="expandedCategory === 'consoles'" class="panel-expand-outer w-full bg-zinc-950 rounded-t-[2.5rem] border-t border-zinc-800/60 relative z-20 backdrop-blur-xl -mt-6" @click.stop>
            <div class="panel-expand-inner">
              <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-14 space-y-12">

                <div class="space-y-4">
                  <div class="flex items-center gap-2.5">
                    <span class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-mono font-black bg-cyan-400/15 text-cyan-300 border border-cyan-400/40">1</span>
                    <h5 class="font-['Rajdhani'] text-xl sm:text-2xl font-bold text-white">Elige tu consola</h5>
                  </div>
                  <div class="relative overflow-hidden border border-zinc-800/70 bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 p-8 sm:p-10">
                    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.08),transparent_65%)] pointer-events-none" />
                    <div class="relative flex flex-wrap justify-center gap-8 sm:gap-12">
                      <ReservasSeatPod
                        v-for="consoleItem in consoleSeats"
                        :key="consoleItem.id"
                        :short-label="consoleItem.type"
                        :title="consoleItem.name"
                        size="lg"
                        accent="cyan"
                        :selected="selectedSeats.includes(consoleItem.id)"
                        @click="toggleSingleSeat(consoleItem.id)"
                      />
                    </div>
                  </div>
                </div>

                <Transition name="step-reveal">
                  <div v-if="selectedSeats.length > 0" class="step-reveal-outer">
                    <div class="step-reveal-inner space-y-12">
                      <ReservasBookingScheduler
                        v-model:date="bookingDate"
                        v-model:start-time="startTime"
                        v-model:end-time="endTime"
                        accent="cyan"
                        :price-per-hour="4.5"
                        :seats-count="selectedSeats.length"
                        :start-step="2"
                      />

                      <!-- BOTÓN CONFIRMAR -->
                      <Transition name="step-reveal">
                        <div v-if="startTime && endTime" class="step-reveal-outer">
                          <div class="step-reveal-inner space-y-4 pt-2">
                            <div class="flex items-center gap-2.5">
                              <span class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-mono font-black bg-cyan-400/15 text-cyan-300 border border-cyan-400/40">4</span>
                              <h5 class="font-['Rajdhani'] text-xl sm:text-2xl font-bold text-white">Confirma tu reserva</h5>
                            </div>
                            <button
                              @click="requestBooking('Consolas')"
                              class="w-full py-5 bg-cyan-400 text-black font-mono font-black text-base uppercase rounded-full hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                            >
                              Solicitar Reserva ({{ selectedSeats.length }} Consola/s - De {{ startTime || '--:--' }} a {{ endTime || '--:--' }})
                            </button>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- CARD 2: PC GAMING -->
      <div
        class="group relative w-full bg-zinc-950 border-y border-zinc-800/80 transition-all duration-500 hover:bg-zinc-900/40 min-h-[460px] flex flex-col justify-center overflow-visible cursor-pointer"
        :class="expandedCategory === 'pc' ? 'bg-zinc-900/60 border-cyan-400/50' : ''"
        @click="toggleCategory('pc')"
      >
        <div class="absolute inset-0 bg-gradient-to-l from-cyan-950/20 via-transparent to-blue-950/20 pointer-events-none" />

        <div class="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div class="relative z-10 w-full md:w-1/2 space-y-6 order-2 md:order-1 md:pr-8">
            <h4 class="font-['Rajdhani'] text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-wide group-hover:text-cyan-400 transition-colors">
              PC Gaming
            </h4>
            <p class="text-base text-zinc-300 font-sans leading-relaxed max-w-xl">
              35 Setups de alto rendimiento divididos en 6 filas para Sala Normal (30 PCs) y un área VIP insonorizada exclusiva de 5 PCs.
            </p>
            <div class="pt-4 flex flex-wrap items-center justify-between gap-6 border-t border-zinc-900/80">
              <span class="font-mono text-2xl font-black text-cyan-300">Desde 3.50€/h</span>
              <button
                @click.stop="toggleCategory('pc')"
                class="px-9 py-4 bg-cyan-400 text-black font-mono font-black text-sm uppercase rounded-full hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.3)]"
              >
                {{ expandedCategory === 'pc' ? 'Cerrar Selección' : 'Ver Mapa de PCs' }}
                <UIcon :name="expandedCategory === 'pc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="relative w-full md:w-1/2 h-72 md:h-auto flex items-center justify-center order-1 md:order-2">
            <div class="relative md:absolute md:-top-36 md:-bottom-20 w-full flex items-center justify-center pointer-events-none">
              <img
                src="/images/booking/pc-setup.png"
                alt="PC Gaming Setup"
                class="w-auto h-96 sm:h-[420px] md:h-[490px] max-w-none object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.95)] transition-all duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        <!-- PANEL DESPLEGABLE MAPA PC -->
        <Transition name="panel-expand">
          <div v-if="expandedCategory === 'pc'" class="panel-expand-outer w-full bg-zinc-950 rounded-t-[2.5rem] border-t border-zinc-800/60 relative z-20 backdrop-blur-xl -mt-6" @click.stop>
            <div class="panel-expand-inner">
              <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-14 space-y-12">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div class="flex items-center gap-2.5">
                    <span class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-mono font-black bg-cyan-400/15 text-cyan-300 border border-cyan-400/40">1</span>
                    <h5 class="font-['Rajdhani'] text-xl sm:text-2xl font-bold text-white">Selecciona tus Setups (Múltiple)</h5>
                  </div>

                  <div class="flex gap-1.5 bg-zinc-900 p-1.5 rounded-full border border-zinc-800">
                    <button
                      @click="pcTab = 'normal'"
                      :class="pcTab === 'normal' ? 'bg-cyan-400 text-black font-black' : 'text-zinc-400 hover:text-white'"
                      class="px-6 py-2.5 rounded-full font-mono text-xs uppercase transition-all"
                    >
                      Sala Normal (30 PCs)
                    </button>
                    <button
                      @click="pcTab = 'vip'"
                      :class="pcTab === 'vip' ? 'bg-amber-400 text-black font-black' : 'text-zinc-400 hover:text-white'"
                      class="px-6 py-2.5 rounded-full font-mono text-xs uppercase transition-all"
                    >
                      Zona VIP (5 PCs)
                    </button>
                  </div>
                </div>

                <div v-if="selectedSeats.length > 0" class="flex flex-wrap items-center justify-between gap-4 bg-zinc-900/90 border border-cyan-400/30 p-5 px-6">
                  <div class="flex items-center gap-3">
                    <span class="font-mono text-sm text-cyan-400 font-bold">Puestos seleccionados ({{ selectedSeats.length }}):</span>
                    <span class="font-mono text-sm text-white font-bold">{{ selectedSeats.join(', ') }}</span>
                  </div>
                  <button
                    @click="selectedSeats = []"
                    class="px-4 py-2 rounded-full border border-rose-500/40 bg-rose-500/10 text-rose-300 font-mono text-xs font-bold uppercase tracking-wide hover:bg-rose-500/20 hover:border-rose-400 hover:text-rose-200 transition-all"
                  >
                    Limpiar selección
                  </button>
                </div>

                <!-- SALA NORMAL -->
                <div v-if="pcTab === 'normal'" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  <div v-for="row in 6" :key="row" class="space-y-4 bg-zinc-900/40 border border-zinc-800/70 p-6">
                    <div class="flex items-center justify-between">
                      <span class="font-['Rajdhani'] text-base text-zinc-300 font-bold">Fila {{ row }}</span>
                      <button
                        @click="selectEntireRow(row)"
                        class="text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                      >
                        + Fila completa
                      </button>
                    </div>

                    <div class="flex flex-wrap justify-center gap-3.5">
                      <ReservasSeatPod
                        v-for="col in 5"
                        :key="`pc-${(row-1)*5 + col}`"
                        :short-label="`${(row-1)*5 + col}`"
                        size="md"
                        accent="cyan"
                        :selected="selectedSeats.includes(`PC-${(row-1)*5 + col}`)"
                        @click="toggleSeat(`PC-${(row-1)*5 + col}`)"
                      />
                    </div>
                  </div>
                </div>

                <!-- ZONA VIP -->
                <div v-else class="rounded-[2rem] border border-amber-500/20 bg-zinc-900/40 p-8 space-y-6">
                  <span class="font-['Rajdhani'] text-base text-amber-400 font-bold">Zona VIP exclusiva</span>
                  <div class="flex flex-wrap justify-center gap-8 sm:gap-10">
                    <ReservasSeatPod
                      v-for="vipPc in 5"
                      :key="`vip-${vipPc}`"
                      :short-label="`${vipPc}`"
                      title="VIP"
                      size="lg"
                      accent="amber"
                      :selected="selectedSeats.includes(`VIP-${vipPc}`)"
                      @click="toggleSeat(`VIP-${vipPc}`)"
                    />
                  </div>
                </div>

                <Transition name="step-reveal">
                  <div v-if="selectedSeats.length > 0" class="step-reveal-outer">
                    <div class="step-reveal-inner space-y-12">
                      <ReservasBookingScheduler
                        v-model:date="bookingDate"
                        v-model:start-time="startTime"
                        v-model:end-time="endTime"
                        :accent="pcTab === 'vip' ? 'amber' : 'cyan'"
                        :price-per-hour="pcTab === 'vip' ? 5.5 : 3.5"
                        :seats-count="selectedSeats.length"
                        :start-step="2"
                      />

                      <!-- BOTÓN SOLICITAR -->
                      <Transition name="step-reveal">
                        <div v-if="startTime && endTime" class="step-reveal-outer">
                          <div class="step-reveal-inner space-y-4 pt-2">
                            <div class="flex items-center gap-2.5">
                              <span
                                class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-mono font-black border"
                                :class="pcTab === 'vip' ? 'bg-amber-400/15 text-amber-300 border-amber-400/40' : 'bg-cyan-400/15 text-cyan-300 border-cyan-400/40'"
                              >4</span>
                              <h5 class="font-['Rajdhani'] text-xl sm:text-2xl font-bold text-white">Confirma tu reserva</h5>
                            </div>
                            <button
                              @click="requestBooking('PC Gaming')"
                              class="w-full py-5 bg-cyan-400 text-black font-mono font-black text-base uppercase rounded-full hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                            >
                              Solicitar Reserva ({{ selectedSeats.length }} PC/s - De {{ startTime || '--:--' }} a {{ endTime || '--:--' }})
                            </button>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- CARD 3: SIMULADORES -->
      <div
        class="group relative w-full bg-zinc-950 border-y border-zinc-800/80 transition-all duration-500 hover:bg-zinc-900/40 min-h-[460px] flex flex-col justify-center overflow-visible cursor-pointer"
        :class="expandedCategory === 'simulators' ? 'bg-zinc-900/60 border-cyan-400/50' : ''"
        @click="toggleCategory('simulators')"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-amber-950/20 via-transparent to-cyan-950/20 pointer-events-none" />

        <div class="max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div class="relative w-full md:w-1/2 h-72 md:h-auto flex items-center justify-center order-1">
            <div class="relative md:absolute md:-top-36 md:-bottom-20 w-full flex items-center justify-center pointer-events-none">
              <img
                src="/images/booking/cockpit-sim.png"
                alt="Simulador Pro"
                class="w-auto h-96 sm:h-[420px] md:h-[500px] max-w-none object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.95)] transition-all duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <div class="relative z-10 w-full md:w-1/2 space-y-6 order-2 md:pl-8">
            <h4 class="font-['Rajdhani'] text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-wide group-hover:text-cyan-400 transition-colors">
              Simuladores Pro
            </h4>
            <p class="text-base text-zinc-300 font-sans leading-relaxed max-w-xl">
               Cockpits de aluminio equipados con Direct Drive Fanatec, célula de carga y triple monitor. Disponemos de 2 cockpits pro.
            </p>
            <div class="pt-4 flex flex-wrap items-center justify-between gap-6 border-t border-zinc-900/80">
              <span class="font-mono text-2xl font-black text-cyan-300">Desde 6.00€/h</span>
              <button
                @click.stop="toggleCategory('simulators')"
                class="px-9 py-4 bg-cyan-400 text-black font-mono font-black text-sm uppercase rounded-full hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.3)]"
              >
                {{ expandedCategory === 'simulators' ? 'Cerrar Selección' : 'Seleccionar Simulador' }}
                <UIcon :name="expandedCategory === 'simulators' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- PANEL DESPLEGABLE SIMULADORES -->
        <Transition name="panel-expand">
          <div v-if="expandedCategory === 'simulators'" class="panel-expand-outer w-full bg-zinc-950 rounded-t-[2.5rem] border-t border-zinc-800/60 relative z-20 backdrop-blur-xl -mt-6" @click.stop>
            <div class="panel-expand-inner">
              <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-14 space-y-12">
                <div class="space-y-4">
                  <div class="flex items-center gap-2.5">
                    <span class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-mono font-black bg-cyan-400/15 text-cyan-300 border border-cyan-400/40">1</span>
                    <h5 class="font-['Rajdhani'] text-xl sm:text-2xl font-bold text-white">Elige tu cockpit</h5>
                  </div>
                  <div class="relative overflow-hidden border border-zinc-800/70 bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 p-8 sm:p-10">
                    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.08),transparent_65%)] pointer-events-none" />
                    <div class="relative flex flex-wrap justify-center gap-10 sm:gap-14">
                      <ReservasSeatPod
                        v-for="sim in 2"
                        :key="`sim-${sim}`"
                        :short-label="`0${sim}`"
                        title="Cockpit SimRacing Pro"
                        size="lg"
                        accent="cyan"
                        :selected="selectedSeats.includes(`SIM-${sim}`)"
                        @click="toggleSingleSeat(`SIM-${sim}`)"
                      />
                    </div>
                  </div>
                </div>

                <Transition name="step-reveal">
                  <div v-if="selectedSeats.length > 0" class="step-reveal-outer">
                    <div class="step-reveal-inner space-y-12">
                      <ReservasBookingScheduler
                        v-model:date="bookingDate"
                        v-model:start-time="startTime"
                        v-model:end-time="endTime"
                        accent="cyan"
                        :price-per-hour="6"
                        :seats-count="selectedSeats.length"
                        :start-step="2"
                      />

                      <Transition name="step-reveal">
                        <div v-if="startTime && endTime" class="step-reveal-outer">
                          <div class="step-reveal-inner space-y-4 pt-2">
                            <div class="flex items-center gap-2.5">
                              <span class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-mono font-black bg-cyan-400/15 text-cyan-300 border border-cyan-400/40">4</span>
                              <h5 class="font-['Rajdhani'] text-xl sm:text-2xl font-bold text-white">Confirma tu reserva</h5>
                            </div>
                            <button
                              @click="requestBooking('Simuladores')"
                              class="w-full py-5 bg-cyan-400 text-black font-mono font-black text-base uppercase rounded-full hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                            >
                              Solicitar Reserva ({{ selectedSeats.length }} Simulador/es - De {{ startTime || '--:--' }} a {{ endTime || '--:--' }})
                            </button>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </Transition>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  whatsappUrlCustom: String
})

const expandedCategory = ref(null)
const selectedSeats = ref([])
const pcTab = ref('normal')

const bookingDate = ref(null)
const startTime = ref(null)
const endTime = ref(null)

const consoleSeats = [
  { id: 'PS5-1', type: 'PS5', name: 'PlayStation 5 #01', desc: 'Zona Lounge + Pantalla 65" OLED 4K' },
  { id: 'PS5-2', type: 'PS5', name: 'PlayStation 5 #02', desc: 'Zona Lounge + Pantalla 65" OLED 4K' },
  { id: 'XBOX-1', type: 'XBOX', name: 'Xbox Series X #01', desc: 'Zona Lounge + Pass Ultimate Incluido' }
]

const toggleCategory = (cat) => {
  if (expandedCategory.value === cat) {
    expandedCategory.value = null
  } else {
    expandedCategory.value = cat
    pcTab.value = 'normal'
  }
  selectedSeats.value = []
  bookingDate.value = null
  startTime.value = null
  endTime.value = null
}

const toggleSingleSeat = (seatId) => {
  if (selectedSeats.value.includes(seatId)) {
    selectedSeats.value = []
  } else {
    selectedSeats.value = [seatId]
  }
}

const toggleSeat = (seatId) => {
  const idx = selectedSeats.value.indexOf(seatId)
  if (idx > -1) {
    selectedSeats.value.splice(idx, 1)
  } else {
    selectedSeats.value.push(seatId)
  }
}

const selectEntireRow = (row) => {
  const rowSeats = Array.from({ length: 5 }, (_, i) => `PC-${(row - 1) * 5 + (i + 1)}`)
  const allSelected = rowSeats.every(seat => selectedSeats.value.includes(seat))

  if (allSelected) {
    selectedSeats.value = selectedSeats.value.filter(seat => !rowSeats.includes(seat))
  } else {
    const newSelection = new Set([...selectedSeats.value, ...rowSeats])
    selectedSeats.value = Array.from(newSelection)
  }
}

const requestBooking = (categoryName) => {
  console.log(`Solicitando reserva de ${categoryName}:`, {
    seats: selectedSeats.value,
    date: bookingDate.value,
    start: startTime.value,
    end: endTime.value
  })
}
</script>

<style scoped>
/* Transición suave basada en grid-template-rows para evitar saltos y medir alturas dinámicas */
.panel-expand-outer {
  display: grid;
  grid-template-rows: 1fr;
}

.panel-expand-enter-active,
.panel-expand-leave-active {
  transition: grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  opacity: 1;
}

.panel-expand-enter-from,
.panel-expand-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}

.panel-expand-inner {
  overflow: hidden;
  min-height: 0;
}

/* Revelado progresivo por pasos */
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

/* Fuerza aumento de texto por CSS si el subcomponente no escala únicamente con props */
:deep(.seat-pod),
:deep(.seat-pod span),
:deep(.seat-pod label) {
  font-size: 1.15rem !important;
  font-weight: 800 !important;
}
</style>