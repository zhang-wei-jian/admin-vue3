import { ref, onMounted } from 'vue'
import { useAttrStore } from '@/stores/attrStore'
import { storeToRefs } from 'pinia'
import { reqImageList } from '@/api/spu'
// import type { IPostSKU } from '@/types/skuType'
import type { SpuImageList } from '@/types/spuType'

type IimageList = Omit<SpuImageList, 'id' | 'skuId'> & { id: number; spuId: number; isDefault?: boolean }
export function useImgData(spuId: number) {
  
  const getImgList = ref<IimageList[]>([])
  const skuImgList = ref<IimageList[]>([])

  onMounted( async() => {
    getImgList.value = await  reqImageList(spuId) as IimageList[]
  
   
    // skuImgList.value = await reqImageList(spuId) as IimageList[]
  })



  // 选项多选发生改变
  const selectionChange = (selection: IimageList[]) => {
    console.log('sb', selection)
    skuImgList.value = selection
  }
  // 设置默认图片
  const skuDefaultImg = ref('')
  const setDefaultImg = (row: typeof skuImgList.value[0]) => {
    // if(row.isDefault)row.isDefault  = true
    getImgList.value.forEach(item=>{
     item.isDefault = item.id===row.id
    })
    skuDefaultImg.value = row.imgUrl
  }

  return {
    getImgList,
    selectionChange,
    skuImgList,
    setDefaultImg,
    skuDefaultImg
  }
}
