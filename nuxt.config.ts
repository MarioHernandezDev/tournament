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
      exclude: ['/', '/instalaciones', '/ranks']
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
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Project Gaming | Torneos de Valorant & League of Legends',
      meta: [
        { name: 'description', content: 'Project Gaming: local gaming y plataforma de torneos competitivos de Valorant y League of Legends.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/img/logo.png' }
      ]
    }
  }
})