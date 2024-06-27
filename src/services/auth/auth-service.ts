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
  const data = await request<LoginResponse>('auth/login/', {
    useAuth: false,
    method: 'POST',
    body
  })
  localStorage.setItem('token', data.token);
  localStorage.setItem('role', data.group_name[0]);
  localStorage.setItem('economic_actor', data.economic_actor)
  localStorage.setItem('userId', `${data.user_id}`)
  return data.complete;
}

