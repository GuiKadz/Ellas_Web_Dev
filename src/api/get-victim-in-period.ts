import { api } from '@/lib/axios'

export interface GetDailyReceiptInPeriodQuery {
  from?: Date
  to?: Date
}

export type GetDailyReceiptInPeriodResponse = Array<{
  date: string
  result: number
}>

export async function GetVictimInPeriod({
  from,
  to,
}: GetDailyReceiptInPeriodQuery) {
  const response = await api.get(
    '/reports/daily-result-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}