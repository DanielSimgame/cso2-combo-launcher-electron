<template>
  <div class="about-container">
    <div class="back-button" @click="$router.push('/')">
      <font-awesome-icon :icon="['fas', 'square-caret-left']"/>
    </div>
    <section class="flex flex-col justify-center items-center gap-2">
      <div class="flex items-center gap-2">
        <img width="64" height="64" src="/public/navicon.ico" alt="CSO2 Combo Launcher logo" />
        <h1 class="text-3xl font-bold">
          CSO2 启动器 Electron
        </h1>
        <span>v{{ version }}</span>
      </div>
      <h1>
        <!-- This is an open-source project, code is available on -->
        这是一个开源项目，代码可在
        <a class="font-bold transition-colors" :href="gitRepoUrl" target="_blank">
          GitHub
          <font-awesome-icon class="text-[16px]" :icon="['fas', 'up-right-from-square']" />
        </a>
        查阅
      </h1>
    </section>
    <section class="min-h-[90px] flex items-center justify-around">
      <div class="h-[90px] flex flex-col justify-between items-center gap-2">
        <h1>
          前人栽树后人乘凉，欢迎贡献源代码
        </h1>
        <div class="avatars">
          <div
              v-for="(person, key) in makers"
              :key="key"
              class="avatars__item"
              :style="`animation-delay: ${key * 50}ms`"
              :title="person.name"
          >
            <a :href="person.link" target="_blank">
              <div class="avatars__image">
                <img
                    :src="person.avatar"
                    :alt="`${person.name} avatar`"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="h-[90px] flex flex-col justify-between items-center gap-2">
        <h1>加入社区</h1>
        <div class="communities h-[60px] flex justify-center items-center">
          <div class="w-[32px] h-[32px] cursor-pointer">
            <font-awesome-icon class="w-full h-full" :icon="['fab', 'qq']" style="color: #3a88fe;" />
          </div>
        </div>
      </div>
    </section>
    <section>
      <h1>
        <!-- Express high respect for the following framework and libraries: -->
        向以下框架和库致以崇高敬意：
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
// get from package.json
import config from '../../../package.json'
const version = config.version
const gitRepoUrl = config.repository.url
// const gitRepoUrl = 'https://github.com/DanielSimgame/cso2-combo-launcher-electron'

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
    name: 'Sass',
    logo: '/src/assets/images/frameworks/sass.svg',
    class: 'sass',
    link: 'https://sass-lang.com/'
  },
  {
    name: 'FontAwesome',
    logo: '/src/assets/images/frameworks/fontawesome.svg',
    class: 'fontawesome',
    link: 'https://fontawesome.com/'
  },
]

const makers = [
  {
    name: 'leang97',
    avatar: 'https://avatars.githubusercontent.com/u/12026849?v=4',
    link: 'https://github.com/leang97',
  },
  {
    name: 'dounai2333',
    avatar: 'https://avatars.githubusercontent.com/u/45044404?v=4',
    link: 'https://github.com/dounai2333',
  },
  {
    name: 'GEEKiDoS',
    avatar: 'https://avatars.githubusercontent.com/u/14933408?v=4',
    link: 'https://github.com/GEEKiDoS',
  },
  {
    name: 'Daniel Morrison',
    avatar: 'https://avatars.githubusercontent.com/u/15177071?v=4',
    link: 'https://github.com/DanielSimgame',
  },
]
</script>

<style lang="scss" scoped>
.about-container {
  @apply w-full h-full flex flex-col gap-10 select-none;
}

.back-button {
  @apply absolute top-16 left-4 w-[30px] h-[30px] transform hover:scale-125 transition-transform cursor-pointer;
  svg {
    @apply w-full h-full;
  }
}

.avatars {
  @apply flex;

  &__item {
    @apply flex justify-center items-center -ml-[1rem] w-[60px] h-[60px] cursor-pointer;
    animation: fadeInFromDown 0.5s ease-in-out forwards;
    transform: translateY(25%);
    opacity: 0;
  }

  &__image {
    @apply w-[50px] h-[50px] flex justify-center items-center rounded-3xl
    ring-2 ring-white overflow-hidden transform hover:-translate-y-1 transition-transform;
    //box-shadow: 0 0 0 0.25rem #fff;
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

@keyframes fadeInFromDown {
  0% {
    opacity: 0;
    transform: translateY(25%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
