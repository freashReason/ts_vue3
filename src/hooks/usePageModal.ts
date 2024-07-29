function usePageModal(editCallback?: any) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  //对modal组件操作
  function haneleNewBtnClick() {
    modalRef.value?.setModalVisible()
  }

  function handleEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
    if (editCallback) editCallback(itemData)
  }
  return { modalRef, haneleNewBtnClick, handleEditClick }
}
export default usePageModal
