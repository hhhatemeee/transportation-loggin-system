import { JOURNAL_STATUS } from '../../constants'
import { GETCarType } from './cars'
import { GETServiceType } from './service'

export type POSTJournalType = {
  incomingDate: string
  outDate: string
  carId: number
  waybill: string
  nameDriver: string
  status: JOURNAL_STATUS
  provideServices: POSTProvideServiceType[]
}

export type POSTProvideServiceType = {
  serviceId: number
  count: number
}

export type GETProvideServiceType = {
  service: GETServiceType
  count: number
}

export type GETJournalType = {
  id: number
  outFactDate: string
  car: GETCarType
  provideServices: GETProvideServiceType[]
} & Omit<POSTJournalType, 'carId' | 'provideServices'>

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
