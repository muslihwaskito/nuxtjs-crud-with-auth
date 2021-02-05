export const state = () => ({
    fleets: [],
    errors: [],
    page: 1
})

export const mutations = {
    SET_FLEETS_DATA(state, payload){
        state.fleets = payload
    },
    SET_ERRORS(state, payload){
        state.errors = payload
    },
    SET_PAGE(state, payload){
        state.page = payload
    }
}

export const actions = {
    getFleetsData({commit, state}, payload){
        var search = payload?payload:''
        return new Promise((resolve, reject) => {
            this.$axios.get(`/fleet?q=${search}&page=${state.page}`)
            .then((response) => {
                commit('SET_FLEETS_DATA', response.data.data)
                resolve()
            })
            .catch((error) => {
                reject(error)
            })
        })
    },
    storeFleetData({dispatch, commit}, payload){
        this.$axios.setHeader(("Content-Type", "multipart/form-data"))

        return new Promise((resolve, reject) => {
            this.$axios.post('fleet', payload)
            .then(() => {
                commit('SET_ERRORS', [])
                dispatch('getFleetsData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRORS', error.response.data)
                reject()
            })
        })
    },
    updateFleetData({dispatch, commit}, payload){        
        this.$axios.setHeader(("Content-Type", "multipart/form-data"))

        return new Promise((resolve, reject) => {
            this.$axios.post(`fleet/${payload.id}`, payload.form)
            .then(() => {
                commit("SET_ERRORS", [])
                dispatch('getFleetsData')
                resolve()
            })
            .catch((error) => {
                commit("SET_ERRORS", error.response.data)
                reject()
            })
        })
    },
    destroyFleetData({dispatch, commit}, payload){
        return new Promise((resolve, reject) => {
            this.$axios.delete(`fleet/${payload}`)
            .then(() => {
                commit('SET_ERRORS', [])
                dispatch('getFleetsData')
                resolve()
            })
            .catch((error) => {
                commit('SET_ERRPRS', error.response.data)
                reject()
            })
        })
    }
}