import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

export const tagTypes = []

export const commonAPI = createApi({
  reducerPath: 'commonApi',
  tagTypes,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'same-origin',
    prepareHeaders: headers => {
      const token = Cookies.get('jwt')

      if (token) {
        headers.set('authorization', token)
      }
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Headers', '*')
      headers.set('Content-Type', 'application/json')
      headers.set('Accept', 'application/json')
      return headers
    },
  }),
  endpoints: () => ({}),
})
