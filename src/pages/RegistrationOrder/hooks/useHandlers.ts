import { UseFormReset } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants'
import {
  GETCarType,
  GETJournalType,
  MutationType,
  POSTJournalType,
  RegistrationOrderForm,
} from '../../../types'

type UseHandlersProps = {
  registrateOrder: MutationType<POSTJournalType, GETJournalType>
  reset: UseFormReset<RegistrationOrderForm>
  foundCar?: GETCarType
}

export const useHandlers = ({ registrateOrder, reset, foundCar }: UseHandlersProps) => {
  const { gosNum } = useParams<{ gosNum: string }>()
  const navigate = useNavigate()

  const handleBack = () => navigate(ROUTES.REGISTRATION_ARRIVAL)

  const handleRegistration = ({
    incomingDate,
    outPlanDate,
    nameDriver,
    waybill,
  }: RegistrationOrderForm) => {
    if (incomingDate && outPlanDate && foundCar) {
      // TODO: Исправить ДТО на бэке, не хватает двух полей
      registrateOrder({ carId: foundCar.id, incomingDate, outPlanDate, nameDriver, waybill })
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
