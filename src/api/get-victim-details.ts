import { api } from "@/lib/axios";

export async function GetVictimDetails(){
  const response = await api.get(
    '/reports/victims',
  )

  return response.data
}
