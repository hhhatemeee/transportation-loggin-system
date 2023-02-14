import { DictionaryServicesForm } from '../forms'

export type POSTServiceType = DictionaryServicesForm

export type GETServiceType = {
  id: number
} & POSTServiceType

export type PUTServiceType = GETServiceType
