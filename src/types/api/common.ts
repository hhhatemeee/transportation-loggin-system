import {
  MutationDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query'
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { tagTypes } from '../../redux/api'

export type MutationType<Payload, Return> = MutationTrigger<
  MutationDefinition<
    Payload,
    BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, unknown, Record<string, unknown>>,
    (typeof tagTypes)[number],
    Return,
    'commonApi'
  >
>

export type ExtraOptions = {
  showNotification?: boolean
}
