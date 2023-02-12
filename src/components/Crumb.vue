<template>
<!-- 面包屑 -->
    <div class="crumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
            <el-breadcrumb-item v-for="item,index in title" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data () {
        return {
            title:[]
        }
    },
    watch:{
        // 监听路由变化
        $route:{
            // 立即监听，页面一刷新就监听
            immediate:true,
            handler(newVal,oldVal){
                // 将路由元信息meta的titles 设为面包屑的值
                this.title = this.$route.meta.titles
            }
        }
    }
}
</script>
 
<style lang = "less" scoped>
.crumb{
    flex: 1;
    .el-breadcrumb{
        line-height: 50px;
    }
}
</style>