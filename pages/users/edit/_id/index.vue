<template>
  <div class="container-fluid">
    <div class="card mb-3">
      <div class="card-header">
        <h4 class="card-title" />
      </div>
      <div class="card-body">
        <app-user-form />
      </div>
    </div>
  </div>
</template>
<script>
import UserForm from '@/components/form/User.vue'
export default {
  components: {
    'app-user-form': UserForm
  },
  async asyncData({store, params}) {
    await Promise.all(
      [
        store.dispatch(`user/getData`, params.id)
      ]
    )
    return
  }
}
</script>