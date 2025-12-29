<script setup lang="ts">
// import PwaInstallPrompt from '~/components/02.shared/pwa-manager/pwa-install-prompt.vue'
import LayoutDashboard from '~/components/06.layouts/layout-dashboard.vue'
</script>

<template>
  <layout-dashboard>
    <slot />
    <!-- <pwa-install-prompt /> -->
    <!-- <u-toaster /> -->
  </layout-dashboard>
</template>
