import type { ITask } from '~/shared/types/task'
import { tasksRepository } from '~/shared/services/database/tasks.repository'

export interface TaskCard {
  label: string
  value: number | string
  icon?: string
  colorClass?: string
}

export const useTaskManagementStore = defineStore('task-management', () => {
  const tasks = ref<ITask[]>([])
  const isLoading = ref(false)

  const fetchTasks = async () => {
    isLoading.value = true
    try {
      tasks.value = await tasksRepository.getAll()
    }
    finally {
      isLoading.value = false
    }
  }

  // const stats = computed(() => ({
  //   total: tasks.value.length,
  //   completed: tasks.value.filter(t => t.status === 'done').length,
  //   todo: tasks.value.filter(t => t.status !== 'done').length,
  // }))

  const stats = computed<TaskCard[]>(() => {
    return [
      {
        label: 'Total Tasks',
        value: tasks.value.length,
        icon: 'i-heroicons-briefcase',
        colorClass: 'bg-blue-500',
      },
      {
        label: 'In Progress',
        value: tasks.value.filter(t => t.status !== 'done').length,
        icon: 'i-heroicons-arrow-path',
        colorClass: 'bg-amber-500',
      },
      {
        label: 'Completed',
        value: tasks.value.filter(t => t.status === 'done').length,
        icon: 'i-heroicons-check-badge',
        colorClass: 'bg-green-500',
      },
      {
        label: 'High Priority',
        value: tasks.value.filter(t => t.priority === 'high').length,
        icon: 'i-heroicons-exclamation-triangle',
        colorClass: 'bg-red-500',
      },
    ]
  })

  return {
    tasks,
    isLoading,
    fetchTasks,
    stats,

    totalTasks: computed(() => tasks.value.length),
    completedTasks: computed(() => tasks.value.filter(t => t.status === 'done').length),
  }
})
