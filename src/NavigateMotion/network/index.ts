import { useEffect, useState } from 'react'

export function Network() {
  const isClient =
    typeof window !== 'undefined' && typeof navigator.onLine === 'boolean'

  const readOnlineStatus = isClient && window.navigator.onLine
  const [isOnline, setIsOnline] = useState(readOnlineStatus)

  useEffect(() => {
    function updateOnlineStatus() {
      setIsOnline(window.navigator.onLine)
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])
  return isOnline
}
