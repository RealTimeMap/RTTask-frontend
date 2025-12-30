<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'close'): void
}>()

function close() {
  emit('update:modelValue', false)
  emit('close')
}

watch(() => props.modelValue, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? 'hidden' : ''
  }
})

const panelRef = ref<HTMLElement | null>(null)
const touchStart = ref(0)
const touchOffset = ref(0)
const isDragging = ref(false)

function onTouchStart(e: TouchEvent) {
  if (panelRef.value && panelRef.value.scrollTop > 0)
    return

  touchStart.value = e.touches[0]?.clientY || 0
  isDragging.value = true
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging.value)
    return

  const currentY = e.touches[0]?.clientY || 0
  const delta = currentY - touchStart.value

  if (delta > 0) {
    touchOffset.value = delta
    if (e.cancelable)
      e.preventDefault()
  }
}

function onTouchEnd() {
  if (!isDragging.value)
    return
  isDragging.value = false

  if (touchOffset.value > 150) {
    close()
  }

  touchOffset.value = 0
}

const dragStyle = computed(() => ({
  transform: `translateY(${touchOffset.value}px)`,
  transition: isDragging.value ? 'none' : 'transform 0.3s ease-out',
}))
</script>

<template>
  <teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[100] flex justify-center items-end md:items-center md:justify-end pointer-events-none"
    >
      <transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="modelValue"
          class="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          @click="close"
        />
      </transition>

      <transition
        enter-active-class="transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)"
        enter-from-class="translate-y-full md:translate-y-0 md:translate-x-20 md:opacity-0"
        enter-to-class="translate-y-0 md:translate-x-0 md:opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="translate-y-0 md:translate-x-0 md:opacity-100"
        leave-to-class="translate-y-full md:translate-y-0 md:translate-x-20 md:opacity-0"
      >
        <div
          v-if="modelValue"
          ref="panelRef"
          class="
            pointer-events-auto relative flex flex-col bg-white dark:bg-gray-900 shadow-2xl overflow-hidden
            w-full h-[90vh] rounded-t-[2rem]
            md:h-[calc(100vh-2rem)] md:w-[600px] md:rounded-2xl md:mr-4
          "
          :style="dragStyle"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div class="md:hidden w-full flex justify-center pt-3 pb-1 shrink-0 cursor-grab active:cursor-grabbing">
            <div class="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
          </div>

          <div class="px-6 py-4 flex items-center justify-between shrink-0 border-b border-gray-100 dark:border-gray-800">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ title }}
            </h3>
            <button
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              @click="close"
            >
              <span class="i-lucide-x w-6 h-6 block" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto px-6 py-4">
            <slot />
          </div>

          <div
            v-if="$slots.footer"
            class="p-6 border-t border-gray-100 dark:border-gray-800 shrink-0"
          >
            <slot name="footer" />
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>
