<template>
  <!-- Topbar -->
  <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
    <!-- Sidebar Toggle (Topbar) -->
    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
      <i class="fa fa-bars" />
    </button>

    <!-- Topbar Navbar -->
    <ul class="navbar-nav ml-auto">
      <div class="topbar-divider d-none d-sm-block" />

      <!-- Nav Item - User Information -->
      <li class="nav-item dropdown no-arrow">
        <a id="userDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
          <img class="img-profile rounded-circle" :src="$auth.user.url?$auth.user.url:'https://source.unsplash.com/QAB-WJcbgJk/60x60'">
        </a>
        <!-- Dropdown - User Information -->
        <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <nuxt-link class="dropdown-item" :to="{name: 'profile'}">
            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
            Profile
          </nuxt-link>
          <div class="dropdown-divider" />
          <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal" @click="logout">
            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
            Logout
          </a>
        </div>
      </li>
    </ul>
  </nav>
  <!-- End of Topbar -->
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['SET_IS_AUTH']),
    async logout(){
      await this.$auth.logout()
      this.SET_IS_AUTH(false)
      this.$router.push('/login')
    }
  },
}
</script>