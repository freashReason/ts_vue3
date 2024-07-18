<template>
  <div class="modal">
    <el-drawer v-model="drawer" title="新建用户">
      <div class="form">
        <el-form ref="ruleFormRef" :model="form" label-position="right" label-width="70px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="form.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="form.password"
              show-password
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model.number="form.cellphone" placeholder="请输入电话" />
          </el-form-item>

          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="form.roleId" placeholder="请输入角色">
              <el-option
                v-for="item in roleData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="form.departmentId" placeholder="请输入部门">
              <el-option
                v-for="item in departmentData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            /></el-select>
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <el-button type="danger" @click="resetForm(ruleFormRef)">重置 </el-button>
        <el-button type="success" @click="handleSummit(ruleFormRef)">提交 </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/store/main/mian'

import useSystemStore from '@/store/main/system/system'
import type { FormInstance } from 'element-plus'

const mainStore = useMainStore()
const systemStore = useSystemStore()
const roleData = ref()
const departmentData = ref()
mainStore.fetchEntiredata().then(() => {
  roleData.value = mainStore.entireRoles.list
  departmentData.value = mainStore.entireDepartments.list
})

const drawer = ref(false)

const form = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
//重置表单
const ruleFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

//提交表单
const handleSummit = (formEl: FormInstance | undefined) => {
  drawer.value = false
  systemStore.addUserAction(form)
  if (!formEl) return
  formEl.resetFields()
}
function setModalVisible() {
  drawer.value = true
}

defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
:deep(.el-drawer__title) {
  text-align: center;
}
.form {
  padding: 0 10px;
}
</style>
