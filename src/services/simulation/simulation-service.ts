import {request} from "@/services/base";

export const getSimulations = async (query: any) => {
  const {data} = await request<{ complete: boolean, data: any }>('simulations/', {
    useAuth: true,
    query,
  })
  return data;
}

export const getTypeInversions = async () => {
  const {data} = await request<{ complete: boolean, data: any }>('simulations/type_inversions/', {
    useAuth: true,
  })
  return data;
}

export const saveSimulation = async (simulation: any[]) => {
  const data = await request<{ complete: boolean, data: any }>('simulations/', {
    method: 'POST',
    body: simulation,
    useAuth: true,
  })
  return data;
}
