<template>
  <div class="row justify-content-center">
    <div class="col-xl-10 col-lg-12 col-md-9">
      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <div class="row">
            <div class="col-lg-5 d-none d-lg-block bg-register-image" />
            <div class="col-lg-7">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">
                    Create an Account!
                  </h1>
                </div>
                <form class="user">
                  <div v-if="success_submit" class="alert alert-success alert-dismissible">
                    <a class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    Register user success!!! Please wait until status approve from admin.
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input id="exampleName" v-model="users.name" type="text" class="form-control form-control-user" placeholder="Name" :class="{'is-invalid': errors.name}">
                      <p v-if="errors.name" class="text-danger">
                        {{ errors.name[0] }}
                      </p>
                    </div>
                    <div class="col-sm-6">
                      <input id="exampleIdentityId" v-model="users.identity_id" type="text" class="form-control form-control-user" placeholder="Identity ID" :class="{'is-invalid': errors.identity_id}">
                      <p v-if="errors.identity_id" class="text-danger">
                        {{ errors.identity_id[0] }}
                      </p>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <select id="exampleGender" v-model="users.gender" class="form-control form-control-user" :class="{'is-invalid': errors.gender}">
                        <option value="" disabled selected hidden>
                          Pilih Gender
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
                    <div class="col-sm-6">
                      <input id="examplePhoneNumber" v-model="users.phone_number" type="text" class="form-control form-control-user" placeholder="Phone Number" :class="{'is-invalid': errors.phone_number}">
                      <p v-if="errors.phone_number" class="text-danger">
                        {{ errors.phone_number[0] }}
                      </p>
                    </div>
                  </div>
                  <div class="form-group">
                    <input id="exampleAddress" v-model="users.address" type="text" class="form-control form-control-user" placeholder="Address" :class="{'is-invalid': errors.address}">
                    <p v-if="errors.address" class="text-danger">
                      {{ errors.address[0] }}
                    </p>
                  </div>
                  <div class="form-group">
                    <input id="exampleInputEmail" v-model="users.email" type="email" class="form-control form-control-user" placeholder="Email Address" :class="{'is-invalid': errors.email}">
                    <p v-if="errors.email" class="text-danger">
                      {{ errors.email[0] }}
                    </p>
                  </div>
                  <div class="form-group row">
                    <div class="col-sm-6 mb-3 mb-sm-0">
                      <input id="exampleInputPassword" v-model="users.password" type="password" class="form-control form-control-user" placeholder="Password" :class="{'is-invalid': errors.password}">
                      <p v-if="errors.password" class="text-danger">
                        {{ errors.password[0] }}
                      </p>
                    </div>
                    <div class="col-sm-6">
                      <input id="exampleRepeatPasswordConfirmation" v-model="users.password_confirmation" type="password" class="form-control form-control-user" placeholder="Password Confirmation" :class="{'is-invalid': errors.password_confirmation}">
                      <p v-if="errors.password_confirmation" class="text-danger">
                        {{ errors.password_confirmation[0] }}
                      </p>
                    </div>
                  </div>
                  <a href="javascript:void(0)" class="btn btn-primary btn-user btn-block" @click="submit">
                    Register Account
                  </a>
                </form>
                <hr>
                <div class="text-center">
                  <nuxt-link class="small" :to="{ name: 'forgot-password' }">
                    Forgot Password?
                  </nuxt-link>
                </div>
                <div class="text-center">
                  <nuxt-link class="small" :to="{ name: 'login' }">
                    Already have an account? Login!
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  auth:false,
  data() {
    return {
      users: {
        name: '',
        identity_id: '',
        gender: '',
        address: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: ''
      },
      errors: [],
      success_submit: false
    }
  },
  methods: {
    ...mapActions('user', ['registerUser']),
    submit(){
      new Promise((resolve, reject) => {
            this.$axios.post('/register', this.users).then((response) => {
          console.log(response)
          this.success_submit = true
          this.clearForm()
          resolve()
        }).catch((error) => {
          this.errors = error.response.data
          reject()
        })
      })
    },
    clearForm(){
      this.users = {
        name: '',
        identity_id: '',
        gender: '',
        address: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: ''
      }
      this.errors = []
    }
  },
}
</script>

<style>
form.user .form-control-user {
  padding: 0.5rem;
}
.text-danger{
  font-size: 12px;
}
</style>