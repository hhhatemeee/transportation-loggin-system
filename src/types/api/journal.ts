import { JOURNAL_STATUS } from '../../constants'

export type POSTJournalType = {
  incomingDate: string
  outDate: string
  carId: number
  waybill: string
  nameDriver: string
  status: JOURNAL_STATUS
}

export type GETJournalType = {
  id: number
  outFactDate: string
} & POSTJournalType

export type PUTJournalType = GETJournalType
