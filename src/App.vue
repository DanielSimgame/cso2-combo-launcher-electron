<template>
  <GlobalHeader />
  <router-view class="mt-12">
    <template #default="{ Component }">
      <keep-alive :exclude="['Home', 'FirstInit']">
        <component :is="Component"></component>
      </keep-alive>
    </template>
  </router-view>
  <ProgressBar v-if="globalProgress.isShown" />
  <AppDialog
      v-model="globalDialog.isShown"
      :title="globalDialog.title"
  >
    {{ globalDialog.content }}
  </AppDialog>
</template>

<script setup lang="ts">
import GlobalHeader from './components/GlobalHeader.vue'
import AppDialog from './components/AppDialog.vue'
import {useAppStore} from './lib/store/ApplicationStore'
import {storeToRefs} from 'pinia'
import ProgressBar from './components/ProgressBar.vue'

const {globalDialog, globalProgress} = storeToRefs(useAppStore())

// console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
</script>

<style lang="scss">
</style>
