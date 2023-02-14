import { GETCarType, POSTCarType, PUTCarType } from '../../types'
import { commonAPI } from './common.api'

export const carsAPI = commonAPI.injectEndpoints({
  endpoints: build => ({
    getCarById: build.query<GETCarType, number>({
      query: id => ({
        url: `/car/${id}`,
        method: 'GET',
      }),
    }),
    addCar: build.mutation<GETCarType, POSTCarType>({
      query: body => ({
        url: '/car',
        method: 'POST',
        body,
      }),
    }),
    deleteCar: build.mutation<GETCarType, number>({
      query: id => ({
        url: `/car/${id}`,
        method: 'DELETE',
      }),
    }),
    updateCar: build.mutation<GETCarType, PUTCarType>({
      query: body => ({
        url: `/car/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    getCars: build.query<GETCarType[], void>({
      query: () => ({
        url: '/car/cars',
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useAddCarMutation,
  useDeleteCarMutation,
  useGetCarByIdQuery,
  useUpdateCarMutation,
  useGetCarsQuery,
} = carsAPI
