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
