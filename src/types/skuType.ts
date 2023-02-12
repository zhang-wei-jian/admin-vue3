
import type{SpuImageList} from '@/types/spuType'
type IimageList = Omit<SpuImageList, 'id' | 'skuId'> & { id: number; spuId: number }
// 提交类型
export interface IPostSKU {
    // 当前 sku 的所属 SPU 的id
    spuId: number;
    // 当前 sku 的品牌
    tmId: number;
    // 当前 sku 的分类
    category3Id: number;
    // sku 的名称
    skuName: string;
    // sku 的价格
    price: number;
    // sku 的重量
    weight: number;
    // 介绍
    skuDesc: string;
    // 默认封面图片地址
    skuDefaultImg: string;
    // 所有的图片，当前 sku 所属 spu 的图片列表
    // skuImageList: SpuImageList[];
    skuImageList: IimageList[];
    // sku平台属性列表
    skuAttrValueList: ISKUAttrValue[];
    // sku销售属性列表
    skuSaleAttrValueList: ISKUSaleAttrValueList[];
}
export interface ISKUAttrValue {
    attrId: number;
    valueId: number;
}

export interface ISKUSaleAttrValueList {
    saleAttrId: number;
    saleAttrValueId: number;
}

////////////////////查看sku的详情

export interface ISKU {
    // 当前 SKU 的基本信息
    id: number;
    // 当前 sku 的所属 SPU 的id
    spuId: number;
    // 当前 sku 的品牌
    tmId: number;
    // 当前 sku 的分类
    category3Id: number;
    // sku 的名称
    skuName: string;
    // sku 的价格
    price: number;
    // sku 的重量
    weight: number;
    // 介绍
    skuDesc: string;
    // 默认封面图片地址
    skuDefaultImg: string;
    // 上线状态
    isSale: boolean;
    // 创建时间
    createTime: string;
}
///////////////////////////sku的界面


export interface ISkuPage {
    /**
     * 当前页
     */
    current: number;
    /**
     * 总页数
     */
    pages: number;
    records: ISKU[];
    searchCount?: boolean;
    /**
     * 每页显示条数
     */
    size: number;
    /**
     * 总记录条数
     */
    total: number;
}


// 查看的详细sku


export type ISKULOOK = Omit<IPostSKU,'skuSaleAttrValueList' | 'skuAttrValueList'> &{skuSaleAttrValueList:SkuSaleAttrValueList[],skuAttrValueList:SkuAttrValueList[]}
export type LookSkuPage = Omit<ISkuPage,'records'> & {records:ISKULOOK[]}

 interface SkuSaleAttrValueList {
    /**
     * ID
     */
    id: string;
    /**
     * 销售属性值ID
     */
    saleAttrId: string;
    /**
     * 销售属性名称
     */
    saleAttrName: string;
    /**
     * 销售属性名ID
     */
    saleAttrValueId: string;
    /**
     * 销售属性值
     */
    saleAttrValueName: string;
    /**
     * 所属SKU的ID
     */
    skuId: string;
    /**
     * 所属SPU的ID
     */
    spuId: string;
}

 interface SkuAttrValueList {
    /**
     * 属性ID
     */
    attrId: number;
    /**
     * 属性名称
     */
    attrName: string;
    /**
     * ID
     */
    id: number;
    /**
     * 所属SKU的ID
     */
    skuId: number;
    /**
     * 值ID
     */
    valueId: number;
    /**
     * 值
     */
    valueName: string;
}