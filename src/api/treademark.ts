import request from '@/utils/request'
import type { ITreatemarkList,ItemTreademark } from '@/types/app'

// 声明枚举，请求地址
enum Apis {
 
  tradeMark = '/admin/product/baseTrademark',
  addTradeMark = '/admin/product/baseTrademark/save',
  editTradeMark = '/admin/product/baseTrademark/update',
  deleteTreadeMark = '/admin/product/baseTrademark/remove'
}
//请求品牌分页列表
export function reqTrademarkList(page:number, limit:number) {
  return request.get<any, ITreatemarkList>(`${Apis.tradeMark}/${page}/${limit}`)
}
// 添加的

export function reqAddTrademark({tmName, logoUrl }:Omit<ItemTreademark,'id'>) {
  return request.post<any, ITreatemarkList>(`${Apis.addTradeMark}`, { tmName, logoUrl })
}

// 编辑修改
export function reqEditTrademark(data:ItemTreademark) {
  return request.put(`${Apis.editTradeMark}`, data)
}
// 删除
export function reqDeleteTrademark(id:number) {
  return request.delete(`${Apis.deleteTreadeMark}/+${id}`)
}