import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

import { COOKIES_DATA, ROUTES, URLS } from '../../constants'
import { ExtraOptions, ReturnRefreshTokenType } from '../../types'
import { setLogin } from '../reducers/auth.reducer'
import { showMessage } from '../reducers/snackbar.reducer'

export const tagTypes = []

const baseQuery = fetchBaseQuery({
  baseUrl: URLS.BASE_URL,
  credentials: 'same-origin',
  prepareHeaders: headers => {
    const token = Cookies.get(COOKIES_DATA.ACCESS_TOKEN)

    if (token) {
      headers.set('authorization', token)
    }

    return headers
  },
})

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    const refreshToken = Cookies.get(COOKIES_DATA.REFRESH_TOKEN)
    const refreshResult = await baseQuery(
      {
        url: ROUTES.REFRESH_TOKEN,
        method: 'POST',
        headers: { authorization: refreshToken },
      },
      api,
      extraOptions
    )

    if (refreshResult.data) {
      // Didn't find a solution how to type data
      api.dispatch(setLogin(refreshResult.data as ReturnRefreshTokenType))

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(setLogin(null))
    }
  }

  return result
}

const baseQueryWithNotification: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  ExtraOptions
> = async (args, api, extraOptions) => {
  const result = await baseQueryWithReauth(args, api, extraOptions)
  const requestArgs = args as FetchArgs
  const isValidRequest = requestArgs?.body || requestArgs?.method === 'DELETE' || result.error
  // TODO: Согласовать ДТО ошибки с бэком
  const resultErrorData = result.error ? JSON.stringify(result.error.data) : undefined
  const showNotification = extraOptions?.showNotification ?? true

  if (isValidRequest && showNotification) {
    api.dispatch(
      showMessage({
        type: !result.error ? 'success' : 'error',
        message: resultErrorData,
        statusCode: result.meta?.response?.status || 404,
      })
    )
  }

  return result
}

export const commonAPI = createApi({
  reducerPath: 'commonApi',
  tagTypes,
  baseQuery: baseQueryWithNotification,
  endpoints: () => ({}),
})
