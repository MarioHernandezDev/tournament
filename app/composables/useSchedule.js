/**
 * Horario de apertura del local y tarifas por hora (mock).
 */
const seedSchedule = () => ({
  hours: [
    { day: 'Lunes', open: '16:00', close: '23:00' },
    { day: 'Martes', open: '16:00', close: '23:00' },
    { day: 'Miércoles', open: '16:00', close: '23:00' },
    { day: 'Jueves', open: '16:00', close: '00:00' },
    { day: 'Viernes', open: '16:00', close: '02:00' },
    { day: 'Sábado', open: '11:00', close: '02:00' },
    { day: 'Domingo', open: '11:00', close: '23:00' }
  ],
  pricing: [
    { id: 'estandar', tier: 'PC Gaming Estándar', pricePerHour: 2.5, description: 'Ryzen 5 + RTX 3060 · Monitor 144Hz' },
    { id: 'pro', tier: 'PC Gaming Pro', pricePerHour: 3.5, description: 'Ryzen 7 + RTX 4070 · Monitor 240Hz' },
    { id: 'vip', tier: 'Sala VIP / Streaming', pricePerHour: 5, description: 'Setup premium + cámara y micro' },
    { id: 'bono', tier: 'Bono 10 horas', pricePerHour: 2, description: 'Tarifa reducida comprando el bono' }
  ]
})

export const useSchedule = () => {
  // TODO Supabase: SELECT * FROM opening_hours ORDER BY day_order; SELECT * FROM pricing_tiers ORDER BY price_per_hour
  return useState('schedule-pricing', seedSchedule)
}
