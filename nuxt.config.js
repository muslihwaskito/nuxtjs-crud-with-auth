require("dotenv").config()
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],

    script: [
      { src: "/vendor/jquery/jquery.min.js" },
      { src: "/vendor/bootstrap/js/bootstrap.bundle.min.js" },
      { src: "/vendor/jquery-easing/jquery.easing.min.js" },
      { src: "/js/sb-admin-2.min.js" },
    ],
  },
  /*
   ** Global CSS
   */
  css: [
    "@/assets/vendor/fontawesome-free/css/all.min.css",
    "@/assets/css/sb-admin-2.min.css",
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["@/plugins/axios.js"],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    "@nuxtjs/dotenv",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "bootstrap-vue/nuxt",
  ],
  auth: {
    strategies: {
      //METHOD LOGIN YANG AKAN KITA GUNAKAN
      local: {
        //DIMANA ENDPOINTNYA ADALAH
        endpoints: {
          //UNTUK LOGIN PADA BAGIAN URL, KITA MASUKKAN URL LOGIN DARI API YANG SUDAH KITA BUAT
          //SEDANGKAN PROPERTYNAME ADALAH PROPERTY YANG INGIN KITA AMBIL VALUENYA
          //DALAM HAL INI, LOGIN MENGHARAPKAN TOKEN, SEDANGKAN PADA API KITA ME-RETURN TOKEN DI DALAM OBJECT DATA
          login: {
            url: "/login",
            method: "post",
            propertyName: "access_token",
          },
          logout: { url: "/logout", method: "post" },
          user: { url: "/profile", method: "get", propertyName: "data" },
        },
        tokenRequired: true,
        tokenType: "Bearer ",
      },
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL_API,
  },
  router: {
    middleware: ["auth"],
    linkExactActiveClass: "active",
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  /*
   ** Configure server ex: port or host
   ** Default localhost port 3000
   */
  server: {},
}
