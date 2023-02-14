import { createContext, FC } from 'react'

import { useAddClientMutation } from '../../redux/api/clients.api'
import { GETClientType, POSTClientType, MutationType } from '../../types'
import { DictionaryClientsView } from '../../views/DictionaryClientsView'

export type DictionaryClientContextType = {
  addClient: MutationType<POSTClientType, GETClientType>
}

export const DictionaryClientContext = createContext<DictionaryClientContextType>(
  {} as DictionaryClientContextType
)

export const DictionaryClients: FC = () => {
  const [addClient] = useAddClientMutation()

  return (
    <DictionaryClientContext.Provider value={{ addClient }}>
      <DictionaryClientsView />
    </DictionaryClientContext.Provider>
  )
}
