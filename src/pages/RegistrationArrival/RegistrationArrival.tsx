import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { FormRegistration } from '../Registration/components/FormRegistration'

export const RegistrationArrival: FC = () => {
  const { t } = useTranslation()
  return (
    <FormRegistration
      onSubmitNubmerState={data => console.log(data)}
      onSubmitSTS={data => console.log(data)}
      submitBtnText={t('registrationPage.arrival.submitButton')}
    />
  )
}
