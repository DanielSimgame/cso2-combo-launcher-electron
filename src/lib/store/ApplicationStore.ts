import type {Ref} from 'vue'
import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useAppStore = defineStore('app', () => {
    // state
    const isGlobalDialogShown: Ref<boolean> = ref(true)

    // actions
    const toggleGlobalDialog = () => {
        isGlobalDialogShown.value = !isGlobalDialogShown.value
    }

    return {
        isGlobalDialogShown,
        toggleGlobalDialog,
    }
})
