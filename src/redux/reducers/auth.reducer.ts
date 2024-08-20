import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import { COOKIES_DATA } from '../../constants'
import { AuthState, ReturnLoginType, UserType } from '../../types'

const initialState: AuthState = { user: null, isAuth: false }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, { payload }: PayloadAction<ReturnLoginType | null>) => {
      if (payload) {
        const { prefix, expiryRefreshDate, accessExpiryDate } = payload
        const accessToken = prefix + payload.accessToken
        const refreshToken = prefix + payload.refreshToken

        Cookies.set(COOKIES_DATA.ACCESS_TOKEN, accessToken, {
          sameSite: 'strict',
          expires: new Date(accessExpiryDate),
        })
        Cookies.set(COOKIES_DATA.REFRESH_TOKEN, refreshToken, {
          sameSite: 'strict',
          expires: new Date(expiryRefreshDate),
        })
        state.isAuth = true
        return
      }
      Cookies.remove(COOKIES_DATA.ACCESS_TOKEN)
      Cookies.remove(COOKIES_DATA.REFRESH_TOKEN)
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
