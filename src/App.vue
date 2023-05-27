<template>
  <header>
    <div class="title">
      <img class="w-8" :src="logoIcon" alt="icon" />
      Counter-Strike Online 2
    </div>
    <div class="window-control">
      <font-awesome-icon
          @click="onMinimizeClick"
          :icon="['fas', 'square-minus']"
      />
      <font-awesome-icon
          @click="onCloseClick"
          :icon="['fas', 'square-xmark']"
      />
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
const logoIcon = '/navicon.ico'

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
  @apply fixed top-0 left-0 w-full h-12 flex flex-col justify-center items-center bg-black text-white z-0;
  -webkit-app-region: drag;

  .title {
    @apply flex items-center gap-2 text-xl italic font-bold pointer-events-none select-none;
  }
  .window-control {
    @apply absolute w-[44px] top-0 right-3 flex justify-between items-center h-full z-10;
    -webkit-app-region: no-drag;
    svg {
      @apply w-[20px] h-[20px] hover:scale-[1.2] cursor-pointer transition-all;
      transform-origin: center center;
    }
  }
}
</style>
