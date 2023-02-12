
const state ={
    isNavCollapse:false
}
const getters = {}
const mutations = {
    // 修改state
    changeNavCollapse(state){
        state.isNavCollapse = !state.isNavCollapse
    }
}
const actions = {}

export default {
    state,
    mutations
}