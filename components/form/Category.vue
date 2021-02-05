<template>
  <div>
    <div class="form-group">
      <label for="">Category</label>
      <input v-model="category.name" type="text" class="form-control">
      <p v-if="errors.name" class="text-danger">
        {{ errors.name[0] }}
      </p>
    </div>
    <div class="form-group">
      <label for="">Description</label>
      <input v-model="category.description" type="text" class="form-control">
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
    }
  },
  data() {
    return {
      category: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    ...mapState('category',{      
      errors: state => state.errors
    })
  },
  created() {
    if (this.selected) {
      this.category = {
        id: this.selected.id,
        name: this.selected.name,
        description: this.selected.description
      }
    }
  },
  methods: {
    ...mapActions('category', ['storeCategoryData', 'updateCategoryData']),
    submit(){
      this.storeCategoryData(this.category).then(() => {
        this.clearForm()
      })
    },
    clearForm(){
      this.category = {
        name: '',
        description: ''
      }
    },
    update() {
      return new Promise((resolve, reject) => {
        this.updateCategoryData(this.category).then(() => resolve()).catch(() => reject())
      })
    },
  }
}
</script>