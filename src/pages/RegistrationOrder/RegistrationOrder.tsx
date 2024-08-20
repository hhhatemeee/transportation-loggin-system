import { ChevronLeft } from '@mui/icons-material'
import { Badge, Grid, IconButton, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { AppLoader } from '../../components/AppLoader'
import { Button } from '../../components/Button'
import { FormGenerator } from '../../components/FormGenerator'
import { usePrompt } from '../../hooks'
import { GENERATOR_INPUT_TYPE } from '../../types'
import { useRegistrationOrder } from './hooks/useRegistrationOrder'
import { getCountUsedServicesInForm } from './helpers/getCountUsedServicesInForm'
import { ServicesDialog } from '../../components/ServicesDialog'

export const RegistrationOrder: FC = () => {
  const [servicesShow, setServicesShow] = useState(false)
  const { t } = useTranslation()
  const { data, state, handlers } = useRegistrationOrder()

  const { client, methods, foundCar, services } = data
  const { isDirty, loadingClient } = state
  const { handleBack, handleRegistration, handleSubmit, getFormValues } = handlers

  const badgeCount = getCountUsedServicesInForm(getFormValues())

  usePrompt({ when: isDirty })

  const handleSetServicesShow = () => setServicesShow(!servicesShow)

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
                    labelOver: t('registrationCarPage.order.form.gosNum'),
                    value: foundCar?.gosNum,
                    disabled: true,
                  },
                  {
                    inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                    name: 'carBrand',
                    labelOver: t('registrationCarPage.order.form.carBrand'),
                    disabled: true,
                    value: foundCar?.model,
                  },
                  {
                    inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                    name: 'counterpart',
                    labelOver: t('registrationCarPage.order.form.counterpart'),
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
                    labelOver: t('registrationCarPage.order.form.incomingDate'),
                  },
                  {
                    inputType: GENERATOR_INPUT_TYPE.DATE_TIME_PICKER,
                    name: 'outDate',
                    labelOver: t('registrationCarPage.order.form.outDate'),
                  },
                ],
                name: 'row2',
              },
              {
                inputs: [
                  {
                    inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                    name: 'waybill',
                    labelOver: t('registrationCarPage.order.form.waybill'),
                  },
                  {
                    inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                    name: 'nameDriver',
                    labelOver: t('registrationCarPage.order.form.nameDriver'),
                  },
                ],
                name: 'row3',
              },
            ]}
          />
          <Grid item mb={2} mt={1}>
            <Badge badgeContent={badgeCount} color='primary'>
              <Button variant='text' onClick={handleSetServicesShow}>
                Выбрать услуги
              </Button>
            </Badge>
            <ServicesDialog
              isShow={servicesShow}
              onClose={handleSetServicesShow}
              services={services}
              title={t('registrationCarPage.order.dialog.title')}
            />
          </Grid>
          <FormGenerator
            inputs={[
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
