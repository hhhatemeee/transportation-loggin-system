import { createContext, FC } from 'react'
import { useGetCarsQuery, useGetClientsQuery } from '../../redux/api'

import { useAddContractMutation } from '../../redux/api/contracts.api'
import {
  GETCarType,
  GETClientType,
  GETContractType,
  MutationType,
  POSTContractType,
} from '../../types'
import { DictionaryContractsView } from '../../views/DictionaryContractsView'

export type DictionaryContractsContextType = {
  addContract: MutationType<POSTContractType, GETContractType>
  carsData: GETCarType[]
  clientsData: GETClientType[]
}

export const DictionaryContractsContext = createContext<DictionaryContractsContextType>(
  {} as DictionaryContractsContextType
)

export const DictionaryContracts: FC = () => {
  const [addContract] = useAddContractMutation()
  const { data: clientsData = [] } = useGetClientsQuery()
  const { data: carsData = [] } = useGetCarsQuery()

  return (
    <DictionaryContractsContext.Provider value={{ addContract, carsData, clientsData }}>
      <DictionaryContractsView />
    </DictionaryContractsContext.Provider>
  )
}
