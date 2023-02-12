<template>
    <div>
        <el-button @click="exportFile">导出</el-button>
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            label="客户姓名"
            
            >
            <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
            prop="phone"
            label="电话"
            >
            </el-table-column>
            <el-table-column
            label="性别"
            
            >
            <template slot-scope="scope">{{ scope.row.sex==1? '男':'女' }}</template>
            </el-table-column>
            <el-table-column
            prop="inputUserName"
            label="录入人"
            >
            </el-table-column>
            <el-table-column
            label="录入时间"
            >
            <template slot-scope="{row}">{{ row.entryTime?new Date(row.entryTime).toLocaleDateString().replaceAll("/","-"):""}}</template>
            </el-table-column>
            <el-table-column
            label="操作">
            <template>
                <el-button size="mini" type="text" icon="el-icon-edit"
                >修改
                </el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import {GetCustomerList,CustomerExportApi} from '@/request/api'
export default {
    data () {
        return {
            tableData: [],
            multipleSelection: [],
            pageNum:1,  // 当前页数
            pageSize:10, // 每页条数
            total:0

        }
    },
    mounted(){
        // 调用接口
        this.getUserList()
    },
    methods:{
        handleSizeChange(val) {
            // 修改每页条数
            this.pageSize = val
            // 重新渲染页面
            this.getUserList()
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // 获取当前页数的数据，重新渲染页面
            this.pageNum = val
            this.getUserList()
            console.log(`当前页: ${val}`);
        },
        // 导出
        async exportFile(){
            let res = await CustomerExportApi({
                // 参数
            })
            console.log(res);
        },
        // 获取客户列表信息请求
        async getUserList(){
            let res = await GetCustomerList({
                pageNum:this.pageNum,
                pageSize:this.pageSize
            })
            if(res.code==200){
                console.log(res);
                this.total = res.total
                this.tableData = res.rows
            }
        }
    }
}
</script>
 
<style lang = "less" scoped>
.el-pagination{
    float: right;
    margin-right: 188px;
    margin-top: 20px;
}
</style>