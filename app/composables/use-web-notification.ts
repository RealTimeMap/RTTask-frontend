/* eslint-disable node/prefer-global/process */
export function useWebNotifications() {
  const isSupported = () => {
    if (!process.client)
      return false
    return 'Notification' in window && typeof window.Notification !== 'undefined'
  }

  const getPermission = () => {
    if (!isSupported())
      return 'denied'
    return Notification.permission
  }

  const requestPermission = async () => {
    if (!isSupported())
      return false

    try {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
    catch (e) {
      console.error('Notification permission request failed:', e)
      return false
    }
  }

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (!isSupported() || getPermission() !== 'granted') {
      console.warn('Notifications are not supported or blocked on this device')
      return
    }

    try {
      // eslint-disable-next-line no-new
      new Notification(title, {
        icon: '/icon.png',
        ...options,
      })
    }
    catch (e) {
      console.error('Standard notification failed, device might require Service Worker', e)
    }
  }

  return {
    isSupported,
    getPermission,
    requestPermission,
    sendNotification,
  }
}
