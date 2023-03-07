import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../constants'
import { useFindCarByGosNumMutation } from '../../redux/api'
import { STSForm } from '../../types'
import { FormRegistration } from '../Registration/components/FormRegistration'

export const RegistrationArrival: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [findCarByGosNum] = useFindCarByGosNumMutation({ fixedCacheKey: 'shared-foundCar' })

  const handleArrive = (data: STSForm) => {
    findCarByGosNum(data.code)
      .unwrap()
      .then(car => {
        navigate(`${ROUTES.REGISTRATION_ARRIVAL}/${car.gosNum}`, { state: car })
      })
  }

  return (
    <FormRegistration
      onSubmitNubmerState={handleArrive}
      onSubmitSTS={data => console.log(data)}
      submitBtnText={t('registrationCarPage.arrival.submitButton')}
    />
  )
}
