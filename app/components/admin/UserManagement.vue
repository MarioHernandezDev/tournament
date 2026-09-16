<template>
  <section class="space-y-5">
    <h2 class="font-['Rajdhani'] text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
      Gestión de Usuarios
    </h2>

    <div class="rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-zinc-800/80 text-left text-xs uppercase tracking-wider text-zinc-500">
              <th class="px-5 py-3.5 font-semibold">Usuario</th>
              <th class="px-5 py-3.5 font-semibold">Rol</th>
              <th class="px-5 py-3.5 font-semibold">Estado</th>
              <th class="px-5 py-3.5 font-semibold text-right">Fiabilidad</th>
              <th class="px-5 py-3.5 font-semibold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="account in users"
              :key="account.id"
              class="border-b border-zinc-900 last:border-b-0 hover:bg-zinc-900/50 transition-colors"
            >
              <td class="px-5 py-3.5 font-semibold text-white">{{ account.name }}</td>
              <td class="px-5 py-3.5">
                <span
                  class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wide"
                  :class="account.role === 'admin' ? 'bg-amber-400/10 text-amber-300' : 'bg-zinc-900 text-zinc-400'"
                >
                  {{ account.role }}
                </span>
              </td>
              <td class="px-5 py-3.5">
                <span
                  class="inline-flex items-center gap-1.5 text-xs font-semibold"
                  :class="account.status === 'suspended' ? 'text-red-400' : 'text-emerald-400'"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="account.status === 'suspended' ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'" />
                  {{ account.status === 'suspended' ? 'Suspendido' : 'Activo' }}
                </span>
              </td>
              <td class="px-5 py-3.5 text-right font-['Rajdhani'] font-bold text-base text-zinc-200">
                {{ account.reliability }}%
              </td>
              <td class="px-5 py-3.5">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink
                    to="/perfil"
                    class="px-3 py-1.5 rounded-full text-xs font-semibold border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors"
                  >
                    Ver perfil
                  </NuxtLink>
                  <button
                    type="button"
                    class="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
                    :class="account.status === 'suspended'
                      ? 'border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10'
                      : 'border-red-500/40 text-red-400 hover:bg-red-500/10'"
                    @click="toggleSuspend(account.id)"
                  >
                    {{ account.status === 'suspended' ? 'Reactivar' : 'Suspender' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
const { users, toggleSuspend } = useUsersMock()
</script>
