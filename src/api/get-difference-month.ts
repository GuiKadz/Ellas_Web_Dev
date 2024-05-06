
import { api } from '@/lib/axios'

export interface GetDayAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export async function getDifferencePreviousMonth() {
  const response = await api.get<GetDayAmountResponse>(
    '/reports/occurrences/current-and-previous-month',
  ) 

  return response.data
}