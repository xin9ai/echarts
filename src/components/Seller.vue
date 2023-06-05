<template>
  <div class="container">
    <div class="chart" id="chart"></div>
  </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'
import { getseller } from '@/api/seller'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
// 结构出proxy，通过proxy获取全局定义的属性和方法
const { proxy } = getCurrentInstance()
// 创建变量，用来保存echarts的实例对象
const echartsInstance = ref(null)
// 创建变量，用来保存获取到的数据
const resultAllData = ref()
// 页码
const currentPage = ref(1)
// 条数
const Pagesize = ref(5)
// 总页码
const total = ref(0)
// 每页保存的数据
const showData = ref([])
// 创建变量，保存定时器
const timerId = ref()

// 组件销毁钩子函数
onBeforeUnmount(() => {
  clearInterval(timerId.value)
  window.removeEventListener('resize', screenAdapter)
})

// dom加载完毕之后触发
onMounted(() => {
  initEcharts()
  getData()
  window.addEventListener('resize', screenAdapter)
  screenAdapter()
})

// 初始化echarts实例对象
const initEcharts = () => {
  echartsInstance.value = proxy.$echarts.init(document.getElementById('chart'), 'dark')
  console.log('echartsInstance.value', echartsInstance.value)
  const option = {
    title: {
      text: '|  商家销售统计',
      left: 20,
      top: 20,
      textStyle: {
        fontSize: 50
      }
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '6%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category'
    },
    series: [
      {
        type: 'bar',
        barWidth: 66,
        itemStyle: {
          barBorderRadius: [0, 33, 33, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 1,
                color: 'pink'
                // #5052EE
              },
              {
                offset: 0,
                color: 'skyblue'
                // #ABA6EE5
              }
            ],
            global: false
          }
        },
        label: {
          show: true,
          position: 'right',
          textStyle: {
            color: '#fff'
          }
        }
      }
    ]
  }
  echartsInstance.value.setOption(option)

  // 鼠标移入
  echartsInstance.value.on('mouseover', () => {
    clearInterval(timerId.value)
  })

  // 鼠标移出
  echartsInstance.value.on('mouseout', () => {
    startInterval()
  })
}
// 获取后台返回的图表数据
const getData = async () => {
  try {
    const result = await getseller()
    console.log('result', result)
    resultAllData.value = result.data
    // 排序
    resultAllData.value.sort((a, b) => {
      return b.value - a.value
    })
    // 计算页码
    total.value =
      resultAllData.value.length % 5 === 0
        ? resultAllData.value.length / 5
        : resultAllData.value.length / 5 + 1
    updateEcharts()
    startInterval()
  } catch (e) {
    console.log(e)
  }
}

// 配置并渲染图标
const updateEcharts = () => {
  // 分页获取数据
  const start = (currentPage.value - 1) * Pagesize.value
  const end = Pagesize.value * currentPage.value
  showData.value = resultAllData.value.slice(start, end)

  // 获取所有name数据
  const selleNames = showData.value.map((item) => item.name)

  // 获取所有value数据
  const sellevalues = showData.value.map((item) => item.value)

  // 图标配置项
  const option = {
    yAxis: {
      data: selleNames
    },
    series: [
      {
        data: sellevalues
      }
    ]
  }

  // 渲染图标
  echartsInstance.value.setOption(option)
}

// 动态加载分页数据
const startInterval = () => {
  if (timerId.value) {
    clearInterval(timerId.value)
  }
  timerId.value = setInterval(() => {
    currentPage.value++
    if (total.value === currentPage.value) {
      currentPage.value = 1
    }
    updateEcharts()
  }, 3000)
}

// 当浏览器窗口发生变化会触发的方法
const screenAdapter = () => {
  const titleFontSize = (document.getElementById('chart')?.offsetWidth / 100) * 3.6
  const dataOptions = {
    title: {
      textStyle: {
        fontSize: titleFontSize
      }
    },
    series: [
      {
        barWidth: titleFontSize,
        itemStyle: {
          barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
        }
      }
    ]
  }
  echartsInstance.value.setOption(dataOptions)
  echartsInstance.value.resize()
}
</script>
<style lang="scss" scoped></style>
