import { AppDispatch } from '../../store'
import { setCredentials } from '../../store/slices/authSlice'
import { showToast } from '../../store/slices/uiSlice'

export function handleAuthSuccess(dispatch: AppDispatch, data: any, router: any, returnTo?: string) {
  dispatch(setCredentials({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken }))
  router.push(returnTo || '/dashboard')
}

export function handleAuthError(dispatch: AppDispatch, err: any) {
  const msg = err?.data?.error || 'Something went wrong'
  dispatch(showToast({ message: msg, type: 'error' }))
}

export const loginSchema = {
  email: { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } },
  password: { required: 'Password is required' },
}

export const registerSchema = {
  name: { required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } },
  email: { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } },
  password: { required: 'Password is required', minLength: { value: 8, message: 'Min 8 characters' } },
}
