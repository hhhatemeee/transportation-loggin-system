import { AutocompleteOption } from '../components/AutoComplete'

export type STSForm = {
  code: string
}

export type LoginForm = {
  username: string
  password: string
}

export type StateNumberForm = STSForm

export type HistoryForm = {
  stateNumber: string
}

export type CounterpartiesForm = {
  counterparties: string
  date: [string, string] | [null, string] | [string, null] | [null, null]
}

export type ExportCounterpartiesForm = {
  registry: boolean
  act: boolean
  score: boolean
}

export type ExportStatisticsForm = {
  isExport: boolean
}

export type DictionaryServicesForm = {
  name: string
  description: string
}

export type DictionaryVehiclesForm = {
  stateNumber: string
  model: string
  STS: string
  counterpart: AutocompleteOption | null
}

export type DictionaryContractsForm = {
  dateStart: string | null
  dateEnd: string | null
  vehicles: AutocompleteOption | null
  counterpart: AutocompleteOption | null
}

export type DictionaryCounterpartiesForm = {
  name: string
  payment: string
  address: string
  bank: string
  inn: string
  bik: string
  kpp: string
  ks: string
}

export type RegistrationOrderForm = {
  stateNumber: string
  carBrand: string
  counterpart: string
  dateStart: string | null
  dateEnd: string | null
  listNumber: string
  fio: string
  services: AutocompleteOption | null
  comment: string
}
