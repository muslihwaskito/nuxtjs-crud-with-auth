<template>
  <div>
    <div class="form-group">
      <label for="">Name</label>
      <input v-model="customers.name" type="text" class="form-control" :class="{'is-invalid': errors.name}">
      <p v-if="errors.name" class="text-danger">
        {{ errors.name[0] }}
      </p>
    </div>
    <div class="form-group">
      <label for="">Phone Number</label>
      <input v-model="customers.phone_number" type="text" class="form-control" :class="{'is-invalid': errors.phone_number}">
      <p v-if="errors.phone_number" class="text-danger">
        {{ errors.phone_number[0] }}
      </p>
    </div>
    <div class="form-group">
      <label for="">Address</label>
      <input v-model="customers.address" type="text" class="form-control" :class="{'is-invalid': errors.address}">
      <p v-if="errors.address" class="text-danger">
        {{ errors.address[0] }}
      </p>
    </div>
    <div class="form-group">
      <label for="">Point</label>
      <input v-model="customers.point" type="text" class="form-control" :class="{'is-invalid': errors.point}">
      <p v-if="errors.point" class="text-danger">
        {{ errors.point[0] }}
      </p>
    </div>
    <div class="form-group">
      <label for="">Deposit</label>
      <input v-model="customers.deposit" type="text" class="form-control" :class="{'is-invalid': errors.deposit}">
      <p v-if="errors.deposit" class="text-danger">
        {{ errors.deposit[0] }}
      </p>
    </div>
    <button class="btn btn-primary btn-sm" @click="submit">
      Save
    </button>
    <nuxt-link :to="{name: 'customers'}" class="btn btn-secondary btn-sm">
      Back
    </nuxt-link>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            customers: {
                name: '',
                phone_number: '',
                address: '',
                point: '',
                deposit: ''
            }
        }
    },
    computed: {
        ...mapState('customer', {
            customer: state => state.data,
            errors: state => state.errors
        })
    },
    created() {
        if (this.$route.name == 'customers-edit-id') {
            this.customers = {
                name: this.customer.name,
                phone_number: this.customer.phone_number,
                address: this.customer.address,
                point: this.customer.point,
                deposit: this.customer.deposit
            }
        }
    },
    methods: {
        ...mapActions('customer', ['storeCustomerData', 'updateCustomerData']),
        submit(){
            if (this.$route.name == 'customers-edit-id') {
                let data = Object.assign({id: this.$route.params.id}, this.customers)
                this.updateCustomerData(data).then(() => this.$router.push({name: 'customers'}))
            } else {
                this.storeCustomerData(this.customers).then(() => this.$router.push({name: 'customers'}))
            }
        }
    },
}
</script>