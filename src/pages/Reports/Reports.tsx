import { createContext, useMemo } from 'react'
import { Outlet } from 'react-router-dom'

import { useGetClientsQuery } from '../../redux/api'
import { AutocompleteOption } from '../../components/AutoComplete'

export type ReportsContextType = {
  clientsOptions: AutocompleteOption[]
  loadingClients: boolean
}

export const ReportsContext = createContext<ReportsContextType>({} as ReportsContextType)

export const Reports = () => {
  const {
    data: clientsData,
    isLoading: isLoadingClient,
    isFetching: isFetchingClient,
  } = useGetClientsQuery()
  const clientsOptions = useMemo(
    () => clientsData?.map(({ name: label, id }) => ({ id, label })) || [],
    [clientsData]
  )

  const loadingClients = isLoadingClient || isFetchingClient

  return (
    <ReportsContext.Provider
      value={{
        clientsOptions,
        loadingClients,
      }}
    >
      <Outlet />
    </ReportsContext.Provider>
  )
}
