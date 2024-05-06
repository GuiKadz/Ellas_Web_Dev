import { api } from '@/lib/axios'

export interface CreateAggressorRequest {
  name: string
  cpf: string
  age: number
  ethnicity: string
  schooling: string
  substanceAddiction: boolean
  criminalRecord: boolean
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