<template>
  <div id="FirstInit">
    <div class="init-head">
      <CircleIcon :icon="['fas', 'user']"></CircleIcon>
      <h1>初次到来？</h1>
    </div>
    <form>
      <div class="form-group" style="animation-delay: 75ms">
        <label for="username">用户名</label>
        <input type="text" id="username" placeholder="游戏内显示的ID"/>
      </div>
      <div class="form-group" style="animation-delay: 150ms">
        <label for="password">密码</label>
        <input type="password" id="password" placeholder="4位数字"/>
      </div>
      <div class="form-group" style="animation-delay: 225ms">
        <label for="password">确认密码</label>
        <input type="password" id="password" placeholder="再次确认密码"/>
      </div>
    </form>
    <div class="buttons">
      <button @click="router.push('/')">跳过</button>
      <button class="btn-primary">注册</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import CircleIcon from "@/components/CircleIcon.vue"

const router = useRouter()
</script>

<style lang="scss" scoped>
#FirstInit {
  @apply mx-auto w-fit h-fit px-6 py-6 bg-black flex flex-col gap-6
  justify-center items-center rounded-2xl shadow-2xl;
  animation: fadeInWithScaleUp .4s cubic-bezier(1,0,0,1) forwards;

  .init-head {
    @apply flex justify-between items-center;
    width: 50px;
    height: 50px;
    animation: xExpand .65s ease-in-out forwards;

    h1 {
      @apply text-[2rem] overflow-hidden text-clip whitespace-nowrap text-right;
      width: 0;
      animation: xExpand_Text .75s ease-in-out forwards;
    }
  }

  form {
    @apply min-w-[300px] flex flex-col gap-5;
    .form-group {
      @apply flex w-full justify-between items-center;
      animation: fadeInFromDown .5s ease-in-out forwards;
      opacity: 0;

      input {
        @apply p-2 rounded-md;
      }
    }
  }

  .buttons {
    @apply w-full flex justify-between items-center gap-1;
    button {
      @apply w-full p-2 rounded-md;

      &.btn-primary {
        @apply bg-blue-700 text-white;
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

@keyframes xExpand_Text {
  from {
    width: 0;
  }
  to {
    width: calc(2rem * 5.5);
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
</style>
