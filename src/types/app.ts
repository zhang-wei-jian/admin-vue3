export interface LoginUserResponseData {
  token: string,

}

export interface UserInfoData {
  name: string
  avatar: string,
  buttons:string[],
  routes:string[]
}
export interface ITreatemarkList {
  /**
   * 当前页码
   */
  current: number
  /**
   * 总页码数
   */
  pages: number
  /**
   * 品牌数组
   */
  records: ItemTreademark[]
  /**
   * 是否搜索记录
   */
  searchCount: boolean
  /**
   * 每页显示记录条数
   */
  size: number
  /**
   * 总记录条数
   */
  total: number
}

export interface ItemTreademark {
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
// attr的pinia的
// export interface

/**
 * 分类列表
 */
export interface ITypeList1 {
  /**
   * 分类ID
   */
  id: number
  /**
   * 分类名称
   */
  name: string
}

export interface IAttr {
  /**
   * 平台属性名称
   */
  attrName: string
  /**
   * 平台属性值的集合
   */
  attrValueList: IAttrItem[]
  /**
   * 平台属性所属分类ID
   */
  categoryId: number
  /**
   * 平台属性所属分类等级
   */
  categoryLevel: number
  /**
   * 平台属性ID
   */
  id: number
}

export interface IAttrItem {
  /**
   * 平台属性值所属的属性ID
   */
  attrId: number
  /**
   * 平台属性值的ID
   */
  id: number
  /**
   * 平台属性值的名称
   */
  valueName: string
}
