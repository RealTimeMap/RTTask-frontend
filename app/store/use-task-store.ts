import { defineStore } from "pinia"

export type Priority = 'low' | 'medium' | 'high'
export type Status = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: string
  title: string
  priority: Priority
  status: Status
  dueDate: string
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([
    { id: '1', title: 'Fix navigation bug', priority: 'high', status: 'todo', dueDate: '2023-10-25' },
    { id: '2', title: 'Setup Nuxt UI', priority: 'medium', status: 'done', dueDate: '2023-10-24' },
    { id: '3', title: 'Write documentation', priority: 'low', status: 'in-progress', dueDate: '2023-10-26' },
  ])

  const stats = computed(() => ({
    total: tasks.value.length,
    completed: tasks.value.filter(t => t.status === 'done').length,
    pending: tasks.value.filter(t => t.status !== 'done').length,
    highPriority: tasks.value.filter(t => t.priority === 'high' && t.status !== 'done').length,
  }))

  return { tasks, stats }
})
