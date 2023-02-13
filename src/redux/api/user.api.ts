import Cookies from 'js-cookie'
import { ReturnGetUserType } from '../../types'
import { setUser } from '../reducers/auth.reducer'
import { commonAPI } from './common.api'

export const userAPI = commonAPI.injectEndpoints({
  endpoints: build => ({
    getUser: build.query<ReturnGetUserType, void>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled
          dispatch(setUser(user))
        } catch (err) {
          Cookies.remove('jwt')
        }
      },
    }),
  }),
})

export const { useGetUserQuery } = userAPI
