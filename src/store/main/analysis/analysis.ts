import {
  getAmountListData,
  getGoodsAddressSale,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale
} from '@/service/main/analysis/analysis'
import { defineStore } from 'pinia'
const useAnalysisStore = defineStore('analysis', {
  state: (): any => ({
    pagedata: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    async getAnalysis() {
      const amountList = await getAmountListData()
      this.pagedata = amountList.data
      return this.pagedata
    },
    fetchAnalysisDataAction() {
      getAmountListData().then((res) => {
        this.pagedata = res.data
      })
      getGoodsCategoryCount().then((res) => {
        this.goodsCategoryCount = res.data
      })
      getGoodsCategorySale().then((res) => {
        this.goodsCategorySale = res.data
      })
      getGoodsCategoryFavor().then((res) => {
        this.goodsCategoryFavor = res.data
      })
      getGoodsAddressSale().then((res) => {
        this.goodsAddressSale = res.data
      })
    }
  }
})
export default useAnalysisStore
