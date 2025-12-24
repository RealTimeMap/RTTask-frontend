<script setup lang="ts">
defineProps<{
  priority: 'low' | 'medium' | 'high'
}>()

const config = {
  high: { color: 'error', label: 'High' },
  medium: { color: 'warning', label: 'Medium' },
  low: { color: 'success', label: 'Low' },
} as const
</script>

<template>
  <u-badge
    :color="config[priority].color"
    variant="solid"
    size="xs"
  >
    {{ config[priority].label }}
  </u-badge>
</template>
