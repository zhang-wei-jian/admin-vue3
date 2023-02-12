import request from '@/utils/request'
import type { ITypeList1,IAttr ,IAttrItem} from '@/types/app'
type EditAttrList = Pick<IAttrItem, 'valueName'> & { show?: boolean }
type TFromData = Omit<IAttr, 'id' | 'attrValueList'> & { attrValueList: EditAttrList[] }
enum Apis {
  getList1 = '/admin/product/getCategory1',
  getList2 = '/admin/product/getCategory2/',
  getList3 = '/admin/product/getCategory3/',
  AttrList = '/admin/product/attrInfoList/',
  addAttr='/admin/product/saveAttrInfo',
  deleteAttr='/admin/product/deleteAttr/',
}
export function reqAttrList1() {
  return request.get<any, ITypeList1[]>(`${Apis.getList1}`)
}
export function reqAttrList2(id1: number | string) {
  return request.get<any, ITypeList1[]>(`${Apis.getList2}${id1}`)
}
export function reqAttrList3(category2Id: number | string) {
  return request.get<any, ITypeList1[]>(`${Apis.getList3}${category2Id}`)
}
export function reqAttrAllList(
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string
) {
  return request.get<any, IAttr[]>(`${Apis.AttrList}${category1Id}/${category2Id}/${category3Id}`)
}

// 添加保存数据
export function reqAddAttr(data:TFromData) {
  return request.post(`${Apis.addAttr}`,data)
}
// export function reqAddAttr(data:TFromData) {
//   return request.post(`${Apis.addAttr}`,data)
// }
export function reqDeleteAttr(id:number | string) {
  return request.post(`${Apis.deleteAttr}${id}}`)
}