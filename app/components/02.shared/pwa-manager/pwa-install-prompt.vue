<script setup lang="ts">
import { usePWA } from '~/shared/composables/use-pwa'

const {
  isInstalled,
  install,
  updateAvailable,
  refreshApp,
} = usePWA()
const showPrompt = ref(false)
const toast = useToast()

watch(updateAvailable, (isAvailable) => {
  if (isAvailable) {
    toast.add({
      title: 'Update Available',
      description: 'A new version is ready to improve your experience.',
      icon: 'i-lucide-refresh-cw',
      color: 'primary',
      id: 'pwa-update',
      actions: [{
        label: 'Refresh Now',
        color: 'primary',
        onClick: refreshApp,
      }],
    })
  }
}, { immediate: true })

onMounted(() => {
  // Показываем предложение установки только если не установлено
  if (!isInstalled.value) {
    setTimeout(() => showPrompt.value = true, 3000)
  }
})

async function handleInstall() {
  await install()
  showPrompt.value = false
}
</script>

<template>
  <transition name="slide-up">
    <div
      v-if="showPrompt && !isInstalled"
      class="fixed bottom-4 right-4 z-50 w-full max-w-sm px-4 md:px-0"
    >
      <u-alert
        icon="i-lucide-download"
        color="primary"
        variant="subtle"
      >
        <template #title>
          Install RT-Task
        </template>

        <template #description>
          Add to home screen for better experience.
        </template>

        <template #actions>
          <div class="flex items-center gap-2">
            <u-button
              label="Install"
              size="xs"
              color="primary"
              @click="handleInstall"
            />
            <u-button
              icon="i-lucide-x"
              size="xs"
              color="neutral"
              variant="ghost"
              @click="showPrompt = false"
            />
          </div>
        </template>
      </u-alert>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
