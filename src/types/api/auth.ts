import { LoginForm } from '../forms'
import { UserType } from './user'

export type POSTLoginType = LoginForm

export type ReturnLoginType = {
  success: boolean
  token: string
}

export type AuthState = {
  user: UserType | null
  token: string | null
}

export type SetUserPayloadAction = {
  user: UserType
  token: string
}
