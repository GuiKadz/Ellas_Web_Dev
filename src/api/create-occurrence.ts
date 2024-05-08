import { api } from '@/lib/axios'

export interface CreateOccurrenceRequest {
  date: unknown
  time: string
  institute: string
  bond: string
  drugs: string
  type: string
  victimCpf: string
  aggressorCpf: string
}

export type CreateOccurrenceResponse = {
  message: string
}

export async function createOccurrence({
  date,
  time,
  institute,
  bond,
  drugs,
  type,
  victimCpf,
  aggressorCpf,
}: CreateOccurrenceRequest) {
  const response = await api.post('/occurrences', {
    date,
    time,
    institute,
    bond,
    drugs,
    type,
    victimCpf,
    aggressorCpf,
  })
  return response.data
}