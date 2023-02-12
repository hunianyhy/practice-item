<template>
    <div class="header">
        <div class="header-top">
            <div class="fl">
                <el-button icon="el-icon-s-fold" v-show="isShow" @click="changeShow"></el-button>
                <el-button icon="el-icon-s-unfold" v-show="!isShow" @click="changeShow"></el-button>
            </div>
            <Crumb/>
            <div class="fr">
                <!-- <img  class="avatar" :src="IMG_BASEURL+(this.userInfo.user.avatar)" alt="">
                 -->
                <el-dropdown @command="hdCommand">
                    <div>
                        <img class="avatar" src="~@/assets/images/default-avatar.jpeg">
                        <i class="el-icon-caret-bottom"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='user'>个人中心</el-dropdown-item>
                        <el-dropdown-item command='logOut'>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="header-buttom">
            <Tags/>
        </div>
    </div>
</template>

<script>
import {IMG_BASEURL} from '@/utils/baseurls'
import Crumb from '@/components/Crumb.vue'
import Tags from '@/components/Tags.vue'
import {mapState} from 'vuex'
export default {
    data () {
        return {
            isShow:true,
            IMG_BASEURL,
        }
    },
    components:{
        Crumb,Tags
    },
    computed:{
        ...mapState({
            userInfo:state=>state.UserInfo.UserInfo
        })
    },
    methods:{
        // 点击事件，点击后折叠导航条
        changeShow(){
            this.isShow = !this.isShow
            // 调用mutation方法
            this.$store.commit('changeNavCollapse')
            // 修改右侧的左内边距为64px
            // 自定义事件
            this.$emit('fn')
        },
        hdCommand(command){
            // console.log(command);
            // 如果点击的是退出登录按钮
            if(command==='logOut'){
                // 确认退出
                this.$confirm('确认退出吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退出成功!',
                });
                // 清空token和userInfo
                localStorage.removeItem('TOKEN')
                localStorage.removeItem('userInfo')
                // 跳转到登录页
                this.$router.push('/login')
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                });          
                });
            }
            // 如果点击的是个人中心按钮
            else if(command==='user'){
                // 跳转到个人中心页面,需要动态路由
                this.$router.push('/profile')
            }
        }
    }
}
</script>
 
<style lang = "less" scoped>
 .header{
    /* width: 100%; */
    height: 84px;
    box-shadow: 0 5px 5px #eee;
    .el-button{
        font-size: 26px;
        width: 50px;
        height: 50px;
        padding-left: 12px;
        border: none;
        margin-left: 0;
    }
    .header-top{
        height: 50px;
        box-shadow: 0 2px 2px #eee;
        display: flex;
        .fr{
            line-height: 50px;
            margin-right: 20px;
        }
    }
    .fr{
        .avatar,i{
            cursor: pointer;
        }
        .avatar{
            width: 40px;
            margin: 5px 5px 0 0;
        }
        
    }
    .header-buttom{
        margin-left: 10px;
        .el-tag{
            color: #666;
        }
    }

 }   
</style>