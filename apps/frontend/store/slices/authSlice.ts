import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  user: any | null
  accessToken: string | null
  refreshToken: string | null
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: any; accessToken: string; refreshToken: string }>) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      localStorage.setItem('accessToken', action.payload.accessToken)
      localStorage.setItem('refreshToken', action.payload.refreshToken)
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
    clearAuth: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    },
  },
})

export const { setCredentials, setUser, clearAuth } = authSlice.actions
export default authSlice.reducer
