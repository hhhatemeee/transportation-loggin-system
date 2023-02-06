import { Grid } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Button } from '../../../../components/Button'
import { FormGenerator } from '../../../../components/FormGenerator'
import { ExportStatisticsForm, GENERATOR_INPUT_TYPE } from '../../../../types'

export const ExportStatisticsTable: FC = () => {
  const methods = useForm<ExportStatisticsForm>({
    defaultValues: { isExport: false },
  })
  const { t } = useTranslation()
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods

  const handleExport = (data: ExportStatisticsForm) => {
    console.log(data)
  }

  return (
    <Grid container alignItems={'baseline'} justifyContent={'space-between'}>
      <Grid item>
        <FormProvider {...methods}>
          <FormGenerator
            inputs={[
              {
                name: 'isExport',
                inputType: GENERATOR_INPUT_TYPE.CHECKBOX,
                labelPlacement: 'end',
                label: t('reports.statistics.form.export.label'),
                labelLimit: false,
              },
            ]}
          />
        </FormProvider>
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit(handleExport)} disabled={!isDirty} variant='outlined'>
          {t('reports.statistics.exportButton')}
        </Button>
      </Grid>
    </Grid>
  )
}
