import pageModal from '@/components/page-modal/page-modal.vue'
function usePageModal(newCallback?: any, editCallback?: any) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  //对modal组件操作
  function haneleNewBtnClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }

  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
    if (editCallback) editCallback(itemData)
  }
  return { modalRef, haneleNewBtnClick, handleEditClick }
}
export default usePageModal
