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
  console.log(task)
  return [
    [{ label: 'Edit', icon: 'i-heroicons-pencil-square-20-solid' }],
    [{ label: 'Delete', icon: 'i-heroicons-trash-20-solid', color: 'red' }],
  ]
}
</script>

<template>
  <div class="py-4 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <u-checkbox
        :model-value="task.status === 'done'"
        @update:model-value="emit('complete')"
      />
      <div>
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
      </div>
    </div>
    <u-dropdown-menu :items="taskActions(task)">
      <u-button
        color="neutral"
        variant="ghost"
        icon="i-heroicons-ellipsis-horizontal"
      />
    </u-dropdown-menu>
  </div>
</template>
