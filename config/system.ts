import type { NuxtConfig } from 'nuxt/schema'

export const systemConfig: NuxtConfig = {
  devtools: {
    enabled: true,
    timeline: { enabled: true },
  },

  future: {
    compatibilityVersion: 5,
  },

  devServer: {
    host: '127.0.0.1',
  },

  experimental: {
    typedPages: true,
    viteEnvironmentApi: true,
    nitroAutoImports: true,
  },

  nitro: {
    compressPublicAssets: true,
  },

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
}
