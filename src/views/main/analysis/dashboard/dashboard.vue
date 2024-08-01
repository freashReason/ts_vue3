<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="6" v-for="item in pagedata" :key="item">
        <count-card v-bind="item"> </count-card>
      </el-col>
    </el-row>
    <!-- 2.中间部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card header="123132">
          <pie-echart :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card header="全国总销量">
          <map-echart :map-data="showGoodsAddressSale" />
        </chart-card>
      </el-col>
      <el-col :span="7" >
        <chart-card header="123132">
          <rose-echart :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>

    <!-- 3.底部部分的图表 -->
    <el-row :gutter="10">
      <el-col :span="12" >
        <chart-card header="123132">
          <line-echart
           v-bind="showGoodsCategorySale" />
        </chart-card >
      </el-col>
      <el-col :span="12" >
        <chart-card header="123132">
          <bar-echart v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import CountCard from './cpns/count-card/index.vue'
import ChartCard from './cpns/chart-card/chart-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'
import { PieEchart } from '@/components/page-echarts'
const analysisStore = useAnalysisStore()

analysisStore.fetchAnalysisDataAction()

const { pagedata, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(analysisStore)

console.log('pageData :>> ', pagedata)

// var chartDom = document.getElementById('main')]
// 3.获取数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    name: item.name,
    value: item.goodsCount
  }))
})
const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})
const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<style lang="less" scoped>
.dashboard {
  color: red;
}
.sp {
  height: 300px;
}
</style>
