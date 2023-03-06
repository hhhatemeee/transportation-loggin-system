export type POSTClientType = {
  name: string
  address: string
  email: string
  inn: string
  kpp: string
  rs: string
  bank: string
  bik: string
  ks: string
}

export type GETClientType = {
  id: number
} & POSTClientType

export type PUTClientType = GETClientType
