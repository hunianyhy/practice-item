import Vue from 'vue'
import Vuex from 'vuex'
// 引入小仓库
import NavCollapse from './NavCollapse'
import UserMenu from './UserMenu'
import UserInfo from './UserInfo'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    NavCollapse,UserMenu,UserInfo
  }
})
