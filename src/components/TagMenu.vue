<template>
<!-- 标签栏右键出现的菜单 -->
    <div class="tag-menu" :style="{left:menuX+'px',top:menuY+'px'}">
        <ul>
            <li v-for="item,index in tmenu" :key="index"
                v-show="isShowMenu(index)"
                @click="hdClick(index)"
            >
                <i :class="item.icon"></i>
                {{item.text}}
            </li>
            <!-- <li>{{clickIndex}}</li> -->
        </ul>
    </div>
</template>

<script>
export default {
    props:["menuX","menuY",'clickIndex','tags'],
    data () {
        return {
            tmenu:[
                {
                    icon:"el-icon-refresh-right",
                    text:"刷新页面"
                },
                {
                    icon:"el-icon-close",
                    text:"关闭当前"
                },
                {
                    icon:"el-icon-circle-close",
                    text:"关闭其他"
                },
                {
                    icon:"el-icon-back",
                    text:"关闭左侧"
                },
                {
                    icon:"el-icon-right",
                    text:"关闭右侧"
                },
                {
                    icon:"el-icon-circle-close",
                    text:"全部关闭"
                }
            ]
 
        }
    },
    methods:{
        // 控制菜单显示与隐藏
        isShowMenu(i){
            // console.log(i);
            // 判断点击的是否为首页
            if(this.clickIndex === 0){
                // 点击的是首页，隐藏2和4项
                // if(i==1 || i==3){
                //     return false
                // }
                // return true
                // 简写
                return ![1,3].includes(i)
            }
            if(this.clickIndex === 1 && this.clickIndex === this.tags.length -1){
                // 如果点击的是第二项，且是最后一项，则隐藏关闭左侧，和关闭右侧因首页不可关闭
                return ![3,4].includes(i)
                
            }else if(this.clickIndex === 1 && this.clickIndex !== this.tags.length -1){
                // 如果点击的是第二项，不是最后一项，则隐藏关闭左侧即可
                return i!=3
            }
            if(this.clickIndex === this.tags.length -1){
                // 点击的是最后一项，隐藏关闭右侧
                return ![4].includes(i)
            }
            return true
            
        },
        // li的点击事件，也就是右击弹窗后的菜单点击事件
        hdClick(i){
            // console.log(i);
            // 子传父
            this.$emit('fn',i)
        }
    },

}
</script>
 
<style lang = "less" scoped>
    .tag-menu{
        padding: 8px 0;
        position: absolute;
        background-color: #fff;
        box-shadow: 2px 2px 4px #bbb;
        border-radius: 4px;
        li{
            padding:8px 16px;
            cursor: pointer;
            font-size: 14px;
            &:hover{
                background-color: #eee;
            }
        }
    }
</style>