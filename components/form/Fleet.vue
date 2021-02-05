<template>
  <div>
    <div class="form-group">
      <label for="">Plat Number</label>
      <input v-model="fleet.plat_number" type="text" class="form-control" :class="{'is-invalid': errors.plat_number}">
      <p v-if="errors.plat_number" class="text-danger">
        {{ errors.plat_number[0] }}
      </p>
    </div>
    <div class="form-group">
      <label for="">Type</label>
      <select v-model="fleet.type" class="form-control" :class="{'is-invalid': errors.type}">
        <option value="">
          Pilih
        </option>
        <option value="1">
          Express
        </option>
        <option value="2">
          Regular
        </option>
        <option value="3">
          Ekonomis
        </option>
      </select>
      <p v-if="errors.type" class="text-danger">
        {{ errors.type[0] }}
      </p>
    </div>
    <div class="form-group">
      <label for="">Operator</label>
      <select v-model="fleet.user_id" class="form-control" :class="{'is-invalid': errors.user_id}">
        <option value="">
          Pilih
        </option>
        <option v-for="item in users" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
      <p v-if="errors.user_id" class="text-danger">
        {{ errors.user_id[0] }}
      </p>
    </div>
    <div v-if="!selected" class="form-group">
      <label for="">Photo</label>
      <input type="file" class="form-control" @change="onImageChange">
    </div>
    <div v-if="selected && fleet.photo_url" class="form-group">
      <label for="">Photo</label>
      <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" :src="fleet.photo_url" alt="">
    </div>
    <div v-if="selected" class="form-group">
      <label for="">Change Photo</label>
      <input type="file" class="form-control" @change="onImageChange">
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    selected: {
      type: Object,
      default: null
    },
    users: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      fleet: {
        plat_number: '',
        type: '',
        photo: '',
        user_id: '',
        photo_url: ''
      }
    }
  },
  computed: {
    ...mapState('fleet', {
      errors: state => state.errors
    })
  },
  created() {
    if (this.selected) {
      this.fleet = {
        plat_number: this.selected.plat_number,
        type: this.selected.type,
        user_id: this.selected.user_id,
        photo_url: this.selected.photo_url,
      }
    }
    
  },
  methods: {
    ...mapActions('fleet', ['storeFleetData', 'updateFleetData']),
    submit(){
      var form = new FormData()
      form.append('plat_number', this.fleet.plat_number)
      form.append('type', this.fleet.type)
      form.append('user_id', this.fleet.user_id)      

      if (this.fleet.photo) {
        form.append('photo', this.fleet.photo)
      }
      this.storeFleetData(form).then(() => {
        this.clearForm()
      })
    },
    clearForm(){
      this.fleet = {
        plat_number: '',
        type: '',
        photo: '',
        user_id: ''
      }
    },
    onImageChange(e){
      this.fleet.photo = e.target.files[0]
    },
    update(){
      var form = new FormData()

      form.append('plat_number', this.fleet.plat_number)
      form.append('type', this.fleet.type)
      form.append('user_id', this.fleet.user_id)
      form.append('_method', 'PUT')

      if (this.fleet.photo) {
        form.append('photo', this.fleet.photo)
      }
      
      var data = {
        id: this.selected.id,
        form: form
      }
      
      return new Promise((resolve, reject) => {
        this.updateFleetData(data)
        .then(() => resolve())
        .catch(() => reject())
      })
    }
  },
}
</script>