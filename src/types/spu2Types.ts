
export interface IspuPage {
    /**
     * 当前页码
     */
    current: number;
    /**
     * 总页数
     */
    pages:       number;
    records:     Record[];
    searchCount: boolean;
    /**
     * 每页显示条数
     */
    size: number;
    /**
     * 总条数
     */
    total: number;
}
// spu的数据
export interface Record {
    /**
     * SPU所属分类ID，3级分类ID
     */
    category3Id: number;
    /**
     * SPU简介
     */
    description: string;
    /**
     * SPU的ID
     */
    id: number;
    /**
     * SPU名称
     */
    spuName: string;
    /**
     * 品牌ID
     */
    tmId: number;
}
