import {request} from "@/services/base";
import {Setting} from "@/services/settings/types";

export const getSettings = async () => {
  const {data} = await request<{ complete: boolean, data: any }>('simulations/settings/', {})
  return data;
}
export const saveSettings = async (body: Setting) => {
  const {data} = await request<{ complete: boolean, data: any }>('simulations/settings/', {
    method: 'PUT',
    body,
  })
  return data;
}

