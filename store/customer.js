export const state = () => ({
    customers: [],
    data: [],
    errors: [],
    pafe: 1
})

export const mutations = {
    SET_CUSTOMER_DATA(state, payload) {
        state.customers = payload
    },
    SET_ERRORS(state, payload) {
        state.errors = payload
    },
    SET_PAGE(state, payload) {
        state.page = payload
    },
    SET_DATA(state, payload) {
        state.data = payload
    }
}

export const actions = {
    getCustomerData({commit, state}, payload) {
        let search = payload?payload:''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/customers?q=${search}&page=${state.page}`).then((response) => {
                commit('SET_CUSTOMER_DATA', response.data.data)
                resolve()
            }).catch(function (e) {
                reject(e)
            })
        })
    },
    storeCustomerData({commit}, payload){
        return new Promise((resolve, reject) => {
            this.$axios.post('/customers', payload)
            .then(() => {
                commit('SET_ERRORS', [])
                resolve()
            }).catch((error) => {
                commit('SET_ERRORS', error.response.data)
                reject()
            })
        })
    },
    getCustomerDetail({commit}, payload){
        return new Promise((resolve, reject) => {
            this.$axios.get(`customers/${payload}`)
            .then((response) => {
                commit('SET_DATA', response.data.data)
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
                reject()
            })
        })
    },
    updateCustomerData({commit}, payload){
        return new Promise((resolve, reject) => {
            this.$axios.put(`/customers/${payload.id}`, payload)
            .then(() => {
                commit('SET_ERRORS', [])
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
                reject()
            })
        })
    },
    destroyCustomerData({dispatch, commit}, payload){
        return new Promise((resolve, reject) => {
            this.$axios.delete(`/customers/${payload}`)
            .then(() => {
                dispatch('getCustomerData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
                reject()
            })
        })
    }
}