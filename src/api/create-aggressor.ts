import { api } from '@/lib/axios'

export interface CreateAggressorRequest {
  name: string
  cpf: string
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
  cpf,
  age,
  ethnicity,
  schooling,
  substanceAddiction,
  criminalRecord,
}: CreateAggressorRequest) {
  const response = await api.post('/aggressors', {
    name,
    cpf,
    age,
    ethnicity,
    schooling,
    substanceAddiction,
    criminalRecord,
  })
  return response.data
}