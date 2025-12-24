import type { ITask } from '~/shared/types/task'
import { defineStore } from 'pinia'
import { useWebNotifications } from '~/shared/composables/use-web-notification'
import { tasksRepository } from '~/shared/services/database/tasks.repository'

export interface TaskCard {
  label: string
  value: number | string
  icon?: string
  colorClass?: string
}

export const useTaskManagementStore = defineStore('task-management', () => {
  const tasks = ref<ITask[]>([])
  const { sendNotification, isSupported, getPermission } = useWebNotifications()
  const isLoading = ref(false)
  const toast = useToast()

  const fetchTasks = async () => {
    isLoading.value = true
    try {
      tasks.value = await tasksRepository.getAll()
    }
    finally {
      isLoading.value = false
    }
  }

  const toggleTaskStatus = async (taskId: number) => {
    const task = tasks.value.find(t => t.id === taskId)

    if (task) {
      const isCompleting = task.status !== 'done'
      task.status = isCompleting ? 'done' : 'todo'

      if (isCompleting) {
        toast.add({
          title: 'Task Completed!',
          description: `"${task.title}" has been moved to done.`,
          icon: 'i-lucide-check-circle',
          color: 'success',
          id: `task-${taskId}`,
          actions: [{
            label: 'Undo',
            onClick: async () => {
              task.status = 'todo'
            },
          }],
        })

        if (isSupported() && getPermission() === 'granted') {
          sendNotification('Task Completed! 🎉', {
            body: `You just finished: ${task.title}`,
            tag: 'task-done',
            silent: false,
          })
        }
      }
    }
  }
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
    toggleTaskStatus,
    stats,

    totalTasks: computed(() => tasks.value.length),
    completedTasks: computed(() => tasks.value.filter(t => t.status === 'done').length),
  }
})
