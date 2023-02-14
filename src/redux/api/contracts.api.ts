import { GETContractType, POSTContractType, PUTContractType } from '../../types'
import { commonAPI } from './common.api'

export const ContractAPI = commonAPI.injectEndpoints({
  endpoints: build => ({
    getContractById: build.query<GETContractType, number>({
      query: id => ({
        url: `/contract/${id}`,
        method: 'GET',
      }),
    }),
    addContract: build.mutation<GETContractType, POSTContractType>({
      query: body => ({
        url: '/contract',
        method: 'POST',
        body,
      }),
    }),
    deleteContract: build.mutation<GETContractType, number>({
      query: id => ({
        url: `/contract/${id}`,
        method: 'DELETE',
      }),
    }),
    updateContract: build.mutation<GETContractType, PUTContractType>({
      query: body => ({
        url: `/contract/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    getContracts: build.query<GETContractType[], void>({
      query: () => ({
        url: '/contract/contracts',
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useAddContractMutation,
  useGetContractsQuery,
  useDeleteContractMutation,
  useGetContractByIdQuery,
  useUpdateContractMutation,
} = ContractAPI
