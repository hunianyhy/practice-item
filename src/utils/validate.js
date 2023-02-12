// 导出验证函数
export function validateUser(rule, value, callback){
    // 判断
    if(value.length < 3 || value.length > 16){
        callback(new Error('用户名必须为3-16位'));
    }else{
        callback()
    }
}