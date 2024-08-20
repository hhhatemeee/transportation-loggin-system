import { createContext, FC } from 'react'
import { FormProvider } from 'react-hook-form'
import { Grid, CircularProgress, Badge, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  GENERATOR_INPUT_TYPE,
  GETCarType,
  GETClientType,
  GETContractType,
  MutationType,
  POSTContractType,
} from '../../types'
import { FormGenerator } from '../../components/FormGenerator'
import { PageTitle } from '../../components/PageTitle'
import { ServicesDialog } from '../../components/ServicesDialog'
import { useDictionaryContracts } from './hooks'

export type DictionaryContractsContextType = {
  addContract: MutationType<POSTContractType, GETContractType>
  carsData: GETCarType[]
  clientsData: GETClientType[]
}

export const DictionaryContractsContext = createContext<DictionaryContractsContextType>(
  {} as DictionaryContractsContextType
)

export const DictionaryContracts: FC = () => {
  const { t } = useTranslation()
  const { data, state, handlers } = useDictionaryContracts()

  const { carsOptions, clientsOptions, methods, servicesLoading, badgeCount, servicesShow } = state
  const { onAddContract, onSetServicesShow } = handlers
  const { services } = data

  const {
    formState: { isDirty },
    handleSubmit,
  } = methods

  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <PageTitle title={t('dictionaries.contracts.title')} />
      <Grid container flexDirection={'column'} spacing={1}>
        <Grid item>
          {servicesLoading ? (
            <Grid item container justifyContent={'center'}>
              <CircularProgress size='3rem' />
            </Grid>
          ) : (
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
              <Grid item mb={2} mt={1}>
                <Badge badgeContent={badgeCount} color='primary'>
                  <Button variant='text' onClick={onSetServicesShow}>
                    {t('dictionaries.contracts.settingCostsBtn')}
                  </Button>
                </Badge>
                <ServicesDialog
                  isShow={servicesShow}
                  onClose={onSetServicesShow}
                  services={services || []}
                  title={t('dictionaries.contracts.dialog.title')}
                />
              </Grid>
            </FormProvider>
          )}
        </Grid>
        <Grid item alignSelf={'flex-end'}>
          <Button variant='contained' onClick={handleSubmit(onAddContract)} disabled={!isDirty}>
            {t('buttons.addButton')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
