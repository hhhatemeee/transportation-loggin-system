import { Grid } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/Button'
import { FormGenerator } from '../../components/FormGenerator'

import { PageTitle } from '../../components/PageTitle'

export const DictionaryVehicles: FC = () => {
  const { t } = useTranslation()
  const methods = useForm()

  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <PageTitle title={t('dictionaries.vehicles.title')} />
      <Grid container item>
        <Grid item>
          <FormProvider {...methods}>
            <FormGenerator inputs={[]} />
          </FormProvider>
        </Grid>
        <Grid item>
          <Button></Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
