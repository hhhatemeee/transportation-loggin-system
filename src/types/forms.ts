import { AutocompleteOption } from '../components/AutoComplete'

export type STSForm = {
  code: string
}

export type StateNumberForm = STSForm

export type CounterpartiesForm = {
  counterparties: string
  date: string[]
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
