<template>
  <GlobalHeader />
  <router-view>
    <template #default="{ Component }">
      <keep-alive :exclude="['Home', 'FirstInit']">
        <component :is="Component"></component>
      </keep-alive>
    </template>
  </router-view>
  <AppDialog
      v-model="isGlobalDialogShown"
      title="a test dialog"
  >
    test dialog
  </AppDialog>
</template>

<script setup lang="ts">
import GlobalHeader from './components/GlobalHeader.vue'
import AppDialog from './components/AppDialog.vue'
import {useAppStore} from './lib/store/ApplicationStore'
import {storeToRefs} from 'pinia'

const {isGlobalDialogShown} = storeToRefs(useAppStore())

// console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
</script>


<style lang="scss">
</style>
