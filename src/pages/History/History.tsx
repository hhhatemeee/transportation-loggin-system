import { Grid } from '@mui/material'
import { FC, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '../../components/Button'
import { DataGrid } from '../../components/DataGrid'
import { FormGenerator } from '../../components/FormGenerator'
import { PageTitle } from '../../components/PageTitle'
import { HISTORY_COLUMNS, JOURNAL_STATUS } from '../../constants'
import { GENERATOR_INPUT_TYPE, HistoryForm } from '../../types'
import { useGetJournalQuery } from '../../redux/api'

export const History: FC = () => {
  const { t } = useTranslation()
  const [findGosNum, setFindGosNum] = useState('')
  const methods = useForm<HistoryForm>({ defaultValues: { gosNum: '' } })
  const { handleSubmit } = methods
  const {
    data: journalsHistory,
    isLoading,
    isFetching,
  } = useGetJournalQuery({
    gosNum: findGosNum || undefined,
    status: JOURNAL_STATUS.COMPLETE,
  })
  const loading = isLoading || isFetching

  const handleSearch = ({ gosNum }: { gosNum: string }) => {
    setFindGosNum(gosNum)
  }

  return (
    <Grid container flexDirection={'column'}>
      <PageTitle title={t('historyPage.title')} />
      <Grid container item spacing={1} alignItems={'center'} mb={1}>
        <Grid item flexGrow={1}>
          <FormProvider {...methods}>
            <FormGenerator
              inputs={[
                {
                  name: 'gosNum',
                  inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                  size: 'medium',
                  labelOver: 'Гос. Номер',
                },
              ]}
            />
          </FormProvider>
        </Grid>
        <Grid item xs={1}>
          <Button
            variant='contained'
            sx={{ py: 1.5, mb: 1 }}
            fullWidth
            onClick={handleSubmit(handleSearch)}
          >
            Найти
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <DataGrid columns={HISTORY_COLUMNS} rows={journalsHistory || []} loading={loading} />
      </Grid>
    </Grid>
  )
}
