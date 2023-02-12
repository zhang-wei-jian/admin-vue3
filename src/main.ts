import { createApp } from 'vue'
// 加载 store
import pinia from './stores'
// 加载 element
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import ElSvg from './components/SvgIcon/ElSvg'
// 引入element-icon全部的图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import  CategorySelector  from '@/components/CategorySelector/index.vue'

// 加载根组件
import App from './App.vue'

// 加载路由配置
import router from './router'

// 全局样式
import './styles/index.scss'

// 加载鉴权逻辑，注册 beforeEach 函数，不会现在执行
import './permission'

const app = createApp(App)
//全局注册下拉
app.component('CategorySelector', CategorySelector)
ElSvg(app)
// 使用图标/////////////////////////////////////
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


// 自定义指令，用户权限的/////////////////////////////////////
// import {useUserInfoStore}  from '@/stores/userInfo'
// import {storeToRefs} from 'pinia'
    
// const {buttons} = storeToRefs(useUserInfoStore(pinia))

// console.log(buttons.value,'按钮们');

//   app.directive('vUseRoot',(el,binding) => {
//     // console.log(binding);
//     if(buttons.value.includes(binding.value)){
//         // el.style.display = 'none'
//         el.remove()
//     }
//     })



app
  .use(pinia)
  .use(router)
  .use(ElementPlus, {
    locale: zhCn,
  })
  .mount('#app')
