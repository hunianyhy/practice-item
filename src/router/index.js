import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import {GetUserRouters} from '@/request/api'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/home'		// 路由的重定向，重新定义跳转路径
  // },
  {
    path: '/',
    name: 'mainlayout',
    component: () => import(/* webpackChunkName: "mainlayout" */ '../views/layout/MainLayout.vue'),
    redirect:'/home',
    // children:[
    //   {
    //     path:'home',
    //     component: () => import( '../views/HomeView.vue'),
    //   },
    //   {
    //     path:'/customer/customer',
    //     component: () => import( '../views/customer/Customer.vue'),
    //   },
    //   {
    //     path:'/customer/visit',
    //     component: () => import( '../views/customer/Visit.vue'),
    //   },
    //   {
    //     path:'/flow/definition',
    //     component: () => import( '../views/flow/Definition.vue'),
    //   },
    //   {
    //     path:'/business/appointment',
    //     component: () => import( '../views/business/Appointment.vue'),
    //   },
    //   {
    //     path:'/business/service',
    //     component: () => import( '../views/business/Service.vue'),
    //   },
    //   {
    //     path:'/business/statement',
    //     component: () => import( '../views/business/Statement.vue'),
    //   },
    // ]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
  },
  {
    path: '*',
    // name: 'login',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach(async(to,from,next)=>{
  // 获取token
  let token = localStorage.getItem('TOKEN')
  // 如果未登录(没有token)，跳转到非登录页，则拒绝访问，强制回到登录页
    if(to.path !='/login' && !token){
        next('/login')
        return
    }
    // 如果已登录(有token)，跳转到登录页，拒绝访问，直接跳转到首页
    if(to.path == '/login' && token){
      next('/')
      return
    }
    // 发请求
      // 判断token 是否存在，同时左侧菜单栏是否为空，同时满足，才发请求
      if(token && store.state.UserMenu.UserMenu == 0){
         let res = await GetUserRouters()
         let newMenuData = [{title: "首页",path:"/home",icon:'dashboard'}]
        //  if(!res)return
        //  动态生成左侧导航条
         let ret = res.data.map(item=>{
          if(item.children){
              return {
              title: item.meta.title,
              path:item.path,
              icon:item.meta.icon,
              children:item.children.map(subitem=>{
                return  {
                  title: subitem.meta.title, 
                  path: item.path+"/"+subitem.path
                }
              })
            }
          }else{
            return{
              title: item.meta.title,
              path:item.path,
              icon:item.meta.icon,
            }
          }
         })
        //  console.log(res);
        //  拼接
        newMenuData = [...newMenuData,...ret]
        // 调用commit方法
        store.commit('changeUserMenu',newMenuData)
        //  console.log(newMenuData);

        // 动态添加mainlayout的子路由
        //  console.log(res);
        //  首页是默认数据，可以直接写死
         let newChildrenRoutes = [{
              path:'/home',
              // 元信息
              meta:{titles:['首页']},
              component: () => import( '../views/HomeView.vue'),
         },
         {
          path:'/profile',
          // 元信息
          meta:{titles:['个人中心']},
          component: () => import( '../views/Profile.vue'),
     }
        ]
        //  遍历后端返回的路由
        res.data.forEach(item=>{
          // 此时每一个item就是数据
          // 再次遍历item.children，拿到每一个子路由
          let ret = item.children.map(subitem=>{
            return{
              // 路径和组件名需要拼接
              path:item.path + '/'+subitem.path,
              // 元信息
              meta:{
                titles:[item.meta.title,subitem.meta.title]
              },
              component: () => import(`../views${item.path}/${subitem.name}.vue`)
            }
          })
              // 然后把生成子路由合并到新数组（newChildrenRoute）内
              newChildrenRoutes = [...newChildrenRoutes,...ret]
        })
            // console.log(newChildrenRoutes);
            // 最后使用动态添加路由方法，将生成的路由放入到mainlayout的子路由内即可
            // router.addRoute('需要添加的路由',子路由对象)
            newChildrenRoutes.forEach(item=>{
              router.addRoute('mainlayout',item)
            })
      // 这个to.path要写. 
      // 如果直接next()，路由还没有完整，还是个空的。它不确定路由里面有没有这个路径。
      // 加了to.path之后，会重新走一遍路由守卫，
      // 此时路由添加完毕，可以检查出用户能不能访问这个路径
            next(to.path)
            return
      }
    // 其它情况则放行
      next()
})
// 重写push方法
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
  return originalPush.call(this, location).catch(err => {})
};
export default router
