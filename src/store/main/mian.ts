import { getEntireDepartments, getEntireRoles } from '@/service/main/mian'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any
  entireDepartments: any
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: {},
    entireDepartments: {}
  }),
  actions: {
    async fetchEntireData() {
      const roleRes = await getEntireRoles()
      const departmentRes = await getEntireDepartments()
      console.log('roleRes :>> ', roleRes)
      console.log('departmentRes :>> ', departmentRes)
      this.entireRoles = roleRes.data
      this.entireDepartments = departmentRes.data
    }
  },
  persist: true
})
export default useMainStore
