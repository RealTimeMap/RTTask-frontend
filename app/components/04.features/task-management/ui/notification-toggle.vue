<script setup lang="ts">
import { useWebNotifications } from '~/composables/use-web-notification'

const { requestPermission, permission } = useWebNotifications()
const toast = useToast()

async function handleEnable() {
  const granted = await requestPermission()
  if (granted) {
    toast.add({ title: 'Notifications enabled!', color: 'success' })
  }
  else {
    toast.add({ title: 'Notifications blocked', description: 'Please enable them in browser settings', color: 'error' })
  }
}
</script>

<template>
  <div class="flex items-center justify-between p-2">
    <span class="text-sm font-medium">System Notifications</span>
    <u-button
      v-if="permission !== 'granted'"
      label="Enable"
      size="xs"
      color="neutral"
      @click="handleEnable"
    />
    <u-badge
      v-else
      color="success"
      variant="solid"
      size="xs"
    >
      Active
    </u-badge>
  </div>
</template>
