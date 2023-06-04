import { useContext, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { DataGrid } from '../../components/DataGrid'
import { PageTitle } from '../../components/PageTitle'
import { STATISTICS_COLUMNS } from '../../constants'
import { CounterpartiesForm } from '../../types'
import { FormingReport } from '../Reports/components/FormingReport'
import { ExportStatisticsTable } from './components/ExportStatisticsTable'
import { ReportsContext } from '../Reports/Reports'
import { useGetReportMutation } from '../../redux/api'

export const ReportsStatistics = () => {
  const { t } = useTranslation()
  const { clientsOptions, loadingClients } = useContext(ReportsContext)
  const [getReport, { data: reportData, isLoading: loadingReport }] = useGetReportMutation()

  useEffect(() => {
    getReport({})
  }, [])

  const handleSubmitReport = ({ client, date }: CounterpartiesForm) => {
    getReport({
      clientId: client ? Number(client?.id) : undefined,
      startDate: date[0] || undefined,
      endDate: date[1] || undefined,
    })
  }
  const handleResetReport = () => {
    getReport({})
  }

  return (
    <Grid container flexDirection={'column'}>
      <PageTitle title={t('reports.statistics.title')} />
      <FormingReport
        onReset={handleResetReport}
        clientsOptions={clientsOptions}
        loading={loadingClients}
        onSubmit={handleSubmitReport}
      />
      <Grid item>
        <DataGrid
          getRowId={value => value.clientId}
          columns={STATISTICS_COLUMNS}
          rows={reportData || []}
          loading={loadingReport}
        />
      </Grid>
      <Box mt={2}>
        <ExportStatisticsTable />
      </Box>
    </Grid>
  )
}
