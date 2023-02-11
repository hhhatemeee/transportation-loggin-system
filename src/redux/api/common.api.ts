import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

export const tagTypes = []

export const commonAPI = createApi({
  reducerPath: 'commonApi',
  tagTypes,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:28080/api',
    mode: 'no-cors',
    // credentials: 'same-origin',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token

      if (token) {
        headers.set('authorization', token)
      }
      // headers.set('Access-Control-Allow-Origin', '*')
      // headers.set('Access-Control-Allow-Headers', '*')
      // headers.set('Content-Type', 'application/json')
      // headers.set('Accept', 'application/json')
      return headers
    },
  }),
  endpoints: () => ({}),
})
