<template>
  <div class="mt-12 mx-auto w-full h-full grid grid-cols-7 gap-3">
    <div class="col-span-3 row-span-6">
      Character picture here.
    </div>
    <!-- login form -->
    <div class="col-span-4 row-span-2">
      <form>
        <div class="form-group">
          <label for="username">用户名</label>
          <input
              id="username"
              type="text"
              :value="loginForm.username"
              placeholder="游戏内显示的ID"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
              id="password"
              type="password"
              :value="loginForm.password"
              placeholder="4位数字"
          />
        </div>
      </form>
    </div>
    <!-- server selections -->
    <div class="col-span-2 row-span-1 flex justify-between items-center">
      <RadioGroup class="w-full flex justify-start items-center" v-model="serverSelection">
        <RadioGroupLabel class="w-[100px] text-left">服务器</RadioGroupLabel>
        <RadioGroupOption v-slot="{ checked }" style="width: calc(100% - 100px)" value="shanghai">
          <div
              :class="[
                checked ? 'bg-black text-white' : 'bg-black bg-opacity-75',
              ]"
              class="relative flex justify-between gap-2 cursor-pointer rounded-lg px-4 py-2 shadow-md"
          >
            <span>上海</span>
            <div v-show="checked" class="shrink-0 text-white">
              <img class="h-6 w-6" :src="checkIcon" alt>
            </div>
          </div>
        </RadioGroupOption>
      </RadioGroup>
    </div>
    <!-- start game -->
    <div class="col-span-2 row-span-2">
      <button
          class="text-3xl font-bold bg-orange-600 hover:bg-orange-500 hover:border-transparent transition-colors"
          style="width: 100%; height: 100%"
      >
        进入游戏
      </button>
    </div>
    <!-- setting button -->
    <div class="col-span-2 row-span-1">
      <button class="w-full h-[40px] bg-black bg-opacity-75">设置</button>
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
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'
import checkIcon from '../../assets/images/check.svg'

const router = useRouter()

const loginForm = reactive({
  username: '',
  password: '',
})
const serverSelection = ref('shanghai')
const output = ref('连接中...')
</script>

<style lang="scss" scoped>
button {
  @apply py-1 px-3;
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
</style>
