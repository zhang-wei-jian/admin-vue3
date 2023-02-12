import request from '@/utils/request'
import type { AddSpuType, treade, SpuImageList,SpuSaleAttrList } from '@/types/spuType'
enum Apis {
  spuList = '/admin/product/',

  treadeList = '/admin/product/baseTrademark/getTrademarkList',
  addSpu = '/admin/product/saveSpuInfo',
  ImageList = '/admin/product/spuImageList/',
  spuSelect = '/admin/product/spuSaleAttrList/',
}
// 请求spu的分页列表表
export function reqSpuPageList(page: number, limit: number, category3Id: number) {
  return request.get<any, Data>(`${Apis.spuList}${page}/${limit}`, {
    params: {
      category3Id,
    },
  })
}
// 添加spu
export function reqAddSup(data: AddSpuType) {
  return request.post(Apis.addSpu, {
    data,
  })
}
// 获取品牌列表
export function reqTreademark() {
  return request.get<any, treade[]>(Apis.treadeList)
}
// 添加数据
export function reqAddSpu(data: Omit<AddSpuType, 'id'>) {
  return request.post(Apis.addSpu, data)
}
// 添加修改的图片列表
export function reqImageList(id: number) {
  return request.get<any, SpuImageList[]>(Apis.ImageList + id)
}
// 添加修改的销售列表
export function reqSpuSelectList(id: number) {
  return request.get<any, SpuSaleAttrList[]>(Apis.spuSelect + id)
}

// /////////////////////获取分页列表

export interface Data {
  /**
   * 当前页码
   */
  current: number
  /**
   * 总页数
   */
  pages: number
  records: Record[]
  searchCount?: boolean
  /**
   * 每页显示条数
   */
  size: number
  /**
   * 总条数
   */
  total: number
}

export interface Record {
  /**
   * SPU所属分类ID，3级分类ID
   */
  category3Id: number
  /**
   * SPU简介
   */
  description?: string
  /**
   * SPU的ID
   */
  id: number
  /**
   * SPU图片列表
   */
  spuImageList?: null
  /**
   * SPU名称
   */
  spuName?: string
  /**
   * SPU销售属性列表
   */
  spuSaleAttrList?: spuSaleAttrList[]
  /**
   * 品牌ID
   */
  tmId: number
}


// /////////////小小下拉框
export interface spuSaleAttrList {
  /**
   * 基础销售属性ID
   */
  baseSaleAttrId: number;
  /**
   * 销售属性ID
   */
  id: number;
  /**
   * 销售属性名称
   */
  saleAttrName: string;
  /**
   * SPU的ID
   */
  spuId: number;
  /**
   * 销售属性值集合
   */
  spuSaleAttrValueList: SpuSaleAttrValueList[];
}

export interface SpuSaleAttrValueList {
  /**
   * 基础销售属性ID
   */
  baseSaleAttrId: number;
  /**
   * 销售属性ID
   */
  id: number;
  isChecked: null;
  /**
   * 销售属性名称
   */
  saleAttrName: string;
  /**
   * 销售属性值的名称
   */
  saleAttrValueName: string;
  /**
   * SPU的ID
   */
  spuId: number;
}