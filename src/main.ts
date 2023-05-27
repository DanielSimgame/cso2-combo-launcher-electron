import { createApp } from 'vue'
import "./style.css"
import './assets/tailwind.css'
import App from './App.vue'
import './samples/node-api'
import router from "./lib/router"
import {iconsInit} from './lib/icons'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"

iconsInit()
createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
    })
