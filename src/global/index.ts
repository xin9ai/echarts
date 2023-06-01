import type { App } from 'vue'
import regiserEcharts from '@/global/regiserEcharts'

export const globalRegiser = {
  install(app: App) {
    app.use(regiserEcharts)
  }
}
