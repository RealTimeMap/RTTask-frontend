<script setup lang="ts">
import type { ITask } from '~/shared/types/task'

defineProps<{
  task: ITask
}>()

const emit = defineEmits<{
  (e: 'complete'): void
  (e: 'edit'): void
}>()

function taskActions(task: ITask) {
  return [
    [{ label: 'View', icon: 'i-heroicons-eye-20-solid', to: `/tasks/${task.id}` }],
    [{ label: 'Edit', icon: 'i-heroicons-pencil-square-20-solid' }],
    [{ label: 'Delete', icon: 'i-heroicons-trash-20-solid', color: 'error' }],
  ]
}
</script>

<template>
  <div class="py-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <u-checkbox
        class="relative z-10"
        :model-value="task.status === 'done'"
        @update:model-value="emit('complete')"
      />
      <div>
        <nuxt-link
          :to="`/tasks/${task.id}`"
        >
          <p
            class="font-medium"
            :class="[task.status === 'done' ? 'line-through text-gray-400' : '']"
          >
            {{ task.title }}
          </p>

          <div class="flex gap-2 mt-1">
            <u-priority-badge :priority="task.priority" />
            <span class="text-xs text-gray-400 flex items-center gap-1">
              <u-icon name="i-heroicons-calendar" /> {{ task.dueDate }}
            </span>
          </div>
        </nuxt-link>
      </div>
    </div>
    <u-dropdown-menu
      class="relative z-10"
      :items="taskActions(task)"
    >
      <u-button
        color="neutral"
        variant="ghost"
        icon="i-heroicons-ellipsis-horizontal"
      />
    </u-dropdown-menu>
  </div>
</template>
