export type TaskPriority = 'low' | 'medium' | 'high'
export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface ITask {
  id: number
  title: string
  description?: string
  priority: TaskPriority
  status: TaskStatus
  dueDate: string
  createdAt: string
}
