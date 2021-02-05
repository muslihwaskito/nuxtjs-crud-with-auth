<template>
  <div>
    <page-error v-if="isAuth" />
    <div v-else id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <page-error />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import PageError from '@/components/layouts/PageError'
export default {
  components: {
    'page-error': PageError
  },
  computed: {
    ...mapState(['isAuth'])
  }
}
</script>