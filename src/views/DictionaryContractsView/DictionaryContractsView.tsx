import { Grid } from '@mui/material'
import moment from 'moment'
import { FC, useContext, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '../../components/Button'
import { FormGenerator } from '../../components/FormGenerator'

import { PageTitle } from '../../components/PageTitle'
import { DictionaryContractsContext } from '../../pages/DictionaryContracts'
import { DictionaryContractsForm, GENERATOR_INPUT_TYPE } from '../../types'

const defaultValues: DictionaryContractsForm = {
  client: null,
  endDate: null,
  startDate: null,
  car: null,
}

export const DictionaryContractsView: FC = () => {
  const { t } = useTranslation()
  const { addContract, carsData, clientsData } = useContext(DictionaryContractsContext)
  const methods = useForm<DictionaryContractsForm>({ defaultValues })
  const {
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = methods
  const clientsOptions = useMemo(
    () => clientsData.map(({ id, name: label }) => ({ id, label })),
    [clientsData]
  )
  const carsOptions = useMemo(
    () => carsData.map(({ id, gosNum: label }) => ({ id, label })),
    [carsData]
  )

  const handleAdd = ({ client, car, endDate, startDate }: DictionaryContractsForm) => {
    console.log(endDate, startDate)
    if (client && car && endDate && startDate) {
      addContract({
        endDate,
        startDate,
        carId: Number(car.id),
        clientId: Number(client.id),
      })
        .unwrap()
        .then(res => reset())
    }
  }

  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <PageTitle title={t('dictionaries.contracts.title')} />
      <Grid container flexDirection={'column'} spacing={1}>
        <Grid item>
          <FormProvider {...methods}>
            <FormGenerator
              inputs={[
                {
                  name: 'startDate',
                  inputType: GENERATOR_INPUT_TYPE.DATE_TIME_PICKER,
                  labelOver: t('dictionaries.contracts.form.dateStart.label'),
                  rules: { required: true },
                },
                {
                  name: 'endDate',
                  inputType: GENERATOR_INPUT_TYPE.DATE_TIME_PICKER,
                  labelOver: t('dictionaries.contracts.form.dateEnd.label'),
                  rules: { required: true },
                },
                {
                  name: 'car',
                  inputType: GENERATOR_INPUT_TYPE.AUTOCOMPLETE,
                  labelOver: t('dictionaries.contracts.form.car.label'),
                  autocompleteOptions: carsOptions,
                  rules: { required: true },
                },
                {
                  name: 'client',
                  inputType: GENERATOR_INPUT_TYPE.AUTOCOMPLETE,
                  labelOver: t('dictionaries.contracts.form.client.label'),
                  autocompleteOptions: clientsOptions,
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
