<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="countCard">
    <div class="title">
      <span>{{ title }}</span>
      <el-tooltip class="box-item" effect="dark" :content="tips" placement="top">
        <el-icon><InfoFilled /></el-icon>
      </el-tooltip>
    </div>
    <div class="number" ref="count1Ref">{{ number1 }}</div>
    <div class="footer">
      <span> {{ subtitle }}</span>
      <span ref="count2Ref"> {{ number2 }}</span>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'
interface Iprops {
  amount: string
  title?: string
  tips?: string
  number1?: number
  number2?: number
  subtitle?: string
}
const Props = withDefaults(defineProps<Iprops>(), {
  title: '商品总销量',
  tips: '所有商品总销量',
  number1: 2222,
  number2: 2222,
  subtitle: '商品总销量'
})
const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()
// const config = {}
onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, Props.number1, {
    prefix: Props.amount === 'saleroom' ? '￥' : ''
  })
  const countup2 = new CountUp(count2Ref.value!, Props.number1, {
    prefix: Props.amount === 'saleroom' ? '￥' : ''
  })
  countup1.start()
  countup2.start()
})
</script>

<style lang="less" scoped>
.countCard {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  height: 130px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  .title {
    display: flex;
    height: 38px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    justify-content: space-between;
    align-items: center;
  }
  .number {
    display: flex;
    margin-left: 0px;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.85);
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: start;
  }
  .footer {
    display: flex;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.85);
    border-top: 1px solid #f0f0f0;
  }
}
</style>
