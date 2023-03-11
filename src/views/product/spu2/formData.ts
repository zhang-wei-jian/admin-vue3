import { ref, watch, toRefs, watchEffect, onMounted } from 'vue'
import { useAttrStore } from '@/stores/attrStore'
import pinia from '@/stores/index'
import { storeToRefs } from 'pinia'
import { reqTreademark, reqSpuSelectList } from '@/api/spu'
import type { Record, ISPU } from '@/types/spu2Types'
import type { treade, SpuSaleAttrList } from '@/types/spuType'
import type { UploadUserFile } from 'element-plus'

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
  const uploadImageList = ref<UploadUserFile[]>([])
  // 匹配列表
  const trademarkList = ref<treade[]>()
  const spuAttrSelectList = ref<SpuSaleAttrList[]>()
  onMounted(async () => {
    const res = await reqTreademark()
    trademarkList.value = res
    // 获取销售列表

    spuAttrSelectList.value = await reqSpuSelectList()
    trademarkList.value = res
  })

  return {
    spuFormData,
    trademarkList,
    uploadImageList,
  }
}
