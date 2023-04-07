import { ChevronLeft } from '@mui/icons-material'
import { Grid, IconButton, Typography } from '@mui/material'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../components/Button'
import { FormGenerator } from '../../components/FormGenerator'
import { ROUTES } from '../../constants'
import { GENERATOR_INPUT_TYPE, RegistrationOrderForm } from '../../types'

const defaultValues = {
  stateNumber: '',
  carBrand: '',
  counterpart: '',
  dateStart: null,
  dateEnd: null,
  listNumber: '',
  fio: '',
  services: null,
  comment: '',
}

export const RegistrationOrder: FC = () => {
  const { code } = useParams<{ code: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const methods = useForm<RegistrationOrderForm>({ defaultValues })
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods

  const handleBack = () => navigate(ROUTES.REGISTRATION_ARRIVAL)

  const handleRegistration = (data: RegistrationOrderForm) => console.log(data)

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
                    labelOver: t('registrationCarPage.order.form.carBrand'),
                  },
                  {
                    inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                    name: 'counterpart',
                    labelOver: t('registrationCarPage.order.form.counterpart'),
                  },
                ],
                name: 'row1',
              },
              {
                inputs: [
                  {
                    inputType: GENERATOR_INPUT_TYPE.DATE_TIME_PICKER,
                    name: 'dateStart',
                    labelOver: t('registrationCarPage.order.form.dateStart'),
                  },
                  {
                    inputType: GENERATOR_INPUT_TYPE.DATE_TIME_PICKER,
                    name: 'dateEnd',
                    labelOver: t('registrationCarPage.order.form.dateEnd'),
                  },
                ],
                name: 'row2',
              },
              {
                inputs: [
                  {
                    inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                    name: 'listNumber',
                    labelOver: t('registrationCarPage.order.form.listNumber'),
                  },
                  {
                    inputType: GENERATOR_INPUT_TYPE.TEXTFIELD,
                    name: 'fio',
                    labelOver: t('registrationCarPage.order.form.fio'),
                  },
                ],
                name: 'row3',
              },
              {
                inputType: GENERATOR_INPUT_TYPE.AUTOCOMPLETE,
                name: 'services',
                labelOver: t('registrationCarPage.order.form.services'),
                autocompleteOptions: [],
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
