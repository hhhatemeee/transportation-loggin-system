import { JOURNAL_STATUS } from '../../constants'
import { GETCarType } from './cars'

export type POSTJournalType = {
  incomingDate: string
  outDate: string
  carId: number
  waybill: string
  nameDriver: string
  status: JOURNAL_STATUS
  provideServices: ProvideServiceType[]
}

export type ProvideServiceType = {
  serviceId: number
  count: number
}

export type GETJournalType = {
  id: number
  outFactDate: string
  car: GETCarType
} & Omit<POSTJournalType, 'carId'>

export type GETJournalParams = {
  status?: JOURNAL_STATUS
  sts?: string
  gosNum?: string
  clientId?: string
  startDate?: string
  endDate?: string
}

export type UPDATEJournalStatusPayload = {
  status: JOURNAL_STATUS
  id: number
}

export type PUTJournalType = GETJournalType
