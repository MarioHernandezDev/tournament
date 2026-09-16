/**
 * Datos del local: galería de fotos, specs de PCs y ubicación (mock).
 */
const seedGallery = () => [
  { id: 1, src: '/img/ezreal.png', alt: 'Zona gaming principal' },
  { id: 2, src: '/img/chamber.png', alt: 'Puesto de Valorant' },
  { id: 3, src: '/img/lol-hero.png', alt: 'Puesto de League of Legends' },
  { id: 4, src: '/img/valorant-hero.png', alt: 'Sala de torneos' }
]

const seedSpecs = () => [
  {
    id: 'estandar',
    name: 'Setup Estándar',
    icon: 'i-heroicons-computer-desktop',
    cpu: 'AMD Ryzen 5 7500F',
    gpu: 'NVIDIA RTX 3060 12GB',
    ram: '16GB DDR5',
    monitor: '24" 144Hz IPS',
    peripherals: 'Teclado mecánico + ratón gaming'
  },
  {
    id: 'pro',
    name: 'Setup Pro',
    icon: 'i-heroicons-cpu-chip',
    cpu: 'AMD Ryzen 7 9700X',
    gpu: 'NVIDIA RTX 4070 Super',
    ram: '32GB DDR5',
    monitor: '27" 240Hz IPS',
    peripherals: 'Periféricos inalámbricos de competición'
  },
  {
    id: 'vip',
    name: 'Sala VIP / Streaming',
    icon: 'i-heroicons-video-camera',
    cpu: 'AMD Ryzen 9 9900X',
    gpu: 'NVIDIA RTX 4080',
    ram: '32GB DDR5',
    monitor: '27" 360Hz + monitor secundario',
    peripherals: 'Cámara, micrófono y luz de streaming'
  }
]

const seedLocation = () => ({
  address: 'Calle Example 123, Madrid, España',
  mapEmbedUrl: 'https://www.google.com/maps?q=Madrid&output=embed',
  shortHours: 'Lun-Jue 16:00-23:00 · Vie-Dom 11:00-02:00',
  phone: '+34 600 000 000'
})

export const useInstallations = () => {
  // TODO Supabase: SELECT * FROM facility_photos ORDER BY position; SELECT * FROM pc_specs; SELECT * FROM facility_info LIMIT 1
  const gallery = useState('installations-gallery', seedGallery)
  const specs = useState('installations-specs', seedSpecs)
  const location = useState('installations-location', seedLocation)
  return { gallery, specs, location }
}
