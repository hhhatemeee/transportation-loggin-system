import i18next from 'i18next'

export const HISTORY_COLUMNS = [
  { field: 'number', headerName: i18next.t('historyPage.columns.number'), flex: 1, minWidth: 50 },
  {
    field: 'stateNumber',
    headerName: i18next.t('historyPage.columns.stateNumber'),
    flex: 1,
    minWidth: 50,
  },
  { field: 'date', headerName: i18next.t('historyPage.columns.date'), flex: 1, minWidth: 50 },
  { field: 'time', headerName: i18next.t('historyPage.columns.time'), flex: 1, minWidth: 50 },
  { field: 'service', headerName: i18next.t('historyPage.columns.service'), flex: 1, minWidth: 50 },
]

export const COUNTERPARTIES_COLUMNS = HISTORY_COLUMNS

export const STATISTICS_COLUMNS = [
  {
    field: 'counterpart',
    headerName: i18next.t('reports.statistics.columns.counterpart'),
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'dateStart',
    headerName: i18next.t('reports.statistics.columns.dateStart'),
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'dateEnd',
    headerName: i18next.t('reports.statistics.columns.dateEnd'),
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'allServices',
    headerName: i18next.t('reports.statistics.columns.allServices'),
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'amount',
    headerName: i18next.t('reports.statistics.columns.amount'),
    flex: 1,
    minWidth: 50,
  },
]
