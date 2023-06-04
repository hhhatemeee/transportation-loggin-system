import {
  GETJournalParams,
  GETJournalType,
  POSTJournalType,
  PUTJournalType,
  UPDATEJournalStatusPayload,
} from '../../types'
import { commonAPI } from './common.api'

export const journalAPI = commonAPI.injectEndpoints({
  endpoints: build => ({
    getJournalById: build.query<GETJournalType, number>({
      query: id => ({
        url: `/journal/${id}`,
        method: 'GET',
      }),
    }),
    addJournal: build.mutation<GETJournalType, POSTJournalType>({
      query: body => ({
        url: '/journal',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['JOURNALS'],
    }),
    deleteJournal: build.mutation<GETJournalType, number>({
      query: id => ({
        url: `/journal/${id}`,
        method: 'DELETE',
      }),
    }),
    updateJournal: build.mutation<GETJournalType, PUTJournalType>({
      query: ({ id, ...body }) => ({
        url: `/journal/${id}`,
        method: 'PUT',
        body,
      }),
    }),
    getJournal: build.query<GETJournalType[], GETJournalParams>({
      query: params => ({
        url: '/journal/journals',
        method: 'GET',
        params,
      }),
      providesTags: ['JOURNALS'],
    }),
    updateStatusJournalById: build.mutation<void, UPDATEJournalStatusPayload>({
      query: ({ id, status }) => ({
        url: `/journal/${id}/status/${status}`,
        method: 'PUT',
      }),
      invalidatesTags: ['JOURNALS'],
    }),
  }),
})

export const {
  useAddJournalMutation,
  useDeleteJournalMutation,
  useGetJournalByIdQuery,
  useUpdateJournalMutation,
  useGetJournalQuery,
  useUpdateStatusJournalByIdMutation,
} = journalAPI
