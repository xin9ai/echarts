<template>
  <div class="container">
    <div class="chart" id="chart"></div>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive, toRef, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// 结构出proxy，通过proxy获取全局定义的属性和方法
const { proxy } = getCurrentInstance()
// 创建变量，用来保存echarts的实例对象
const echartsInstance = ref(null)
// 创建变量，用来保存获取到的数据
const resultAllData = ref()
//
//
//
//
//
//
//
//
// 

</script>
<style lang='scss' scoped>
</style>