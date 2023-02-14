import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import { AuthState, UserType } from '../../types'

const initialState: AuthState = { user: null, isAuth: false }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, { payload: token }: PayloadAction<string | null>) => {
      if (token) {
        Cookies.set('jwt', token, { sameSite: 'strict', expires: 1 / 144 })
        state.isAuth = true
        return
      }
      Cookies.remove('jwt')
      state.isAuth = false
    },
    setUser: (state, { payload: user }: PayloadAction<UserType>) => {
      state.isAuth = true
      state.user = user
    },
  },
})

export const { setLogin, setUser } = authSlice.actions

export default authSlice.reducer
