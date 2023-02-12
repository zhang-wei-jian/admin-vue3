import { defineStore } from 'pinia'
import type { IAttrStore } from '@/stores/interface/attrType'
import { reqAttrList1, reqAttrList2, reqAttrList3, reqAttrAllList } from '@/api/attr'

export const useAttrStore = defineStore('attrStore', {
  state(): IAttrStore {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      categories1: [],
      categories2: [],
      categories3: [],
      attrList:[]
    }
  },
  actions: {
    // 获取一级分类列表
    async getAttrList1() {
      const res = await reqAttrList1()

      this.categories1 = res
    },
    //拿着一级id发请求获取二级列表
    async getAttrList2() {
      const res = await reqAttrList2(this.category1Id)
     
      this.categories2 = res
    },
    //拿着2级id发请求获取3级列表
    async getAttrList3() {
      const res = await reqAttrList3(this.category2Id)
  
      this.categories3 = res
    },
    //拿着全部IDIDIDid发请求获取全部全部的列表
    async getAttrAllList() {
      const res = await reqAttrAllList(this.category1Id,this.category2Id,this.category3Id)
      // console.log(res)
      this.attrList = res
    },
  },
})
