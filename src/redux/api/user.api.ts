import { ReturnGetUserType } from '../../types'
import { commonAPI } from './common.api'

export const userAPI = commonAPI.injectEndpoints({
  endpoints: build => ({
    getUser: build.mutation<ReturnGetUserType, void>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetUserMutation } = userAPI
