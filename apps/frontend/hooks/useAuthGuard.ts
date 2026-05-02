'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { useMeQuery } from '../store/api/authApi'
import { setUser, clearAuth } from '../store/slices/authSlice'

export function useAuthGuard() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { accessToken, user } = useSelector((s: RootState) => s.auth)
  // Skip the /me call if we already have the user object
  const { data, error, isLoading } = useMeQuery(undefined, { skip: !accessToken || !!user })

  useEffect(() => {
    if (!accessToken) { router.replace('/login'); return }
    if (data?.user) dispatch(setUser(data.user))
    if (error) { dispatch(clearAuth()); router.replace('/login') }
  }, [accessToken, data, error, router, dispatch])

  const resolvedUser = user || data?.user || null
  // loading = true only while we have a token but haven't resolved the user yet
  const loading = !!accessToken && !resolvedUser && isLoading

  return { user: resolvedUser, loading }
}
