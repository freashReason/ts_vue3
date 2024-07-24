<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="user">
    <user-search @queryClick="handleQueryClick" />
    <user-content ref="contentRef" @edit-click="handleEditClick" @createClick="haneleNewBtnClick" />
    <user-modal ref="modalRef" @addClick="handleAddClick"></user-modal>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'

const contentRef = ref<InstanceType<typeof UserContent>>()
function handleQueryClick(fromData: any) {
  console.log('fromData :>> ', fromData)
  contentRef.value?.fetchUserListData(fromData)
}
const modalRef = ref<InstanceType<typeof UserModal>>()
//对modal组件操作
function haneleNewBtnClick() {
  modalRef.value?.setModalVisible()
}
//新增按钮点击
function handleAddClick() {
  contentRef.value?.fetchUserListData()
}
function handleEditClick(itemData: any) {
  console.log(itemData)
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
