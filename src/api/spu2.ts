import request from '@/utils/request'

import type { IspuPage } from '@/types/spu2Types'
enum Apis {
  getSpuPage = '/admin/product/',
}

// 请求spu分页列表
export const reqSpuPage = (page: number, limit: number, category3Id: number) => {
  return request.get<any, IspuPage>(`${Apis.getSpuPage}${page}/${limit}`, {
    params: {category3Id},
  })
}
