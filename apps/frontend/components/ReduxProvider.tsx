'use client'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { setCredentials } from '../store/slices/authSlice'

function Rehydrate() {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    if (accessToken && refreshToken) {
      store.dispatch(setCredentials({ user: null as any, accessToken, refreshToken }))
    }
  }, [])
  return null
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Rehydrate />
      {children}
    </Provider>
  )
}
