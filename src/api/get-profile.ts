import { api } from '@/lib/axios'

export interface GetProfileResponse {
  institute: string
  id: string
  email: string
  city: string
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me')

  return response.data
}

