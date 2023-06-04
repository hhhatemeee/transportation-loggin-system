export type GETReportType = {
  // TODO: исправить ДТО клиента и даты incomingDateMax на бэке
  count: number
  cost: number
  clientId: number
  incomingDateMin: string
  incomingDateMax: string
}

export type ReportParamsType = {
  clientId?: number
  startDate?: string
  endDate?: string
}
