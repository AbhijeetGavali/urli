'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideToast } from '../store/slices/uiSlice'
import type { RootState } from '../store'

const CONFIG = {
  success: { icon: '✓', classes: 'bg-gray-900 border-gray-700', iconClass: 'text-emerald-400' },
  error:   { icon: '✕', classes: 'bg-gray-900 border-gray-700', iconClass: 'text-red-400' },
  info:    { icon: 'ℹ', classes: 'bg-gray-900 border-gray-700', iconClass: 'text-blue-400' },
}

export function Toast() {
  const dispatch = useDispatch()
  const toast = useSelector((s: RootState) => s.ui.toast)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!toast) { setVisible(false); return }
    setVisible(true)
    const t = setTimeout(() => { setVisible(false); setTimeout(() => dispatch(hideToast()), 300) }, 3500)
    return () => clearTimeout(t)
  }, [toast, dispatch])

  if (!toast) return null
  const { icon, classes, iconClass } = CONFIG[toast.type]

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border text-white text-sm font-medium shadow-2xl max-w-sm transition-all duration-300 ${classes} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <span className={`text-base font-bold shrink-0 ${iconClass}`}>{icon}</span>
      <span className="text-gray-100">{toast.message}</span>
      <button onClick={() => dispatch(hideToast())} className="ml-2 text-gray-500 hover:text-gray-300 shrink-0 text-lg leading-none">×</button>
    </div>
  )
}
