<template>
  <el-card >
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select placeholder="请选择" v-model="category1Id" @change="checkId1change1">
          <el-option v-for="category1 of categories1" :key="category1.id" :value="category1.id" :label="category1.name">
          </el-option>
        </el-select>
      </el-form-item>
      <!--  -->
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" v-model="category2Id"  @change="checkId2change2">
          <el-option v-for="category2 of categories2" :key="category2.id" :value="category2.id" :label="category2.name">
          </el-option>
        </el-select>
      </el-form-item>
      <!--  -->
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="category3Id" @change="checkId3GetAll">
          <el-option v-for="category3 of categories3" :key="category3.id" :value="category3.id" :label="category3.name">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>


</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useAttrStore } from '@/stores/attrStore'
import { storeToRefs } from 'pinia'
const attrStore = useAttrStore()

// 请求列表1
attrStore.getAttrList1()
const { category1Id, category2Id, category3Id, categories1, categories2, categories3 } = storeToRefs(attrStore)

const checkId1change1 = ()=>{
  // 清空其他的遗留
  attrStore.category2Id = attrStore.category3Id = ''
  attrStore.getAttrList2()

  
}
const checkId2change2 = ()=>{
  attrStore.category3Id = ''
  attrStore.getAttrList3()

  
}
const emits = defineEmits(['clickList3'])

// 触发父组件的自定义事件，传递过去3id
const checkId3GetAll = ()=>{
  emits('clickList3',category3Id.value)
 

  
}
</script>
