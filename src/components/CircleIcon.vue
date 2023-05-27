<template>
  <div class="progress-bar">
    <font-awesome-icon class="text-white" :icon="icon"></font-awesome-icon>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

defineProps({
  icon: {
    type: Array as PropType<Array<String> | String>,
    required: true
  }
})
</script>

<style scoped>
@property --per {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}

svg {
  @apply relative text-3xl z-10;
}

.progress-bar {
  @apply relative flex justify-center items-center text-center z-0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  animation: progressUp .75s cubic-bezier(1,0,0,1) forwards;
  background:
      radial-gradient(closest-side, black 90%, transparent 70%),
      conic-gradient(white var(--per), transparent 0);
}

@keyframes progressUp {
  0% {
    --per: 0%;
  }
  100% {
    --per: 100%;
  }
}
</style>
