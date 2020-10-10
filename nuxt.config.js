export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'virak',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: '~/components/Loading.vue',

  // Global CSS (https://go.nuxtjs.dev/config-css)
  /*
   ** Global CSS
   */
  css: ['~/assets/styles/main.scss'],
  styleResources: {
    scss: ['~/assets/styles/*.scss'],
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/event-bus', mode: 'client' },
    { src: '~/plugins/mouse', mode: 'client' },
    { src: '~/plugins/ticker', mode: 'client' },
    { src: '~/plugins/resize', mode: 'client' },
    { src: '~/plugins/scroll', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  /*
   ** SVG sprites
   */
  svgSprite: {
    input: '~/assets/icons/',
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/svg',
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['gsap'],
    filenames: {
      // needed for imagemin modules to keep name of file
      img: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'img/[name]-[hash:7].[ext]',
    },
    extend(config, { isDev, isClient }) {
      // better debug
      if (isDev) {
        config.devtool = 'cheap-module-eval-source-map'
      }

      /**
       * GLSL
       */
      config.module.rules.push({
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      })
    },
  },
}
