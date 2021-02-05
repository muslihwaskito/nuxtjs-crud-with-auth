<template>
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
                    Form Forgot Password!
                  </h1>
                </div>
                <form class="user">
                  <div v-if="success_submit" class="alert alert-success alert-dismissible">
                    <a class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    Send reset password success!!! Please check your email address to reset password.
                  </div>
                  <div class="form-group">
                    <input id="exampleInputEmail" v-model="email" type="email" class="form-control form-control-user" aria-describedby="emailHelp" placeholder="Enter Email Address..." :class="{'is-invalid': errors.email}" autocomplete="off">
                    <p v-if="errors.email" class="text-danger">
                      {{ errors.email[0] }}
                    </p>
                  </div>
                  <a href="javascript:void(0)" class="btn btn-primary btn-user btn-block" @click="submit">
                    Send Email
                  </a>
                </form>
                <hr>
                <div class="text-center">
                  <nuxt-link class="small" :to="{ name: 'login' }">
                    Back to Login!
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
export default {
  auth: false,
  data() {
    return {
      email: '',
      success_submit: false,
      errors: []
    }
  },
  methods: {
    submit(){
      new Promise((resolve, reject) => {
        var data = {
          email: this.email
        }
        this.$axios.post('/reset', data).then(() => {
          this.success_submit = true
          this.email = ''
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