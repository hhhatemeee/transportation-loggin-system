export type POSTCarType = {
  gosNum: string
  sts: string
  model: string
  clientId: number
}

export type GETCarType = {
  id: number
} & POSTCarType

export type PUTCarType = GETCarType
