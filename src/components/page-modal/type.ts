export interface IModalProps {
  modalConfig: {
    pageName: string
    header: {
      newTitle?: string
      editTitle?: string
    }
    formItems: any[]
  }
}
export interface IModalConfig {
  pageName: string
  header: {
    newTitle?: string
    editTitle?: string
  }
  formItems: any[]
}
