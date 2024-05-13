import { api } from "@/lib/axios";

export type GetVictimDetailsResponse = Array<{
  data: string;
  count: number;
}>;

export async function GetVictimDetails(data: string) {
  const response = await api.get<GetVictimDetailsResponse>(
    `/reports/victims/${data}`,
   

  );

  return response.data;
}
