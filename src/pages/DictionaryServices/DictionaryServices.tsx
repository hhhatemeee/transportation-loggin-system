import { createContext, FC } from 'react'
import { Grid, Button } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useAddServiceMutation } from '../../redux/api'
import {
  DictionaryServicesForm,
  GENERATOR_INPUT_TYPE,
  GETServiceType,
  MutationType,
  POSTServiceType,
} from '../../types'
import { FormGenerator } from '../../components/FormGenerator'
import { PageTitle } from '../../components/PageTitle'

export type DictionaryServicesContextType = {
  addService: MutationType<POSTServiceType, GETServiceType>
}

export const DictionaryServicesContext = createContext<DictionaryServicesContextType>(
  {} as DictionaryServicesContextType
)

const defaultValues: DictionaryServicesForm = { description: '', name: '' }

export const DictionaryServices: FC = () => {
  const { t } = useTranslation()
  const [addService] = useAddServiceMutation()

  const methods = useForm<DictionaryServicesForm>({ defaultValues })
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods

  const handleAdd = (data: DictionaryServicesForm) => {
    addService(data)
      .unwrap()
      .then(() => reset())
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
