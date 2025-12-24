/* eslint-disable node/prefer-global/process */
export function useWebNotifications() {
  const isSupported = process.client && 'Notification' in window

  const requestPermission = async () => {
    if (!isSupported)
      return false

    if (Notification.permission === 'granted')
      return true

    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (!isSupported || Notification.permission !== 'granted')
      return

    const notification = new Notification(title, {
      icon: '/icon.png',
      badge: '/badge.png',
      ...options,
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }
  }

  return {
    isSupported,
    permission: process.client ? Notification.permission : 'default',
    requestPermission,
    sendNotification,
  }
}
