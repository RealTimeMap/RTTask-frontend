import { componentsHook } from './config/components'
import { modulesConfig } from './config/modules'
import { pwaConfig } from './config/pwa'
import { systemConfig } from './config/system'
import { uiConfig } from './config/ui'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  ...systemConfig,
  modules: modulesConfig,
  ...uiConfig,

  pwa: pwaConfig,

  hooks: {
    'components:dirs': componentsHook,
  },
})
