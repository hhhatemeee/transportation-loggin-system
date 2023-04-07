import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import i18next from 'i18next'
import { SnackbarsState, SnackPayload } from '../../types/snackbar'

const initialState: SnackbarsState = {
  message: 'Success',
  type: 'success',
  show: false,
  statusCode: 200,
}

const snackbarsSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showMessage: (state, action: PayloadAction<SnackPayload>) => {
      const payload = action.payload
      state.type = payload.type
      state.show = true

      if (payload.statusCode === 302) {
        state.statusCode = 302
        state.message = i18next.t('notifications.sessionExpired')
        location.reload()

        return
      }

      if (!payload.message) {
        state.message =
          payload.type === 'success'
            ? i18next.t('notifications.success')
            : i18next.t('notifications.error')
      } else {
        state.message = payload.message
      }

      state.statusCode = payload.statusCode
    },
    hideMessage: state => {
      state.show = false
    },
  },
})

export default snackbarsSlice.reducer
export const { showMessage, hideMessage } = snackbarsSlice.actions
