<template>
    <div class="nav" :class="{isCollapse:isNavCollapse}">
        <!-- logo -->
        <h1 class="logo">
            <img src="@/assets/images/logo.png" alt="" width="32">
            <span v-show="!isNavCollapse">通用后台管理系统</span>
        </h1>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      :router="true"
      :unique-opened='true'
      :collapse='isNavCollapse'
      :collapse-transition = 'false'
      
      active-text-color="#ffd04b">
      <div v-for="(item,index) in menuData" :key="index">
        <el-submenu :index="item.path" v-if="item.children">
        <template slot="title">
          <i class="el-icon-s-opportunity"></i>
          <!-- <svg-icon icon-file-name="404" /> -->
          <span>{{item.title}}</span>
        </template>
          <el-menu-item :index="item2.path" v-for="item2 in item.children" :key="item2.path">{{item2.title}}</el-menu-item>
          <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
      </el-submenu>
      <el-menu-item :index="item.path" v-else>
        <i class="el-icon-s-home"></i>
        <!-- <svg-icon icon-file-name="404" /> -->
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
      </div>
    </el-menu>
    </div>
</template>

<script>
// 引入辅助函数
import {mapState} from 'vuex'
export default {
    data () {
        return {
            // 初始数据
            // menuData: [
            //         {
            //             title: "首页",
            //             path:"/"
            //         },
            //         {
            //             title: "客户管理",
            //             path:"/customer",
            //             children: [
            //                 { title: "客户档案", path:"/customer"},
            //                 { title: "拜访记录", path:"/visit"},
            //             ], 
            //         },
            //         {
            //             title: "修养预约",
            //             path:"/business",
            //             children: [
            //                 { title: "预约信息", path:"/appointment"},
            //                 { title: "服务项", path:"/service"},
            //                 { title: "结算单", path:"/statement"},
            //             ], 
            //         },
            //         {
            //             title: "流程管理",
            //             path:"/flow",
            //             children: [
            //                 { title: "审核流程定义",path:"/definition"},
            //             ], 
            //         },
            //     ]
 
        }
    },
    computed:{
        // 使用小仓库数据
        ...mapState({
            // 简写
            isNavCollapse:state=>state.NavCollapse.isNavCollapse,
            menuData:state=>state.UserMenu.UserMenu
        })
    }
}
</script>
 
<style lang = "less" scoped>
 .nav{
    height: 100%;
    position: fixed;
    width: 220px;
    background-color:#304156 ;
    box-shadow: 5px 0 5px #ccc;
    transition: all .4s;
    .el-menu{
        border: none;
    }   
    &.isCollapse{
        width: 64px;
    }
    .logo{
        position: relative;
        img{
            margin:20px 0 0 20px
        }
        span{
            color: #fff;
            display: inline-block;
            position: absolute;
            top: 28px;
            left: 64px;
            width: 130px;
        }

    }
 }  
  /*隐藏文字*/
.el-menu--collapse  .el-submenu__title span{
    display: none;
}
/*隐藏三角符号 > */
::v-deep .el-menu--collapse  .el-submenu__title .el-submenu__icon-arrow{
    display: none;
}
/* 修改二级菜单栏背景色 */
.el-submenu .el-menu-item{
  background-color: rgb(38,52,69)!important;
}
::v-deep .el-submenu__title:hover,.el-menu-item:hover{
  background-color: #444!important;
}
</style>