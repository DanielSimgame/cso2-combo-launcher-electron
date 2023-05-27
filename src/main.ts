import { createApp } from 'vue'
import "./style.css"
import './assets/tailwind.css'
import App from './App.vue'
import './samples/node-api'
import router from "./lib/router"

createApp(App)
    .use(router)
    .mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
    })
