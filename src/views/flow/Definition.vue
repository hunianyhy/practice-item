<template>
    <div>
        <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-change	="handleChange"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
import {BpmnInfoApi} from '@/request/api'
export default {
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      async submitUpload() {
        
        const file = this.fileList[0].raw
        console.log(file);
        const BpmnInfoApiRes = await BpmnInfoApi({
            file:file,
            bpmnLabel:"试试",
            bpmnType:"casual-leave",
            info:"试试就逝世"
        },{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if(!BpmnInfoApiRes)return;
        this.$message.success(BpmnInfoApiRes.msg)
      
      },
      handleChange(file, fileList) {
        this.fileList = fileList
      }
    }
}
</script>
 
<style lang = "less" scoped>
    
</style>