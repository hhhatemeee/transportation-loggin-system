import {
  POSTLoginType,
  POSTRegistrationType,
  ReturnLoginType,
  ReturnRegistrationType,
} from '../../types'
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
    registration: build.mutation<ReturnRegistrationType, POSTRegistrationType>({
      query: body => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useRegistrationMutation } = authAPI
