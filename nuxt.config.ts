import { readdirSync } from 'node:fs'
import { basename, resolve } from 'node:path'

// --- Хелпер для поиска директорий с index.vue ---
function findFeatureDirs(startPath: string): any[] {
  const basePath = resolve(__dirname, startPath)
  const results: any[] = []

  // Рекурсивная функция для обхода папок
  function recurse(currentPath: string) {
    const entries = readdirSync(currentPath, { withFileTypes: true })
    const hasIndexTs = entries.some(entry => entry.isFile() && entry.name === 'index.ts')

    if (hasIndexTs) {
      const componentName = basename(currentPath)
      results.push({
        path: currentPath,
        prefix: componentName,
        pattern: 'index.ts',
        extensions: ['.ts'],
      })
    }

    // Продолжаем поиск во вложенных папках
    for (const entry of entries) {
      if (entry.isDirectory()) {
        recurse(resolve(currentPath, entry.name))
      }
    }
  }

  try {
    recurse(basePath)
  }
  catch (error) {
    console.warn(`Could not scan directory: ${basePath}`, error)
  }

  return results
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true,
  },
  modules: [
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
  ],
  css: [
    '~/assets/css/main.css',
    '~/assets/scss/main.scss',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_variables.scss" as *;
            @use "~/assets/scss/_mixins.scss" as *;
          `,
        },
      },
    },
  },

  pwa: {
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
  },

  future: {
    compatibilityVersion: 5,
  },

  components: [
    {
      path: '~/components/01.ui',
      pathPrefix: false,
    },
  ],

  fonts: {
    providers: {
      fontshare: false,
    },
  },

  devServer: {
    host: '127.0.0.1', // лечение проблем с подключением к локальному хосту на винде
  },

  hooks: {
    'components:dirs': function (dirs) {
      dirs.length = 0
      const featureDirs = findFeatureDirs('app/components/01.ui')
      dirs.push(...featureDirs)
    },
  },
})
