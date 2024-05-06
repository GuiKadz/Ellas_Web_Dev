import { api } from '@/lib/axios'
export interface GetTotalMonth {
    count: number
  }
export async function getTotalMonth(): Promise<GetTotalMonth> {
  const response = await api.get('/reports/occurrences/current-month')

  return response.data
}

