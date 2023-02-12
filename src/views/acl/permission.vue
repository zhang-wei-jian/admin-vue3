<template>
<el-button icon="ele-Plus" type="primary">添加</el-button>
<el-button icon="ele-Edit" type="warning">编辑</el-button>
<el-button icon="ele-Delete" type="danger">删除</el-button>
</template>

<script lang="ts" setup>
import {useUserInfoStore}  from '@/stores/userInfo'


const userInfoStore = useUserInfoStore()
console.log(userInfoStore.buttons,'草拟吗');

</script>