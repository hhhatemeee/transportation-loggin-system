import { GETClientType } from './client'

export type POSTCarType = {
  gosNum: string
  sts: string
  model: string
  clientId: number
}

export type GETCarType = {
  id: number
  client: GETClientType
} & Omit<POSTCarType, 'clientId'>

export type PUTCarType = POSTCarType & { id: number }
