import { LoginForm } from '../forms'
import { UserType } from './user'

export type POSTLoginType = LoginForm

const enum AUTH_RETURN {
  PREFIX = 'Bearer ',
}

export type ReturnLoginType = {
  refreshToken: string
  prefix: AUTH_RETURN.PREFIX
  accessToken: string
  accessExpiryDate: string
  expiryRefreshDate: string
}

export type AuthState = {
  user: UserType | null
  isAuth: boolean
}

export type SetUserPayloadAction = {
  user: UserType
  token: string
}

export type ReturnRefreshTokenType = ReturnLoginType
