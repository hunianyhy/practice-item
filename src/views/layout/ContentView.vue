<template>
    <div class="context">
        <router-view/>
    </div>
</template>

<script>
export default {
    data () {
        return {


        }
    }
}
</script>
 
<style lang = "less" scoped>
.context{
    padding: 20px 0 0 20px;
    /*！！！重点，减号两边的空格不能省略*/
    height:calc(100vh - 124px);
}
</style>