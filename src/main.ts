import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import { globalRegiser } from './global'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(globalRegiser)
app.mount('#app')
