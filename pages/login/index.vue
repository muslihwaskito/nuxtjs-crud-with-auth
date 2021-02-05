<template>
  <!-- Outer Row -->
  <div class="row justify-content-center">
    <div class="col-xl-10 col-lg-12 col-md-9">
      <div class="card o-hidden border-0 shadow-lg my-5">
        <div class="card-body p-0">
          <!-- Nested Row within Card Body -->
          <div class="row">
            <div class="col-lg-6 d-none d-lg-block bg-login-image" />
            <div class="col-lg-6">
              <div class="p-5">
                <div class="text-center">
                  <h1 class="h4 text-gray-900 mb-4">
                    Welcome Back!
                  </h1>
                </div>
                <form class="user">
                  <div v-if="errors.status == 'error'" class="alert alert-danger alert-dismissible">
                    <a class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    {{ errors.message }}
                  </div>
                  <div class="form-group">
                    <input id="exampleInputEmail" v-model="auth.email" type="email" class="form-control form-control-user" aria-describedby="emailHelp" placeholder="Enter Email Address..." :class="{'is-invalid': errors.email}">
                    <p v-if="errors.email" class="text-danger">
                      {{ errors.email[0] }}
                    </p>
                  </div>
                  <div class="form-group">
                    <input id="exampleInputPassword" v-model="auth.password" type="password" class="form-control form-control-user" placeholder="Password" :class="{'is-invalid': errors.password}">
                    <p v-if="errors.password" class="text-danger">
                      {{ errors.password[0] }}
                    </p>
                  </div>
                  <div class="form-group">
                    <div class="custom-control custom-checkbox small">
                      <input id="customCheck" type="checkbox" class="custom-control-input">
                      <label class="custom-control-label" for="customCheck">Remember Me</label>
                    </div>
                  </div>
                  <a href="javascript:void(0)" class="btn btn-primary btn-user btn-block" @click="submit">
                    Login
                  </a>
                </form>
                <hr>
                <div class="text-center">
                  <nuxt-link class="small" :to="{ name: 'forgot-password' }">
                    Forgot Password?
                  </nuxt-link>
                </div>
                <div class="text-center">
                  <nuxt-link class="small" :to="{name: 'register'}">
                    Create an Account!
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
import { mapMutations } from 'vuex'
export default {
  auth:false,
  data(){
    return {
      auth:{
        email: null,
        password: null
      },
      errors: []
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    ...mapMutations(['SET_IS_AUTH']),
    submit(){
      this.$auth.loginWith('local', {
        data: {
          email: this.auth.email,
          password: this.auth.password
        }
      }).then(() => {
        this.SET_IS_AUTH(true)
        this.$router.push('/')
      }).catch((error) => {
        this.errors = error.response.data
      })
    }
  },
}
</script>