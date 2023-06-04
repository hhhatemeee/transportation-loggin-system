import { Grid } from '@mui/material'
import { GridColumns } from '@mui/x-data-grid'

import i18next from '../i18n'
import { Button } from '../components/Button'
import { GETJournalType } from '../types'
import { getConvertStatus } from '../helpers/getConvertStatus'

export const HISTORY_COLUMNS: GridColumns<GETJournalType> = [
  { field: 'waybill', headerName: i18next.t('historyPage.columns.waybill'), flex: 1, minWidth: 50 },
  {
    field: 'gosNum',
    headerName: i18next.t('historyPage.columns.gosNum'),
    flex: 1,
    minWidth: 50,
    valueGetter: params => params.row.car.gosNum,
  },
  {
    field: 'incomingDate',
    headerName: i18next.t('historyPage.columns.incomingDate'),
    flex: 1,
    minWidth: 50,
    valueGetter: params =>
      new Date(params.row.incomingDate).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }),
  },
  {
    field: 'services',
    headerName: i18next.t('historyPage.columns.services'),
    flex: 1,
    minWidth: 50,
    valueGetter: params =>
      params.row.provideServices
        .map(({ count, service }) => `${service.name} - ${count}`)
        .join(', '),
  },
  {
    field: 'status',
    headerName: i18next.t('historyPage.columns.status'),
    flex: 1,
    minWidth: 50,
    valueFormatter: params => getConvertStatus(params.value),
  },
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

export const ORDER_COLUMNS = ({
  onComplete,
  onCancel,
}: {
  onComplete: (id: number) => void
  onCancel: (id: number) => void
}): GridColumns<GETJournalType> => [
  {
    field: 'gusNum',
    headerName: 'Гос. номер',
    flex: 1,
    minWidth: 50,
    valueGetter: params => params.row.car.gosNum,
  },
  {
    field: 'incomingDate',
    headerName: 'Дата заезда',
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'outDate',
    headerName: 'Дата выезда',
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'waybill',
    headerName: 'Путевой лист',
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'nameDriver',
    headerName: 'ФИО водителя',
    flex: 1,
    minWidth: 50,
  },
  {
    field: 'done',
    headerName: '',
    flex: 2,
    minWidth: 50,
    renderCell: ({ row: { id } }) => (
      <Grid container justifyContent={'center'} flexWrap={'nowrap'}>
        <Button variant='contained' onClick={() => onComplete(id)}>
          {i18next.t('registrationCarPage.departure.table.completed')}
        </Button>
        <Button variant='contained' onClick={() => onCancel(id)} color='error' sx={{ ml: 2 }}>
          {i18next.t('registrationCarPage.departure.table.canceled')}
        </Button>
      </Grid>
    ),
  },
]
