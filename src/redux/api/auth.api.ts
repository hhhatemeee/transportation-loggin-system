import { POSTLoginType, ReturnLoginType } from '../../types'
import { commonAPI } from './common.api'

export const authAPI = commonAPI.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<ReturnLoginType, POSTLoginType>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = authAPI
