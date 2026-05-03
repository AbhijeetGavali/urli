'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideToast } from '../store/slices/uiSlice'
import type { RootState } from '../store'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

const CONFIG = {
  success: { Icon: CheckCircle, color: 'text-emerald-400' },
  error:   { Icon: XCircle,     color: 'text-red-400' },
  info:    { Icon: Info,         color: 'text-blue-400' },
}

export function Toast() {
  const dispatch = useDispatch()
  const toast = useSelector((s: RootState) => s.ui.toast)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!toast) { setVisible(false); return }
    setVisible(true)
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(() => dispatch(hideToast()), 300)
    }, 3500)
    return () => clearTimeout(t)
  }, [toast, dispatch])

  if (!toast) return null
  const { Icon, color } = CONFIG[toast.type] ?? CONFIG.info

  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/10 bg-gray-900 text-white text-sm font-medium shadow-2xl max-w-xs transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <Icon size={16} className={`${color} shrink-0`} />
      <span className="text-gray-100 flex-1">{toast.message}</span>
      <button onClick={() => dispatch(hideToast())} className="text-gray-500 hover:text-gray-300 transition-colors shrink-0 ml-1">
        <X size={14} />
      </button>
    </div>
  )
}
