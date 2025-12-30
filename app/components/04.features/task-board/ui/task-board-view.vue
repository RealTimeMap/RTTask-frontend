<script setup lang="ts">
import type { IBoardColumn } from './task-board.vue'
import type { ITask, TaskStatus } from '~/shared/types/task'
import { useTaskManagementStore } from '../../task-management/model/use-task-management'
import TaskBoard from './task-board.vue'

const columns = ref<IBoardColumn[]>([
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'in-progress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
])

const store = useTaskManagementStore()
onMounted(() => store.fetchTasks())

watch(store.tasks, (tasks) => {
  if (!tasks)
    return
  columns.value.forEach((col) => {
    col.tasks = tasks.filter(task => task.status === col.id)
  })
}, { immediate: true, deep: true })

async function updateColumnTasks(columnId: TaskStatus, tasks: ITask[]) {
  const col = columns.value.find(c => c.id === columnId)
  if (col)
    col.tasks = tasks
}

function handleMove(event: { taskId: number, status: TaskStatus, newIndex: number }) {
  const column = columns.value.find(col => col.id === event.status)
  if (column) {
    const taskIndex = column.tasks.findIndex(task => task.id === event.taskId)
    if (taskIndex !== -1) {
      column.tasks.splice(taskIndex, 1)
      column.tasks.splice(event.newIndex, 0, store.tasks.find(task => task.id === event.taskId) as ITask)
    }
  }
}
</script>

<template>
  <div class="flex h-full overflow-x-auto pb-4">
    <div class="flex gap-6 px-4 min-w-full">
      <task-board
        v-for="col in columns"
        :key="col.id"
        :column="col"
        @update:tasks="(tasks) => updateColumnTasks(col.id, tasks)"
        @move="handleMove"
      />
    </div>
  </div>
</template>
