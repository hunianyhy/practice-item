<template>
    <div class="layout">
        <!-- 左侧导航条组件 -->
        <NavBar/>
        <!-- 右侧区域 -->
        <div class="layout-right">
            <!-- 头部组件 -->
            <HeaderView @fn='getRightArea'/>
            <!-- 内容组件 -->
            <ContentView/>
        </div>
    </div>
</template>

<script>
// 引入组件
import NavBar from './NavBar'
import ContentView from './ContentView'
import HeaderView from './HeaderView'
export default {
    data () {
        return {
            
        }
    },
    components:{
        NavBar,ContentView,HeaderView
    },
    methods:{
        // 获取右侧区域
        getRightArea(){
            let right = document.querySelector('.layout-right')
            right.classList.toggle('RightArea')
        }
        
    }
}
</script>
 
<style lang = "less" scoped>
.layout{
    width: 100%;
    height: 100%;
    /* 弹性布局 */
    display: flex;
    .layout-right{
        /* 右侧占满 */
        flex: 1;
        margin-left: 220px;
    }
    .RightArea{
        margin-left: 64px;
        
    }
}
</style>