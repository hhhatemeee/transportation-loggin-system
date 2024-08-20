export type POSTContractType = {
  startDate: string
  endDate: string
  carId: number
  clientId: number
  prices?: POSTPriceInContractType[]
}

export type GETContractType = {
  id: number
} & POSTContractType

export type POSTPriceInContractType = {
  serviceId: number
  cost: number
}

export type PUTContractType = GETContractType
