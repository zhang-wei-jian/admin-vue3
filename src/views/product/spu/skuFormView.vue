<template>
  <div>
    <el-card>
      <el-form label-width="100px">
        <el-form-item label="SPU名称">{{ data.spuName }}</el-form-item>
        <el-form-item label="SKU名称">
          <el-input v-model="baseFormData.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="baseFormData.price" :min="1" :max="10" />
        </el-form-item>
        <el-form-item label="重量">
          <el-input-number v-model="baseFormData.weight" :min="1" :max="10" />
        </el-form-item>
        <el-form-item label="规格描述">
          <el-input type="textarea" v-model="baseFormData.skuDesc" :rows="3"></el-input>
        </el-form-item>

        <el-form-item label="平台属性">
          <el-form label-width="100px" inline>
            <!-- select列表下拉列表 -->

            <el-form-item v-for="(attr, index) of attrList" :label="attr.attrName" :key="attr.id">
              <el-select v-model="platSelectList[index]">
                <el-option
                  v-for="attrVal of attr.attrValueList"
                  :label="attrVal.valueName"
                  :value="`{&quot;attrId&quot;:${attr.id},&quot;valueId&quot;:${attrVal.id}}`"
                  :key="attrVal.id"
                ></el-option>
                <!-- :value="attrVal.id" -->
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
          <el-form inline>
            <el-form-item v-for="(item, index) of sellSelectList" :label="item.saleAttrName" :key="item.id">
              <el-select v-model="mySellSeleData[index]">
                <el-option
                  v-for="item2 of item.spuSaleAttrValueList"
                  :value="`${item.id}|${item2.id}`"
                  :label="item2.saleAttrValueName"
                  :key="item2.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>

        <el-form-item label="图片列表">
          <el-table :data="getImgList" @selection-change="selectionChange">
            <el-table-column type="selection">
              <!-- 这是图片的选项多选 -->
            </el-table-column>
            <el-table-column label="图片">
              <template v-slot="{ row }">
                <el-image :src="row.imgUrl" style="height: 100px"></el-image>
              </template>
            </el-table-column>

            <el-table-column label="名称" prop="imgName"> </el-table-column>

            <el-table-column label="操作">
              <template v-slot="{ row }">
                <el-button  v-show="!row.isDefault" @click="setDefaultImg(row)">设置默认</el-button>
                <el-tag  v-show="row.isDefault" type="warning">当前是默认</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSkuHandler">提交</el-button>
          <el-button @click="$emit('viewTo', 'list')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>

import { useAttrData } from './skuFrom/attrData'
import { useBaseData } from './skuFrom/baseData'
import { useImgData } from './skuFrom/imgData'
import { reqAddSku } from '@/api/sku'
import type { Record } from '@/api/spu'
import type { IPostSKU } from '@/types/skuType'
import { ElMessage } from 'element-plus'
const { data } = defineProps<{ data: Record }>() //data是row
const $emit =defineEmits(['viewTo'])
const { baseFormData } = useBaseData(data.id, data.tmId, data.category3Id)
const {
  attrList, //渲染的大select数据
  platSelectList, //很大的select的绑定数组
  sellSelectList, //渲染的销售select
  mySellSeleData, //绑定的select小的收集数组

  skuAttrValueList, //提交的平台属性数据id数组,
  skuSaleAttrValueList, //提交的销售属性数据id数组,
} = useAttrData(data.id)
const { getImgList, selectionChange, skuImgList,setDefaultImg,skuDefaultImg } = useImgData(data.id)

  // 发送提交添加数据submit
  const addSkuHandler = async () => {
    // 发送提交数据
    const subData: IPostSKU = {
      ...baseFormData.value,
      skuImageList: skuImgList.value,
      skuAttrValueList: skuAttrValueList.value,
      skuSaleAttrValueList: skuSaleAttrValueList.value,
      skuDefaultImg:skuDefaultImg.value
    }
    try {
      await reqAddSku(subData)
      ElMessage.success('添加SKU成功！')
    } catch (error) {
      ElMessage.error('添加SKU出错！')
    }
    $emit('viewTo', 'list')
  }
</script>
