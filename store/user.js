export const state = () => ({
    users: [],
    all_users: [],
    data: [],
    errors: [],
    page: 1
})

export const mutations = {
    SET_USER_DATA(state, payload) {
        state.users = payload
    },
    SET_ALL_USER_DATA(state, payload) {
        state.all_users = payload
    },
    SET_ERRORS(state, payload) {
        state.errors = payload
    },
    SET_PAGE(state, payload){
        state.page = payload
    },
    SET_DATA(state,payload){
        state.data = payload
    }
}

export const actions = {
    getUserData({commit, state}, payload){
        let search = payload?payload:''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/users?q=${search}&page=${state.page}`).then((response) => {
                commit('SET_USER_DATA', response.data.data)
                resolve()
            }).catch(function (e) {
                reject(e)
            })
        })
    },
    getAllUserData({commit}){
        return new Promise((resolve, reject) => {
            this.$axios.get(`/all-users`).then((response) => {
                commit('SET_ALL_USER_DATA', response.data.data)
                resolve()
            }).catch(function (e) {
                reject(e)
            })
        })
    },
    storeUserData({ commit }, payload){
        this.$axios.setHeader(("Content-Type", "multipart/form-data"))

        return new Promise((resolve, reject) => {
            this.$axios.post('/users', payload)
            .then(() => {
                commit('SET_ERRORS', [])
                // dispatch('getUserData')
                resolve()
            }).catch((error) => {
                commit('SET_ERRORS', error.response.data)
                reject()
            })
        })
    },
    destroyUserData({ dispatch, commit } , payload) {
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/users/${payload}`)
            .then(() => {
                dispatch('getUserData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
                reject()
            })
        })
    },
    getData({commit}, payload){
        return new Promise((resolve, reject) => {
            this.$axios.get(`/users/${payload}`).then((response) => {
                commit('SET_DATA', response.data.data)
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
                reject()
            })
        })
    },
    updateUserData({commit}, payload){
        this.$axios.setHeader(("Content-Type", "multipart/form-data"))
        
        return new Promise((resolve, reject) => {
            this.$axios
              .post(`/users/${payload.id}`, payload.form)
              .then(() => {
                commit("SET_ERRORS", [])
                // dispatch("getUserData")
                resolve()
              })
              .catch((error) => {
                commit("SET_ERRORS", error.response.data)
                reject()
              })
        })
    }
}