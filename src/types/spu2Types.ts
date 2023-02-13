export interface IspuPage {
  /**
   * 当前页码
   */
  current: number
  /**
   * 总页数
   */
  pages: number
  records: Record[]
  searchCount: boolean
  /**
   * 每页显示条数
   */
  size: number
  /**
   * 总条数
   */
  total: number
}
// spu的数据
export interface Record {
  /**
   * SPU所属分类ID，3级分类ID
   */
  category3Id: number
  /**
   * SPU简介
   */
  description: string
  /**
   * SPU的ID
   */
  id: number
  /**
   * SPU名称
   */
  spuName: string
  /**
   * 品牌ID
   */
  tmId: number
}

// post添加数据的

export interface ISPU {
    tmId: string;
  /**
   * SPU名称
   */
  spuName: string
  /**
   * SPU所属分类ID，三级分类
   */

  category3Id: number

  /**
   * SPU简介
   */
  description: string

  /**
   * SPU销售属性列表
   */
  spuSaleAttrList: SpuSaleAttrList[]
  /**
   * SPU图片列表
   */
  spuImageList: SpuImageList[]
}

export interface SpuImageList {
  /**
   * 图片名称
   */
  imgName: string
  /**
   * 图片URL
   */
  imgUrl: string
}

export interface SpuSaleAttrList {
  /**
   * 基础销售属性ID
   */
  baseSaleAttrId: string
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
   * 销售属性ID，同上级的baseSaleAttrId
   */
  baseSaleAttrId: string
  /**
   * 销售属性的名称
   */
  saleAttrName: string
  /**
   * 销售属性值
   */
  saleAttrValueName: string
}
