import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from '../utils/token-utils'
import type { UserInfoState } from './interface'
import type { RouteRecordRaw } from 'vue-router'
import { ElMessage } from 'element-plus'
import router from '@/router/index'
import { login, getUserInfo } from '@/api/user'
import { staticRoutes } from '@/router/routes'
import { allAsyncRoutes } from '@/router/routes'

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfoStore = defineStore('userInfo', {
  // user 仓库中存放的数据
  state: (): UserInfoState => ({
    // 登录成功后的用户 token
    token: getToken() as string,
    // 登录成功后的用户名
    name: '',
    // 登录成功后的用户头像
    avatar: '',
    // 不同角色的用户将要显示的管理菜单
    menuRoutes: [...staticRoutes],
    // menuRoutes: []
    buttons: [],
    routes: [],
  }),

  actions: {
    // 用户登录
    async login(username: string, password: string) {
      // return new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //         if (username === 'admin' && password === '111111') {
      //             const token = 'token-atguigu'
      //             setToken(token)
      //             this.token = token
      //             resolve(token)
      //         } else {
      //             // 给程序使用
      //             reject(new Error('用户名或密码错误!'))
      //             // 提示用户看的
      //             ElMessage.error('用户名或密码错误!')
      //         }
      //     }, 1000)
      // })

      try {
        const res = await login(username, password)
        // console.log(res);
        // 把用户登录成功后的 token 保存到 localStorage 中（持久化）
        setToken(res.token)
        // 存储 token 到 pinia
        this.token = res.token
      } catch (e) {
        ElMessage.error('用户名或密码错误!')
        throw new Error('用户名或密码错误!')
      }
    },

    async getInfo() {
      // return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //     this.name = 'admin'
      //     this.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      //     this.menuRoutes = staticRoutes
      //     resolve({name: this.name, avatar: this.avatar, token: this.token})
      // }, 1000)
      // })

      try {
        const res = await getUserInfo()
        // 把获取到用户名称和头像保存到pinia
        this.name = res.name
        this.avatar = res.avatar
        // 个人权限信息
        this.buttons = res.buttons
        this.routes = res.routes
        //////////////////////////////// 过滤找到用户可以使用的菜单//////////////
        // console.log('全部', this.routes)

        // const userMenu = allAsyncRoutes.filter(item => {
        //   // console.log(this.routes.includes(item.name as string))
        //   const isShow = this.routes.includes(item.name as string)
        //   if (item.children && item.children.length) {
        //     item.children = item.children.filter(itemChild => {
        //       return this.routes.includes(itemChild.name as string)
        //     })
        //   }
        //   router.addRoute(item)
        //   return isShow
        // })
        // this.menuRoutes.push(...userMenu)
        // //////////////////递归////////////////////////////////
        const filterRoutes = (arr: RouteRecordRaw[], routes: any) => {
          return arr.filter(item => {
            if (!routes.includes(item.name)) return false
            if (item.children && item.children.length) {
              item.children = filterRoutes(item.children, routes)
            }
            return '当前的children没有改是是因为，递归完事后并没有去改变当前item，还是不递归的返回全部'
          })
        }
        const resRoutersList = filterRoutes(allAsyncRoutes, this.routes)
        // console.log(resImgList, '处理完成的图片')

        resRoutersList.forEach(item => {
          this.menuRoutes.push(item)
          router.addRoute(item)
        })
        // //////////////////递归////////////////////////////////

        // console.log('处理过滤的', userMenu)

        // console.log(this.menuRoutes,'完成的');

        // 动态路由注册这些刚刚过滤修添加的路由
        // this.menuRoutes.forEach(item => {
        //   router.addRoute(item)
        // })
      } catch (e) {
        throw new Error('出错了')
      }
    },

    reset() {
      // 删除local中保存的token
      removeToken()
      // 提交重置用户信息的mutation
      this.token = ''
      this.name = ''
      this.avatar = ''
      //   退出清空菜单
      this.menuRoutes = [...staticRoutes]
    },
  },
})
