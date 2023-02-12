import { ref } from 'vue'

import type { IPostSKU } from '@/types/skuType'
import { useAttrStore } from '@/stores/attrStore'
import { storeToRefs } from 'pinia'
export function useBaseData(spuId: number, tmId: number, category3Id:number) {
  // const { category3Id } = storeToRefs(useAttrStore())
  // 收集表单中的基础数据
  const baseFormData = ref<
    Pick<IPostSKU, 'spuId' | 'tmId' | 'category3Id' | 'skuName' | 'price' | 'weight' | 'skuDesc'>
  >({ spuId, tmId, category3Id, skuName: '', price: 1, weight: 1, skuDesc: '' })

  return {
    baseFormData,
  }
}
