// App.tsx yoki Layout.tsx da ishlating
import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'

export const AppInitializer = () => {
  const refreshToken = useAuthStore((state) => state.refreshToken)
  const fetchAccessToken = useAuthStore((state) => state.fetchAccessToken)

  useEffect(() => {
    if (refreshToken) {
      fetchAccessToken()
    }
  }, [refreshToken, fetchAccessToken])

  return null
}
