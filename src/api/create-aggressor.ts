import { api } from '@/lib/axios'

export interface CreateAggressorRequest {
  name: string
  document: string
  age: string
  ethnicity: string
  schooling: string
  substanceAddiction: string
  criminalRecord: string
}

export type CreateAggressorResponse = {
  message: string
}

export async function createAggressor({
  name,
  document,
  age,
  ethnicity,
  schooling,
  substanceAddiction,
  criminalRecord,
}: CreateAggressorRequest) {
  const response = await api.post('/aggressors', {
    name,
    document,
    age,
    ethnicity,
    schooling,
    substanceAddiction,
    criminalRecord,
  })
  return response.data
}