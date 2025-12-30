<script setup lang="ts">
import TaskRow from '~/components/03.domain/task/ui/task-row.vue'
import { useTaskManagementStore } from '~/components/04.features/task-management/model/use-taks-management'

const store = useTaskManagementStore()
onMounted(() => store.fetchTasks())
</script>

<template>
  <div class="space-y-6">
    <header class="flex justify-between items-end">
      <div>
        <h1 class="text-3xl font-bold dark:text-white">
          Welcome back, Hellsoon
        </h1>
        <p class="mt-1">
          Here's what's happening with your projects today.
        </p>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <u-stats-card
        v-for="(val, key) in store.stats"
        :key="key"
        :label="val.label"
        :value="val.value"
        :icon="val.icon"
        :color-class="val.colorClass"
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <u-card
        class="lg:col-span-2"
      >
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

        <div
          v-if="store.isLoading"
          class="space-y-2"
        >
          <u-skeleton
            v-for="i in 3"
            :key="i"
            class="h-12 w-full"
          />
        </div>
        <div
          v-else
          class="divide-y divide-gray-100 dark:divide-gray-800"
        >
          <task-row
            v-for="task in store.tasks"
            :key="task.id"
            :task="task"
            @click="navigateTo(`/tasks/${task.id}`)"
            @complete="store.toggleTaskStatus(task.id)"
          />
        </div>
      </u-card>

      <div class="space-y-6">
        <u-card>
          <template #header>
            <h3 class="font-semibold">
              Monthly goal
            </h3>
          </template>
          <div class="space-y-4">
            <div class="flex justify-between text-sm">
              <span>Tasks Completed</span>
              <span class="font-bold">{{ store.completedTasks }}/{{ store.totalTasks }}</span>
            </div>
            <u-progress
              v-model="store.completedTasks"
              :max="store.totalTasks"
              color="primary"
            />
            <p class="text-xs text-gray-500">
              You're doing great! Keep it up!
            </p>
          </div>
        </u-card>
      </div>
    </div>
  </div>
</template>
