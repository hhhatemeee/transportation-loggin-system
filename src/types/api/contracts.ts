export type POSTContractType = {
  startDate: string
  endDate: string
  carId: number
  clientId: number
}

export type GETContractType = {
  id: number
} & POSTContractType

export type PUTContractType = GETContractType
