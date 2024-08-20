import { Grid, Button, IconButton } from '@mui/material'
import { RestartAlt } from '@mui/icons-material'
import { t } from 'i18next'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { FormGenerator } from '../../../../components/FormGenerator'
import { CounterpartiesForm, GENERATOR_INPUT_TYPE } from '../../../../types'
import { AutocompleteOption } from '../../../../components/AutoComplete'

type FormingReportProps = {
  onSubmit: (data: CounterpartiesForm) => void
  clientsOptions: AutocompleteOption[]
  onReset: () => void
  loading?: boolean
}

const defaultValues: CounterpartiesForm = { client: null, date: [null, null] }

export const FormingReport: FC<FormingReportProps> = ({
  onSubmit,
  clientsOptions,
  onReset,
  loading,
}) => {
  const methods = useForm<CounterpartiesForm>({
    defaultValues,
  })
  const { handleSubmit, reset } = methods

  const handleReset = () => {
    reset(defaultValues)
    onReset()
  }

  return (
    <Grid container spacing={2} alignItems={'center'} mb={1}>
      <Grid item flexGrow={1}>
        <FormProvider {...methods}>
          <FormGenerator
            isRow
            inputs={[
              {
                name: 'client',
                inputType: GENERATOR_INPUT_TYPE.AUTOCOMPLETE,
                labelOver: t('reports.counterparties.form.counterparties.label'),
                autocompleteOptions: clientsOptions,
                size: 'medium',
                loading,
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
      <Grid item mb={1}>
        <IconButton onClick={handleReset}>
          <RestartAlt />
        </IconButton>
      </Grid>
    </Grid>
  )
}
