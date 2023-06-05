<template>
  <GlobalHeader />
  <router-view>
    <template #default="{ Component }">
      <keep-alive :exclude="['Home', 'FirstInit']">
        <component :is="Component"></component>
      </keep-alive>
    </template>
  </router-view>
</template>

<script setup lang="ts">
import GlobalHeader from './components/GlobalHeader.vue'
// import HelloWorld from './components/HelloWorld.vue'

// console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
</script>


<style lang="scss">
</style>
