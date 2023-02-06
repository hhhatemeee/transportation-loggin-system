import { Grid, Button } from '@mui/material'
import { t } from 'i18next'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { FormGenerator } from '../../../../components/FormGenerator'
import { CounterpartiesForm, GENERATOR_INPUT_TYPE } from '../../../../types'

type FormingReportProps = {
  onSubmit: (data: CounterpartiesForm) => void
}
export const FormingReport: FC<FormingReportProps> = ({ onSubmit }) => {
  const methods = useForm<CounterpartiesForm>()
  const { handleSubmit } = methods

  return (
    <Grid container spacing={2} alignItems={'center'} mb={1}>
      <Grid item flexGrow={1}>
        <FormProvider {...methods}>
          <FormGenerator
            isRow
            inputs={[
              {
                name: 'counterparties',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                labelOver: t('reports.counterparties.form.counterparties.label'),
                size: 'medium',
              },
              {
                name: 'date',
                labelRange: [
                  t('reports.counterparties.form.date.labelStart'),
                  t('reports.counterparties.form.date.labelEnd'),
                ],
                inputType: GENERATOR_INPUT_TYPE.DATE_RANGE_PICKER,
                size: 'medium',
              },
            ]}
          />
        </FormProvider>
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit(onSubmit)} variant='contained' sx={{ py: 1.5, mb: 1 }}>
          {t('reports.counterparties.submitButton')}
        </Button>
      </Grid>
    </Grid>
  )
}
