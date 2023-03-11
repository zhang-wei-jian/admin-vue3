<template>
  <div>
    <!-- form -->
    <el-card>
      <el-form label-width="80px">
        <el-form-item label="SPU名称">
          <el-input v-model="spuFormData.spuName" />
        </el-form-item>
        <el-form-item label="品牌">
          <!-- <el-select v-model="spuFormData.tmId" :placeholder="'还有' + selectData.length + ''"> -->
          <el-select v-model="spuFormData.tmId">
            <el-option v-for="item of trademarkList" :value="item.id" :label="item.tmName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
          <el-input type="textarea" v-model="spuFormData.description" />
        </el-form-item>
        <el-form-item label="SPU图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="true"
            list-type="picture-card"
            v-model:file-list="uploadImageList"
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
          <el-table :data="spuFormData.spuSaleAttrList">
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
                <el-button @click="row"> 添加 </el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" prop="">
              <template v-slot="{ row }">
                <el-button type="danger" @click="row">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click=""> 提交 </el-button>
          <el-button @click="$emit('viewTo', 'list')"> 取消 </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { useFormData } from './formData'

const { spuFormData, trademarkList, uploadImageList } = useFormData()
const uploadUrl = import.meta.env.VITE_API_URL + '/admin/product/upload' // /admin/product/upload
</script>
