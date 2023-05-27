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
import HelloWorld from './components/HelloWorld.vue'

// console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
const onMinimizeClick = () => {
  window.api.send('window-minimize')
}
const onCloseClick = () => {
  window.api.send('window-close')
}
</script>


<style lang="scss">
header {
  @apply fixed top-0 left-0 w-full h-8 flex flex-col justify-center items-center bg-black text-white;
  .title {
    @apply text-xl;
  }
  .window-control {
    @apply absolute top-0 right-0 flex items-center h-full;
    button {
      @apply min-w-[25px] min-h-[25px];
    }
  }
}
</style>
