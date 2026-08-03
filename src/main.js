import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import backgroundWeather from './utils/backgroundWeather'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

backgroundWeather.initialize()
