import type { NuxtConfig } from 'nuxt/schema'

export const uiConfig: NuxtConfig = {
  css: [
    '~/assets/css/main.css',
    '~/assets/scss/main.scss',
  ],

  fonts: {
    providers: {
      fontshare: false,
    },
  },
}
