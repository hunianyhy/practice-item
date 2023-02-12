<template>
    <div>
        <p>找不到页面，即将跳转到首页{{point}}</p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            point:''
        }
    },
    created(){
        let t = setInterval(() => {
            this.point = this.point + '.'
            if(this.point === '......'){
                clearInterval(t)
            }
        }, 500);
        setTimeout(() => {
            this.$router.push('/')
        }, 3000);
    }
}
</script>
 
<style lang = "less" scoped>
    
</style>