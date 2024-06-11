import {request} from "@/services/base";

export const getEconomicActors = async () => {
  const {data} = await request<{ complete: boolean, data: any }>('users/economic_actor/', {
    useAuth: false,
  })
  return data;
}
