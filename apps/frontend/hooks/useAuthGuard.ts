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

  const { data, error, isLoading } = useMeQuery(undefined, {
    skip: !accessToken || !!user,
  })

  useEffect(() => {
    // No token at all → redirect immediately
    if (!accessToken) { router.replace('/login'); return }
    if (data?.user) dispatch(setUser(data.user))
    if (error) { dispatch(clearAuth()); router.replace('/login') }
  }, [accessToken, data, error, router, dispatch])

  const resolvedUser = user || data?.user || null
  // Show loading spinner while token exists but user not yet resolved
  const loading = !!accessToken && !resolvedUser

  return { user: resolvedUser, loading }
}
