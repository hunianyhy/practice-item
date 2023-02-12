
const state ={
    UserMenu:[]
}
const mutations = {
    // 修改state
    changeUserMenu(state,val){
        state.UserMenu = val
    }
}

export default {
    state,mutations
}