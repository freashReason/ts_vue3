<template>
  <div class="pageaccount">
    <el-form
      :model="account"
      size="large"
      label-width="60px"
      label-position="right"
      :rules="accountRules"
      status-icon
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElForm, ElMessage, FormRules } from 'element-plus'
// import 'element-plus/theme-chalk/el-message.css'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

const account = reactive({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

//表单规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

//账号登录

const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      //1.储存账号密码
      const name = account.name
      const password = account.password
      // 2.向服务器发送网络请求(携带账号和密码)
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 3.判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      console.log('错误  ')
      ElMessage.error('Oops, 请您输入正确的格式后再操作~~.')
    }
  })
}
defineExpose({ loginAction })
</script>

<style lang="less" scoped></style>
