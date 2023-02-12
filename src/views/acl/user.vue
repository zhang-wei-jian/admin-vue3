<template>
    USER
    <el-button icon="ele-Plus" type="primary">添加</el-button>
    <el-button icon="ele-Edit" type="warning">编辑</el-button>
    <el-button   v-useRoot="'btn.User.remove'"   icon="ele-Delete" type="danger">删除</el-button>
    </template>
    <!-- ="'btn.User.remove'" -->
    
    <script lang="ts" setup>
    // import {useUserInfoStore}  from '@/stores/userInfo'
    
    
    // const {buttons} = useUserInfoStore()
//     console.log(buttons,'草拟吗');
    
//     const vUseRoot = {
//   mounted: (el,binding) => {
//     // console.log(binding);
//     if(buttons.includes(binding.value)){
//         // el.style.display = 'none'
//         el.remove()
//     }

    
//   }
// }
    </script>