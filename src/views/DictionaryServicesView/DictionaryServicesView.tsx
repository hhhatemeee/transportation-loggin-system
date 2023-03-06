import { Grid } from '@mui/material'
import { FC, useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/Button'
import { FormGenerator } from '../../components/FormGenerator'

import { PageTitle } from '../../components/PageTitle'
import { DictionaryServicesContext } from '../../pages/DictionaryServices'
import { DictionaryServicesForm, GENERATOR_INPUT_TYPE } from '../../types'

const defaultValues: DictionaryServicesForm = { description: '', name: '' }

export const DictionaryServicesView: FC = () => {
  const { t } = useTranslation()
  const { addService } = useContext(DictionaryServicesContext)
  const methods = useForm<DictionaryServicesForm>({ defaultValues })
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods

  const handleAdd = (data: DictionaryServicesForm) => {
    addService(data)
      .unwrap()
      .then(res => reset())
  }

  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <PageTitle title={t('dictionaries.services.title')} />
      <Grid container flexDirection={'column'} spacing={1}>
        <Grid item>
          <FormProvider {...methods}>
            <FormGenerator
              inputs={[
                {
                  name: 'name',
                  inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                  size: 'medium',
                  labelOver: t('dictionaries.services.form.name.label'),
                },
                {
                  name: 'description',
                  inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                  size: 'medium',
                  labelOver: t('dictionaries.services.form.description.label'),
                },
              ]}
            />
          </FormProvider>
        </Grid>
        <Grid item alignSelf={'flex-end'}>
          <Button variant='contained' onClick={handleSubmit(handleAdd)} disabled={!isDirty}>
            {t('buttons.addButton')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
