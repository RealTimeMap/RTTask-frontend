import type { NuxtHooks } from 'nuxt/schema'
import { findFeatureDirs } from './utils/scanner'

export const componentsHook: NuxtHooks['components:dirs'] = (dirs) => {
  dirs.length = 0
  const featureDirs = findFeatureDirs('app/components/01.ui')
  dirs.push(...featureDirs)
}
