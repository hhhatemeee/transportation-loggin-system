import { LoginForm } from '../forms'
import { UserType } from './user'

export type POSTLoginType = LoginForm

export type ReturnLoginType = {
  success: boolean
  refreshToken: string
}

export type AuthState = {
  user: UserType | null
  isAuth: boolean
}

export type SetUserPayloadAction = {
  user: UserType
  token: string
}
