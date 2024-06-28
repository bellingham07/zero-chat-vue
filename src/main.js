import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import websocketService from "@/websocket/websocket.js";

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(ElementPlus)

app.config.globalProperties.$websocket=websocketService

app.mount('#app')
