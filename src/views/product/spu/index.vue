<template>
  <div>
    <CategorySelector></CategorySelector>
    <spuListView v-if="viewTo === 'list'" @viewTo="viewToFn"></spuListView>
    <spuFromView v-if="viewTo === 'from'" @viewTo="viewToFn" :datas="datas"></spuFromView>
    <skuFormView v-if="viewTo === 'sku'" @viewTo="viewToFn" :data="datas"></skuFormView>
   
  </div>
</template>

<script lang="ts" setup>
import spuListView from './spuListView.vue'
import spuFromView from './spuFromView.vue'
import skuFormView from './skuFormView.vue'
import { ref } from 'vue'
type view = 'list' | 'from' | 'sku'
const viewTo = ref<view>('list')
const datas = ref()
const viewToFn = (view: view, row: any) => {
  viewTo.value = view
  datas.value = row
}
</script>
