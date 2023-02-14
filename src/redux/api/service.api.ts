import { GETServiceType, POSTServiceType, PUTServiceType } from '../../types'
import { commonAPI } from './common.api'

export const serviceAPI = commonAPI.injectEndpoints({
  endpoints: build => ({
    getServiceById: build.query<GETServiceType, number>({
      query: id => ({
        url: `/service/${id}`,
        method: 'GET',
      }),
    }),
    addService: build.mutation<GETServiceType, POSTServiceType>({
      query: body => ({
        url: '/service',
        method: 'POST',
        body,
      }),
    }),
    deleteService: build.mutation<GETServiceType, number>({
      query: id => ({
        url: `/service/${id}`,
        method: 'DELETE',
      }),
    }),
    updateService: build.mutation<GETServiceType, PUTServiceType>({
      query: body => ({
        url: `/service/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    getServices: build.query<GETServiceType[], void>({
      query: () => ({
        url: '/service/services',
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useAddServiceMutation,
  useGetServicesQuery,
  useDeleteServiceMutation,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} = serviceAPI
