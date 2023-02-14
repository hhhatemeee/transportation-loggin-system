import { GETClientType, POSTClientType, PUTClientType } from '../../types'
import { commonAPI } from './common.api'

export const clientAPI = commonAPI.injectEndpoints({
  endpoints: build => ({
    getClientById: build.query<GETClientType, number>({
      query: id => ({
        url: `/client/${id}`,
        method: 'GET',
      }),
    }),
    addClient: build.mutation<GETClientType, POSTClientType>({
      query: body => ({
        url: '/client',
        method: 'POST',
        body,
      }),
    }),
    deleteClient: build.mutation<GETClientType, number>({
      query: id => ({
        url: `/client/${id}`,
        method: 'DELETE',
      }),
    }),
    updateClient: build.mutation<GETClientType, PUTClientType>({
      query: body => ({
        url: `/client/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    getClients: build.query<GETClientType[], void>({
      query: () => ({
        url: '/client/clients',
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useAddClientMutation,
  useGetClientsQuery,
  useDeleteClientMutation,
  useGetClientByIdQuery,
  useUpdateClientMutation,
} = clientAPI
