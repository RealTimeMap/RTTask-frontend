import type { ComponentsDir } from '@nuxt/schema'
import { readdirSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

export function findFeatureDirs(relPath: string, exclude: string[] = []): ComponentsDir[] {
  const rootPath = fileURLToPath(new URL('../../', import.meta.url))
  const basePath = join(rootPath, relPath)
  const results: ComponentsDir[] = []

  const excludedPaths = exclude.map(p => join(basePath, p))

  function recurse(currentPath: string) {
    if (excludedPaths.some(p => currentPath.startsWith(p)))
      return

    let entries
    try {
      entries = readdirSync(currentPath, { withFileTypes: true })
    }
    catch { return }

    const hasIndex = entries.some(e => e.isFile() && (e.name === 'index.vue' || e.name === 'index.ts'))

    if (hasIndex) {
      const relToComponents = relative(basePath, currentPath)
      const componentName = relToComponents
        .split(sep)
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')

      results.push({
        path: currentPath,
        prefix: componentName,
        pattern: 'index.ts',
        extensions: ['.ts'],
      })
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        recurse(resolve(currentPath, entry.name))
      }
    }
  }

  recurse(basePath)
  return results
}
