<template>
  <div class="modal">
    <el-drawer
      v-model="dialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
    >
      <div class="form">
        <el-form ref="ruleFormRef" :model="form" label-position="right" label-width="70px">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="form[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName" :form="form"></slot>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="form[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="form[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </template>
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
import type { IModalProps } from './type'
// interface IModalProps {
//   modalConfig: {
//     pageName: string
//     header: {
//       newTitle?: string
//       editTitle?: string
//     }
//     formItems: any[]
//   }
// }

const props = defineProps<IModalProps>()
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}
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
  ...initialData
})
//重置表单
const ruleFormRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  formEl?.resetFields()
}

//提交表单
const handleSummit = (formEl: FormInstance | undefined) => {
  dialogVisible.value = false
  let infoData = form
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (!isNewRef.value && editData.value) {
    // 编辑用户的数据
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, infoData)
  } else {
    // 创建新的用户
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  }
  if (!formEl) return
  formEl.resetFields()
}
function setModalVisible(isNew: boolean = true, itemData?: any) {
  isNewRef.value = isNew
  console.log('itemData :>> ', itemData)
  dialogVisible.value = true
  if (!isNew && itemData) {
    // 编辑数据
    for (const key in form) {
      form[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    // 新建数据
    // for (const item of props.modalConfig.formItems) {
    //   form[item.prop] = item.initialValue ?? ''
    // }
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
