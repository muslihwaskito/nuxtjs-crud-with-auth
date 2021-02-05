<template>
  <div class="container-fluid">
    <div class="card mb-3">
      <div class="card-header">
        <h4 class="card-title" />
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="">Identity ID</label>
          <input v-model="users.identity_id" type="text" class="form-control" :class="{'is-invalid': errors.identity_id}">
          <!-- UNTUK MENAMPILKAN VALIDASI ERROR -->
          <p v-if="errors.identity_id" class="text-danger">
            {{ errors.identity_id[0] }}
          </p>
        </div>
        <div class="form-group">
          <label for="">Name</label>
          <input v-model="users.name" type="text" class="form-control" :class="{'is-invalid': errors.name}">
          <p v-if="errors.name" class="text-danger">
            {{ errors.name[0] }}
          </p>
        </div>
        <div class="form-group">
          <label for="">Gender</label>
          <select v-model="users.gender" class="form-control" :class="{'is-invalid': errors.gender}">
            <option value="">
              Pilih
            </option>
            <option value="1">
              Male
            </option>
            <option value="0">
              Female
            </option>
          </select>
          <p v-if="errors.gender" class="text-danger">
            {{ errors.gender[0] }}
          </p>
        </div>
        <div class="form-group">
          <label for="">Address</label>
          <input v-model="users.address" type="text" class="form-control" :class="{'is-invalid': errors.address}">
          <p v-if="errors.address" class="text-danger">
            {{ errors.address[0] }}
          </p>
        </div>
        <div class="form-group">
          <label for="">Email</label>
          <input v-model="users.email" type="text" class="form-control" :class="{'is-invalid': errors.email}">
          <p v-if="errors.email" class="text-danger">
            {{ errors.email[0] }}
          </p>
        </div>
        <div class="form-group">
          <label for="">Password</label>
          <input v-model="users.password" type="password" class="form-control" :class="{'is-invalid': errors.password}">
          <p v-if="errors.password" class="text-danger">
            {{ errors.password[0] }}
          </p>
          <p>
            Leave Blank if you don't change your password
          </p>
        </div>
        <div class="form-group">
          <label for="">Phone Number</label>
          <input v-model="users.phone_number" type="text" class="form-control" :class="{'is-invalid': errors.phone_number}">
          <p v-if="errors.phone_number" class="text-danger">
            {{ errors.phone_number[0] }}
          </p>
        </div>
        <div class="form-group">
          <label for="">Role</label>
          <select v-model="users.role" class="form-control" :class="{'is-invalid': errors.role}">
            <option value="">
              Pilih
            </option>
            <option value="0">
              Admin
            </option>
            <option value="1">
              Driver
            </option>
            <option value="2">
              Users
            </option>
          </select>
          <p v-if="errors.role" class="text-danger">
            {{ errors.role[0] }}
          </p>
        </div>
        <div class="form-group">
          <label for="">Status</label>
          <select v-model="users.status" class="form-control" :class="{'is-invalid': errors.status}">
            <option value="">
              Pilih
            </option>
            <option value="0">
              Tidak Aktif
            </option>
            <option value="1">
              Aktif
            </option>
          </select>
          <p v-if="errors.status" class="text-danger">
            {{ errors.status[0] }}
          </p>
        </div>
        <div v-if="!users.url" class="form-group">
          <label for="">Photo</label>
          <input type="file" class="form-control" @change="onImageChange">
        </div>
        <div v-if="users.url" class="form-group">
          <label for="">Change Photo</label>
          <input type="file" class="form-control" @change="onImageChange">
        </div>
        <div v-if="users.url" class="form-group">
          <label for="">Photo</label>
          <img class="img-fluid px-3 px-sm-4 mt-3 mb-4" :src="users.url" alt="">
        </div>
        
        <button class="btn btn-primary btn-sm" @click="submit">
          Save
        </button>
        <nuxt-link :to="{ name: 'users' }" class="btn btn-btn-secondary btn-sm">
          Back
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  async asyncData({store}) {
    await Promise.all(
      [
        store.dispatch(`user/getData`, store.state.auth.user.id)
      ]
    )
    return
  },
  computed: {
    ...mapState('user', {
      user: state => state.data,
      errors: state => state.errors
    })
  },
  created() {
    this.users = {
      name: this.user.name,
      identity_id: this.user.identity_id,
      gender: this.user.gender,
      address: this.user.address,
      email: this.user.email,
      password: '',
      phone_number: this.user.phone_number,
      role: this.user.role,
      status: this.user.status,
      url: this.user.url
    }
  },
  methods: {
    ...mapActions('user',['updateUserData', 'getData']),
    submit(){
      var form = new FormData()
      form.append('name', this.users.name)
      form.append('identity_id', this.users.identity_id)
      form.append('gender', this.users.gender)
      form.append('address', this.users.address)
      form.append('email', this.users.email)
      form.append('password', this.users.password)
      form.append('phone_number', this.users.phone_number)
      form.append('role', this.users.role)
      form.append('status', this.users.status)
      form.append('_method', 'PUT')

      if (this.users.photo) {
        form.append('photo', this.users.photo)
      }
      
      let data = {
        id: this.$auth.user.id,
        form: form
      }

      this.updateUserData(data).then(() => this.getData(this.$auth.user.id))
    },
    onImageChange(e){
      this.users.photo = e.target.files[0]
    }
  },
}
</script>