import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../constants'
import { FormRegistration } from '../Registration/components/FormRegistration'

export const RegistrationArrival: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <FormRegistration
      onSubmitNubmerState={data => navigate(`${ROUTES.REGISTRATION_ARRIVAL}/${data.code}`)}
      onSubmitSTS={data => console.log(data)}
      submitBtnText={t('registrationPage.arrival.submitButton')}
    />
  )
}
