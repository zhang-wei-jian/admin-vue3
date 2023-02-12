
import type { ITypeList1,IAttr } from '@/types/app'
export interface IAttrStore {
    category1Id: string;
    category2Id: string;
    category3Id: string;
    attrList:IAttr[]
    
    categories1: ITypeList1[];
    categories2: ITypeList1[];
    categories3: ITypeList1[];
}