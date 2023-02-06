import { Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '../../components/Button'
import { DataGrid } from '../../components/DataGrid'
import { FormGenerator } from '../../components/FormGenerator'
import { HISTORY_COLUMNS } from '../../constants'
import { GENERATOR_INPUT_TYPE } from '../../types'

export const History: FC = () => {
  const { t } = useTranslation()
  const methods = useForm()

  return (
    <Grid container flexDirection={'column'}>
      <Grid item alignSelf={'center'} mb={5}>
        <Typography variant='h5' fontWeight={'600'}>
          {t('historyPage.title')}
        </Typography>
      </Grid>
      <Grid container item spacing={1} alignItems={'center'} mb={1}>
        <Grid item flexGrow={1}>
          <FormProvider {...methods}>
            <FormGenerator
              inputs={[
                {
                  name: 'stateNubmer',
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
