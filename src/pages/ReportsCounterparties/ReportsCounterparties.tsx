import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { DataGrid } from '../../components/DataGrid'
import { PageTitle } from '../../components/PageTitle'
import { COUNTERPARTIES_COLUMNS } from '../../constants'
import { CounterpartiesForm } from '../../types'
import { FormingReport } from '../Reports/components/FormingReport'
import { ExportCounterpartiesTable } from './components/ExportCounterpartiesTable'

export const ReportsCounterparties = () => {
  const { t } = useTranslation()

  const handleSubmitReport = (data: CounterpartiesForm) => {
    console.log(data)
  }

  return (
    <Grid container flexDirection={'column'}>
      <PageTitle title={t('reports.counterparties.title')} />
      <FormingReport onSubmit={handleSubmitReport} />
      <Grid item>
        <DataGrid columns={COUNTERPARTIES_COLUMNS} rows={[]} />
      </Grid>
      <Box mt={2}>
        <ExportCounterpartiesTable />
      </Box>
    </Grid>
  )
}
