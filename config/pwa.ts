import type { NuxtConfig } from 'nuxt/schema'

export const pwaConfig: NuxtConfig['pwa'] = {
  registerType: 'autoUpdate',
  injectRegister: false,
  registerWebManifestInRouteRules: false,

  manifest: {
    name: 'RT-Task Manager',
    short_name: 'RT-Task',
    theme_color: '#6366f1',
    background_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait',
    scope: '/',
    start_url: '/',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  devOptions: {
    enabled: false,
    type: 'module',
    navigateFallback: '/',
  },
}
