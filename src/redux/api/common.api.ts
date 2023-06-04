import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

import { COOKIES_DATA, ROUTES, URLS } from '../../constants'
import { ExtraOptions, ReturnRefreshTokenType } from '../../types'
import { setLogin } from '../reducers/auth.reducer'
import { showMessage } from '../reducers/snackbar.reducer'

export const tagTypes = ['JOURNALS']

// Добавил аргумент refreshToken, т.к. на бэке не принимаются токены из Cookies
// а headers в baseQuery не работает
const baseQuery = (refreshToken?: string) =>
  fetchBaseQuery({
    baseUrl: URLS.BASE_URL,
    credentials: 'same-origin',
    prepareHeaders: headers => {
      const token = Cookies.get(COOKIES_DATA.ACCESS_TOKEN)

      if (token) {
        headers.set('authorization', refreshToken || token)
      }

      return headers
    },
  })

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQuery()(args, api, extraOptions)

  if (result?.error?.status === 401) {
    const refreshToken = Cookies.get(COOKIES_DATA.REFRESH_TOKEN)
    const refreshResult = await baseQuery(refreshToken)(
      {
        url: ROUTES.REFRESH_TOKEN,
        method: 'POST',
      },
      api,
      extraOptions
    )
    // Для случаев когда умер рефреш токен
    if (refreshResult.error && refreshResult.error.status === 401) {
      api.dispatch(
        showMessage({
          type: !result.error ? 'success' : 'error',
          message: JSON.stringify(refreshResult.error.data),
          statusCode: 401,
        })
      )
    }

    if (refreshResult.data) {
      // Didn't find a solution how to type data
      api.dispatch(setLogin(refreshResult.data as ReturnRefreshTokenType))

      result = await baseQuery()(args, api, extraOptions)
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

  if (isValidRequest && showNotification && result.meta?.response?.status !== 401) {
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
