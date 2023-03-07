import { GETJournalType, POSTJournalType, PUTJournalType } from '../../types'
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
    getJournal: build.query<GETJournalType[], void>({
      query: () => ({
        url: '/journal/journals',
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useAddJournalMutation,
  useDeleteJournalMutation,
  useGetJournalByIdQuery,
  useUpdateJournalMutation,
  useGetJournalQuery,
} = journalAPI
