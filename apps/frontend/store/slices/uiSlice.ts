import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  toast: { message: string; type: 'success' | 'error' | 'info' } | null
  modal: string | null
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: { toast: null, modal: null } as UIState,
  reducers: {
    showToast: (state, action: PayloadAction<UIState['toast']>) => { state.toast = action.payload },
    hideToast: (state) => { state.toast = null },
    openModal: (state, action: PayloadAction<string>) => { state.modal = action.payload },
    closeModal: (state) => { state.modal = null },
  },
})

export const { showToast, hideToast, openModal, closeModal } = uiSlice.actions
export default uiSlice.reducer
