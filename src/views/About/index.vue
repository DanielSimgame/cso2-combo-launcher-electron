<template>
  <div class="about-container">
    <div class="back-button" @click="$router.push('/')">
      <font-awesome-icon :icon="['fas', 'square-caret-left']"/>
    </div>
    <section>
      <h1 class="text-xl">
        This is an open-source project, code is available on
        <a class="font-bold transition-colors" :href="gitRepoUrl" target="_blank">
          GitHub
          <font-awesome-icon class="text-[16px]" :icon="['fas', 'up-right-from-square']" />
        </a>
      </h1>
    </section>
    <section>
      <h1 class="text-lg">
        With the greatest thanks to the following frameworks and libraries:
      </h1>
      <div class="frameworks">
        <a
            v-for="(item, key) in frameworks"
            :key="key"
            :href="item.link"
            target="_blank"
            :title="item.name"
        >
          <img
              :src="item.logo"
              :class="['logo', item.class]"
              :alt="`${item.name} logo`"
          />
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
const gitRepoUrl = 'https://github.com/DanielSimgame/cso2-combo-launcher-electron'

const frameworks = [
  {
    name: 'Electron',
    logo: '/src/assets/images/frameworks/electron.svg',
    class: 'electron',
    link: 'https://www.electronjs.org/'
  },
  {
    name: 'Vite',
    logo: '/src/assets/images/frameworks/vite.svg',
    class: 'vite',
    link: 'https://vitejs.dev/'
  },
  {
    name: 'Vue',
    logo: '/src/assets/images/frameworks/vue.svg',
    class: 'vue',
    link: 'https://vuejs.org/'
  },
  {
    name: 'PostCSS',
    logo: '/src/assets/images/frameworks/postcss.svg',
    class: 'postcss',
    link: 'https://postcss.org/'
  },
  {
    name: 'FontAwesome',
    logo: '/src/assets/images/frameworks/fontawesome.svg',
    class: 'fontawesome',
    link: 'https://fontawesome.com/'
  },
  {
    name: 'Sass',
    logo: '/src/assets/images/frameworks/sass.svg',
    class: 'sass',
    link: 'https://sass-lang.com/'
  },
]
</script>

<style lang="scss" scoped>
.about-container {
  @apply w-full h-full flex flex-col gap-5;
}

.back-button {
  @apply absolute top-16 left-4 w-[30px] h-[30px] transform hover:scale-125 transition-transform cursor-pointer;
  svg {
    @apply w-full h-full;
  }
}

.frameworks {
  @apply mx-auto grid grid-cols-6 w-fit;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 200ms;

  &:hover {
    filter: drop-shadow(0 0 2em #ffffffaa);
  }

  &.electron:hover {
    filter: drop-shadow(0 0 2em #9FEAF9aa);
  }

  &.vite:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  &.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }

  &.postcss:hover {
    filter: drop-shadow(0 0 2em #dd3a0a);
  }

  &.fontawesome {
    color: #538dd7;

    &:hover {
      filter: drop-shadow(0 0 2em #538dd7aa);
    }
  }

  &.sass:hover {
    filter: drop-shadow(0 0 2em #c69);
  }
}
</style>
