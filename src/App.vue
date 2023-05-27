<template>
  <header>
    <div class="title">
      title1
    </div>
    <div class="window-control">
      <button @click="onMinimizeClick">-</button>
      <button @click="onCloseClick">x</button>
    </div>
  </header>
  <router-view>
    <template #default="{ Component }">
      <keep-alive :exclude="['Home']">
        <component :is="Component"></component>
      </keep-alive>
    </template>
  </router-view>
</template>

<script setup lang="ts">
import {ipcRenderer} from 'electron'
// import HelloWorld from './components/HelloWorld.vue'

// console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
const onMinimizeClick = () => {
  ipcRenderer.send('window-event', {
    name: 'minimize'
  })
}
const onCloseClick = () => {
  ipcRenderer.send('window-event', {
    name: 'quit'
  })
}
</script>


<style lang="scss">
header {
  @apply fixed top-0 left-0 w-full h-12 flex flex-col justify-center items-center bg-black text-white;
  -webkit-app-region: drag;

  .title {
    @apply text-lg pointer-events-none select-none;
  }
  .window-control {
    @apply absolute top-0 right-1 flex items-center h-full;
    button {
      @apply min-w-[25px] min-h-[25px];
    }
  }
}
</style>
