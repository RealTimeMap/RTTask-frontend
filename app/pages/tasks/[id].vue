<script setup lang="ts">
import UModalRoute from '~/components/01.ui/u-modal-route'

const route = useRoute()
const taskId = computed(() => route.params.id as string)

useSeoMeta({ title: `Task #${taskId.value}`, robots: 'noindex' })
</script>

<template>
  <u-modal-route
    return-to="/tasks"
    title="Task Details"
  >
    <!-- [TODO] -->
    <feature-task-details :task-id="taskId" />
  </u-modal-route>
</template>
