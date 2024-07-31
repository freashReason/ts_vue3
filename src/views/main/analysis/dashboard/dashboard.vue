<template>
  <div class="dashboard">
    <el-row>
      <el-col :span="6" v-for="item in pagedata" :key="item">
        <count-card v-bind="item"> </count-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="chart" ref="chartRef"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import CountCard from './cpns/count-card/index.vue'

import useAnalysisStore from '@/store/main/analysis/analysis'
const analysisStore = useAnalysisStore()

analysisStore.getAnalysis()

const { pagedata } = storeToRefs(analysisStore)

console.log('pageData :>> ', pagedata)

// var chartDom = document.getElementById('main')]
const chartRef = ref<HTMLElement>()
onMounted(() => {
  var myChart = echarts.init(chartRef.value!)
  var option

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }

  option && myChart.setOption(option)
})
</script>

<style lang="less" scoped>
.dashboard {
  color: red;
}
.chart {
  height: 300px;
  width: 300px;
}
</style>
