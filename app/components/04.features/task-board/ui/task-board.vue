<script lang="ts" setup>
import type { ITask, TaskStatus } from '~/shared/types/task'
import { VueDraggable } from 'vue-draggable-plus'
import TaskRow from '~/components/03.domain/task/ui/task-row.vue'

export interface IBoardColumn {
  id: TaskStatus
  title: string
  tasks: ITask[]
}

const props = defineProps<{
  column: IBoardColumn
}>()

const emit = defineEmits<{
  (e: 'update:tasks', tasks: ITask[]): void
  (e: 'move', event: { taskId: number, status: TaskStatus, newIndex: number }): void
}>()

const columnTasks = computed({
  get: () => props.column.tasks,
  set: val => emit('update:tasks', val),
})

function onChange(event: any) {
  if (event.added) {
    emit('move', {
      taskId: event.added.element.id,
      status: props.column.id,
      newIndex: event.added.newIndex,
    })
  }
  if (event.moved) {
    emit('move', {
      taskId: event.moved.element.id,
      status: props.column.id,
      newIndex: event.moved.newIndex,
    })
  }
}
</script>

<template>
  <div class="flex flex-col w-80 shrink-0">
    <div class="flex items-center justify-between mb-3 px-1">
      <div class="flex items-center gap-2">
        <h3 class="font-semibold text-gray-700 dark:text-gray-200">
          {{ column.title }}
        </h3>
        <span class="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
          {{ column.tasks.length }}
        </span>
      </div>
      <u-button
        icon="i-heroicons-plus"
        color="neutral"
        variant="ghost"
        size="xs"
      />
    </div>

    <vue-draggable
      v-model="columnTasks"
      :animation="150"
      group="tasks"
      ghost-class="opacity-50"
      drag-class="cursor-grabbing"
      class="flex flex-col gap-3 h-full min-h-[150px] rounded-lg"
      @change="onChange"
    >
      <task-row
        v-for="task in columnTasks"
        :key="task.id"
        :task="task"
      />
    </vue-draggable>
  </div>
</template>
