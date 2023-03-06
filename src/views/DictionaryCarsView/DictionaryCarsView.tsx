import { Grid } from '@mui/material'
import { FC, useContext, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AutocompleteOption } from '../../components/AutoComplete'
import { Button } from '../../components/Button'
import { FormGenerator } from '../../components/FormGenerator'

import { PageTitle } from '../../components/PageTitle'
import { DictionaryCarsContext } from '../../pages/DictionaryCars'
import { DictionaryCarsForm, GENERATOR_INPUT_TYPE } from '../../types'

const defaultValues: DictionaryCarsForm = { client: null, model: '', gosNum: '', sts: '' }

export const DictionaryCarsView: FC = () => {
  const { t } = useTranslation()
  const { addCar, clients, loadingClientsData } = useContext(DictionaryCarsContext)
  const methods = useForm<DictionaryCarsForm>({ defaultValues })
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods
  const clientsOptions: AutocompleteOption[] = useMemo(
    () => clients.map(client => ({ id: client.id, label: client.name })),
    [clients]
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
