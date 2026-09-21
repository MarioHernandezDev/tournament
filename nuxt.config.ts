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
    '@nuxt/image',
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

  // Imágenes optimizadas: WebP con fallback al formato original (JPEG/PNG).
  // AVIF pesa ~15 % menos pero tarda ~3 s por imagen en codificarse en un servidor Node sin CDN/prerender;
  // para activarlo basta con format: ['avif', 'webp'] cuando el hosting cachee /_ipx (Vercel, Netlify, Cloudflare…).
  image: {
    quality: 65,
    format: ['webp'],
    densities: [1, 2],
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536, '2xl': 1920 },
    ipx: { maxAge: 60 * 60 * 24 * 30 }
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
        { rel: 'icon', type: 'image/png', href: '/img/favicon.png' }
      ]
    }
  }
})