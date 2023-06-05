<template>
  <div class="mx-auto w-full h-full grid grid-cols-3">
    <div class="col-span-1 row-span-3">
      Character picture here.
    </div>
    <div class="col-span-2">
      <div class="login-form"></div>
    </div>
    <div class="col-span-2">
      <!-- server selection radios -->
      <input type="radio" id="server1" name="server" value="Shanghai">
      <label class="ml-1" for="server1">Shanghai</label><br>
    </div>
  </div>
  <button @click="router.push('/first-init')">
    First?
  </button>
  <button @click="router.push('/about')">
    About
  </button>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import HelloWorld from "../../components/HelloWorld.vue"

const router = useRouter()
</script>

<style scoped>
button {
  @apply py-1 px-3;
}

.home-container {
  @apply flex;
  background-color: transparent;
}
</style>
