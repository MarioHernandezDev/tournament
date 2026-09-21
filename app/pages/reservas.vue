<template>
  <div class="relative min-h-screen bg-black text-white selection:bg-cyan-400 selection:text-black pb-24 overflow-hidden font-sans">
    
    <!-- FONDO EN DIAGONAL -->
    <div 
      class="absolute inset-0 pointer-events-none z-0 bg-gradient-to-bl from-zinc-800/60 via-zinc-900/40 to-black"
      style="clip-path: polygon(100% 0, 100% 100%, 0 100%);"
    />

    <div class="relative z-10 space-y-12">
      
      <!-- MINI HERO (SIN BOTONES) -->
      <MiniHero
        title="Reserva tu Puesto"
        bg-text="RESERVAS"
        description="Asegura tu setup preferido, consola o simulador. Configura tu sesión y vive el máximo rendimiento."
        icon-name="i-heroicons-computer-desktop"
        theme="blue"
      />

      <!-- SECCIÓN PRINCIPAL -->
      <div class="w-full space-y-12">

        <!-- COMPONENTE: USUARIO & IDENTIFICACIÓN (FULLWIDTH) -->
        <ReservasUserHeader
          v-model:username="form.username"
          :active-step="activeStep"
          :whatsapp-url="whatsappUrl"
          @change-step="activeStep = $event"
        />

        <!-- TRANSICIÓN VISTA DE CATEGORÍAS / DETALLES -->
        <Transition name="fade-slide" mode="out-in">
          
          <!-- VISTA 1: CARDS CATEGORÍAS (FULLWIDTH DE BORDE A BORDE) -->
          <div v-if="activeStep === 'category'" key="categories" class="w-full">
            <ReservasCategoryCards
              :whatsapp-url-custom="whatsappUrlCustom"
              @select-category="selectCategory"
            />
          </div>

          <!-- VISTA 2: GESTOR DE PUESTO (CONTENIDO LIMITADO A 7XL) -->
          <div v-else-if="activeStep === 'details'" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" key="details">
            
            <ReservasSeatSelector
              :selected-category="selectedCategory"
              :seat-type="form.seatType"
              :seat-id="form.seatId"
              :selected-seat-label="selectedSeatLabel"
              v-model:date="form.date"
              v-model:time="form.time"
              @select-seat="handleSeatSelect"
            />

            <!-- NOTAS Y CONFIRMACIÓN -->
            <div class="bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 sm:backdrop-blur-md space-y-4 shadow-2xl">
              <div class="flex items-center gap-3">
                <span class="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 font-mono font-bold flex items-center justify-center text-sm">04</span>
                <h3 class="font-['Rajdhani'] text-2xl font-black uppercase text-white tracking-wide">
                  Notas / Peticiones Especiales
                </h3>
              </div>
              <textarea
                v-model="form.notes"
                rows="3"
                placeholder="¿Vendrás en grupo? ¿Quieres algún juego en específico precargado? Escríbelo aquí..."
                class="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors text-sm"
              ></textarea>

              <button 
                @click="handleSubmit" 
                type="button"
                :disabled="isSubmitting"
                class="w-full py-4 bg-cyan-400 text-black font-mono font-black text-sm uppercase rounded-full hover:bg-cyan-300 transition-all shadow-[0_0_25px_rgba(34,211,238,0.3)] mt-4 disabled:opacity-50"
              >
                {{ isSubmitting ? 'Procesando Reserva...' : 'Confirmar Reserva' }}
              </button>
            </div>

          </div>
        </Transition>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const todayDate = new Date().toISOString().split('T')[0]

const activeStep = ref('category')
const selectedCategory = ref('pc')
const isSubmitting = ref(false)

const form = ref({
  username: '',
  date: todayDate,
  time: '17:00',
  seatType: 'pc_standard',
  seatId: 1,
  seatCustomName: '',
  notes: ''
})

const selectCategory = (category) => {
  selectedCategory.value = category
  if (category === 'pc') form.value.seatType = 'pc_standard'
  if (category === 'consoles') form.value.seatType = 'consoles'
  if (category === 'simulators') form.value.seatType = 'simulators'
  activeStep.value = 'details'
}

const handleSeatSelect = ({ type, id, customName }) => {
  form.value.seatType = type
  form.value.seatId = id
  form.value.seatCustomName = customName
}

const selectedSeatLabel = computed(() => {
  if (form.value.seatType === 'pc_standard') return `PC Standard #${form.value.seatId}`
  if (form.value.seatType === 'pc_vip') return `PC VIP #${form.value.seatId}`
  if (form.value.seatType === 'consoles') return form.value.seatCustomName || 'Consola'
  if (form.value.seatType === 'simulators') return form.value.seatCustomName || 'Simulador'
  return 'No seleccionado'
})

const whatsappUrl = computed(() => {
  const phone = '34600000000'
  const text = `Hola Gaming Project, quiero consultar reservas directamente.`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
})

const whatsappUrlCustom = computed(() => {
  const phone = '34600000000'
  const text = `Hola Gaming Project, quiero hacer una consulta sobre un evento/reserva especial para ${form.value.username || 'un usuario'}.`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
})

const handleSubmit = () => {
  if (!form.value.username) {
    alert('Por favor, introduce tu Nombre de Usuario o Gamer Tag.')
    return
  }

  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    alert(`¡Reserva registrada con éxito para ${form.value.username}! Te esperamos el ${form.value.date} a las ${form.value.time}.`)
  }, 1200)
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}
</style>