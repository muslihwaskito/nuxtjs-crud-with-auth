<template>
  <div class="container-fluid">
    <div class="card mb-3">
      <div class="card-header">
        <h4 class="card-title" />
      </div>
      <div class="card-body">
        <app-customer-form />
      </div>
    </div>
  </div>
</template>
<script>
import CustomerForm from '@/components/form/Customer'
export default {
    components: {
        'app-customer-form': CustomerForm
    }
}
</script>