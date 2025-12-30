<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import NotificationToggle from '../04.features/task-management'

const isSidebarOpen = ref(true)

const items: NavigationMenuItem[] = [
  {
    label: 'Home',
    icon: 'i-lucide-house',
    to: '/',
  },
  // {
  //   label: 'Inbox',
  //   icon: 'i-lucide-inbox',
  //   badge: '4',
  //   to: '/inbox',
  // },
  {
    label: 'My Tasks',
    icon: 'i-lucide-clipboard-check',
    to: '/tasks',
  },
  // {
  //   label: 'Settings',
  //   icon: 'i-lucide-settings',
  //   defaultOpen: false,
  //   children: [
  //     { label: 'General', to: '/settings' },
  //     { label: 'Members', to: '/settings/members' },
  //   ],
  // },
]
</script>

<template>
  <u-dashboard-group>
    <u-dashboard-sidebar
      v-model="isSidebarOpen"
      collapsible
      resizable
    >
      <template #header="{ collapsed }">
        <div
          class="flex items-center gap-2 px-2 font-bold text-xl"
        >
          <u-icon
            name="i-lucide-check-circle"
            class="text-primary"
          />
          <span v-if="!collapsed">RT-Task</span>
        </div>
      </template>

      <template #default="{ collapsed }">
        <u-navigation-menu
          :collapsed="collapsed"
          :items="items"
          orientation="vertical"
        />

        <div class="flex-1" />

        <notification-toggle v-if="!collapsed" />
      </template>

      <template #footer="{ collapsed }">
        <u-button
          :avatar="{ src: 'https://avatars.githubusercontent.com/u/71484693?v=4' }"
          :label="collapsed ? undefined : 'HellSoon'"
          color="neutral"
          variant="ghost"
          class="w-full"
          :block="collapsed"
        />
      </template>
    </u-dashboard-sidebar>

    <u-dashboard-panel grow>
      <u-dashboard-navbar :title="$route.meta.title as string || 'Dashboard'">
        <template #right>
          <u-color-mode-button />
          <u-button
            icon="i-lucide-bell"
            color="neutral"
            variant="ghost"
          />
        </template>
      </u-dashboard-navbar>

      <div class="flex-1 overflow-y-auto p-6">
        <div class="max-w-6xl mx-auto">
          <slot />
        </div>
      </div>
    </u-dashboard-panel>
  </u-dashboard-group>
</template>
