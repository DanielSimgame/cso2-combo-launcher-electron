<template>
  <div class="mt-12 mx-auto w-full h-full grid grid-cols-7 gap-3">
    <div class="col-span-3 row-span-6">
      Character picture here.
    </div>
    <!-- login form -->
    <div class="col-span-4 row-span-2">
      <form>
        <div class="form-group">
          <label for="username">{{ $t('universal.username.label') }}</label>
          <input
              id="username"
              type="text"
              :value="loginForm.username"
              :placeholder="$t('universal.username.placeholder')"
          />
        </div>
        <div class="form-group">
          <label for="password">{{ $t('universal.password.label') }}</label>
          <input
              id="password"
              type="password"
              :value="loginForm.password"
              :placeholder="$t('universal.password.placeholder')"
          />
        </div>
      </form>
    </div>
    <!-- server selections -->
    <div class="col-span-2 row-span-1 flex justify-between items-center">
      <span class="w-[100px] text-left">
        {{ $t('universal.servers.label') }}
      </span>
      <Listbox v-model="serverSelection">
        <div class="relative w-1/2 h-[40px]">
          <ListboxButton class="list-box-btn group">
            <span class="block truncate text-black">
              {{ $t(serverSelection.translation) }}
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
                class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
    <div class="col-span-2 row-span-1 grid grid-cols-4 gap-1">
      <button
          class="w-full h-[40px] bg-black bg-opacity-75"
          :title="$t('homepage.about')"
          @click="onAboutClick"
      >
        <font-awesome-icon :icon="['fas', 'circle-info']" />
      </button>
      <button
          class="w-full h-[40px] bg-black bg-opacity-75 col-span-2"
          @click="onSettingsClick"
      >
        {{ $t('homepage.settings') }}
      </button>
      <button
          class="w-full h-[40px] main-btn"
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
          class="w-full h-full rounded-lg text-black p-2 focus-visible:ring-0 focus-visible:outline-none resize-none"
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
import {reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {useAppStore} from '../../lib/store/ApplicationStore'

const router = useRouter()
const {toggleGlobalDialog} = useAppStore()

const loginForm = reactive({
  username: '',
  password: '',
})

const servers = [
  { id: 1, name: 'shanghai', translation: 'universal.servers.Shanghai', unavailable: false },
  { id: 2, name: 'HongKong', translation: 'universal.servers.HongKong', unavailable: true },
]
const serverSelection = ref(servers[0])
const output = ref('连接中...')
const isStartGameDisabled = ref(true)

const onStartGameClick = () => {
  console.log('start game')
}

const onAboutClick = () => {
  router.push('/about')
}

const onSettingsClick = () => {
  toggleGlobalDialog()
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
      @apply p-2 rounded-md text-black focus-visible:outline-none;
      width: calc(100% - 100px);
    }
  }
}

.list-box-btn {
  @apply relative w-full h-full rounded-lg bg-white p-2 text-left shadow-md focus:outline-none
  focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
  focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm;
}
</style>
