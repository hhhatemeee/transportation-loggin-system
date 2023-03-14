import { createContext, FC } from 'react'

import { useAddCarMutation, useGetClientsQuery } from '../../redux/api'
import { GETCarType, GETClientType, MutationType, POSTCarType } from '../../types'
import { DictionaryCarsView } from '../../views/DictionaryCarsView'

export type DictionaryCarsContextType = {
  addCar: MutationType<POSTCarType, GETCarType>
  clients: GETClientType[]
  loadingClientsData: boolean
}

export const DictionaryCarsContext = createContext<DictionaryCarsContextType>(
  {} as DictionaryCarsContextType
)

export const DictionaryCars: FC = () => {
  const [addCar] = useAddCarMutation()
  const { data: clientsData, isLoading, isFetching } = useGetClientsQuery()
  const loadingClientsData = isLoading || isFetching

  return (
    <DictionaryCarsContext.Provider
      value={{ addCar, clients: clientsData || [], loadingClientsData }}
    >
      <DictionaryCarsView />
    </DictionaryCarsContext.Provider>
  )
}
