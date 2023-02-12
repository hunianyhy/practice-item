<template>
    <div class="login-page">
        <div class="login-box">
            <h3>e店帮O2O平台-2</h3>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="user">
                <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item :label="'密\xa0\xa0\xa0\xa0码'" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="codes">
                <div class="codeImg">
                    <el-input v-model.number="ruleForm.codes"></el-input>
                    <img :src="codeImg" alt="" @click="getCode">
                </div>
            </el-form-item>
            <el-form-item>
                <el-button class="el-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
// 引入验证函数
import {validateUser} from '@/utils/validate'
// 引入接口
import {GetCodeList,GetLoginList} from '@/request/api'
export default {
    data () {
        return {
            // 验证码图图片
            codeImg:'',
            ruleForm: {
                user:'qdtest1',
                password:'123456',
                codes:'888888',
            },
            rules:{
                user: [
                { required: true, message: '用户名不能为空', trigger: 'blur' },
                // 自定义校验   抽取验证函数都在同一个文件下：validateUser
                { validator: validateUser, trigger: 'blur' }
                ],
                password: [
                { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                codes: [
                { required: true, message: '验证码不能为空', trigger: 'blur' }
                ],
            }
        }
    },
    created(){
        // 获取验证码请求
        this.getCode()
        // 手动打开Application面板删除token，再按后退键来到登录页面，登录进去之后是上一个账号的菜单，
        // 这是浏览器的本身特性造成。所以进入到登录页面需要清除Vuex中的用户菜单数据解决这个bug
        // 来到登录页面的时候清空用户菜单数据即可解决
        this.$store.commit('changeUserMenu',[])
    },
    methods:{
        // 点击切换验证码
        // 使用async和await
        async getCode(){
            let res = await GetCodeList()
                if(res.code == 200){
                    // console.log(res);
                    this.codeImg = "data:image/gif;base64," + res.img
                    // 保存uuid 给后续登录接口传递参数
                    localStorage.setItem('UUID',res.uuid)
                }
            
        },
        submitForm(formName) {
        this.$refs[formName].validate( async (valid) => {
          if (valid) {
            // 验证通过，
            // 发起登录请求
                let res = await GetLoginList({
                    // 传递4个参数，看接口
                    username:this.ruleForm.user,
                    password:this.ruleForm.password,
                    code:this.ruleForm.codes,
                    uuid:localStorage.getItem('UUID')
                })
                        if(res.code==200){
                            // 保存token
                            localStorage.setItem('TOKEN',res.token)
                            // 清除uuid
                            localStorage.removeItem('UUID')
                            // 提示登录成功
                            this.$message({
                                message: '登录成功',
                                type: 'success'
                                });
                            // 跳转首页
                            this.$router.push('/')
                            // 登录成功后，获取用户信息
                            this.$store.dispatch('getUserInfo')
                        }else{
                            // 账号密码错误
                            // 提示信息即可
                        this.$message.error(res.msg);

                        }
                
            
            // alert('submit!');
          } else {
            // 验证失败，提示信息
            this.$message({
                message: '请输入完整信息在登录',
                type: 'warning'
            });
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
}
</script>
 
<style lang = "less" scoped>
.login-page{
    width: 100%;
    height: 100%;
    background: url(~@/assets/images/loginBg.jpg) center top no-repeat ;
    position: relative;
    .login-box{
        width: 400px;
        border-radius: 20px;
        background-color: #fff;
        padding-top: 20px;
        padding-right: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        h3{
            text-align: center;
            margin-bottom: 20px;
            font-size: 20px;
            padding-left: 40px;
        }
        .el-btn{
            width:360px;
            margin-left: -60px;
        }
        .codeImg{
            display: flex;
            img{
                height: 40px;
                margin-left: 20px;
            }
        }
    }
}
</style>