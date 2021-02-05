<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">
              Add New
            </h4>
          </div>
          <div class="card-body">
            <fleet-form ref="form" :users="user" />
            <button class="btn btn-primary btn-sm" @click="submit">
              Save
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-8">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">
              List Fleets
            </h4>
          </div>
          <div class="card-body row">
            <div class="col-md-4 offset-md-8 mb-4">
              <input v-model="search" type="text" placeholder="Search" class="form-control" @keypress.enter="findFleet">
            </div>
            <div class="col-md-12">
              <b-table striped hover :items="fleets.data" :fields="fields" show-empty responsive>
                <template v-slot:cell(type)="row">
                  <b v-if="row.item.type == 1">
                    Express
                  </b>
                  <b v-else-if="row.item.type == 2">
                    Regular
                  </b>
                  <b v-else>
                    Ekonomis
                  </b>
                </template>
                <template v-slot:cell(user_id)="row">
                  {{ row.item.user.name }}
                </template>
                <template v-slot:cell(actions)="row">
                  <button class="btn btn-warning btn-sm" @click="openEditModal(row)">
                    Edit
                  </button>
                  <button class="btn btn-danger btn-sm" @click="openDeleteModal(row)">
                    Delete
                  </button>
                </template>
              </b-table>
              <b-pagination v-model="fleets.current_page" align="right" :total-rows="fleets.total" :per-page="fleets.per_page" aria-controls="my-table" @change="changePage" />
            </div>

            <!-- Modal Delete -->
            <b-modal v-model="deleteModal" title="Delete Data Fleet">
              <p>Kamu yakin ingin menghapus data: <code>{{ fleet_selected ? fleet_selected.plat_number : '' }}</code>?</p>
              <template v-slot:modal-footer>
                <div class="w-100 float-right">
                  <b-button variant="secondary" size="sm" @click="deleteModal=false">
                    Close
                  </b-button>
                  <b-button variant="primary" size="sm" @click="deleteDataFleet">
                    Delete
                  </b-button>
                </div>
              </template>
            </b-modal>

            <!-- Modal Edit -->
            <b-modal v-model="editModal" title="Edit Fleet">
              <fleet-form ref="formEdit" :selected="fleet_selected" :users="user" />
              <template v-slot:modal-footer>
                <div class="w-100 float-right">
                  <b-button variant="secondary" size="sm" @click="editModal=false">
                    Close
                  </b-button>
                  <b-button variant="primary" size="sm" @click="updateFleet">
                    Update
                  </b-button>
                </div>
              </template>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import FleetForm from '@/components/form/Fleet'
export default {
  components: {
    'fleet-form': FleetForm
  },
  async asyncData({store}) {
    await Promise.all([
      store.dispatch('fleet/getFleetsData')
    ])
    await Promise.all([
      store.dispatch('user/getAllUserData')
    ])
  },
  data() {
    return {
      fields: [{key: 'id', label: 'Code'}, 'plat_number', 'type', {key: 'user_id', label: 'Operator'}, 'actions'],
      items: [],
      search: '',
      deleteModal: false,
      fleet_selected: null,
      editModal: false
    }
  },
  computed: {
    ...mapState('fleet', {
      fleets: state => state.fleets,
      page: state => state.page
    }),
    ...mapState('user', {
      user: state => state.all_users,
    })
  },
  watch: {
    page(){
      this.getFleetsData(this.search)
    }
  },
  methods: {
    ...mapActions('fleet', ['getFleetsData', 'destroyFleetData']),
    ...mapMutations('fleet', ['SET_PAGE']),
    openDeleteModal(row){
      this.fleet_selected = row.item
      this.deleteModal = true
    },
    openEditModal(row){
      this.fleet_selected = row.item
      this.editModal = true
    },
    closeEditModal(){
      this.fleet_selected = null
      this.editModal = false
    },
    findFleet(){
      this.getFleetsData(this.search)
    },
    changePage(val){
      this.SET_PAGE(val)
    },
    submit(){
        this.$refs.form.submit()
    },
    deleteDataFleet(){
      this.destroyFleetData(this.fleet_selected.id).then(() => {
        this.deleteModal = false
        this.fleet_selected = null
      })
    },
    updateFleet(){
      this.$refs.formEdit.update().then(() => this.closeEditModal())
    }
  },
}
</script>