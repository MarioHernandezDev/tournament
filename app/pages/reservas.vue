<template>
  <div class="relative min-h-screen bg-black text-white selection:bg-cyan-400 selection:text-black pb-24 overflow-hidden">
    
    <BackgroundBlackhole theme="blue" />

    <div class="pointer-events-none fixed inset-0 z-0">
      <div class="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:28px_28px]" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
    </div>

    <div class="relative z-10 space-y-12">
      
      <!-- MINI HERO -->
      <MiniHero
        title="Reserva tu Puesto"
        bg-text="RESERVAS"
        description="Asegura tu setup preferido, consola o simulador. Configura tu sesión y vive el máximo rendimiento."
        icon-name="i-heroicons-computer-desktop"
        theme="cyan"
        button-text="Hablar por WhatsApp"
        :button-link="whatsappUrl"
        secondary-button-text="Ver Ubicación"
        secondary-button-link="/instalaciones#ubicacion"
      />

      <div class="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <form @submit.prevent="handleSubmit" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- COLUMNA IZQUIERDA -->
          <div class="lg:col-span-8 space-y-8">
            
            <!-- COMPONENTE 1: FORMULARIO USUARIO/FECHA -->
            <ReservasUserForm
              v-model:username="form.username"
              v-model:date="form.date"
              v-model:time="form.time"
            />

            <!-- COMPONENTE 2: SELECTOR DE PUESTOS -->
            <ReservasSeatSelector
              :seat-type="form.seatType"
              :seat-id="form.seatId"
              :selected-seat-label="selectedSeatLabel"
              @select-seat="handleSeatSelect"
            />

            <!-- PASO 4: NOTAS -->
            <div class="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md space-y-4">
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
            </div>

          </div>

          <!-- COLUMNA DERECHA -->
          <div class="lg:col-span-4 sticky top-8 space-y-6">
            <!-- COMPONENTE 3: CARD DE RESUMEN Y ACCIÓN -->
            <ReservasSummaryCard
              :username="form.username"
              :date="form.date"
              :time="form.time"
              :seat-label="selectedSeatLabel"
              :is-submitting="isSubmitting"
              :success-message="successMessage"
            />
          </div>

        </form>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const todayDate = new Date().toISOString().split('T')[0]

const form = ref({
  username: '',
  date: todayDate,
  time: '17:00',
  seatType: 'pc_standard',
  seatId: 1,
  seatCustomName: '',
  notes: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')

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
  const text = `Hola Gaming Project, quiero información sobre reservas para ${form.value.username || 'un usuario'}.`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
})

const handleSubmit = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    successMessage.value = `¡Reserva registrada con éxito para ${form.value.username}! Te esperamos el ${form.value.date} a las ${form.value.time}.`
    setTimeout(() => {
      successMessage.value = ''
    }, 6000)
  }, 1200)
}
</script>