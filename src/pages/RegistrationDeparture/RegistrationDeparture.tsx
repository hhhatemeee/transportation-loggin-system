import { FC, createContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SearchOrder } from '../Registration/components/SearchOrder'
import { FormRegistration } from '../RegistrationCar/components/FormRegistration'
import {
  useFindCarByGosNumMutation,
  useGetJournalQuery,
  useUpdateStatusJournalByIdMutation,
} from '../../redux/api'
import { JOURNAL_STATUS, ROUTES } from '../../constants'
import { GETJournalType } from '../../types'
import { useNavigate } from 'react-router-dom'

export type RegistrationDepartureContextType = {
  journalsData: GETJournalType[]
  loadingJournals: boolean
  onUpdateJournalStatus: (id: number, status: JOURNAL_STATUS) => void
}

export const RegistrationDepartureContext = createContext<RegistrationDepartureContextType>(
  {} as RegistrationDepartureContextType
)

export const RegistrationDeparture: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [findGosNum, setFindGosNum] = useState('')

  const [updateStatusJournalById] = useUpdateStatusJournalByIdMutation()
  const { data, isLoading, isFetching } = useGetJournalQuery({
    status: JOURNAL_STATUS.OPEN,
    gosNum: findGosNum || undefined,
  })
  const [findCarByGosNum] = useFindCarByGosNumMutation({ fixedCacheKey: 'shared-foundCar' })

  const loadingJournals = isLoading || isFetching

  const handleArrive = (data: string) => {
    findCarByGosNum(data)
      .unwrap()
      .then(car => {
        navigate(`${ROUTES.REGISTRATION_ARRIVAL}/${car.gosNum}`, { state: car })
      })
  }
  const handleSetFindGosNum = (value: string) => setFindGosNum(value)

  const handleUpdateJournalStatus = (id: number, status: JOURNAL_STATUS) =>
    updateStatusJournalById({ id, status })

  return (
    <RegistrationDepartureContext.Provider
      value={{
        journalsData: data || [],
        loadingJournals,
        onUpdateJournalStatus: handleUpdateJournalStatus,
      }}
    >
      <FormRegistration
        stateNumberTab={
          <SearchOrder
            label={t('registrationCarPage.form.stateNumber.label')}
            onAdd={handleArrive}
            onSearch={handleSetFindGosNum}
          />
        }
      />
    </RegistrationDepartureContext.Provider>
  )
}
