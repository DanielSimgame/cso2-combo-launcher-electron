<template>
  <div class="homepage">
    <div class="homepage-bg"></div>
    <div class="col-span-3 row-span-6" />
    <!-- login form -->
    <div class="col-span-4 row-span-2">
      <form>
        <div class="form-group">
          <label for="username">{{ $t('universal.username.label') }}</label>
          <input
              id="username"
              type="text"
              :value="globalConfig.username"
              :placeholder="$t('universal.username.placeholder')"
          />
        </div>
        <div class="form-group">
          <label for="password">{{ $t('universal.password.label') }}</label>
          <input
              id="password"
              type="password"
              :value="globalConfig.password"
              :placeholder="$t('universal.password.placeholder')"
          />
        </div>
      </form>
    </div>
    <!-- server selections -->
    <div class="relative col-span-2 row-span-1 flex justify-between items-center z-[3]">
      <span class="w-[100px] text-left">
        {{ $t('universal.servers.label') }}
      </span>
      <Listbox v-model="globalConfig.server">
        <div class="relative w-1/2 h-[40px]">
          <ListboxButton class="list-box-btn group">
            <span class="block truncate text-black">
<!--              {{ $t(globalConfig.server.translation || 'universal.servers.unknown') }}-->
              {{ $t(serverTranslation) }}
            </span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <font-awesome-icon
                class="h-5 w-5 text-gray-400 group-hover:text-orange-600 transition-colors duration-200"
                :icon="['fas', 'circle-chevron-down']"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>
          <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
          >
            <ListboxOptions
                class="server-list-box-options"
            >
              <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="server in servers"
                  :key="server.id"
                  :value="server"
                  :disabled="server.unavailable"
                  as="template"
              >
                <li :class="[
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                    'group relative cursor-default select-none py-2 pl-6 pr-2 overflow-hidden',
                  ]"
                >
                  <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block text-left truncate group-hover:text-clip transform group-hover:-translate-x-5',
                        'transition-transform duration-200 group-hover:w-fit',
                      ]"
                  >
                    {{ $t(server.translation) }}
                  </span>
                  <span
                      v-if="selected"
                      :class="[
                          'absolute inset-y-0 left-0 flex items-center pl-1 text-amber-600',
                          'transform group-hover:-translate-x-5 transition-transform duration-200',
                      ]"
                  >
                    <font-awesome-icon
                      class="h-4 w-4"
                      aria-hidden="true"
                      :icon="['fas', 'check']"
                    />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>

<!--      <RadioGroup class="w-full flex justify-start items-center" v-model="serverSelection">-->
<!--        <RadioGroupLabel class="w-[100px] text-left">-->
<!--          {{ $t('homepage.servers.title') }}-->
<!--        </RadioGroupLabel>-->
<!--        <RadioGroupOption v-slot="{ checked }" style="width: calc(100% - 100px)" value="shanghai">-->
<!--          <div-->
<!--              :class="[-->
<!--                checked ? 'bg-black text-white' : 'bg-black bg-opacity-75',-->
<!--              ]"-->
<!--              class="relative flex justify-between gap-2 cursor-pointer rounded-lg px-4 py-2 shadow-md"-->
<!--          >-->
<!--            <span>{{ $t('homepage.servers.shanghai') }}</span>-->
<!--            <div v-show="checked" class="shrink-0 text-white">-->
<!--              <img class="h-6 w-6" :src="checkIcon" alt>-->
<!--            </div>-->
<!--          </div>-->
<!--        </RadioGroupOption>-->
<!--      </RadioGroup>-->
    </div>
    <!-- start game -->
    <div class="col-span-2 row-span-2">
      <button
          id="startGame"
          class="main-btn"
          @click="onStartGameClick"
          style="width: 100%; height: 100%"
          :disabled="isStartGameDisabled"
      >
        {{ $t('homepage.login') }}
      </button>
    </div>
    <!-- setting button -->
    <div class="col-span-2 row-span-1 function-btns">
      <button
          class="w-full h-[40px] bg-black bg-opacity-75 flex-1 border-black"
          :title="$t('homepage.about')"
          @click="onAboutClick"
      >
        <font-awesome-icon :icon="['fas', 'circle-info']" />
      </button>
      <button
          class="w-full h-[40px] bg-black bg-opacity-75 flex-[2]"
          @click="onSettingsClick"
      >
        {{ $t('homepage.settings') }}
      </button>
      <button
          class="w-full h-[40px] main-btn flex-1 border-black"
          :title="$t('homepage.register')"
          @click="onRegisterClick"
      >
        <font-awesome-icon :icon="['fas', 'user-plus']" />
      </button>
    </div>
    <!-- connection output -->
    <div class="col-span-4 row-span-2 mt-10">
      <textarea
          :value="output"
          class="w-full h-full rounded-lg text-black p-2 focus-visible:ring-0 focus-visible:outline-none resize-none dark:text-gray-400"
          readonly
      />
    </div>
  </div>
<!--  <button @click="router.push('/first-init')">-->
<!--    First?-->
<!--  </button>-->
<!--  <button @click="router.push('/about')">-->
<!--    About-->
<!--  </button>-->
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {useAppStore} from '../../lib/store/ApplicationStore'
import {storeToRefs} from "pinia";

const router = useRouter()
const {toggleGlobalDialog} = useAppStore()

const {globalConfig} = storeToRefs(useAppStore())

const servers = [
  { id: 1, name: 'shanghai', translation: 'universal.servers.Shanghai', unavailable: false },
  // { id: 2, name: 'HongKong', translation: 'universal.servers.HongKong', unavailable: true },
]
// const serverSelection = ref({})
// const serverTranslation = ref(globalConfig.value.server.translation || 'universal.servers.unknown')
const serverTranslation = computed(() => globalConfig.value.server.translation || 'universal.servers.unknown')
const output = ref('连接中...')
const isStartGameDisabled = ref(true)

const onStartGameClick = () => {
  console.log('start game')
}

const onAboutClick = () => {
  router.push('/about')
}

const onSettingsClick = () => {
  toggleGlobalDialog(true, {
    title: 'Settings',
    content: 'This is a setting dialog',
  })
  // router.push('/settings')
}

const onRegisterClick = () => {
  router.push('/first-init')
}
</script>

<style lang="scss" scoped>
button {
  @apply py-1 px-3;
}

button.main-btn {
  @apply bg-orange-600 hover:bg-orange-500 hover:border-transparent transition-colors;
}

.homepage {
  @apply relative mx-auto p-8 w-full h-full grid grid-cols-7 gap-3;
  height: calc(100% - var(--global-header-height));
  background-image: url('/images/assault.webp');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 0;

  & > div {
    @apply relative;
    //z-index: 2;
  }

  .homepage-bg {
    @apply absolute w-full h-full right-0 top-1/2 transform -translate-y-1/2
    bg-gradient-to-r from-transparent to-45% to-[var(--global-background-color)];
    //background-color: var(--global-background-color);
    z-index: 0;
  }
}

#startGame {
  @apply text-3xl font-bold;

  &[disabled] {
    @apply bg-gray-400 cursor-not-allowed;
  }
}

form {
  @apply flex flex-col gap-3;
  .form-group {
    @apply flex w-full justify-between items-center;

    label {
      @apply w-[100px] text-left;
    }
    input {
      @apply p-2 rounded-md text-black dark:text-white focus-visible:outline-none;
      width: calc(100% - 100px);
    }
  }
}

.function-btns {
  @apply flex justify-between items-center gap-1;

  button {
    @apply h-full;
  }
}

.server-list-box-options {
  @apply absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1
  ring-black ring-opacity-5 focus:outline-none sm:text-sm;
}

.list-box-btn {
  @apply relative w-full h-full rounded-lg bg-white p-2 text-left shadow-md focus:outline-none
  focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
  focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm;
}
</style>
