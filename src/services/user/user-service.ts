import {request} from "@/services/base";

export const getEconomicActors = async () => {
  const {data} = await request<{ complete: boolean, data: any }>('users/economic_actor/', {
    useAuth: false,
  })
  return data;
}
export const getUsers = async () => {
  const {data} = await request<{ complete: boolean, data: any }>('users/')
  return data;
}
