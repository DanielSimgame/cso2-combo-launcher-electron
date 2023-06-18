// import type {Ref} from 'vue'
import {ref} from 'vue'
import {defineStore} from 'pinia'
// import type {LauncherConfig} from '@/lib/in/launcher'

type ProgressStatus = 'success' | 'exception' | 'pending' | 'processing' | 'extracting'
interface ProgressObj {
    title: string
    progress: number
    status: ProgressStatus
    isShown?: boolean
}

export const useAppStore = defineStore('app', () => {
    // state
    const globalDialog = ref({
        title: '',
        content: '',
        isHtml: false,
        isShown: false,
    })
    const globalProgress = ref<ProgressObj>({
        title: '',
        progress: 75,
        status: 'extracting',
        isShown: false,
    })
    const globalConfig = ref<LauncherConfig>({
        username: '',
        password: '',
        server: '',
        launcherLanguage: '',
        advancedCommand: '',
        gameLanguage: '',
        gameResolution: '',
        gameFullscreen: true,
        gameShowFps: false,
    })

    // actions
    const toggleGlobalDialog = (show: boolean, options?: {title: string, content: string, isHtml?: boolean}) => {
        globalDialog.value.isShown = show
        if (show && options) {
            globalDialog.value.title = <string>options?.title
            globalDialog.value.content = <string>options?.content
            globalDialog.value.isHtml = <boolean>options?.isHtml || false
        }
    }

    const setGlobalConfig = (config: LauncherConfig) => {
        globalConfig.value = config
    }

    const getAccountFromConfig = () => {
        return {
            username: globalConfig.value.username,
            password: globalConfig.value.password,
        }
    }

    const setAccountToStore = (username: string, password: string) => {
        globalConfig.value.username = username
        globalConfig.value.password = password
    }

    return {
        globalDialog,
        globalProgress,
        globalConfig,
        toggleGlobalDialog,
        setGlobalConfig,
        getAccountFromConfig,
        setAccountToStore,
    }
})
