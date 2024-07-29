import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../mian'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
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
            this.postUsersListAction({ offset: 0, size: 10 })
          } else {
            ElMessage({
              type: 'warning',
              message: res.data
            })
          }
        })
      })
      // const deleteResult = await deleteUserById(id)
      // console.log(deleteResult)

      // 2.重新请求新的数据
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newResult = await newUserData(userInfo)
      if (newResult.code === 0) {
        ElMessage({
          type: 'success',
          message: newResult.data
        })
      } else {
        ElMessage({
          type: 'warning',
          message: newResult.data
        })
      }
      console.log(newResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据

      const editResult = await editUserData(id, userInfo)
      console.log(editResult)
      if (editResult.code === 0) {
        ElMessage({
          type: 'success',
          message: editResult.data
        })
      } else {
        ElMessage({
          type: 'warning',
          message: editResult.data
        })
      }
      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },

    /** 针对页面的数据: 增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      // 1.删除数据操作
      ElMessageBox.confirm('确认要删除吗?', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deletePageById(pageName, id).then((res) => {
          if (res.code === 0) {
            ElMessage({
              type: 'success',
              message: res.data
            })
            this.postPageListAction(pageName, { offset: 0, size: 10 })
          } else {
            ElMessage({
              type: 'warning',
              message: res.data
            })
          }
        })
      })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireData()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      if (newResult.code === 0) {
        ElMessage({
          type: 'success',
          message: newResult.data
        })
      } else {
        ElMessage({
          type: 'warning',
          message: newResult.data
        })
      }
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireData()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      if (editResult.code === 0) {
        ElMessage({
          type: 'success',
          message: editResult.data
        })
      } else {
        ElMessage({
          type: 'warning',
          message: editResult.data
        })
      }
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireData()
    }
  }
})

export default useSystemStore
