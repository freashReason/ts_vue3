<template>
  <div class="app">
    <router-link to="/main">主要</router-link>
    <router-link to="/login">登录</router-link>
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>
<style scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
