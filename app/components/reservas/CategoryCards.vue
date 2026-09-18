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
                class="px-9 py-4 bg-cyan-400 text-black font-mono font-black text-sm uppercase rounded-none hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.3)]"
              >
                {{ expandedCategory === 'consoles' ? 'Cerrar Selección' : 'Desplegar Puestos' }}
                <UIcon :name="expandedCategory === 'consoles' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- PANEL DESPLEGABLE CONSOLAS -->
        <Transition name="panel-expand">
          <div v-if="expandedCategory === 'consoles'" class="panel-expand-outer w-full bg-zinc-950 border-t border-zinc-800 relative z-20 backdrop-blur-xl" @click.stop>
            <div class="panel-expand-inner">
              <div class="max-w-7xl mx-auto px-8 sm:px-12 py-12 sm:py-14 space-y-12">

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-7">
                  <button
                    v-for="consoleItem in consoleSeats"
                    :key="consoleItem.id"
                    @click="toggleSingleSeat(consoleItem.id)"
                    :class="selectedSeats.includes(consoleItem.id) ? 'border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_20px_rgba(34,211,238,0.15)]' : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'"
                    class="p-7 border rounded-none flex flex-col items-start gap-3 transition-all duration-300 text-left group/seat"
                  >
                    <span class="text-xs font-bold uppercase px-3 py-1 bg-zinc-800 text-cyan-400 rounded-none border border-zinc-700 group-hover/seat:border-cyan-400/50">
                      {{ consoleItem.type }}
                    </span>
                    <span class="font-['Rajdhani'] text-xl font-bold text-white">{{ consoleItem.name }}</span>
                  </button>
                </div>

                <!-- CONTROLES FECHA Y HORA -->
                <div class="space-y-7 pt-8 border-t border-zinc-800">
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                    <!-- FECHA -->
                    <div class="space-y-3">
                      <label class="block font-['Rajdhani'] text-lg font-bold text-zinc-200">1. Día de la Reserva</label>
                      <div class="flex flex-wrap gap-2.5">
                        <button
                          v-for="day in quickDates"
                          :key="day.value"
                          @click="bookingDate = day.value"
                          :class="bookingDate === day.value ? 'bg-cyan-400 text-black border-cyan-400 font-black' : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'"
                          class="px-4 py-2.5 border font-mono text-xs rounded-none transition-all"
                        >
                          {{ day.label }}
                        </button>
                      </div>
                      <input type="date" v-model="bookingDate" class="w-full bg-zinc-900 border border-zinc-800 rounded-none p-3.5 text-white font-mono text-base focus:outline-none focus:border-cyan-400 mt-2" />
                    </div>

                    <!-- SELECCIÓN RANGO HORA ESTILO HOTEL -->
                    <div class="lg:col-span-2 space-y-3">
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label class="block font-['Rajdhani'] text-lg font-bold text-zinc-200">2. Elige tu Horario</label>
                        <span class="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5">
                          {{ startTime && endTime ? `${startTime} - ${endTime}` : startTime ? `Desde ${startTime} (Elige Fin)` : 'Selecciona Inicio' }}
                        </span>
                      </div>

                      <!-- BOTONES CLICKABLES DE HORAS EN GRID AMPLIO -->
                      <div class="p-5 sm:p-6 bg-zinc-900/80 border border-zinc-800 rounded-none space-y-4">
                        <div class="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                          <button
                            v-for="time in availableTimeSlots"
                            :key="`time-${time}`"
                            @click="handleTimeClick(time)"
                            :class="getTimeSlotClass(time)"
                            class="py-3 px-2 border font-mono text-sm sm:text-base font-bold rounded-none transition-all duration-200 text-center"
                          >
                            {{ time }}
                          </button>
                        </div>
                        <p class="text-xs text-zinc-400 border-t border-zinc-800/80 pt-3 flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
                          Horario para este día: <span class="text-white font-bold">{{ currentScheduleText }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- BOTÓN CONFIRMAR -->
                <button
                  @click="requestBooking('Consolas')"
                  :disabled="selectedSeats.length === 0 || !startTime || !endTime"
                  class="w-full py-5 bg-cyan-400 disabled:opacity-40 text-black font-mono font-black text-base uppercase rounded-none hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] mt-2"
                >
                  Solicitar Reserva ({{ selectedSeats.length }} Consola/s - De {{ startTime || '--:--' }} a {{ endTime || '--:--' }})
                </button>
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
                class="px-9 py-4 bg-cyan-400 text-black font-mono font-black text-sm uppercase rounded-none hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.3)]"
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
          <div v-if="expandedCategory === 'pc'" class="panel-expand-outer w-full bg-zinc-950 border-t border-zinc-800 relative z-20 backdrop-blur-xl" @click.stop>
            <div class="panel-expand-inner">
              <div class="max-w-7xl mx-auto px-8 sm:px-12 py-12 sm:py-14 space-y-12">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-7">
                  <h5 class="font-['Rajdhani'] text-2xl sm:text-3xl font-bold text-white">Selecciona tus Setups (Múltiple)</h5>

                  <div class="flex gap-2 bg-zinc-900 p-1.5 rounded-none border border-zinc-800">
                    <button
                      @click="pcTab = 'normal'"
                      :class="pcTab === 'normal' ? 'bg-cyan-400 text-black font-black' : 'text-zinc-400 hover:text-white'"
                      class="px-6 py-2.5 rounded-none font-mono text-xs uppercase transition-all"
                    >
                      Sala Normal (30 PCs)
                    </button>
                    <button
                      @click="pcTab = 'vip'"
                      :class="pcTab === 'vip' ? 'bg-amber-400 text-black font-black' : 'text-zinc-400 hover:text-white'"
                      class="px-6 py-2.5 rounded-none font-mono text-xs uppercase transition-all"
                    >
                      Zona VIP (5 PCs)
                    </button>
                  </div>
                </div>

                <div v-if="selectedSeats.length > 0" class="flex flex-wrap items-center justify-between gap-4 bg-zinc-900/90 border border-cyan-400/30 p-5 px-6 rounded-none">
                  <div class="flex items-center gap-3">
                    <span class="font-mono text-sm text-cyan-400 font-bold">Puestos seleccionados ({{ selectedSeats.length }}):</span>
                    <span class="font-mono text-sm text-white font-bold">{{ selectedSeats.join(', ') }}</span>
                  </div>
                  <button @click="selectedSeats = []" class="text-xs font-mono text-rose-400 hover:underline">Limpiar selección</button>
                </div>

                <!-- SALA NORMAL -->
                <div v-if="pcTab === 'normal'" class="space-y-6">
                  <div v-for="row in 6" :key="row" class="space-y-4 bg-zinc-900/40 border border-zinc-800/80 p-6 rounded-none">
                    <div class="flex items-center justify-between">
                      <span class="font-['Rajdhani'] text-base text-zinc-300 font-bold">Fila {{ row }}</span>
                      <button
                        @click="selectEntireRow(row)"
                        class="text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:underline"
                      >
                        + Reservar fila completa (5 PCs)
                      </button>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 sm:gap-5">
                      <button
                        v-for="col in 5"
                        :key="`pc-${(row-1)*5 + col}`"
                        @click="toggleSeat(`PC-${(row-1)*5 + col}`)"
                        :class="selectedSeats.includes(`PC-${(row-1)*5 + col}`) ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'"
                        class="py-5 border rounded-none font-mono text-sm font-bold transition-all text-center flex flex-col items-center justify-center gap-1.5"
                      >
                        <span>PC #{{ (row-1)*5 + col }}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- ZONA VIP -->
                <div v-else class="space-y-5 bg-zinc-900/40 border border-amber-500/20 p-7 rounded-none">
                  <span class="font-['Rajdhani'] text-base text-amber-400 font-bold">Zona VIP exclusiva</span>
                  <div class="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-5">
                    <button
                      v-for="vipPc in 5"
                      :key="`vip-${vipPc}`"
                      @click="toggleSeat(`VIP-${vipPc}`)"
                      :class="selectedSeats.includes(`VIP-${vipPc}`) ? 'border-amber-400 bg-amber-400/20 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.2)]' : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'"
                      class="py-7 border rounded-none font-mono text-sm font-bold transition-all text-center flex flex-col items-center justify-center gap-1.5"
                    >
                      <span>VIP #{{ vipPc }}</span>
                    </button>
                  </div>
                </div>

                <!-- CONTROLES FECHA Y HORA -->
                <div class="space-y-7 pt-8 border-t border-zinc-800">
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                    <div class="space-y-3">
                      <label class="block font-['Rajdhani'] text-lg font-bold text-zinc-200">1. Día de Reserva</label>
                      <div class="flex flex-wrap gap-2.5">
                        <button
                          v-for="day in quickDates"
                          :key="day.value"
                          @click="bookingDate = day.value"
                          :class="bookingDate === day.value ? 'bg-cyan-400 text-black border-cyan-400 font-black' : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'"
                          class="px-4 py-2.5 border font-mono text-xs rounded-none transition-all"
                        >
                          {{ day.label }}
                        </button>
                      </div>
                      <input type="date" v-model="bookingDate" class="w-full bg-zinc-900 border border-zinc-800 rounded-none p-3.5 text-white font-mono text-base focus:outline-none focus:border-cyan-400 mt-2" />
                    </div>

                    <div class="lg:col-span-2 space-y-3">
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label class="block font-['Rajdhani'] text-lg font-bold text-zinc-200">2. Elige tu Horario</label>
                        <span class="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5">
                          {{ startTime && endTime ? `${startTime} - ${endTime}` : startTime ? `Desde ${startTime} (Elige Fin)` : 'Selecciona Inicio' }}
                        </span>
                      </div>

                      <div class="p-5 sm:p-6 bg-zinc-900/80 border border-zinc-800 rounded-none space-y-4">
                        <div class="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                          <button
                            v-for="time in availableTimeSlots"
                            :key="`time-pc-${time}`"
                            @click="handleTimeClick(time)"
                            :class="getTimeSlotClass(time)"
                            class="py-3 px-2 border font-mono text-sm sm:text-base font-bold rounded-none transition-all duration-200 text-center"
                          >
                            {{ time }}
                          </button>
                        </div>
                        <p class="text-xs text-zinc-400 border-t border-zinc-800/80 pt-3 flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
                          Horario para este día: <span class="text-white font-bold">{{ currentScheduleText }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- BOTÓN SOLICITAR -->
                <button
                  @click="requestBooking('PC Gaming')"
                  :disabled="selectedSeats.length === 0 || !startTime || !endTime"
                  class="w-full py-5 bg-cyan-400 disabled:opacity-40 text-black font-mono font-black text-base uppercase rounded-none hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] mt-2"
                >
                  Solicitar Reserva ({{ selectedSeats.length }} PC/s - De {{ startTime || '--:--' }} a {{ endTime || '--:--' }})
                </button>
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
                class="px-9 py-4 bg-cyan-400 text-black font-mono font-black text-sm uppercase rounded-none hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.3)]"
              >
                {{ expandedCategory === 'simulators' ? 'Cerrar Selección' : 'Seleccionar Simulador' }}
                <UIcon :name="expandedCategory === 'simulators' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- PANEL DESPLEGABLE SIMULADORES -->
        <Transition name="panel-expand">
          <div v-if="expandedCategory === 'simulators'" class="panel-expand-outer w-full bg-zinc-950 border-t border-zinc-800 relative z-20 backdrop-blur-xl" @click.stop>
            <div class="panel-expand-inner">
              <div class="max-w-7xl mx-auto px-8 sm:px-12 py-12 sm:py-14 space-y-12">
                <h5 class="font-['Rajdhani'] text-2xl sm:text-3xl font-bold text-white">Elige tu cockpit</h5>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
                  <button
                    v-for="sim in 2"
                    :key="`sim-${sim}`"
                    @click="toggleSingleSeat(`SIM-${sim}`)"
                    :class="selectedSeats.includes(`SIM-${sim}`) ? 'border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_20px_rgba(34,211,238,0.15)]' : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'"
                    class="p-7 border rounded-none flex flex-col gap-3 transition-all text-left"
                  >
                    <span class="font-mono text-xs font-bold uppercase text-cyan-400">Cockpit #0{{ sim }}</span>
                    <span class="font-['Rajdhani'] text-xl font-bold text-white">SIMULADOR DE PROJECT GAMING</span>
                  </button>
                </div>

                <!-- CONTROLES FECHA Y HORA -->
                <div class="space-y-7 pt-8 border-t border-zinc-800">
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                    <div class="space-y-3">
                      <label class="block font-['Rajdhani'] text-lg font-bold text-zinc-200">1. Día de Reserva</label>
                      <div class="flex flex-wrap gap-2.5">
                        <button
                          v-for="day in quickDates"
                          :key="day.value"
                          @click="bookingDate = day.value"
                          :class="bookingDate === day.value ? 'bg-cyan-400 text-black border-cyan-400 font-black' : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'"
                          class="px-4 py-2.5 border font-mono text-xs rounded-none transition-all"
                        >
                          {{ day.label }}
                        </button>
                      </div>
                      <input type="date" v-model="bookingDate" class="w-full bg-zinc-900 border border-zinc-800 rounded-none p-3.5 text-white font-mono text-base focus:outline-none focus:border-cyan-400 mt-2" />
                    </div>

                    <div class="lg:col-span-2 space-y-3">
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <label class="block font-['Rajdhani'] text-lg font-bold text-zinc-200">2. Elige tu Horario</label>
                        <span class="font-mono text-sm font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5">
                          {{ startTime && endTime ? `${startTime} - ${endTime}` : startTime ? `Desde ${startTime} (Elige Fin)` : 'Selecciona Inicio' }}
                        </span>
                      </div>

                      <div class="p-5 sm:p-6 bg-zinc-900/80 border border-zinc-800 rounded-none space-y-4">
                        <div class="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                          <button
                            v-for="time in availableTimeSlots"
                            :key="`time-sim-${time}`"
                            @click="handleTimeClick(time)"
                            :class="getTimeSlotClass(time)"
                            class="py-3 px-2 border font-mono text-sm sm:text-base font-bold rounded-none transition-all duration-200 text-center"
                          >
                            {{ time }}
                          </button>
                        </div>
                        <p class="text-xs text-zinc-400 border-t border-zinc-800/80 pt-3 flex items-center gap-2">
                          <span class="w-2 h-2 rounded-full bg-cyan-400 inline-block"></span>
                          Horario para este día: <span class="text-white font-bold">{{ currentScheduleText }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  @click="requestBooking('Simuladores')"
                  :disabled="selectedSeats.length === 0 || !startTime || !endTime"
                  class="w-full py-5 bg-cyan-400 disabled:opacity-40 text-black font-mono font-black text-base uppercase rounded-none hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] mt-2"
                >
                  Solicitar Reserva ({{ selectedSeats.length }} Simulador/es - De {{ startTime || '--:--' }} a {{ endTime || '--:--' }})
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

    </div>


  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineProps({
  whatsappUrlCustom: String
})

const expandedCategory = ref(null)
const selectedSeats = ref([])
const pcTab = ref('normal')

// Fechas Rápidas
const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)
const dayAfter = new Date(today)
dayAfter.setDate(today.getDate() + 2)

const formatDate = (date) => date.toISOString().split('T')[0]

const quickDates = [
  { label: 'Hoy', value: formatDate(today) },
  { label: 'Mañana', value: formatDate(tomorrow) },
  { label: 'Pasado Mañana', value: formatDate(dayAfter) }
]

const bookingDate = ref(formatDate(today))
const startTime = ref('16:00')
const endTime = ref('18:00')

const consoleSeats = [
  { id: 'PS5-1', type: 'PS5', name: 'PlayStation 5 #01', desc: 'Zona Lounge + Pantalla 65" OLED 4K' },
  { id: 'PS5-2', type: 'PS5', name: 'PlayStation 5 #02', desc: 'Zona Lounge + Pantalla 65" OLED 4K' },
  { id: 'XBOX-1', type: 'XBOX', name: 'Xbox Series X #01', desc: 'Zona Lounge + Pass Ultimate Incluido' }
]

// Selección por defecto al desplegar cada categoría, para que quede claro
// de un vistazo que hay un puesto ya elegido y cómo se ve "seleccionado"
const defaultSeatByCategory = {
  consoles: () => consoleSeats[0]?.id,
  pc: () => 'PC-1',
  simulators: () => 'SIM-1'
}

const toggleCategory = (cat) => {
  if (expandedCategory.value === cat) {
    expandedCategory.value = null
    selectedSeats.value = []
  } else {
    expandedCategory.value = cat
    pcTab.value = 'normal'
    const defaultSeat = defaultSeatByCategory[cat]?.()
    selectedSeats.value = defaultSeat ? [defaultSeat] : []
  }
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

// GENERACIÓN DINÁMICA DE HORAS SEGÚN DÍA
const availableTimeSlots = computed(() => {
  if (!bookingDate.value) return []

  const [year, month, day] = bookingDate.value.split('-').map(Number)
  const dateObj = new Date(year, month - 1, day)
  const dayOfWeek = dateObj.getDay()

  const isWeekendNight = dayOfWeek === 5 || dayOfWeek === 6
  const slots = []

  for (let hour = 11; hour <= 23; hour++) {
    const h = hour < 10 ? `0${hour}` : `${hour}`
    slots.push(`${h}:00`)
    slots.push(`${h}:30`)
  }

  if (isWeekendNight) {
    slots.push('00:00')
    slots.push('00:30')
    slots.push('01:00')
  }

  return slots
})

const currentScheduleText = computed(() => {
  if (!bookingDate.value) return ''
  const [year, month, day] = bookingDate.value.split('-').map(Number)
  const dayOfWeek = new Date(year, month - 1, day).getDay()
  return (dayOfWeek === 5 || dayOfWeek === 6) ? '11:00 a 01:00' : '11:00 a 23:00'
})

const timeToMinutes = (timeStr) => {
  if (!timeStr) return -1
  const [h, m] = timeStr.split(':').map(Number)
  const hourVal = h < 11 ? h + 24 : h
  return hourVal * 60 + m
}

const handleTimeClick = (time) => {
  if (!startTime.value || (startTime.value && endTime.value)) {
    startTime.value = time
    endTime.value = null
    return
  }

  if (timeToMinutes(time) < timeToMinutes(startTime.value)) {
    startTime.value = time
    endTime.value = null
    return
  }

  if (time === startTime.value) {
    startTime.value = null
    endTime.value = null
    return
  }

  endTime.value = time
}

const getTimeSlotClass = (time) => {
  const currentMin = timeToMinutes(time)
  const startMin = timeToMinutes(startTime.value)
  const endMin = timeToMinutes(endTime.value)

  const isStart = startTime.value === time
  const isEnd = endTime.value === time
  const isInRange = startMin !== -1 && endMin !== -1 && currentMin > startMin && currentMin < endMin

  if (isStart || isEnd) {
    return 'bg-cyan-400 text-black font-black border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]'
  }
  if (isInRange) {
    return 'bg-cyan-950/80 text-cyan-200 border-cyan-500/50 font-bold'
  }
  return 'bg-zinc-950/80 text-zinc-300 border-zinc-800 hover:border-zinc-600 hover:text-white'
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
/* Animación de despliegue/cierre suave sin "saltos", basada en grid-template-rows
   para no tener que medir alturas por JS (evita tirones en contenido variable) */
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
</style>
