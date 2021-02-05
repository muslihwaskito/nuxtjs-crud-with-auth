<template>
  <div>
    <div v-if="isAuth" id="wrapper">
      <app-sidebar />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <app-header />
          <nuxt />
        </div>
        <app-footer />
      </div>
    </div>
    <div v-else class="bg-gradient-primary">
      <div class="container" style="min-height: 100vh">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/layouts/Sidebar.vue"
import Header from "@/components/layouts/Header.vue"
import Footer from '@/components/layouts/Footer'
import { mapState } from 'vuex'

export default {
  components: {
    "app-sidebar": Sidebar,
    "app-header": Header,
    "app-footer": Footer,
  },
  data(){
    return {

    }
  },
  computed: {
    ...mapState(['isAuth'])
  },
}
</script>
