import type { ITask } from '~/shared/types/task'

export const tasksRepository = {
  async getAll(): Promise<ITask[]> {
    // В будущем здесь будет $fetch('/api/tasks')
    return [
      { id: 1, title: 'Fix Layout Bug', priority: 'high', status: 'todo', dueDate: '2025-02-20', createdAt: '2025-02-01' },
      { id: 2, title: 'Setup Nuxt UI Pro', priority: 'medium', status: 'done', dueDate: '2025-02-15', createdAt: '2025-02-01' },
      { id: 3, title: 'Write Documentation', priority: 'low', status: 'in-progress', dueDate: '2025-02-25', createdAt: '2025-02-01' },
    ]
  },
}
