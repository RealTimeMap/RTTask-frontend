<script setup lang="ts">
import ModuleAuthLogin from '~/components/05.modules/auth'

definePageMeta({
  layout: 'no-empty',
})

useSeoMeta({
  title: 'Login 🔐',
  description: 'Secure access to your workspace. Enter your credentials.',
  ogTitle: 'Welcome Back! 👋',
  ogDescription: 'Ready to crush some tasks today? Log in now.',
  themeColor: '#18181b',
})
</script>

<template>
  <module-auth-login />
</template>
