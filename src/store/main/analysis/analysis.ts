import { getAmountListData } from '@/service/main/analysis/analysis'
import { defineStore } from 'pinia'
const useAnalysisStore = defineStore('analysis', {
  state: (): any => ({
    pagedata: []
  }),
  actions: {
    async getAnalysis() {
      const amountList = await getAmountListData()
      this.pagedata = amountList.data
      return this.pagedata
    }
  }
})
export default useAnalysisStore
