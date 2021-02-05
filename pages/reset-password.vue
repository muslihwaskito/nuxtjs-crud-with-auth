<template>
  <div class="bg-gradient-primary">
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-6 col-md-6">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">
                        Form Reset Password!
                      </h1>
                    </div>
                    <form class="user">
                      <div v-if="success_submit" class="alert alert-success alert-dismissible">
                        <a class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        Reset password success!!! Now you can login using last register password.
                      </div>                      
                      <div v-if="errors.message" class="alert alert-danger alert-dismissible">
                        <a class="close" data-dismiss="alert" aria-label="close">&times;</a>
                        Send reset password Failed!!! {{ errors.message }}.
                      </div>
                      <div class="form-group">
                        <input id="exampleInputPassword" v-model="password" type="password" class="form-control form-control-user" aria-describedby="passwordHelp" placeholder="Enter Password..." :class="{'is-invalid': errors.password}" autocomplete="off">
                        <p v-if="errors.password" class="text-danger">
                          {{ errors.password[0] }}
                        </p>
                      </div>                      
                      <div class="form-group">
                        <input id="exampleInputPasswordConfirmation" v-model="password_confirmation" type="password" class="form-control form-control-user" aria-describedby="passwordConfirmationHelp" placeholder="Enter Password Confirmation..." :class="{'is-invalid': errors.password_confirmation}" autocomplete="off">
                        <p v-if="errors.password_confirmation" class="text-danger">
                          {{ errors.password_confirmation[0] }}
                        </p>
                      </div>
                      <a href="javascript:void(0)" class="btn btn-primary btn-user btn-block" @click="submit">
                        Reset Password
                      </a>
                    </form>
                    <hr v-if="success_submit">
                    <div v-if="success_submit" class="text-center">
                      <nuxt-link class="small" :to="{ name: 'login' }">
                        Go to Login!
                      </nuxt-link>
                    </div>
                  </div>
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
export default {
  auth: false,
  data() {
    return {
      password: '',
      password_confirmation: '',
      success_submit: false,
      errors: []
    }
  },
  methods: {
    submit(){
      this.errors = []
      new Promise((resolve, reject) => {
        var token = this.$route.query.token
        var data = {
          password: this.password,
          password_confirmation: this.password_confirmation
        }
        this.$axios.put(`/reset/${token}`, data).then(() => {
          this.success_submit = true
          this.password = ''
          this.password_confirmation = ''
          this.errors = []
          resolve()
        }).catch((error) => {
          this.errors = error.response.data
          reject()
        })
      })
    }
  },
}
</script>