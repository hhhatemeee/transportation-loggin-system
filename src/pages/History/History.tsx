import { Grid } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '../../components/Button'
import { DataGrid } from '../../components/DataGrid'
import { FormGenerator } from '../../components/FormGenerator'
import { PageTitle } from '../../components/PageTitle'
import { HISTORY_COLUMNS } from '../../constants'
import { GENERATOR_INPUT_TYPE, HistoryForm } from '../../types'

export const History: FC = () => {
  const { t } = useTranslation()
  const methods = useForm<HistoryForm>({ defaultValues: { stateNumber: '' } })

  return (
    <Grid container flexDirection={'column'}>
      <PageTitle title={t('historyPage.title')} />
      <Grid container item spacing={1} alignItems={'center'} mb={1}>
        <Grid item flexGrow={1}>
          <FormProvider {...methods}>
            <FormGenerator
              inputs={[
                {
                  name: 'stateNumber',
                  inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                  size: 'medium',
                  labelOver: 'Гос. Номер',
                },
              ]}
            />
          </FormProvider>
        </Grid>
        <Grid item xs={1}>
          <Button variant='contained' sx={{ py: 1.5, mb: 1 }} fullWidth>
            Найти
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <DataGrid columns={HISTORY_COLUMNS} rows={[]} />
      </Grid>
    </Grid>
  )
}
