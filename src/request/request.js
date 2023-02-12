import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
// 引入进度条和进度条样式
// import nprogress from 'nprogress';
// import 'nprogress/nprogress.css'
// 二次封装axios，利用axios对象的方法create，创建一个axios实例
// instance就是axios，不过需要配置一下
const instance = axios.create({
    // 配置对象，
    baseURL:'http://xue.cnkdl.cn:23683',         //基础路径，发请求的时候，路径当中会出现api
    // 请求超时时间五秒
    timeout:5000
})
// 请求拦截器
instance.interceptors.request.use(config=>{
    // config，配置对象，里面有一个请求头
    // console.log("每一次发起请求前，都会先执行这里的代码");
    // console.log(config); //config 本次请求的配置信息
    // 进度条开始
    // nprogress.start()
    // 携带请求头
    // 获取token
    let token = localStorage.getItem('TOKEN')
    // config.headers.token = token
     // 判断是否存在 token：如果存在，将 token 携带在请求头中,并且访问的页面非登录（login）和验证码（captchaImage）接口
    if(token && !config.url.endsWith("/captchaImage") && !config.url.endsWith("/login")){
        config.headers["Authorization"] = "Bearer "+ token;
    }
    return config
}),err=>{
    return Promise.reject(err)
}
// 响应拦截器
instance.interceptors.response.use(res=>{
    // 响应成功的回调函数
    // console.log("每一次接收到响应，都会先执行这里的代码，再去执行成功的那个回调函数then");
    // 进度条结束
    // nprogress.done()
    let res_data = res.data
    if(res_data.code && res_data.code !==200){
        // 提示错误信息
        Message.error(res_data.msg || '网络请求错误');
        // console.log(res_data);
        if(res_data.code === 401){
            // 401一般表示token过期或者没有带
            // 清除token并返回登录页
            localStorage.removeItem('TOKEN')
            router.push('/login')
        }
    }
    return res_data
    
}),err=>{
    // 响应失败的回调函数
    return Promise.reject(err)

}
// 对外导出
export default instance