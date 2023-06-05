<template>
  <button @click="pullQq(number)">
    <font-awesome-icon class="w-[24px] h-[24px]" :icon="['fab', 'qq']" style="color: #3a88fe;" />
    <span>{{ number }}</span>
  </button>
</template>

<script setup lang="ts">
import {ipcRenderer} from 'electron'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

defineProps({
  number: {
    type: String,
    required: true
  }
})

/**
 * @function pullQq
 * @description 向主进程发送拉起QQ请求
 * */
const pullQq = (group = '') => {
  if (group === '') return
  ipcRenderer.send('pull-qq', group)
}
</script>

<style lang="scss" scoped>
button {
  @apply min-w-[150px] px-2 py-1 flex justify-center items-center gap-2;
}
</style>
