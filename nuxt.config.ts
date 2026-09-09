// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  // Carga del CSS principal para aplicar Tailwind y Nuxt UI
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/supabase',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxtjs/google-fonts'
  ],

  // Configuración de Supabase
  supabase: {
    redirect: false, // Cambiar a true cuando necesites proteger rutas automáticamente
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/', '/torneos/*']
    }
  },

  // Configuración de fuentes tipo eSports / Gaming
  googleFonts: {
    families: {
      Rajdhani: [600, 700],
      Inter: [400, 500, 600, 700]
    },
    display: 'swap'
  },

  // Opciones de App / Head (Meta etiquetas para SEO)
  app: {
    head: {
      title: 'Torneos eSports | Valorant & League of Legends',
      meta: [
        { name: 'description', content: 'Plataforma de torneos competitivos de Valorant y LoL.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})