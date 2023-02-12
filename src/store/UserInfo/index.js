// 引入接口
import {GetUserInfo} from '@/request/api'
const state ={
    UserInfo: JSON.parse(localStorage.getItem('userInfo')) ||{
        permissions:[],
        roles:[],
        user:{}
    }
}
const mutations = {
    // 修改state
    changeUserInfo(state,val){
        state.UserInfo = val
        // 保存到本地
        localStorage.setItem('userInfo', JSON.stringify(state.UserInfo))
    }
}
const actions ={
    async getUserInfo({commit}){
        let res = await GetUserInfo()
        console.log(res);
        commit('changeUserInfo',{
            permissions:res.permissions,
            roles:res.roles,
            user:res.user,
        })
    }
}

export default {
    state,mutations,actions
}