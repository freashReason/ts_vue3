<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script setup lang="ts">
import hyRequest from '@/service'
import LoginPanel from './cpn/login-panel.vue'
// hyRequest
//   .get({
//     url: '/home/multidata'
//   })
//   .then(res => {
//     console.log(res)
//   })
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  background: url('@/assets/img/login-bg.svg');
}
</style>
