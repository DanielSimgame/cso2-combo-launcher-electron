import { createI18n } from 'vue-i18n'
import {enUS} from "./lang/enUS"
import {zhCN} from "./lang/zhCN"
import {zhTW} from "./lang/zhTW"

export const i18n = createI18n({
    legacy: false,
    globalInjection: true, // Global mode to use $t function.
    locale: localStorage.getItem('lang') || 'zhCN',
    fallbackLocale: 'enUS', // set fallback locale
    messages: {
        enUS,
        zhCN,
        zhTW,
    }, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
})
