import { createApp } from 'vue'
import "./style.css"
import './assets/tailwind.css'
import App from './App.vue'
import './samples/node-api'
import router from "./lib/router"
import {iconsInit} from './lib/icons'
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome"
import { createPinia } from 'pinia'
import {i18n} from './lib/i18n'
import {useAppStore} from './lib/store/ApplicationStore'
import {ipcRenderer} from "electron"

iconsInit()
createApp(App)
    .use(router)
    .use(createPinia())
    .use(i18n)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
    .$nextTick(() => {
        postMessage({ payload: 'removeLoading' }, '*')
    })

ipcRenderer.on('launcher-config', (_event, config) => {
    const {setGlobalConfig} = useAppStore()
    setGlobalConfig(config)
})
