<template>
    <div class="tags">
        <el-tag size="medium" :closable="index>0"
         v-for="(item,index) in tags"
         :key="item.path" 
         :effect="item.name===$route.meta.titles[$route.meta.titles.length - 1]?'dark':'plain'"
         @click="clickTag(item.path)"
         @close="closeTag(index)"
         @contextmenu.native.prevent="rightClick($event,index)"
        >
        {{item.name}}
        
        </el-tag>
        <TagMenu 
        v-show="isShowTagMenu"
        :menuX='menuX'
        :menuY='menuY'
        :clickIndex='clickIndex'
        :tags='tags'
        @fn='clickMenu'
        >
        </TagMenu>
    </div>
</template>

<script>
import TagMenu from '@/components/TagMenu.vue'
export default {
    data () {
        return {
            tags:[
                {
                    name:'首页',
                    path:'/home'
                }
            ],
            isShowTagMenu:false,
            menuX:0,
            menuY:0,
            clickIndex:0
        }
    },
    components:{
        TagMenu
    },
    mounted(){
        // 点击其它位置，关闭菜单
        document.addEventListener('click',this.closeTagMenu)
    },
    beforeDestroy(){
        // 组件卸载前，删除点击事件
        document.removeEventListener('click',this.closeTagMenu)
    },
    methods:{
        // 点击跳转
        clickTag(path){
            // 点击跳转到对应的路由页面
            this.$router.push(path)
             // 调用关闭菜单方法
            this.closeTagMenu()
        },
        // 点击关闭
        closeTag(index){
            // 删除完后，跳转到最后一个
            // 添加判断,如果点击删除的是当前项，且不是最后一项，则跳转
            if(this.tags[index].path === this.$route.path && index !== this.tags.length -1){
                this.$router.push(this.tags[this.tags.length -1].path)
                // 如果删除的是最后一项，则跳转到倒数第二个页面
            }else if(index === this.tags.length -1){
                this.$router.push(this.tags[this.tags.length -2].path)
            }
            // 删除被点击的元素
            this.tags.splice(index,1)
            // 调用关闭菜单方法
            this.closeTagMenu()
        },
        // 右击事件
        rightClick(e,i){
            // console.log('右击了');
            // 将菜单显示
            this.isShowTagMenu = true
            // 修改top和left值为
            this.menuX = e.pageX
            this.menuY = e.pageY
            this.clickIndex = i
        },
        // 控制菜单隐藏
        closeTagMenu(){
            this.isShowTagMenu = false
        },
        // 子传父，接收参数
        clickMenu(i){
            // console.log(i);
            // 判断点击的索引值，为5则关闭全部菜单，留下首页即可
            if(i==5){
                // 初始化tags
                this.tags =[
                {
                    name:'首页',
                    path:'/home'
                }
            ]
            // 重新跳转到首页
            this.$router.push('/home')
            }
            // 关闭当前
            if(i==1){
                // // 为1则关闭当前菜单
                // let newTags = this.tags
                // console.log( newTags);
                this.tags.splice(this.clickIndex,1)
                // 然后跳转到最后一项
                 this.$router.push(this.tags[this.tags.length -1].path)

            }
            // 关闭其它
                if(i==2){
                // 关闭其它菜单，保留首页和当前项
                // console.log(i);
                // console.log(this.clickIndex);
                // 声明一个新数组，接收当前项
                let newTags = [{
                    name:this.tags[this.clickIndex].name,
                    path:this.tags[this.clickIndex].path,
                }]
                // 筛选首页出来
                let NewTag = this.tags.filter(item=>{
                    console.log(this.tags[this.clickIndex]);
                    return item.name =='首页' 
                })
                // console.log(newTags);
                // console.log(NewTag);
                // 拼接完成关闭其它菜单
                this.tags = [...NewTag,...newTags]
                // 最后跳转到最后一项
                 this.$router.push(this.tags[this.tags.length -1].path)
            }
            // 刷新页面
            if(i==0){
                this.$router.go(0)
            }
        }
    },
    watch:{
        $route:{
            // 页面一加载，就监听路由变化
            immediate:true,
            handler(newVal,oldVal){
                // console.log(newVal);
                // 路由一发生变化，就push到tags内
                // push之前需要判断，当前路由是否在tag内
                // 使用find方法，返回布尔值
                const bool = this.tags.find(item=>{
                    return item.path == newVal.path
                })
                // 如果不存在，才添加
                if(!bool){
                    this.tags.push({
                    name:newVal.meta.titles[newVal.meta.titles.length - 1],
                    path:newVal.path
                })
                }
                
            }
        }
    }
}
</script>
 
<style lang = "less" scoped>
.tags{
    margin-left: 2px;
    margin-top: 4px;
    cursor: pointer;
    .el-tag{
        margin-left: 10px;
    }
}
</style>