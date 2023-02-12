<template>
    <div class="home">
        <div class="content">
            <!-- .box-$*8{$} -->
            <div class="box1">
                <h2>大屏数据可视化</h2>
            </div>
            <div class="box2">
                <dv-border-box-1>
                    <!-- <h3>标题</h3> -->
                    <dv-active-ring-chart :config="config" style="width:100%;height:100%" />
                </dv-border-box-1>
            </div>
            <div class="box3" >
                    <!-- <h3>146</h3> -->
                <dv-border-box-8>
                    <dv-capsule-chart :config="config" style="width:100%;height:100%" />
                </dv-border-box-8>
            </div>
            <div class="box4" >
                <dv-border-box-1>
                    <dv-conical-column-chart :config="config" style="width:90%;height:90%" />
                </dv-border-box-1>

            </div>
            <div class="box5" >
                <dv-border-box-11 title="dv-border-box-11"></dv-border-box-11>
            </div>
            <div class="box6" >
                <dv-border-box-8 :reverse="true"></dv-border-box-8>
            </div>
            <div class="box7" >
                <dv-border-box-11 title="dv-border-box-11"></dv-border-box-11>
            </div>
            <div class="box8" >
                <dv-border-box-10>
                    <dv-flyline-chart :config="config" style="width:100%;height:100%;" />
                </dv-border-box-10>
            </div>
            <div class="box9" >
                <dv-border-box-3></dv-border-box-3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            config:{
                    data: [
                    {
                        name: '周口',
                        value: 55
                    },
                    {
                        name: '南阳',
                        value: 120
                    },
                    {
                        name: '西峡',
                        value: 78
                    },
                    {
                        name: '驻马店',
                        value: 66
                    },
                    {
                        name: '新乡',
                        value: 80
                    }
                ],
                digitalFlopStyle: {
                    fontSize: 16
                },
                showValue: true,
                lineWidth: 10,
                centerPoint: [0.48, 0.35],
                points: [
                    [0.52, 0.23],
                    [0.43, 0.29],
                    [0.59, 0.35],
                    [0.53, 0.47],
                    [0.45, 0.54],
                    [0.36, 0.38],
                    [0.62, 0.55],
                    [0.56, 0.56],
                    [0.37, 0.66],
                    [0.55, 0.81],
                    [0.55, 0.67],
                    [0.37, 0.29],
                    [0.20, 0.36],
                    [0.76, 0.41],
                    [0.59, 0.18],
                    [0.68, 0.17],
                    [0.59, 0.10]
                ],
                bgImgUrl: '/img/flylineChart/map.jpg'
            }
        }
    }
}
</script>
 
<style lang = "less" scoped>
.home{
    height: 100%;
    background: url(../assets/images/bg.jpg) center top no-repeat;
    background-size: 100% 100%;
    .content{
        width: 100%;
        height: 100%;
        display: grid;  /* 网格布局 */
        /* 设置列数, 每一个格子的占多少份 */
        grid-template-columns: repeat(3,1fr);
        /* grid-template-rows: repeat(3,1fr);  */
        grid-template-rows: 50px 1fr 1fr 1fr; 
        /* 网格间距 */
        gap:10px;
        /* background-color: skyblue; */
            .box1{
                /* 跨列 */ 
                grid-column:span 3;
                h2{
                    text-align: center;
                    margin: 0;
                    line-height: 50px;
                    color:#fff;
                    font-size: 22px;
                    font-weight: bold;
                }
            }
            .box8{
                /* 跨列 */ 
                grid-column:span 2;
            }
    }
    
}
h3{
    color: #fff;
    font-size: 18px;
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
}

</style>