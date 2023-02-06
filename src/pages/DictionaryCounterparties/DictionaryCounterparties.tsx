import { Button, Grid } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FormGenerator } from '../../components/FormGenerator'

import { PageTitle } from '../../components/PageTitle'

export const DictionaryCounterparties: FC = () => {
  const { t } = useTranslation()
  const methods = useForm()

  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <PageTitle title={t('dictionaries.counterparties.title')} />
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
