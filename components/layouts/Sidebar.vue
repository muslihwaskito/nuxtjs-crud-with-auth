<template>
  <!-- Sidebar -->
  <ul
    id="accordionSidebar"
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" :class="{'toggled': toggled}"
  >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="index.html"
    >
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-laugh-wink" />
      </div>
      <div class="sidebar-brand-text mx-3">
        SB Admin
        <sup>2</sup>
      </div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0">

    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="'/'">
        <i class="fas fa-fw fa-tachometer-alt" />
        <span>Dashboard</span>
      </nuxt-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider">

    <!-- Heading -->
    <div class="sidebar-heading">
      Master Data
    </div>
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="{name: 'users'}">
        <i class="fas fa-fw fa-users" />
        <span>Manage Users</span>
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="{name: 'customers'}">
        <i class="fas fa-fw fa-users" />
        <span>Manage Customers</span>
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="{name: 'categories'}">
        <i class="fas fa-fw fa-tag" />
        <span>Manage Categories</span>
      </nuxt-link>
    </li>
    <li class="nav-item">
      <nuxt-link class="nav-link" :to="{name: 'fleets'}">
        <i class="fas fa-fw fa-bus" />
        <span>Manage Fleets</span>
      </nuxt-link>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block">

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button id="sidebarToggle" class="rounded-circle border-0" @click="sideBarclick" />
    </div>
  </ul>
  <!-- End of Sidebar -->
</template>

<script>
export default {
  data() {
    return {
      toggled: false
    }
  },
  methods: {
    sideBarclick(){
      this.toggled = !this.toggled
    }
  },
}
</script>

<style>
.nav-link.active i {
  color: #fff !important;
}

.nav-link.active {
  color: #fff !important;
}
</style>