import { createContext, useContext, useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { DataGrid } from '../../components/DataGrid'
import { PageTitle } from '../../components/PageTitle'
import { COUNTERPARTIES_COLUMNS } from '../../constants'
import { FormingReport } from '../Reports/components/FormingReport'
import { ExportCounterpartiesTable } from './components/ExportCounterpartiesTable'
import { AutocompleteOption } from '../../components/AutoComplete'
import { ReportsContext } from '../Reports/Reports'
import { useGetJournalsMutation } from '../../redux/api'
import { CounterpartiesForm } from '../../types'

export type ReportsCounterpartiesContextType = {
  clientsOptions: AutocompleteOption[]
}

export const ReportsCounterpartiesContext = createContext<ReportsCounterpartiesContextType>(
  {} as ReportsCounterpartiesContextType
)

export const ReportsCounterparties = () => {
  const { t } = useTranslation()
  const { clientsOptions, loadingClients } = useContext(ReportsContext)
  const [getJournals, { data: journalsData, isLoading: loadingJournals }] = useGetJournalsMutation()

  useEffect(() => {
    getJournals({})
  }, [])

  const handleSubmitReport = ({ client, date }: CounterpartiesForm) => {
    getJournals({
      clientId: client ? Number(client?.id) : undefined,
      startDate: date[0] || undefined,
      endDate: date[1] || undefined,
    })
  }

  const handleResetReport = () => {
    getJournals({})
  }

  return (
    <ReportsCounterpartiesContext.Provider value={{ clientsOptions }}>
      <Grid container flexDirection={'column'}>
        <PageTitle title={t('reports.counterparties.title')} />
        <FormingReport
          onSubmit={handleSubmitReport}
          clientsOptions={clientsOptions}
          onReset={handleResetReport}
          loading={loadingClients}
        />
        <Grid item>
          <DataGrid
            columns={COUNTERPARTIES_COLUMNS}
            rows={journalsData || []}
            loading={loadingJournals}
          />
        </Grid>
        <Box mt={2}>
          <ExportCounterpartiesTable />
        </Box>
      </Grid>
    </ReportsCounterpartiesContext.Provider>
  )
}
