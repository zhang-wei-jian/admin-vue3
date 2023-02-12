import { ref, onMounted, watch } from 'vue'
import { useAttrStore } from '@/stores/attrStore'
import { storeToRefs } from 'pinia'
import { useBaseData } from './baseData'
import { reqSpuSelectList } from '@/api/spu'

import type { SpuSaleAttrList } from '@/types/spuType'
import type { ISKUAttrValue, ISKUSaleAttrValueList } from '@/types/skuType'
export function useAttrData(spuId: number) {
  const attrStore = useAttrStore()
  const { attrList } = storeToRefs(attrStore)
  const platSelectList = ref<string[]>([]) // 定义了大select的收集数组:ISKUAttrValue
  const sellSelectList = ref<SpuSaleAttrList[]>([])
  const mySellSeleData = ref<string[]>([]) // 定义小select的数据
  onMounted(async () => {
    attrStore.getAttrAllList() //获取pinia里面的大下拉数组
    const res = await reqSpuSelectList(spuId) //获取小下拉销售
    sellSelectList.value = res
  })

  const skuAttrValueList = ref<ISKUAttrValue[]>([])
  // 平台属性
  watch(
    // 大个select的下拉数组的变化
    platSelectList,
    newVal => {
      // console.log(newVal, 'select被选 了几个')
      // platSelectList.value = newVal.map(item => {
      //   return JSON.parse(item)
      // })
      skuAttrValueList.value = newVal.filter(item => item).map(item => JSON.parse(item))
    },
    { immediate: true, deep: true }
  )
  const skuSaleAttrValueList = ref<ISKUSaleAttrValueList[]>([])
  // 销售属性
  watch(
    mySellSeleData,
    () => {
      console.log(mySellSeleData.value)
      skuSaleAttrValueList.value = mySellSeleData.value.map(item => {
        const [attId, attValId] = item.split('|')
        return {
          saleAttrId: Number(attId),
          saleAttrValueId: Number(attValId),
        }
      })
    },
    { deep: true }
  )

  return {
    skuAttrValueList, //提交的平台属性数据id数组,
    skuSaleAttrValueList, //提交的销售属性数据id数组,

    attrList, //这是下拉框的数据列表渲染
    platSelectList, //这个绑定大的平台下拉框的数组
    sellSelectList, //小select的数据渲染
    mySellSeleData, //小select收集绑定数组
  }
}
