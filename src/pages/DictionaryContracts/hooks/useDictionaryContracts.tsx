import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { convertArrayServicesToDefaultValues } from '../../../helpers'
import { useGetClientsQuery, useGetCarsQuery, useGetServicesQuery } from '../../../redux/api'
import { DictionaryContractsForm } from '../../../types'
import { getCountConfiguredServicesInForm } from '../helpers'
import { useHandlers } from './useHandlers'

const defaultValues: DictionaryContractsForm = {
  client: null,
  endDate: null,
  startDate: null,
  car: null,
}

export const useDictionaryContracts = () => {
  const { data: clientsData = [] } = useGetClientsQuery()
  const { data: carsData = [] } = useGetCarsQuery()
  const {
    data: services,
    isLoading: isLoadingService,
    isFetching: isFetchingService,
  } = useGetServicesQuery()
  const methods = useForm<DictionaryContractsForm>({ defaultValues })
  const { reset, getValues } = methods
  const servicesLoading = isLoadingService || isFetchingService
  const badgeCount = getCountConfiguredServicesInForm(getValues())

  const { handlers, state } = useHandlers({ methods })

  useEffect(() => {
    if (services) {
      const servicesObject = convertArrayServicesToDefaultValues(services)
      reset({ ...getValues(), ...servicesObject })
    }
  }, [services])

  const clientsOptions = useMemo(
    () => clientsData.map(({ id, name: label }) => ({ id, label })),
    [clientsData]
  )
  const carsOptions = useMemo(
    () => carsData.map(({ id, gosNum: label }) => ({ id, label })),
    [carsData]
  )

  return {
    data: {
      services,
    },
    state: {
      clientsOptions,
      carsOptions,
      methods,
      servicesLoading,
      badgeCount,
      ...state,
    },
    handlers: {
      ...handlers,
    },
  }
}
