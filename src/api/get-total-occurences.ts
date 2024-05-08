import { api } from '@/lib/axios'
export interface GetTotal {
    count: number
  }
export async function getTotalOcurrences(): Promise<GetTotal> {
  const response = await api.get('/reports/occurrences/total')

  return response.data
}

