import { ChevronLeft } from '@mui/icons-material'
import { Grid, IconButton, Typography } from '@mui/material'
import { FC, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Location, useLocation, useNavigate, useParams } from 'react-router-dom'

import { AppLoader } from '../../components/AppLoader'
import { Button } from '../../components/Button'
import { FormGenerator } from '../../components/FormGenerator'
import { ROUTES } from '../../constants'
import { useGetClientByIdQuery, useGetServicesQuery } from '../../redux/api'
import { useAddJournalMutation } from '../../redux/api/journal.api'
import { GENERATOR_INPUT_TYPE, GETCarType, RegistrationOrderForm } from '../../types'

const defaultValues: RegistrationOrderForm = {
  stateNumber: '',
  carBrand: '',
  counterpart: '',
  incomingDate: null,
  outPlanDate: null,
  waybill: '',
  nameDriver: '',
  services: null,
  comment: '',
}

type OrderLocationType = {
  state: GETCarType
} & Omit<Location, 'state'>

export const RegistrationOrder: FC = () => {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const {
    state: { model, clientId, id: carId },
  } = useLocation() as OrderLocationType
  const { t } = useTranslation()
  const methods = useForm<RegistrationOrderForm>({ defaultValues })
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods
  const handleBack = () => navigate(ROUTES.REGISTRATION_ARRIVAL)
  const {
    data: client,
    isLoading: isLoadingClient,
    isFetching: isFetchingClient,
  } = useGetClientByIdQuery(clientId, {
    skip: !clientId,
  })
  const loadingClient = isLoadingClient || isFetchingClient
  const { data: services, isLoading: isLoadingService } = useGetServicesQuery()
  const [registrateOrder] = useAddJournalMutation()

  const servicesOptions = useMemo(
    () => services?.map(({ id, name }) => ({ id, label: name })) || [],
    [services]
  )

  const handleRegistration = ({
    incomingDate,
    outPlanDate,
    nameDriver,
    waybill,
  }: RegistrationOrderForm) => {
    if (incomingDate && outPlanDate) {
      // TODO: Исправить ДТО на бэке, не хватает двух полей
      registrateOrder({ carId, incomingDate, outPlanDate, nameDriver, waybill }).then(() => reset())
    }
  }

  if (loadingClient) {
    return <AppLoader />
  }

  return (
    <Grid container flexDirection={'column'} alignItems={'center'}>
      <Grid item container justifyItems={'center'} alignItems={'center'} mb={4}>
        <Grid item mr={2}>
          <IconButton onClick={handleBack}>
            <ChevronLeft />
          </IconButton>
        </Grid>
        <Grid justifyItems={'center'}>
          <Typography variant='h5' fontWeight={'600'}>
            {t('registrationCarPage.order.title')}
          </Typography>
        </Grid>
      </Grid>
      <Grid item mb={1}>
        <FormProvider {...methods}>
          <FormGenerator
            inputs={[
              {
                inputs: [
                  {
                    inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                    name: 'stateNumber',
                    labelOver: t('registrationCarPage.order.form.stateNumber'),
                    value: code,
                    disabled: true,
                  },
                  {
                    inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                    name: 'carBrand',
                    labelOver: t('registrationPage.order.form.carBrand'),
                    disabled: true,
                    value: model,
                  },
                  {
                    inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                    name: 'counterpart',
                    labelOver: t('registrationPage.order.form.counterpart'),
                    disabled: true,
                    value: client?.name,
                  },
                ],
                name: 'row1',
              },
              {
                inputs: [
                  {
                    inputType: GENERATOR_INPUT_TYPE.DATE_TIME_PICKER,
                    name: 'incomingDate',
                    labelOver: t('registrationPage.order.form.incomingDate'),
                  },
                  {
                    inputType: GENERATOR_INPUT_TYPE.DATE_TIME_PICKER,
                    name: 'outPlanDate',
                    labelOver: t('registrationPage.order.form.outPlanDate'),
                  },
                ],
                name: 'row2',
              },
              {
                inputs: [
                  {
                    inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                    name: 'waybill',
                    labelOver: t('registrationPage.order.form.waybill'),
                  },
                  {
                    inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                    name: 'nameDriver',
                    labelOver: t('registrationPage.order.form.nameDriver'),
                  },
                ],
                name: 'row3',
              },
              {
                inputType: GENERATOR_INPUT_TYPE.AUTOCOMPLETE,
                name: 'services',
                labelOver: t('registrationPage.order.form.services'),
                autocompleteOptions: servicesOptions,
                loading: isLoadingService,
              },
              {
                inputType: GENERATOR_INPUT_TYPE.TEXTAREA,
                name: 'comment',
                labelOver: t('registrationCarPage.order.form.comment'),
              },
            ]}
          />
        </FormProvider>
      </Grid>
      <Grid item alignSelf={'flex-end'}>
        <Button variant='contained' onClick={handleSubmit(handleRegistration)} disabled={!isDirty}>
          {t('registrationCarPage.order.submitButton')}
        </Button>
      </Grid>
    </Grid>
  )
}
