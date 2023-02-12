<template>
  <div>
    <el-card>
      <el-form label-width="80px">
        <el-form-item label="SPU名称">
          <el-input v-model="formData.spuName" />
        </el-form-item>
        <el-form-item label="品牌">
          <!-- <el-select v-model="formData.tmId" :placeholder="'还有' + selectData.length + ''"> -->
          <el-select v-model="formData.tmId">
            <el-option v-for="item of trademarks" :value="item.id" :label="item.tmName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
          <el-input type="textarea" v-model="formData.description" />
        </el-form-item>
        <el-form-item label="SPU图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="true"
            list-type="picture-card"
            v-model:file-list="spuImageList"
          >
            <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="销售属性">
          <el-select v-model="markKey" :placeholder="'还有' + selectData.length + '条属性未添加'">
            <el-option v-for="item of selectData" :value="item.id" :label="item.name"></el-option>
          </el-select>
          <el-button type="primary" @click="addMarkey">添加销售属性</el-button>
        </el-form-item>
        <el-form-item>
          <!-- tabel表格 -->
          <el-table :data="formData.spuSaleAttrList">
            <el-table-column label="序号" type="index"></el-table-column>
            <!-- <el-table-column label="属性名" prop="baseSaleAttrId"></el-table-column> -->
            <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
            <el-table-column label="属性值列表" prop="">
              <template v-slot="{ row }">
                <el-tag v-for="item of row.spuSaleAttrValueList" closable @close="deleteTag(row, item)">
                  {{ item.saleAttrValueName }}</el-tag
                >
                <el-input
                  v-show="row.edit"
                  v-model="inputVal"
                  @blur="inputBlur(row)"
                  ref="inputRef"
                  style="width: 80px"
                ></el-input>
                <el-button @click="keyValueAdd(row)"> 添加 </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="">
              <template v-slot="{ row }">
                <el-button type="danger" @click="deleteRow(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit"> 提交 </el-button>
          <el-button @click="$emit('viewTo', 'list')"> 取消 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, reactive } from 'vue'
import type { AddSpuType, treade, SpuSaleAttrList, SpuSaleAttrValueList, SpuImageList } from '@/types/spuType'
import { reqTreademark, reqAddSpu, reqImageList ,reqSpuSelectList} from '@/api/spu'
import { useAttrStore } from '@/stores/attrStore'
import { storeToRefs } from 'pinia'

import { ElMessage, type UploadUserFile } from 'element-plus'
const { category3Id } = storeToRefs(useAttrStore())
const trademarks = ref<treade[]>([])
const emits = defineEmits(['viewTo'])
// 上传图片的地址，使用环境变量来设置地址，好处：在不同环境下会根据环境变量的值自动切换
let uploadUrl = `${import.meta.env.VITE_API_URL}/admin/product/upload`
// 获取匹配列表
async function getTrademarksData() {
  try {
    trademarks.value = await reqTreademark()
  } catch (e) {
    ElMessage.error('获取失败')
  }
}
//
const formData = ref<Omit<AddSpuType, 'id'> & { id?: number }>({
  category3Id: Number(category3Id.value),
  description: '',
  spuName: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})
getTrademarksData()
// 获取品牌下拉列表数据
const spuImageList = ref<UploadUserFile[]>([])

// 销售部分
let selectData = reactive([
  {
    id: 1,
    name: '颜色',
  },
  {
    id: 2,
    name: '版本',
  },
  {
    id: 3,
    name: '尺码',
  },
])
const markKey = ref()
// 封装通过这个数组的id查询对应的name
const markValueName = (selectId: number) =>
  (selectData.find(item => item.id === selectId) as { id: number; name: string }).name

// 全局声明一下我选中的下拉框的id对应的name
let valueName = ''
// 添加销售属性
const addMarkey = () => {
  valueName = markValueName(markKey.value)
  // 封装根据id查找对应的value值
  const myRow = {
    baseSaleAttrId: markKey.value,
    saleAttrName: valueName,
    spuSaleAttrValueList: [],
  }
  formData.value.spuSaleAttrList.push(myRow)
  // console.log(selectData)

  selectData.filter((item, index) => {
    // console.log(item,index);

    if (item.name === valueName) {
      selectData.splice(index, 1)
    }
  })
  // 去删掉添加过的值
  markKey.value = ''
  // 清空一下绑定的select残留值
}
const inputVal = ref('')
// 收集框框的内容
const inputRef = ref<HTMLInputElement>()

// 按下属性值添加按钮
const keyValueAdd = (row: SpuSaleAttrList & { edit: boolean }) => {
  row.edit = true
  // inputRef.value?.focus()
  nextTick(() => {
    inputRef.value?.focus()
  })
}
// inpu失去光标的时候
const inputBlur = (row: SpuSaleAttrList & { edit: boolean }) => {
  if (!row.spuSaleAttrValueList) row.spuSaleAttrValueList = []

  row.spuSaleAttrValueList.push({
    // 每一个表格行中的小span，地中子弟
    baseSaleAttrId: markKey.value,
    saleAttrName: valueName,
    saleAttrValueName: inputVal.value,
    // saleAttrValueName: '',
  })
  row.edit = false
  // inputVal.value = ''
}
// 删除tag的时候
const deleteTag = (datas: SpuSaleAttrList, data: any) => {
  datas.spuSaleAttrValueList = datas.spuSaleAttrValueList.filter(item => item !== data)
}
// 删除row也就是table的这一行
const deleteRow = (row: SpuSaleAttrList) => {
  formData.value.spuSaleAttrList = formData.value.spuSaleAttrList.filter(item => item !== row)
}
//保存提交数据表单///////////////////////提交数据
const submit = async () => {
  formData.value.spuImageList = spuImageList.value.map(item => {
    return {
      imgName: item.name,
      imgUrl: item.url as string,
    }
  })

  await reqAddSpu(formData.value)
  emits('viewTo', 'list')
}

// /////////////////修改
const props = defineProps(['datas'])
const imageList = ref()
console.log(props.datas)

// 获取图片列表
const getImageList = async () => {
  const res = await reqImageList(formData.value.id as number)

  formData.value.spuImageList = res
}
const getSpuList = async () => {
  const res = await reqSpuSelectList(formData.value.id as number) 

  formData.value.spuSaleAttrList = res
}

if (props.datas?.id) {
  formData.value = props.datas
  formData.value.id = props.datas.id
  formData.value.spuImageList = []
  formData.value.spuSaleAttrList = []
  getImageList()
  getSpuList()
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
