<template>
  <div>
    给了属性<myBar :size="size" :width="500" :length="6" color="#99F0B2"></myBar> 给了属性<myBar
      :size="size"
      :length="20"
      color="pink"
    ></myBar>
    没给props<myBar></myBar>

    <!-- <myBar ></myBar> -->

    <El-button @click="size++"> +</El-button>
    <El-button @click="size--"> -</El-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import myBar from './myBar.vue'

const size = ref(80)
// 这个值来改变进度条的百分比
//   size:设置百分比
//   width:宽度
//   length: 横杠条数
//    layout:过度到末尾的颜色
const arr = ['aa',]



// function clone(obj) {
//   let cloneObj = {}
//   for (let key in obj) {
//     if (typeof obj[key] === 'object') {
//       cloneObj[key] = clone(obj[key])
//     } else {
//       cloneObj[key] = obj[key]
//     }
//   }
//   return cloneObj
// }


</script>
