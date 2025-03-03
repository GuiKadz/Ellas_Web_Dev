import { api } from '@/lib/axios'

export interface CreateVictimRequest {
  name: string
  document: string
  phone: string

  district: string
  address: string
  age: string
  profession: string
  maritalStatus: string
  ethnicity: string
  auxGov: string
  childrens: string
  income: string
  schooling: string
  disabled: string
}

export type CreateVictimResponse = {
  message: string
}

export async function createVictim({
  name,
  document,
  phone,
  
  district,
  address,
  age,
  profession,
  maritalStatus,
  ethnicity,
  auxGov,
  childrens,
  income,
  schooling,
  disabled,
}: CreateVictimRequest) {
  const response = await api.post('/victims', {
    name,
    document,
    phone,
    district,
    address,
    age,
    profession,
    maritalStatus,
    ethnicity,
    auxGov,
    childrens,
    income,
    schooling,
    disabled,
  })
  console.log(response.data)
  return response.data
}