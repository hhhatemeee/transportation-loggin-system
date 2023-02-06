import { Grid } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '../../../../components/Button'
import { FormGenerator } from '../../../../components/FormGenerator'
import { ExportCounterpartiesForm, GENERATOR_INPUT_TYPE } from '../../../../types'

export const ExportCounterpartiesTable: FC = () => {
  const methods = useForm<ExportCounterpartiesForm>({
    defaultValues: { act: false, registry: false, score: false },
  })
  const { t } = useTranslation()
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods

  const handleExport = (data: ExportCounterpartiesForm) => {
    console.log(data)
  }

  return (
    <Grid container alignItems={'baseline'} justifyContent={'space-between'}>
      <Grid item>
        <FormProvider {...methods}>
          <FormGenerator
            inputs={[
              {
                name: 'registry',
                inputType: GENERATOR_INPUT_TYPE.CHECKBOX,
                labelPlacement: 'end',
                label: t('reports.counterparties.form.registry.label'),
                labelLimit: false,
              },
              {
                name: 'act',
                inputType: GENERATOR_INPUT_TYPE.CHECKBOX,
                labelPlacement: 'end',
                label: t('reports.counterparties.form.act.label'),
                labelLimit: false,
              },
              {
                name: 'score',
                inputType: GENERATOR_INPUT_TYPE.CHECKBOX,
                labelPlacement: 'end',
                label: t('reports.counterparties.form.score.label'),
              },
            ]}
          />
        </FormProvider>
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit(handleExport)} disabled={!isDirty} variant='outlined'>
          {t('reports.counterparties.exportButton')}
        </Button>
      </Grid>
    </Grid>
  )
}
