import { UseFormReturn } from 'react-hook-form'

import { DictionaryContractsForm } from '../../../types'
import { getPricesFromServices } from '../helpers'
import { useAddContractMutation } from '../../../redux/api/contracts.api'
import { useState } from 'react'

type UseHandlersProps = {
  methods: UseFormReturn<DictionaryContractsForm, any>
}

export const useHandlers = ({ methods }: UseHandlersProps) => {
  const [servicesShow, setServicesShow] = useState(false)
  const [addContract] = useAddContractMutation()

  const { reset } = methods

  const handleSetServicesShow = () => setServicesShow(!servicesShow)

  const handleAddContract = ({
    client,
    car,
    endDate,
    startDate,
    ...data
  }: DictionaryContractsForm) => {
    const prices = getPricesFromServices(data)
    if (client && car && endDate && startDate) {
      addContract({
        endDate,
        startDate,
        carId: Number(car.id),
        clientId: Number(client.id),
        prices,
      })
        .unwrap()
        .then(() => reset())
    }
  }

  return {
    state: {
      servicesShow,
    },
    handlers: {
      onAddContract: handleAddContract,
      onSetServicesShow: handleSetServicesShow,
    },
  }
}
