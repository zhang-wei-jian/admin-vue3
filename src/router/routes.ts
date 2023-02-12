import type { RouteRecordRaw } from 'vue-router'
/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      hidden：        是否隐藏此路由
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

/**
 * 静态路由（默认路由）
 */

export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },

  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true,
    },
  },

  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'ele-HomeFilled',
        },
      },
    ],
  },

  // /这是测试
  {
    name: 'Test',
    path: '/product/test/list',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/index.vue'),
        meta: {
          title: '测试环境',
          icon: 'ele-HomeFilled',
        },
        
      },
      // ////////重构spu./////////////
      
    ],
  },
  {
    path: '/product/spu2/list',
    name: 'Spu2',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'SPU管理重构',
      icon: 'ele-HomeFilled',
    },
    children:[
      {
        path: '/product/spu2/list',
        name: 'Spu2',
        component: () => import('@/views/product/spu2/index.vue'),
        meta: {
          title: 'SPU管理重构',
          icon: 'ele-HomeFilled',
        },
      }
    ]
  },

  /* 匹配任意的路由 必须最后注册 */
  // {
  //   // /detail/:id(\\d+)
  //   path: '/:pathMatch(.*)',
  //   name: 'Any',
  //   redirect: '/404',
  //   meta: {
  //     hidden: true,
  //   },
  // },
]

/**
 * 定义动态路由
 */
export const allAsyncRoutes: Array<RouteRecordRaw> = [
  // 这是权限管理的///////////////////////////////////////////////
  {
    name: 'Acl',
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    redirect: '/acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'ele-Edit',
    },
    children: [
      {
        path: '/acl/user/list',
        name: 'User',
        component: () => import('@/views/acl/user.vue'),
        meta: {
          title: '用户管理',
        },
      },

      {
        path: '/acl/role/list',
        name: 'Role',
        component: () => import('@/views/acl/role.vue'),
        meta: {
          title: '角色管理',
        },
      },
      {
        path: '/acl/permission/list',
        name: 'Permission',
        component: () => import('@/views/acl/permission.vue'),
        meta: {
          title: '菜单管理',
        },
      },
    ],
  },

  // this is 品牌treadeMark管理/////////////////////////////////////////
  {
    name: 'Product',
    path: '/product',
    component: () => import('@/layout/index.vue'),
    //父路由组件不写会卡死//垃圾循环必须要写子路由
    redirect: '/product/trademark/list',
    meta: {
      title: '商品管理',
      icon: 'ele-HomeFilled',
    },
    children: [
      {
        path: '/product/trademark/list',
        name: 'Trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
        },
      },
      {
        path: '/product/attr/list',
        name: 'Attr',
        component: () => import('@/views/product/attr/index.vue'),

        meta: {
          title: '平台属性管理',
        },
      },
      {
        path: '/product/spu/list',
        name: 'Spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',
        },
      },

      {
        path: '/product/sku/list',
        name: 'Sku',
        component: () => import('@/views/product/sku/index.vue'),

        meta: {
          title: 'SKU管理',
        },
      },
    ],
  },
]
