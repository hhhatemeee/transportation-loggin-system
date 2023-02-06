import { Button, Grid } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { FormGenerator } from '../../components/FormGenerator'
import { PageTitle } from '../../components/PageTitle'
import { DictionaryServicesForm, GENERATOR_INPUT_TYPE } from '../../types'

export const DictionaryServices: FC = () => {
  const { t } = useTranslation()
  const methods = useForm<DictionaryServicesForm>({ defaultValues: { name: '', description: '' } })

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods

  const handleAdd = (data: DictionaryServicesForm) => {
    console.log(data)
  }

  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <PageTitle title={t('dictionaries.services.title')} />
      <Grid item flex={1} mb={1} alignSelf={'normal'}>
        <FormProvider {...methods}>
          <FormGenerator
            inputs={[
              {
                name: 'name',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                size: 'medium',
                labelOver: 'Наименование',
              },
              {
                name: 'description',
                inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                size: 'medium',
                labelOver: 'Описание',
              },
            ]}
          />
        </FormProvider>
      </Grid>
      <Grid item alignSelf={'flex-end'}>
        <Button variant='contained' onClick={handleSubmit(handleAdd)} disabled={!isDirty}>
          Добавить
        </Button>
      </Grid>
    </Grid>
  )
}
