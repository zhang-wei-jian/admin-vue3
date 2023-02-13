import request from '@/utils/request'

import type { IspuPage,ISPU } from '@/types/spu2Types'
enum Apis {
  getSpuPage = '/admin/product/',
  postSpu = '/admin/product/saveSpuInfo'
}

// 请求spu分页列表

export const reqSpuPage = (page: number, limit: number, category3Id: number) => {
  return request.get<any, IspuPage>(`${Apis.getSpuPage}${page}/${limit}`, {
    params: {category3Id},
  })
}
// 添加spu
export const reqAddSpu = (data:ISPU) => {
  return request.post(`${Apis.postSpu}`,data)
}