import type { App } from 'vue'
import * as echarts from 'echarts'
export default function regiserEcharts(app: App) {
  app.config.globalProperties.$echarts = echarts
}
