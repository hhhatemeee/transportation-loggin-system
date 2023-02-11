import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState, UserType } from '../../types'

const initialState: AuthState = { user: null, token: null }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      state.token = token
    },
    setUser: (state, { payload: { user } }: PayloadAction<{ user: UserType }>) => {
      state.user = user
    },
  },
})

export const { setToken, setUser } = authSlice.actions

export default authSlice.reducer
