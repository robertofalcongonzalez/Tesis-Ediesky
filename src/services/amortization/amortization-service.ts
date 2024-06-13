import {request} from "@/services/base";

export const getAmortization = async (query: any) => {
  const {data} = await request<{ complete: boolean, data: any }>('simulations/', {
    useAuth: true,
    query
  })
  return data;
}
export const getAmortizationById = async (query: any) => {
  const {data} = await request<{ complete: boolean, data: any }>(`simulations/${query.id}/report/`, {
    useAuth: true,
  })
  return data;
}

