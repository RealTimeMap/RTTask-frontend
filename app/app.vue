<script setup lang="ts">
useHead({
  link: [
    { rel: 'manifest', href: '/manifest.webmanifest' },
  ],
})

if (process.client) {
  const { $pwa } = useNuxtApp()
  onMounted(() => {
    if ($pwa?.install) {
      console.log('PWA Ready')
    }
  })
}
</script>

<template>
  <u-app>
    <nuxt-pwa-manifest />
    <u-main>
      <nuxt-layout>
        <nuxt-page />
      </nuxt-layout>
    </u-main>
  </u-app>
</template>
