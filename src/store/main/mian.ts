import { getEntireDepartments, getEntireMenus, getEntireRoles } from '@/service/main/mian'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any
  entireDepartments: any
  entireMenus: any
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: {},
    entireDepartments: {},
    entireMenus: {}
  }),
  actions: {
    async fetchEntireData() {
      const roleRes = await getEntireRoles()
      const departmentRes = await getEntireDepartments()
      const menus = await getEntireMenus()
      console.log('roleRes :>> ', roleRes)
      console.log('departmentRes :>> ', departmentRes)
      this.entireRoles = roleRes.data
      this.entireDepartments = departmentRes.data
      this.entireMenus = menus.data
    }
  },
  persist: true
})
export default useMainStore
