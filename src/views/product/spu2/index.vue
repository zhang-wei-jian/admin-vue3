<template>
  <div>
    <SpuListView v-show="views == 'list'" @viewTo="formShowHandler"></SpuListView>

    <SpuFormView v-if="views === 'form'" @viewTo="formShowHandler"></SpuFormView>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs, watchEffect } from 'vue'
import SpuListView from './spuListView.vue'
import SpuFormView from './SpuFormView.vue'
type viewType = 'list' | 'form' | 'sku'
const views = ref<viewType>('list')

const formShowHandler = (view: viewType) => {
  // 显示试图
  views.value = view
}
</script>
