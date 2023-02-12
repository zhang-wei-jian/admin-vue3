<template>
  <div>
    <el-card>
      <el-button type="primary" icon="ele-Plus" @click="$emit('viewTo', 'from')">添加SPU</el-button>
      <!-- <el-button type="primary" icon="ele-Plus" @click="test">添加SPU</el-button> -->
      <el-table :data="listData">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column label="SPU描述" prop="description"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button icon="ele-Plus" type="success" title="添加SKU" @click="addSku(row)"></el-button>
            <el-button icon="ele-Edit" type="warning" title="编辑修改" @click="EditSpu(row)"></el-button>
            <el-button icon="ele-Plus" type="info" title="查看SKU列表" @click="lookSkuList(row.id)"></el-button>
            <el-button icon="ele-Plus" type="danger" title="删除当前SPU"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next, jumper, ->, total" :total="total" 
      v-model:page-size="limit"
      v-model:current-page="current"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAttrStore } from '@/stores/attrStore'
import { watch, ref, watchEffect } from 'vue'
import { reqSpuPageList } from '@/api/spu'

import type { Record  } from '@/api/spu'
import type {AddSpuType} from '@/types/spuType'
import { ElMessage } from 'element-plus'
const attrStore = useAttrStore()
const { category3Id } = storeToRefs(attrStore)

// const current = ref(5)
const emits = defineEmits(['viewTo',''])
// const emis = defineEmits(['viewTo'])
// 自定义事件修改切换页面
// const test = ()=>{
//     emis('viewTo','from')
// }
const total = ref(0) //总条数
const current = ref(1) // 当前页数
const limit = ref(5) //页显示多少
const listData = ref<Record[]>([])

const getPageList = async (MYpage = current.value, MYlimit = limit.value) => {
  try {
    const res = await reqSpuPageList(MYpage, MYlimit, Number(category3Id.value))
    listData.value = res.records
    // console.log(res);
    current.value = res.current
    limit.value = res.size
    total.value = res.total
  } catch (error) {
    ElMessage.error('请求SPU列表出错')
  }
}
watchEffect(() => getPageList())

// 进入编辑界面
const EditSpu = (row:AddSpuType)=>{
    emits('viewTo','from',row)
}
// 进入添加sku
const addSku = (row:AddSpuType)=>{
  emits('viewTo','sku',row)
}
// watch(
//   category3Id,
//   () => {
//     getPageList()
//   },
//   { immediate: true }
// )

// 查看当前sku列表
const lookSkuList = (id:number)=>{
  reqBySkuList
}
</script>
