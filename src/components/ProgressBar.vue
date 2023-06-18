<template>
  <div class="progress-container" :class="progressContainerClass">
    <div
        ref="progress"
        class="progress"
        :class="progressStatusBg.get(globalProgress.status)"
        :style="`width: ${globalProgress.progress}%`"
    />
    <div ref="progressTextRef" class="progress-text">
      {{ progressStatusTexts.get(globalProgress.status) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {storeToRefs} from 'pinia'
import {useAppStore} from '../lib/store/ApplicationStore'

const {globalProgress} = storeToRefs(useAppStore())
const progressStatusTexts = new Map([
  ['processing', '下载中...'],
  ['extracting', '解压中...'],
  ['pending', '等待中...'],
  ['exception', '更新出错'],
  ['success', '更新完成'],
])
const progressStatusBg = new Map([
  ['processing', 'bg-green-500'],
  ['extracting', 'bg-green-500'],
  ['pending', 'bg-orange-500'],
  ['exception', 'bg-red-500'],
  ['success', 'bg-green-500'],
])

const progressContainerClass = ref('opacity-0')
const progress = ref()
const progressTextRef = ref()

onMounted(() => {
  progressContainerClass.value = 'opacity-100'
  progressTextRef.value!.style.width = `${progressTextRef.value!.scrollWidth}px`
})
</script>

<style scoped lang="scss">
.progress-container {
  @apply absolute bottom-0 left-0 w-full h-3 bg-gray-200 transition-opacity duration-500;

  .progress {
    @apply w-full h-full transition-all rounded-tr rounded-br;
  }

  .progress-text {
    @apply absolute bottom-0 left-1/2 text-white text-xl font-black transform -translate-x-[52%] -skew-x-12
    overflow-hidden;
    white-space: nowrap;
    display: inline-block;
    font-family: 'Heiti SC', sans-serif;
    text-shadow: 0 1px 3px rgb(234, 88, 12);
    transition: width 0.5s cubic-bezier(0.09, 0.57, 0.49, 0.9);
    transition-delay: 1s;
  }
}
</style>
