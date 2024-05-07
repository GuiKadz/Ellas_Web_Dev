import { api } from '@/lib/axios'

export async function getSearchResults(query: string) {
    const response = await api.post(`/search/${query}`);
    return response.data;
  }