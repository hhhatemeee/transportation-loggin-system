import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { FormRegistration } from '../RegistrationCar/components/FormRegistration'

export const RegistrationDeparture: FC = () => {
  const { t } = useTranslation()
  return (
    <FormRegistration
      onSubmitNubmerState={data => console.log(data)}
      onSubmitSTS={data => console.log(data)}
      submitBtnText={t('registrationCarPage.departure.submitButton')}
    />
  )
}
