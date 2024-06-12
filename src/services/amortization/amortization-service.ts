import {request} from "@/services/base";

export const getAmortization = async (query: any) => {
  const {data} = await request<{ complete: boolean, data: any }>('simulations/report/', {
    useAuth: true,
    query
  })
  return data;
}

