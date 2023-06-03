import { ChevronLeft } from '@mui/icons-material'
import { Grid, IconButton, Typography } from '@mui/material'
import { FC } from 'react'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { AppLoader } from '../../components/AppLoader'
import { Button } from '../../components/Button'
import { FormGenerator } from '../../components/FormGenerator'
import { usePrompt } from '../../hooks'
import { GENERATOR_INPUT_TYPE } from '../../types'
import { useRegistrationOrder } from './hooks/useRegistrationOrder'

export const RegistrationOrder: FC = () => {
  const { t } = useTranslation()
  const { data, state, handlers } = useRegistrationOrder()
  const navigate = useNavigate()

  const { client, methods, foundCar } = data
  const { isDirty, loadingClient, loadingService, servicesOptions } = state
  const { handleBack, handleRegistration, handleSubmit } = handlers

  usePrompt({ when: isDirty })

  if (loadingClient) {
    return <AppLoader />
  }

  // if (!foundCar) {
  //   navigate(ROUTES.REGISTRATION_ARRIVAL)
  //   return null
  // }

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
                    name: 'gosNum',
                    labelOver: t('registrationPage.order.form.gosNum'),
                    value: foundCar?.gosNum,
                    disabled: true,
                  },
                  {
                    inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                    name: 'carBrand',
                    labelOver: t('registrationPage.order.form.carBrand'),
                    disabled: true,
                    value: foundCar?.model,
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
                    name: 'outDate',
                    labelOver: t('registrationPage.order.form.outDate'),
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
                loading: loadingService,
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
