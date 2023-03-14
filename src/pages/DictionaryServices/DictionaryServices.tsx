import { createContext, FC } from 'react'

import { useAddServiceMutation } from '../../redux/api'
import { GETServiceType, MutationType, POSTServiceType } from '../../types'
import { DictionaryServicesView } from '../../views/DictionaryServicesView'

export type DictionaryServicesContextType = {
  addService: MutationType<POSTServiceType, GETServiceType>
}

export const DictionaryServicesContext = createContext<DictionaryServicesContextType>(
  {} as DictionaryServicesContextType
)

export const DictionaryServices: FC = () => {
  const [addService] = useAddServiceMutation()

  return (
    <DictionaryServicesContext.Provider value={{ addService }}>
      <DictionaryServicesView />
    </DictionaryServicesContext.Provider>
  )
}
