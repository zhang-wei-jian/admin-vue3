<template>
  <div>
    <CategorySelector @clickList3=""></CategorySelector>

    <el-card v-if="!addProperty">
      <el-button :disabled="!category3Id" icon="ele-Plus" type="primary" @click="addPropertyHandler(true)"
        >添加属性</el-button
      >
      <el-table :data="attrList" fit>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="属性名称" prop="attrName"></el-table-column>
        <el-table-column label="标签列表" type="index" width="200">
          <template v-slot="{ row }">
            <el-tag v-for="item in row.attrValueList">{{ item.valueName }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button icon="ele-Edit" type="warning" @click="EditAttr(row)"></el-button>
            <el-button icon="ele-Delete" type="danger" @click="deleteAttrListItem(row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- addd添加属性的页面 -->
    <el-card v-else>
      <div>
        <el-form>
          <el-form-item label="属性名" @blur="inputKeyBlur">
            <el-input v-model="formData.attrName" />
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="addAttrValueHandler" :disabled="formData.attrName===''">确定添加属性</el-button>
        <el-button @click="addPropertyHandler(false)">取消</el-button>
      </div>

      <div>
        <el-table :data="formData.attrValueList">
          <el-table-column label="序号" type="index"> </el-table-column>

          <el-table-column label="属性值名称">
            <template v-slot="{ row }">
              <el-input v-model="row.valueName" @blur="inputBlur(row)" @keyup.enter="inputBlur(row)" v-if="row.show" ref="inputRef"></el-input>
              <span v-else @click="spanClick(row)"> {{ row.valueName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button icon="ele-delete" @click="deleteAttr(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="savehandler" >保存</el-button>
      
        <el-button>取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick, watch, computed } from 'vue'
import { useAttrStore } from '@/stores/attrStore'
import { storeToRefs } from 'pinia'
import type { IAttr, IAttrItem } from '@/types/app'
import { reqAddAttr, reqDeleteAttr } from '@/api/attr'
import { ElMessage } from 'element-plus'

// 初始化一下当前页面列表的数据
// const data = ref<IAttr>()
const inputRef = ref<HTMLInputElement>()
const addProperty = ref<boolean>(false)
const attrStore = useAttrStore()
const { category3Id, attrList } = storeToRefs(attrStore)

// 这个是为了防止切换组件，直接带数据加载出来的
if (attrStore.category3Id !== '') {
  attrStore.getAttrAllList()
}

watch(category3Id, () => {
  attrStore.getAttrAllList()
})

// ////////////////////////////////切换添加页面////////////////////////////////
// 切换到添加类型页面
const addPropertyHandler = (show: boolean) => {
  addProperty.value = show
}
type EditAttrList = Pick<IAttrItem, 'valueName'> & { show?: boolean }
type TFromData = Omit<IAttr, 'id' | 'attrValueList'> & { attrValueList: EditAttrList[] }
// 定义表单收集
const formData = ref<TFromData>({
  // 从表单中获取
  attrName: '',
  // 从仓库中获取
  categoryId: 0,
  // 固定的
  categoryLevel: 3,
  // 表格中获取
  attrValueList: [],
})

//  确定添加按钮
const addAttrValueHandler = () => {
  // 校验属性名是不是重复或者空的
  const value = formData.value.attrName.trim()
  const attrNamess = attrList.value.find(item => item.attrName === value)
  // if (!value) {
  //   ElMessage('属性名你这是空的啊')
  //   return
  // } else
   if (attrNamess) {
    ElMessage.error('属性名重复了，换一个吧')
    return
  }
  formData.value.attrValueList.push({
    valueName: '',
    show: true,
  })
  nextTick(() => {
    inputRef.value?.focus()
  })
}
// 输入框失去3焦点的时候
const inputBlur = (row: EditAttrList) => {
  const valisNull  =row.valueName.trim()===''
  const valRep = formData.value.attrValueList.find(item=>{
    // 当前项不是输入的新加入的这个，并且是其他的
   return  item!==row && item.valueName===row.valueName 
  })

 
  if(valisNull || valRep){
    formData.value.attrValueList= formData.value.attrValueList.filter(item=>{
    return   item!==row
    })
  }else{
    row.show = false
  }
 

}
// span文本点击的时候
const spanClick = (row: EditAttrList) => {
  row.show = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}
// 删除的时候
const deleteAttr = (row: EditAttrList) => {
  formData.value.attrValueList = formData.value.attrValueList.filter(item => row !== item)
}
// 确定保存的时候
const savehandler = async () => {
  formData.value.categoryId = Number(category3Id.value)
  try {
    await reqAddAttr(formData.value)
  } catch (error) {
    ElMessage.error('添加错误')
  }
  attrStore.getAttrAllList()
  addProperty.value = false
}
// 删除
const deleteAttrListItem = (id: number | string) => {
  reqDeleteAttr(id)
  attrStore.getAttrAllList()
  addProperty.value = false
}
// 编辑修改
const EditAttr = row => {}
/////////////验证/////////////////
const inputKeyBlur = () => {}
</script>

<style lang=""></style>
