import { addUser, deleteUserById, postUsersListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserAction(id: number) {
      ElMessageBox.confirm('确认要删除吗?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteUserById(id).then((res) => {
          if (res.code === 0) {
            ElMessage({
              type: 'success',
              message: res.data
            })
          } else {
            ElMessage({
              type: 'warning',
              message: res.data
            })
          }
        })
        this.postUsersListAction({ offset: 0, size: 10 })
      })
    },
    async addUserAction(userInfo: any): Promise<any> {
      await addUser(userInfo).then((res) => {
        if (res.code === 0) {
          ElMessage({
            message: res.data,
            type: 'success'
          })
        } else {
          ElMessage({
            message: res.data,
            type: 'warning'
          })
        }
        this.postUsersListAction({ offset: 0, size: 10 })
      })
    }
  }
})

export default useSystemStore
