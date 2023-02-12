import request from '@/utils/request';
import type{IPostSKU,ISKU,LookSkuPage,ISKULOOK} from '@/types/skuType'

enum Apis{
    addSku='/admin/product/saveSkuInfo',
    getBySku='/admin/product/getSkuById/',
    skuPageList='/admin/product/list/',
    delete='/admin/product/deleteSku/',
    upId = '/admin/product/onSale/',
    downId='/admin/product/cancelSale/'
}

type IApi=  {
    reqPageLIst(page:number,limit:number):Promise<LookSkuPage>
}

// 添加sku
export function reqAddSku(data:IPostSKU) {
    return request.post(`${Apis.addSku}`,data)
}
// 获取spu这个id下的列表sku
export function reqBySkuList(id:number) {
    return request.get<any,ISKULOOK>(Apis.getBySku+id)
}


const api:IApi = {
    // 请求分页
    reqPageLIst(page:number,limit:number){
        return request.get(Apis.skuPageList+page+'/'+limit)
    }
}
export default api
// 请求删除
export function reqSukDelete(id:number) {
    return request.delete(Apis.delete+id)
}

// 上架id
export function reqUpId(id:number) {
    return request.get(Apis.upId+id)
}
// 上架id
export function reqDownId(id:number) {
    return request.get(Apis.downId+id)
}



