import { createContext, FC, useMemo } from 'react'
import { Grid, Button } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useAddCarMutation, useGetClientsQuery } from '../../redux/api'
import {
  DictionaryCarsForm,
  GENERATOR_INPUT_TYPE,
  GETCarType,
  GETClientType,
  MutationType,
  POSTCarType,
} from '../../types'
import { AutocompleteOption } from '../../components/AutoComplete'
import { FormGenerator } from '../../components/FormGenerator'
import { PageTitle } from '../../components/PageTitle'

export type DictionaryCarsContextType = {
  addCar: MutationType<POSTCarType, GETCarType>
  clients: GETClientType[]
  loadingClientsData: boolean
}

export const DictionaryCarsContext = createContext<DictionaryCarsContextType>(
  {} as DictionaryCarsContextType
)
const defaultValues: DictionaryCarsForm = { client: null, model: '', gosNum: '', sts: '' }

export const DictionaryCars: FC = () => {
  const { t } = useTranslation()

  const [addCar] = useAddCarMutation()
  const { data: clientsData, isLoading, isFetching } = useGetClientsQuery()

  const methods = useForm<DictionaryCarsForm>({ defaultValues })
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods
  const loadingClientsData = isLoading || isFetching
  const clientsOptions: AutocompleteOption[] = useMemo(
    () => clientsData?.map(client => ({ id: client.id, label: client.name })) || [],
    [clientsData]
  )

  const handleAdd = ({ client, ...data }: DictionaryCarsForm) => {
    if (client) {
      addCar({ ...data, clientId: Number(client.id) })
        .unwrap()
        .then(res => reset())
    }
  }

  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <PageTitle title={t('dictionaries.cars.title')} />
      <Grid container flexDirection={'column'} spacing={1}>
        <Grid item>
          <FormProvider {...methods}>
            <FormGenerator
              inputs={[
                {
                  name: 'gosNum',
                  inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                  labelOver: t('dictionaries.cars.form.gosNum.label'),
                },
                {
                  name: 'model',
                  inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                  labelOver: t('dictionaries.cars.form.model.label'),
                },
                {
                  name: 'sts',
                  inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                  labelOver: t('dictionaries.cars.form.sts.label'),
                },
                {
                  name: 'client',
                  inputType: GENERATOR_INPUT_TYPE.AUTOCOMPLETE,
                  labelOver: t('dictionaries.cars.form.client.label'),
                  autocompleteOptions: clientsOptions,
                  loading: loadingClientsData,
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
