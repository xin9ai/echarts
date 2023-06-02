<template>
  <div class="container">
    <div class="title">
      <div class="left-top">
        <h2>| {{ selectArrs[0]?.text }}</h2>
        <span @click="select = !select">∨</span>
      </div>
      <div class="selectStatus" v-if="select">
        <h2 class="select-item" v-for="(item, index) in selectArrs" :key="index">
          {{ item.text }}
        </h2>
      </div>
    </div>
    <div class="chart" id="chart"></div>
  </div>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance, reactive, onBeforeUnmount } from 'vue'
import { gettrend } from '@/api/trend'
// 结构出proxy，通过proxy获取全局定义的属性和方法
const { proxy } = getCurrentInstance()
// 创建变量，用来保存echarts的实例对象
const echartsInstance = ref(null)
// 创建变量，用来保存获取到的数据
const resultAllData = ref()
// 创建一个变量控制下拉选择的显示与隐藏
const select = ref(false)
// 创建变量，保存下拉的数据
const selectArrs = ref([])
// 初始化echarts实例对象
const initChart = () => {
  echartsInstance.value = proxy.$echarts.init(document.getElementById('chart'), 'dark')
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: '15%',
      icon: 'circle'
    },
    grid: {
      top: '30%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      }
    }
  }
  echartsInstance.value.setOption(option)
}
// 获取后台返回的数据
const getData = async () => {
  try {
    const result = await gettrend()
    console.log('result', result)
    resultAllData.value = result.data
    updateChart()
  } catch (error) {
    console.log(error)
  }
}
// 更新图表的配置项以及渲染
const updateChart = () => {
  // 获取x轴数据
  console.log('resultAllData.value', resultAllData.value)
  // 获取下拉框的数据
  selectArrs.value = resultAllData.value.type
  const timeArrs = resultAllData.value.common.month
  // 获取y轴的数据
  const valueArrs = resultAllData.value.map.data
  // 获取legend数据
  const legendArrs = valueArrs.map((item) => item.name)

  // 半透明的颜色值
  const colorArr1 = [
    'rgba(11, 168, 44, 0.5)',
    'rgba(44, 110, 255, 0.5)',
    'rgba(22, 242, 217, 0.5)',
    'rgba(254, 33, 30, 0.5)',
    'rgba(250, 105, 0, 0.5)'
  ]
  // 全透明的颜色值
  const colorArr2 = [
    'rgba(11, 168, 44, 0)',
    'rgba(44, 110, 255, 0)',
    'rgba(22, 242, 217, 0)',
    'rgba(254, 33, 30, 0)',
    'rgba(250, 105, 0, 0)'
  ]
  // 构造y轴需要渲染的数据
  const seriesArrs = valueArrs.map((item, index) => {
    return {
      name: item.name,
      type: 'line',
      data: item.data,
      stack: 'map',
      smooth: true,
      symbol: 'none',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: colorArr1[index]
            },
            {
              offset: 1,
              color: colorArr2[index]
            }
          ],
          global: false
        }
      }
    }
  })
  console.log('seriesArrs', seriesArrs)
  // console.log(legendArrs)
  console.log('timeArrs', timeArrs)
  const dataOption = {
    xAxis: {
      data: timeArrs
    },
    legend: {
      data: legendArrs
    },
    series: seriesArrs
  }
  echartsInstance.value.setOption(dataOption)
}
// 图表进行自适应
const screenAdapter = () => {
  echartsInstance.value.resize
}
// 当dom加载完毕之后初始化实例对象，获取后台返回的数据，图表进行自适应
onMounted(() => {
  initChart()
  getData()
  window.addEventListener('resize', screenAdapter)
  screenAdapter()
})
// 组件销毁之前(移出监听事件)
onBeforeUnmount(() => {
  window.removeEventListener('resize', screenAdapter)
})
</script>
<style lang='scss' scoped>
.title {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 999;
  color: #fff;
  cursor: pointer;
}
.title {
  font-weight: 700;
}
.left-top {
  display: flex;
  align-items: center;
}
</style>