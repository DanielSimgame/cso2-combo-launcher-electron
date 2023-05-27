<template>
  <div class="home-container">
    <span>home</span>
  </div>
  <HelloWorld msg="Electron + Vite + Vue" />
  <button @click="router.push('/first-init')">
    First?
  </button>
  <button @click="router.push('/about')">
    About
  </button>
  <div class="flex-center">
    Place static files into the <code>/public</code> folder
    <img style="width: 2.4em; margin-left: .4em;" src="/logo.svg" alt="Logo">
  </div>
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

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
