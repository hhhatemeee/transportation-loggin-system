import { UseFormReset } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'

import { JOURNAL_STATUS, ROUTES } from '../../../constants'
import {
  GETCarType,
  GETJournalType,
  MutationType,
  POSTJournalType,
  RegistrationOrderForm,
} from '../../../types'
import { getProvideServicesFromForm } from '../helpers/getProvideServicesFromForm'

type UseHandlersProps = {
  registrateOrder: MutationType<POSTJournalType, GETJournalType>
  reset: UseFormReset<RegistrationOrderForm>
  foundCar?: GETCarType
}

export const useHandlers = ({ registrateOrder, reset, foundCar }: UseHandlersProps) => {
  const { gosNum } = useParams<{ gosNum: string }>()
  const navigate = useNavigate()

  const handleBack = () => navigate(ROUTES.REGISTRATION_ARRIVAL)

  const handleRegistration = (data: RegistrationOrderForm) => {
    const { incomingDate, outDate, nameDriver, waybill } = data
    const provideServices = getProvideServicesFromForm(data)

    if (incomingDate && outDate && foundCar) {
      // TODO: Исправить ДТО на бэке, не хватает одного поля
      registrateOrder({
        carId: foundCar.id,
        status: JOURNAL_STATUS.OPEN,
        incomingDate,
        outDate,
        nameDriver,
        waybill,
        provideServices,
      })
        .unwrap()
        .then(() => reset())
    }
  }

  return {
    data: {
      gosNum,
    },
    handlers: {
      handleBack,
      handleRegistration,
    },
  }
}
