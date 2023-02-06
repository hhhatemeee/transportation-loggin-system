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
