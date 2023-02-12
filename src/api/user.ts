import request from '@/utils/request';


enum Apis{
    login='/admin/acl/index/login',
    userInfo='/admin/acl/index/info',

}
// function getUserInfo() {
    // get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    // {id: 1, name: 'zs'}
    // 默认情况下 axios 返回的数据中的 data 格式可以通过第一个泛型参数类定义
    // 因为我们响应拦截器中改变了默认的返回数据的结构，所以这里的类型声明就需要修改一下
    // request.get<{id: number, name: string}>('/user').then((res) => {
    //     // res.data.
    // })

    // 第一个泛型参数声明的是源数据中的 data 属性的格式
    // request.get<any, {id: number, name: string}>('/user').then((res) => {
    //     res.id
    // })
// }


// function getData(): Promise<number> {
//     return new Promise((resolve) => {
//         resolve(1);
//     });
// }

// getData().then(d => {})

import type{LoginUserResponseData,UserInfoData,ITreatemarkList,ItemTreademark} from '@/types/app'



/**
 * 登录
 * @param username 
 * @param password 
 * @returns 
 */
export function login(username: string, password: string) {
    return request.post<any, LoginUserResponseData>(`${Apis.login}`, {username, password});
}


/**
 * 获取用户基础信息
 * @returns
 */
export function getUserInfo() {
    return request.get<any, UserInfoData>(`${Apis.userInfo}`)
}

