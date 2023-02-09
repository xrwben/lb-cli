<template>
  <!-- <header>导航</header> -->
  <router-view></router-view>
</template>

<script setup>
// import { getUserInfoAPI } from '@/api/index.js'
// import { examStore } from '@/store/index.js'

// const store = examStore()

// const getUserInfo = () => {
//   getUserInfoAPI().then((res) => {
//     const { code, success, data } = res
//     if (code === '200' && success) {
//       store.$patch((state) => {
//         state.userInfo = data
//         localStorage.setItem('Tencent_Exam_User_Info', JSON.stringify(data))
//       })
//     }
//   })
// }
// getUserInfo()
</script>

<style lang="less">
  @import "@/style/reset.less";
  #app {
    width: 100%;
    height: 100vh;
    background: #f5f7f9;
    overflow: auto;
  }
</style>