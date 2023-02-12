<template>
  <div>
    <CategorySelector></CategorySelector>
    <el-card style="margin-top=10">
      <el-button type="primary">添加SPU</el-button>

      <el-table :data="spuData" label="序号">
        <el-table-column prop="spuName" label="SPU名称"> </el-table-column>
        <el-table-column prop="description" label="SPU描述"> </el-table-column>
        <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button type="success" icon="ele-Plus"></el-button>
          <el-button type="warning" icon="ele-Edit"></el-button>
          <el-button type="info" icon="ele-Edit"></el-button>
          <el-button type="danger" icon="ele-Delete"></el-button>
        </template>  
        </el-table-column>
      </el-table>
      <el-pagination :tota="total"></el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useAttrStore } from '@/stores/attrStore'
import { usePageData } from './pageData'
import { reqSpuPage } from '@/api/spu2'

import type { Record } from '@/types/spu2Types'
const { category3Id } = storeToRefs(useAttrStore())
const { total, current, sizes } = toRefs(usePageData())
const spuData = ref<Record[]>()

const getSpuPage = async (myCurrent: number = current.value, mySizes: number = sizes.value) => {
  // 发送请求获取分页
  const res = await reqSpuPage(myCurrent, mySizes, Number(category3Id.value))
  spuData.value = res.records
  total.value = res.total
  sizes.value = res.size
  current.value = res.current
}
// watchEffect(() => getSpuPage())
const  a = ref(0)
const b = ref(0)
watch([a,b],([aVal,bVal])=>{
console.log(aVal,bVal);

})
a.value++
</script>
