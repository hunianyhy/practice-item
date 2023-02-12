import request from './request'
// 获取验证码接口
export const GetCodeList =()=>request({url:'/prod-api/captchaImage',method:'GET'})

// 获取登录请求     /prod-api/login
export const GetLoginList =(data)=>request({url:'/prod-api/login',method:'Post',data})

// 获取路由信息        /prod-api/getRouters
export const GetUserRouters =()=>request({url:'/prod-api/getRouters',method:'GET'})

// 获取用户信息
export const GetUserInfo = () => request.get("/prod-api/getInfo");

// 获取客户列表信息
export const GetCustomerList = (params) => request.get("/prod-api/customer",{params});

// 导出客户信息表格
export const CustomerExportApi = (data,configs) => request.post("/prod-api/customer/export",data,configs);

// 审核流程定义
export const BpmnInfoApi = (params,configs) => request.post("/prod-api/business/bpmnInfo",params,configs);
