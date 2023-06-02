<template>
  <div class="container" @dblclick="revertMap">
    <div class="chart" id="chart"></div>
  </div>
</template>
<script setup>
import { onMounted, ref, getCurrentInstance, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getProvinceMapInfo } from '@/utils/map_utils.js'
import axios from 'axios'
import { getmap } from '@/api/map'
const router = useRouter()
const route = useRoute()
// 结构出proxy，通过proxy获取全局定义的属性和方法
const { proxy } = getCurrentInstance()
// 创建变量，用来保存echarts的实例对象
const echartsInstance = ref(null)
// 创建变量，用来保存获取到的数据
let resultData = ref()
// 初始化echarts实例对象
const initChart = async () => {
  echartsInstance.value = proxy.$echarts.init(document.getElementById('chart'), 'dark')
  try {
    // 请求地图数据
    const result = await axios.get('http://localhost:5173/map/china.json')
    // console.log('result', result.data)
    // 使用echarts注册地图数据
    proxy.$echarts.registerMap('chinaMap', result.data) // 配置并渲染地图数据
    const option = {
      title: {
        text: '|  商家分布',
        left: 20,
        top: 20
      },
      geo: {
        type: 'map',
        map: 'chinaMap',
        roam: true,
        top: '5%',
        bottom: '5%',
        itemStyle: {
          areaColor: '#2E72BF',
          borderColor: '#333'
        },
        label: {
          show: true
        }
      }
    }
    echartsInstance.value.setOption(option)
  } catch (error) {
    console.log(error)
  }
  // 给所有的地图模块添加点击事件
  echartsInstance.value.on('click', async function (arg) {
    const provinceInfo = getProvinceMapInfo(arg.name)
    console.log('provinceInfo==>', provinceInfo)
    try {
      const result = await axios({ url: 'http://localhost:4001' + provinceInfo.path })

      // 使用echarts注册地图数据
      proxy.$echarts.registerMap(provinceInfo.key, result.data)

      const dataOption = {
        geo: {
          map: provinceInfo.key
        }
      }

      echartsInstance.value.setOption(dataOption)
    } catch (e) {
      console.log(e)
    }
  })
}
// 获取后台返回的数据
const getData = async () => {
  try {
    const result = await getmap()
    resultData.value = result
    console.log('result', result)
  } catch (error) {
    console.log(error)
  }
  updateChart()
}
// 更新图表的配置项以及渲染
const updateChart = () => {
  console.log(resultData.value)
  const legendData = resultData.value.data.map((item) => item.name)

  const seriesArr = resultData.value.data.map((item) => {
    return {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      name: item.name,
      data: item.children,
      rippleEffect: { scale: 5, brushType: 'stroke' }
    }
  })
  const dataOption = {
    legend: {
      data: legendData,
      left: '5%',
      bottom: '5%',
      orient: 'vertical'
    },
    series: seriesArr
  }
  echartsInstance.value.setOption(dataOption)
}
// 图表进行自适应
const screenAdapter = () => {
  const titleFontSize = (document.getElementById('chart')?.offsetWidth / 100) * 3.6

  const adapterOption = {
    title: {
      textStyle: {
        fontSize: titleFontSize
      }
    },
    legend: {
      itemWidth: titleFontSize / 2,
      itemHeight: titleFontSize / 2,
      itemGap: titleFontSize / 2,
      textStyle: {
        fontSize: titleFontSize / 2
      }
    }
  }

  echartsInstance.value.setOption(adapterOption)
  echartsInstance.value.resize()
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
// 双击返回上一级地图
const revertMap = () => {
  console.log('123')
  echartsInstance.value.setOption({
    geo: { map: 'chinaMap' }
  })
}
</script>
<style lang='scss' scoped>
</style>