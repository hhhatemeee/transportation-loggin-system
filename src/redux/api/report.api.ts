import { GETReportType, ReportParamsType } from '../../types'
import { commonAPI } from './common.api'

export const reportAPI = commonAPI.injectEndpoints({
  endpoints: build => ({
    getReport: build.mutation<GETReportType[], ReportParamsType>({
      query: params => ({
        url: '/report/statistics',
        method: 'GET',
        params,
      }),
    }),
  }),
})

export const { useGetReportMutation } = reportAPI
