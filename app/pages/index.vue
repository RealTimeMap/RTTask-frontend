<script setup lang="ts">
import dashboardHub from '~/components/05.modules/dashboard-hub'

definePageMeta({ title: 'Home page' })

useSeoMeta({
  title: () => `Dashboard • ${new Date().toLocaleDateString()}`,
  description: 'Manage your workflow.',

  robots: 'noindex, nofollow',

  ogTitle: '🔒 Private Workspace',
  ogDescription: 'Login required to view these tasks.',
  themeColor: '#00DC82',
})
</script>

<template>
  <dashboard-hub />
</template>
