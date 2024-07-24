<template>
  <div class="modal">
    <el-drawer v-model="dialogVisible" :title="isNewRef ? '新建用户' : '编辑用户'">
      <div class="form">
        <el-form ref="ruleFormRef" :model="form" label-position="right" label-width="70px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="form.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="password">
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
interface IProps {}

const props = defineProps<IProps>()
const mainStore = useMainStore()
const systemStore = useSystemStore()
const roleData = ref()
const departmentData = ref()
mainStore.fetchEntireData().then(() => {
  roleData.value = mainStore.entireRoles.list
  departmentData.value = mainStore.entireDepartments.list
})

const dialogVisible = ref(false)
const isNewRef = ref(true)
const editData = ref()
const form = reactive<any>({
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
  formEl?.resetFields()
}

//提交表单
const handleSummit = (formEl: FormInstance | undefined) => {
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    // 编辑用户的数据
    systemStore.editUserDataAction(editData.value.id, form)
  } else {
    // 创建新的用户
    systemStore.newUserDataAction(form)
  }
  if (!formEl) return
  formEl.resetFields()
}
function setModalVisible(isNew: boolean = true, itemData?: any) {
  isNewRef.value = isNew
  dialogVisible.value = true
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in form) {
      form[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据
    for (const key in form) {
      form[key] = ''
    }
    editData.value = null
  }
}

defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
:deep(.el-dialogVisible__title) {
  text-align: center;
}
.form {
  padding: 0 10px;
}
</style>
