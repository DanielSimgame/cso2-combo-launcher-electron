<template>
  <header>
    <div class="title">
      <img class="w-8" :src="logoIcon" alt="icon" />
      <span ref="titleRef">Counter-Strike Online 2</span>
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
</template>

<script setup lang="ts">
import {ipcRenderer} from 'electron'
import {onMounted, ref} from 'vue'

const logoIcon = '/favicon.ico'
const titleRef = ref<HTMLElement | null>(null)

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

onMounted(() => {
  titleRef.value!.style.width = `${titleRef.value!.scrollWidth}px`
  // setTimeout(() => {
  //   titleRef.value!.querySelector('span')!.style.width = 'auto'
  // }, 1000)
})
</script>

<style scoped lang="scss">
header {
  @apply fixed top-0 left-0 w-full h-12 flex flex-col justify-center items-center bg-black text-white z-0;
  -webkit-app-region: drag;

  .title {
    @apply flex items-center gap-2 text-xl italic font-bold pointer-events-none select-none overflow-hidden;

    span {
      width: 0;
      white-space: nowrap;
      display: inline-block;
      transition: width 0.5s cubic-bezier(0.09, 0.57, 0.49, 0.9);
      transition-delay: 1s;
    }
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
