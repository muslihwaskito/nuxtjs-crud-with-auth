<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title">
          List Customers
          <nuxt-link class="btn btn-primary float-right btn-sm" :to="{name: 'customers-add'}">
            add New
          </nuxt-link>
        </h4>
      </div>
      <div class="card-body row">
        <div class="col-md-4 offset-md-8 mb-4">
          <input v-model="search" type="text" placeholder="Search" class="form-control" @keypress.enter="findCustomer">
        </div>
        <div class="col-md-12">
          <b-table striped hover :items="customers.data" :fields="fields" show-empty responsive>
            <template v-slot:cell(actions)="row">
              <nuxt-link :key="'edit'+row.index" :to="{name:'customers-edit-id', params: {id: row.item.id}}" class="btn btn-warning btn-sm">
                Edit
              </nuxt-link>
              <button class="btn btn-danger btn-sm" @click="openDeleteModal(row)">
                Delete
              </button>
            </template>
          </b-table>

          <b-pagination v-model="customers.current_page" align="right" :total-rows="customers.total" :per-page="customers.per_page" aria-controls="my-table" @change="changePage" />
        </div>

        <!-- Modal Delete -->
        <b-modal v-model="deleteModal" title="Delete Data Customer">
          <p>Kamu yakin ingin menghapus data: <code>{{ customer_selected?customer_selected.name:'' }}</code>?</p>
          <template v-slot:modal-footer>
            <div class="w-100 float-right">
              <div class="w-100 float-right">
                <b-button
                  variant="secondary"
                  size="sm"
                  @click="deleteModal=false"
                >
                  Close
                </b-button>
                <b-button
                  variant="primary"
                  size="sm"
                  @click="deleteDataCustomer"
                >
                  Delete
                </b-button>
              </div>
            </div>
          </template>
        </b-modal>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  async asyncData({store}) {
    await Promise.all([
      store.dispatch('customer/getCustomerData')
    ])
    return
  },
  data() {
    return {
      fields: ['name', 'phone_number', 'address', 'point', 'deposit', 'actions'],
      items: [],
      deleteModal: false,
      customer_selected: null,
      search: ''
    }
  },
  computed: {
    ...mapState('customer', {
      customers: state => state.customers,
      page: state => state.page
    })
  },
  watch: {
    page() {
      this.getCustomerData(this.search)
    }
  },
  methods: {
    ...mapActions('customer', ['getCustomerData', 'destroyCustomerData']),
    ...mapMutations('customer', ['SET_PAGE']),
    openDeleteModal(row) {
      this.customer_selected = row.item
      this.deleteModal = true
    },
    deleteDataCustomer() {
      this.destroyCustomerData(this.customer_selected.id).then(() => {
        this.deleteModal = false
        this.customer_selected = null
      })
    },
    findCustomer() {
      this.getCustomerData(this.search)
    },
    changePage(val) {
      this.SET_PAGE(val)
    }
  },
}
</script>