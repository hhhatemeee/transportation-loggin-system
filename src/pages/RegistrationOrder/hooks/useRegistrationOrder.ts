import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, Location } from 'react-router-dom'

import {
  useAddJournalMutation,
  useFindCarByGosNumMutation,
  useGetClientByIdQuery,
  useGetServicesQuery,
} from '../../../redux/api'
import { GETCarType, RegistrationOrderForm } from '../../../types'
import { useHandlers } from './useHandlers'
import { convertArrayServicesToDefaultValues } from '../../../helpers'

type OrderLocationType = {
  state: GETCarType
} & Omit<Location, 'state'>

const defaultValues: RegistrationOrderForm = {
  gosNum: '',
  carBrand: '',
  counterpart: '',
  incomingDate: null,
  outDate: null,
  waybill: '',
  nameDriver: '',
  comment: '',
}

export const useRegistrationOrder = () => {
  const {
    state: {
      client: { id: clientId },
    },
  } = useLocation() as OrderLocationType
  const methods = useForm<RegistrationOrderForm>({ defaultValues })
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
    getValues,
  } = methods
  const {
    data: client,
    isLoading: isLoadingClient,
    isFetching: isFetchingClient,
  } = useGetClientByIdQuery(clientId, {
    skip: !clientId,
  })
  const {
    data: services,
    isLoading: isLoadingService,
    isFetching: isFetchingService,
  } = useGetServicesQuery()
  const [, { data: foundCar }] = useFindCarByGosNumMutation({
    fixedCacheKey: 'shared-foundCar',
  })
  const [registrateOrder] = useAddJournalMutation()

  const loadingClient = isLoadingClient || isFetchingClient
  const loadingService = isLoadingService || isFetchingService

  const { data, handlers } = useHandlers({ registrateOrder, reset, foundCar })

  useEffect(() => {
    if (services) {
      const servicesObject = convertArrayServicesToDefaultValues(services)
      reset({ ...getValues(), ...servicesObject })
    }
  }, [services])

  return {
    data: {
      ...data,
      foundCar,
      client,
      services: services || [],
      methods,
    },
    state: {
      clientId,
      isDirty,
      loadingClient,
      loadingService,
    },
    handlers: {
      ...handlers,
      handleSubmit,
      getFormValues: getValues,
    },
  }
}
