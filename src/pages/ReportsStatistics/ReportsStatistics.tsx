import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { DataGrid } from '../../components/DataGrid'
import { PageTitle } from '../../components/PageTitle'
import { STATISTICS_COLUMNS } from '../../constants'
import { CounterpartiesForm } from '../../types'
import { FormingReport } from '../Reports/components/FormingReport'
import { ExportStatisticsTable } from './components/ExportStatisticsTable'

export const ReportsStatistics = () => {
  const { t } = useTranslation()

  const handleSubmitReport = (data: CounterpartiesForm) => {
    console.log(data)
  }

  return (
    <Grid container flexDirection={'column'}>
      <PageTitle title={t('reports.statistics.title')} />
      <FormingReport onSubmit={handleSubmitReport} />
      <Grid item>
        <DataGrid columns={STATISTICS_COLUMNS} rows={[]} />
      </Grid>
      <Box mt={2}>
        <ExportStatisticsTable />
      </Box>
    </Grid>
  )
}
