<script setup lang="ts">
import LayoutDashboard from '~/components/06.layouts/layout-dashboard.vue'
</script>

<template>
  <layout-dashboard>
    <slot />
    <u-toaster />
  </layout-dashboard>
</template>
