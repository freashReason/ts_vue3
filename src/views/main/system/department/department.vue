<template>
  <div class="department">
    <page-search :search-config="searchConfig" @query-click="handleQueryClick" />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="haneleNewBtnClick"
      @edit-click="handleEditClick"
    >
      <template #leader="scope">
        <span class="leader">哈哈哈: {{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">
        <span class="parent">呵呵呵: {{ scope.row[scope.prop] }}</span>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { computed } from 'vue'
import useMainStore from '@/store/main/mian'
// import UserContent from './c-cpns/user-content.vue'
// import UserModal from './c-cpns/user-modal.vue'
import PageSearch from '@/components/page-search/page-search.vue'
// import PageContent from '@/components/page-content'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
// import contentConfig from '@/views/main/system/department/config/content.config'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
// import modalConfig from './config/modal.config'
// import usePageContent from '@/hooks/usePageContent'
// import usePageModal from '@/hooks/usePageModal'

// // 对modalConfig进行操作
// const modalConfigRef = computed(() => {
//   const mainStore = useMainStore()
//   const departments = mainStore.entireDepartments.map((item) => {
//     return { label: item.name, value: item.id }
//   })
//   modalConfig.formItems.forEach((item) => {
//     if (item.prop === 'parentId') {
//       item.options.push(...departments)
//     }
//   })

//   return modalConfig
// })

const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
const modalRef = ref<InstanceType<typeof PageModal>>()
//对modal组件操作
function haneleNewBtnClick() {
  modalRef.value?.setModalVisible()
}
//新增按钮点击
function handleAddClick() {
  contentRef.value?.fetchUserListData()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}

// setup相同的逻辑的抽取: hooks
// 点击search, content的操作
// const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content, modal的操作
// const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style scoped>
.leader {
  color: red;
}

.parent {
  color: blue;
}
</style>
