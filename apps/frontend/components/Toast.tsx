'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideToast } from '../store/slices/uiSlice'
import type { RootState } from '../store'

export function Toast() {
  const dispatch = useDispatch()
  const toast = useSelector((s: RootState) => s.ui.toast)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => dispatch(hideToast()), 3500)
    return () => clearTimeout(t)
  }, [toast, dispatch])

  if (!toast) return null

  const colors = { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-blue-600' }
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-white text-sm font-medium shadow-lg ${colors[toast.type]} transition-all`}>
      {toast.message}
    </div>
  )
}
