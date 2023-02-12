

export interface SpuImageList {
  /**
   * 图片ID
   */
  id?: number
  /**
   * 所属SPU的ID
   */

  spuId?: number
  /**
   * 图片名称
   */
  imgName: string
  /**
   * 图片URL
   */
  imgUrl: string
}

// 添加的类型,改造
export interface AddSpuType {
  /**
   * 所属分类ID，三级分类
   */
  category3Id: number
  /**
   * SPU简介
   */
  description: string
  id: number
  /**
   * SPU图片列表
   */
  spuImageList: SpuImageList[]
  /**
   * SPU名称
   */
  spuName: string
  /**
   * SPU销售属性列表
   */
  spuSaleAttrList: SpuSaleAttrList[]
  /**
   * 品牌ID
   */
  tmId: number | string
}

// 销售属性添加的row
export interface SpuSaleAttrList {
  id?: number
  spuId?: number
  /**
   * 基础销售属性ID
   */
  baseSaleAttrId: string | string
  /**
   * 基础销售属性名称
   */
  saleAttrName: string
  /**
   * SPU销售属性列表
   */
  spuSaleAttrValueList: SpuSaleAttrValueList[]
}

export interface SpuSaleAttrValueList {
  /**
   * 对应的基础销售属性ID
   */
  baseSaleAttrId: number | string
  /**
   * 销售属性ID
   */
  id?: number
  /**
   * 销售属性名称
   */
  saleAttrName: string
  /**
   * 销售属性值
   */
  saleAttrValueName: string
  /**
   * 所属SPU的ID
   */
  spuId?: number
}
// p品牌数组
export interface treade {
  /**
   * 品牌ID
   */
  id: number
  /**
   * 品牌LOGO地址
   */
  logoUrl: string
  /**
   * 品牌名称
   */
  tmName: string
}
