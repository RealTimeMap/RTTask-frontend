<script setup lang="ts">
import type { Priority, Task } from '~/store/use-task-store'
import { useTaskStore } from '~/store/use-task-store'

const store = useTaskStore()

function getPriorityColor(priority: Priority) {
  switch (priority) {
    case 'high': return 'error'
    case 'medium': return 'warning'
    case 'low': return 'primary'
    default: return 'neutral'
  }
}

function taskActions(task: Task) {
  console.log(task)
  return [
    [{ label: 'Edit', icon: 'i-heroicons-pencil-square-20-solid' }],
    [{ label: 'Delete', icon: 'i-heroicons-trash-20-solid', color: 'red' }],
  ]
}
</script>

<template>
  <div class="space-y-8">
    <header class="flex justify-between items-end">
      <div>
        <h1 class="text-3xl font-bold dark:text-white">
          Welcome back, Chief
        </h1>
        <p class="mt-1">
          Here's what's happening with your projects today.
        </p>
      </div>
      <u-button
        icon="i-heroicons-plus"
        size="lg"
        label="Create Task"
      />
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <u-task-card
        label="Total Tasks"
        :value="store.stats.total"
        icon="i-heroicons-briefcase"
        color-class="bg-blue-500"
      />
      <u-task-card
        label="In Progress"
        :value="store.stats.pending"
        icon="i-heroicons-arrow-path"
        color-class="bg-amber-500"
      />
      <u-task-card
        label="Completed"
        :value="store.stats.completed"
        icon="i-heroicons-check-badge"
        color-class="bg-green-500"
      />
      <u-task-card
        label="High Priority"
        :value="store.stats.highPriority"
        icon="i-heroicons-exclamation-triangle"
        color-class="bg-red-500"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <u-card class="lg:col-span-2">
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-lg">
              Recent Tasks
            </h3>
            <u-button
              variant="ghost"
              label="View all"
              trailing-icon="i-heroicons-chevron-right"
            />
          </div>
        </template>

        <div class="divide-y divide-gray-200 dark:divide-gray-800">
          <div
            v-for="task in store.tasks"
            :key="task.id"
            class="py-4 flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <u-checkbox :model-value="task.status === 'done'" />
              <div>
                <p
                  class="font-medium"
                  :class="[task.status === 'done' ? 'line-through text-gray-400' : '']"
                >
                  {{ task.title }}
                </p>
                <div class="flex gap-2 mt-1">
                  <u-badge
                    size="xs"
                    :color="getPriorityColor(task.priority)"
                    variant="solid"
                  >
                    {{ task.priority }}
                  </u-badge>
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
        </div>
      </u-card>

      <div class="space-y-6">
        <u-card>
          <template #header>
            <h3 class="font-semibold">
              Weekly Goal
            </h3>
          </template>
          <div class="space-y-4">
            <div class="flex justify-between text-sm">
              <span>Tasks Completed</span>
              <span class="font-bold">{{ store.stats.completed }}/{{ store.stats.total }}</span>
            </div>
            <u-progress
              :value="(store.stats.completed / store.stats.total) * 100"
              color="primary"
            />
            <p class="text-xs text-gray-500">
              You're doing great! Keep it up to finish your sprint.
            </p>
          </div>
        </u-card>
      </div>
    </div>
  </div>
</template>
