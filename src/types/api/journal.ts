export type POSTJournalType = {
  incomingDate: string
  outPlanDate: string
  carId: number
  waybill: string
  nameDriver: string
}

export type GETJournalType = {
  id: number
  outFactDate: string
} & POSTJournalType

export type PUTJournalType = GETJournalType
