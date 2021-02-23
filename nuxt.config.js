
module.exports = {
    head: {
    title: 'nuxt-spotify',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],
  env: {
    DATABASE: "mongodb+srv://ercan:<PASSWORD>@cluster0.bvjfx.mongodb.net/song?retryWrites=true&w=majority",
    DATABASE_PASSWORD:"Gn5ps1pTjE6CZdxG",
    
    JWT_SECRET:"this-is-myultra-secret-power-for-the-appandbecareful-whatuwishfor",
    JWT_EXPIRES_IN:"90d",
    JWT_COOKIE_EXPIRES_IN:90,
    },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  telemetry: false,


  publicRuntimeConfig: {
      baseURL:  process.env.BASE_URL || 'http://localhost:3000'
    
  },

 
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
