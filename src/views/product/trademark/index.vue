<template>
<div>
  <el-card>
    <template #header>
      <el-button type="primary" @click="showDialog">
        <el-icon><Plus /></el-icon>添加按钮
      </el-button>
    </template>
    <!-- 表格 -->
    <el-table :data="data">
      <el-table-column label="ID" prop="id"> </el-table-column>
      <el-table-column label="匹配名称" prop="tmName"> </el-table-column>
      <el-table-column label="品牌LOGIO">
        <template v-slot="{ row }">
          <!-- {{ row.logoUrl }} -->
          <el-image :src="row.logoUrl" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button type="warning" @click="showEdit(row)"
            ><el-icon><Edit /></el-icon>修改</el-button
          >
          <el-button type="danger" 
          @click="deleteTm(row.id)"
            ><el-icon><Delete /></el-icon>删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next, jumper, ->,sizes, total"
      :total="total"
      v-model:current-page="page"
      v-model:page-size="limit"
      :page-sizes="[5, 10, 20, 40, 50, 100]"
    />
  </el-card>

  <!-- 这是弹框 -->
  <el-dialog v-model="show">
    <el-form ref="ruleFormRef" :model="formData" :rules="rules">
      <el-form-item label="品牌名称" prop="tmName">
        <el-input v-model="formData.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" prop="logoUrl">
        <!-- 这是图片上传 -->
        <el-upload
          class="avatar-uploader"
          :action="reqLogoApi"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="formData.logoUrl" :src="formData.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-button @click="submit" type="primary">{{ formData.id ? '修改' : '添加' }}</el-button>
    </el-form>
  </el-dialog>
</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue'
import { reqTrademarkList, reqAddTrademark, reqEditTrademark, reqDeleteTrademark } from '@/api/treademark' //api接口

import type { ItemTreademark } from '@/types/app'
import { ElMessage, type FormInstance, type FormRules, type UploadRawFile } from 'element-plus'

const page = ref(1)
const limit = ref(5)
const total = ref(0)
const data = ref<ItemTreademark[]>([])
const show = ref(false)
const formData = ref<Omit<ItemTreademark, 'id'> & { id?: number }>({
  tmName: '',
  logoUrl: '',
})
const ruleFormRef = ref<FormInstance>()
// 请求分页列表函数
const getTrademarkList = async (sb: number = page.value, sblimit: number = limit.value) => {
  // reqTrademarkList(1,5)
  const res = await reqTrademarkList(sb, sblimit)
  //   console.log(res.records);
  data.value = res.records
  total.value = res.total
}
// 挂载请求数据
onMounted(() => {
  getTrademarkList()
})
// 监视
watchEffect(() => {
  getTrademarkList()
})
// 显示弹框
const showDialog = (id?: any) => {
  formData.value = {
    tmName: '',
    logoUrl: '',
  }
  ruleFormRef.value?.resetFields()
  show.value = true
  
  
}
const reqLogoApi = `${import.meta.env.VITE_API_URL}/admin/product/upload`
//图片上传发送成功请求回来的参数
async function handleAvatarSuccess(response: any, uploadFile: any, uploadFiles: any) {
  // console.log(response)
  formData.value.logoUrl = response.data
  await ruleFormRef.value?.validate()
}
// 上传前的对图片校验
const beforeAvatarUpload = (rawFile: UploadRawFile) => {
  let imgType = ['image/png', 'image/jpeg', 'image/gif']
  console.log(rawFile.size, 1024 * 1024 * 1)
  console.log(imgType.includes(rawFile.type), rawFile.size >= 1024 * 1024 * 1)

  if (!imgType.includes(rawFile.type) || rawFile.size >= 1024 * 500 * 1) {
    ElMessage.error('图片类型或者大小不合法,500k图片')
    return false
  }
  return true
}
//  确定按钮
const submit = async () => {
  // 表单全部验证
  try {
    await ruleFormRef.value?.validate()
  } catch {
    return
  }
  if (formData.value.id) {
    await reqEditTrademark(formData.value as ItemTreademark)
    if (data.value.length >= limit.value - 1) {
      page.value++
      console.log('修改页数')
    }
  } else {
    const res = await reqAddTrademark(formData.value)
  }
  ElMessage.success(`${formData.value.id ? '添加' : '修改'}成功！`)
  getTrademarkList()
  show.value = false
}
//  表单校验
const rules = ref<FormRules>({
  tmName: [{ required: true, pattern: /^.{2,20}$/, trigger: 'blur', message: '品牌名称2-20位' }],
  logoUrl: [{ required: true, trigger: 'change', message: '为什么看不起图片' }],
})
//  编辑修改
const showEdit = (row: ItemTreademark) => {
  showDialog()
  formData.value = { ...row }
  // reqEditTrademark()
}
// 删除
const deleteTm = async (id: number) => {
  await reqDeleteTrademark(id)
  getTrademarkList()
}
</script>


<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
