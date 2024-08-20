import { SnackType } from './common'

export type SnackbarsState = {
  statusCode: number
  message?: string
  show: boolean
  type: SnackType
}

export type SnackPayload = Omit<SnackbarsState, 'show'>
