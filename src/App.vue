<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'

// console.log("[App.vue]", `Hello world from Electron ${process.versions.electron}!`)
</script>

<template>
  <router-view>
    <template #default="{ Component }">
      <keep-alive :exclude="['Home']">
        <component :is="Component"></component>
      </keep-alive>
    </template>
  </router-view>
</template>

<style>

</style>
