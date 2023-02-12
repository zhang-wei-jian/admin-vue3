<template>
  <div>
    <el-card>
      <el-table :data="skuList" :border="true">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column label="名称" prop="skuName"> </el-table-column>
        <el-table-column label="描述" prop="skuDesc"> </el-table-column>
        <el-table-column label="图片">
          <template v-slot="{ row }">
            <img :src="row.skuDefaultImg" alt="" style="width: 130px" />
          </template>
        </el-table-column>
        <el-table-column label="图片重量（kg）" prop="weight"> </el-table-column>
        <el-table-column label="价格（元）" prop="price"> </el-table-column>
        <el-table-column label="操作" :width="250">
          <template v-slot="{ row }">
            <!-- <el-button
              type="success"
              :icon="row.isSale ? 'ele-Top' : 'ele-Bottom'"
              @click="skuUpOrDown(row)"
            ></el-button> -->
            <el-button type="success" v-bind="{ icon: 'ele-Bottom' }" @click="skuUpOrDown(row)"></el-button>
            <el-button type="primary" icon="ele-Edit" @click="ElMessage.success('功能未上线')"></el-button>
            <el-button type="info" icon="ele-InfoFilled" @click="lookSkuInfo(row.id)"></el-button>
            <el-button type="danger" icon="ele-Delete" @click="deleteSku(row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        v-model:current-page="current"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        v-model:page-size="sizes"
        layout="prev, pager, next, jumper, ->,sizes, total"
      >
      </el-pagination>
    </el-card>

    <!-- 抽屉 -->
    <el-drawer v-if="skuInfo" v-model="visibilityBinding" :show-close="false">
      <el-row>
        <el-col :span="8" class="grid-content ep-bg-purple">名称: </el-col>
        <el-col :span="16">{{ skuInfo.skuName }} </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">价格: </el-col>
        <el-col :span="15">{{ skuInfo.price }} </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">平台属性: </el-col>
        <el-tag v-for="item of skuInfo.skuAttrValueList">{{ item.attrName }}</el-tag>
        <el-col :span="18"> </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">销售属性属性: </el-col>
        <el-tag v-for="item of skuInfo.skuSaleAttrValueList"
          >{{ item.saleAttrName }}-{{ item.saleAttrValueName }}</el-tag
        >
        <el-col :span="16"> </el-col>
      </el-row>
      <el-row>
        <el-col>走马灯: </el-col>
      </el-row>
      <el-carousel>
        <el-carousel-item v-for="item of skuInfo.skuImageList">
          <img :src="item.imgUrl" style="width: 100%" />
        </el-carousel-item>
      </el-carousel>
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import api from '@/api/sku'
import { reqSukDelete, reqUpId, reqDownId, reqBySkuList } from '@/api/sku'
import type { ISKU, IPostSKU, ISKULOOK } from '@/types/skuType'
import { ElMessage } from 'element-plus'
const total = ref(0)
const current = ref(1)
const sizes = ref(5)
const skuList = ref<ISKULOOK[]>([])

const getPageSkuList = async () => {
  const res = await api.reqPageLIst(current.value, sizes.value)
  skuList.value = res.records
  total.value = res.total
  // console.log(res)
}
watchEffect(getPageSkuList)

// 删除sku
const deleteSku = async (id: number) => {
  await reqSukDelete(id)
  getPageSkuList()
  ElMessage.success('删除成功')
}
// 修改上线下线
const skuUpOrDown = async (row: ISKU) => {
  if (row.isSale) {
    // 已经上架，我要下架
    await reqDownId(row.id)
    ElMessage.success('下架成功')
  } else if (!row.isSale) {
    // 已经下架，我要上架
    await reqUpId(row.id)
    ElMessage.success('上架成功')
  }
  getPageSkuList()
}

const skuInfo = ref<ISKULOOK>()
//
const visibilityBinding = ref(false)
// 查看suk的信息
const lookSkuInfo = async (id: number) => {
  skuInfo.value = await reqBySkuList(id)
  visibilityBinding.value = true
  console.log(skuInfo.value)
}

getPageSkuList()
</script>

<style lang="lass"></style>
