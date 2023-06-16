<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel
                class="dialog-panel"
            >
              <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ title }}
              </DialogTitle>
              <div class="mt-2 text-black">
                <slot></slot>
              </div>

              <div class="mt-4 text-right">
                <button
                    type="button"
                    class="dialog-btn"
                    @click="closeModal"
                >
                  {{ positiveText }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: () => false,
  },
  title: {
    type: String,
    default: () => '',
  },
  positiveText: {
    type: String,
    default: () => '好的',
  },
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped lang="scss">
.dialog-panel {
  @apply w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left
  align-middle shadow-2xl transition-all;
}
.dialog-btn {
  @apply inline-flex justify-center text-white rounded-md border border-transparent bg-orange-500 px-4 py-2
  text-sm font-medium hover:bg-orange-400;
}
</style>
