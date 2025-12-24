/* eslint-disable node/prefer-global/process */
export function usePWA() {
  const { $pwa } = useNuxtApp()

  const isInstalled = computed(() => {
    if (!process.client)
      return false
    return window.matchMedia('(display-mode: standalone)').matches
  })

  const install = async () => {
    if ($pwa?.install) {
      await $pwa.install()
    }
  }

  return {
    isPWA: !!$pwa,
    isInstalled,
    install,
    updateAvailable: computed(() => $pwa?.needRefresh),
    refreshApp: () => $pwa?.updateServiceWorker(),
  }
}
