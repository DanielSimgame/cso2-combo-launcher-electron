<template>
  <div class="register-container">
    <div id="FirstInit">
      <div class="init-head">
        <CircleIcon class="w-[50px] h-[50px]" :icon="['fas', 'user']"></CircleIcon>
        <h1>{{ $t('init.title') }}</h1>
      </div>
      <form>
        <div class="form-group" style="animation-delay: 75ms">
          <label for="username">用户名</label>
          <input
              ref="usernameRef"
              v-model="registerForm.username"
              type="text"
              id="username"
              placeholder="游戏内显示的ID"
          />
        </div>
        <div class="form-group" style="animation-delay: 150ms">
          <label for="password">密码</label>
          <input
              ref="passwordRef"
              v-model="registerForm.password"
              type="password"
              id="password"
              placeholder="4位数字"
          />
        </div>
        <div class="form-group" style="animation-delay: 225ms">
          <label for="password">确认密码</label>
          <input
              ref="rePasswordRef"
              v-model="registerForm.rePassword"
              type="password"
              id="rePassword"
              placeholder="再次确认密码"
          />
        </div>
      </form>
      <div class="buttons">
        <button @click="onSkipClick">跳过</button>
        <button @click="onRegisterSubmit" class="btn-primary">注册</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import CircleIcon from "@/components/CircleIcon.vue"
import {useAppStore} from '../../lib/store/ApplicationStore'
import {storeToRefs} from 'pinia'

const router = useRouter()
const {setAccountToStore} = useAppStore()
const {globalConfig} = storeToRefs(useAppStore())
const usernameRef = ref<HTMLElement | null>(null)
const passwordRef = ref<HTMLElement | null>(null)
const rePasswordRef = ref<HTMLElement | null>(null)
const registerForm = ref({
  username: '',
  password: '',
  rePassword: ''
})

const onSkipClick = () => {
  setAccountToStore(
    'player',
    Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  )
  router.push('/')
}

/**
 * @function formValidation
 * @description 验证注册表单
 * @returns {boolean} 是否通过验证
 * */
const formValidation = () => {
  if (
      usernameRef.value === null
      || passwordRef.value === null
      || rePasswordRef.value === null
  ) return false

  if (registerForm.value.username.length < 1 || registerForm.value.username.length > 16) {
    (usernameRef.value as HTMLElement).classList.add('invalid')

    const usernameTimer = setTimeout(() => {
      (usernameRef.value as HTMLElement).classList.remove('invalid')
      clearTimeout(usernameTimer)
    }, 500)

    return false
  }

  if (registerForm.value.password.length === 0 || registerForm.value.rePassword.length === 0) {
    const emptyRef = registerForm.value.password.length === 0 ? passwordRef : rePasswordRef;
    (emptyRef.value as HTMLElement).classList.add('invalid')

    const duoPasswordTimer = setTimeout(() => {
      (emptyRef.value as HTMLElement).classList.remove('invalid')
      clearTimeout(duoPasswordTimer)
    }, 500)
    return false
  }

  if (registerForm.value.password !== registerForm.value.rePassword) {
    (rePasswordRef.value as HTMLElement).classList.add('invalid')

    const rePasswordTimer = setTimeout(() => {
      (rePasswordRef.value as HTMLElement).classList.remove('invalid')
      clearTimeout(rePasswordTimer)
    }, 500)

    return false
  }

  return true
}

const onRegisterSubmit = () => {
  if (!formValidation()) return
  setAccountToStore(registerForm.value.username, registerForm.value.password)

  registerForm.value.username = ''
  registerForm.value.password = ''
  registerForm.value.rePassword = ''

  router.push('/')
}
</script>

<style lang="scss" scoped>
.register-container {
  @apply relative w-full flex justify-center items-center;
  height: calc(100vh - var(--global-header-height));

  background-image: url('/images/assault.webp');
  background-repeat: no-repeat;
  background-size: cover;
}
#FirstInit {
  @apply w-fit h-fit px-6 py-6 bg-black flex flex-col gap-6
  transform -translate-x-1/2 translate-y-1/2 justify-center items-center rounded-2xl shadow-2xl;
  animation: fadeInWithScaleUp .4s cubic-bezier(0.09, 0.57, 0.49, 0.9) forwards;

  .init-head {
    @apply flex justify-between items-center overflow-hidden select-none;
    //width: 50px;
    height: 50px;
    //animation: xExpand .65s cubic-bezier(0.09, 0.57, 0.49, 0.9) forwards;

    h1 {
      @apply text-[2rem] text-clip whitespace-nowrap ml-3;
      //width: 0;
      display: inline-block;
      //transition: width 0.5s cubic-bezier(0.09, 0.57, 0.49, 0.9);
      //transition-delay: .5s;
    }
  }

  form {
    @apply min-w-[300px] flex flex-col gap-5;
    .form-group {
      @apply flex w-full justify-between items-center;
      animation: fadeInFromDown .5s cubic-bezier(0.09, 0.57, 0.49, 0.9) forwards;
      opacity: 0;

      input {
        @apply border border-transparent p-2 rounded-md;
      }

      input.invalid {
        animation: shake .5s cubic-bezier(0.09, 0.57, 0.49, 0.9) forwards;
      }
    }
  }

  .buttons {
    @apply w-full flex justify-between items-center gap-1;
    button {
      @apply w-full p-2 rounded-md;

      &.btn-primary {
        @apply bg-orange-600 text-white;
      }
    }
  }
}

@keyframes xExpand {
  from {
    width: 50px;
  }
  to {
    width: calc(50px + 2rem * 5.5);
  }
}

@keyframes fadeInWithScaleUp {
  from {
    opacity: 0;
    transform: scale(0.75);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeInFromDown {
  from {
    opacity: 0;
    transform: translateY(25%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0% { transform: translateX(0); }
  10% { transform: translateX(-5px); }
  20% { transform: translateX(5px); }
  30% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  50% { transform: translateX(-5px); }
  60% { transform: translateX(5px); }
  70% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
  90% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
</style>
