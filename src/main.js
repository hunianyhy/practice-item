import Vue from 'vue'
// 清除默认样式
import 'reset-css'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入element插件
import './plugins/element.js'
// 引入svg
import './assets/icons/index'
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
