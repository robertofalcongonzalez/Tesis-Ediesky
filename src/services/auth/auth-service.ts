import {request} from "@/services/base";
import {LoginData, LoginResponse, RegisterData, RegisterResponse} from "@/services/auth/types";


export const register = async (body: RegisterData) => {
  const {data, complete} = await request<RegisterResponse>('auth/register/', {
    useAuth: false,
    method: 'POST',
    body
  })
  return !complete || data;
}
export const login = async (body: LoginData) => {
  const {token,user_id, complete, economic_actor} = await request<LoginResponse>('auth/login/', {
    useAuth: false,
    method: 'POST',
    body
  })
  localStorage.setItem('token', token)
  localStorage.setItem('economic_actor', economic_actor)
  localStorage.setItem('userId', `${user_id}`)
  return complete;
}

