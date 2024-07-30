<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="role">
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
    <page-modal :modal-config="modalConfigRef" :other-info="otherInfo" ref="modalRef">
      <template #chidrenSelect
        ><el-tree
          ref="treeRef"
          style="max-width: 600px"
          @check="handleCheck"
          :data="menus"
          node-key="id"
          highlight-current
          :props="{ label: 'name', children: 'children' }"
          show-checkbox
      /></template>
    </page-modal>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useMainStore from '@/store/main/mian'
// import UserContent from './c-cpns/user-content.vue'
// import UserModal from './c-cpns/user-modal.vue'
import PageSearch from '@/components/page-search/page-search.vue'
// import PageContent from '@/components/page-content'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
// import contentConfig from '@/views/main/system/department/config/content.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
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
//对modalConfig进行操作
import { ElTree } from 'element-plus'
import { mapMenusToIds } from '@/utils/map-menus'
const mainStore = useMainStore()
const menus = mainStore.entireMenus.list
const treeRef = ref<InstanceType<typeof ElTree>>()
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()

  const department = mainStore.entireDepartments.list.map((item: any) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    // console.log('mainStore.entireDepartments :>> ', mainStore.entireDepartments)
    if (item.prop === 'parentId') {
      item.options.push(...department)
    }
  })
  return modalConfig
})
const otherInfo = ref({})

const handleCheck = (data1: any, data2: any) => {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  console.log('menuList :>> ', menuList)
  otherInfo.value = { menuList }
}
// setup相同的逻辑的抽取: hooks
// 点击search, content的操作
const { contentRef, handleQueryClick } = usePageContent()

// 点击content, modal的操作
const { modalRef, haneleNewBtnClick, handleEditClick } = usePageModal(newCallback, editCallback)
function newCallback() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys(mapMenusToIds([]))
  })
}
function editCallback(itemData: any) {
  console.log('itemData :>> ', itemData.menuList)
  nextTick(() => {
    treeRef.value?.setCheckedKeys(mapMenusToIds(itemData.menuList), true)
  })
}
</script>

<style scoped>
.leader {
  color: red;
}

.parent {
  color: blue;
}
</style>
