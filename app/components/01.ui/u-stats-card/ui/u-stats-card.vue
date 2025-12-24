<script setup lang="ts">
defineProps<{
  label: string
  value: number | string
  icon?: string
  colorClass?: string
}>()
</script>

<template>
  <u-card>
    <div class="flex items-center gap-4">
      <div
        class="p-3 rounded-lg flex items-center justify-center"
        :class="[colorClass]"
      >
        <u-icon
          :name="icon"
          class="w-6 h-6 text-white"
        />
      </div>
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {{ label }}
        </p>
        <p class="text-2xl font-bold">
          {{ value }}
        </p>
      </div>
    </div>
  </u-card>
</template>
