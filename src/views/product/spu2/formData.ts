import { ref, watch, toRefs, watchEffect, onMounted } from 'vue'
import { useAttrStore } from '@/stores/attrStore'
import pinia from '@/stores/index'
import { storeToRefs } from 'pinia'
import { reqTreademark } from '@/api/spu'
import type { Record, ISPU } from '@/types/spu2Types'
import type { treade } from '@/types/spuType'

export function useFormData() {
  const { category3Id } = storeToRefs(useAttrStore(pinia))
//   console.log(category3Id)

  const spuFormData = ref<ISPU>({
    tmId: '',
    spuName: '',
    category3Id: 0,
    description: '',
    spuSaleAttrList: [],
    spuImageList: [],
  })
  const trademarkList = ref<treade[]>()
  onMounted(async () => {
    const res = await reqTreademark()
    trademarkList.value = res
  })

  return {
    spuFormData,
    trademarkList,
  }
}
