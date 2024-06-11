import {request} from "@/services/base";
import {LoginData, LoginResponse, RegisterData, RegisterResponse} from "@/services/auth/types";
import {useAuthStore} from "@/stores/auth";



export const register = async (body: RegisterData) => {
  const {data, complete} = await request<RegisterResponse>('auth/register/', {
    useAuth: false,
    method: 'POST',
    body
  })
  return !complete || data;
}
export const login = async (body: LoginData) => {
  const {token,user_id, complete} = await request<LoginResponse>('auth/login/', {
    useAuth: false,
    method: 'POST',
    body
  })
  const authStore = useAuthStore();
  authStore.saveToken(token);
  authStore.saveLoggedUser(user_id);
  localStorage.setItem('token', authStore.getters.getToken)
  localStorage.setItem('userId', authStore.getters.getLoggedUser)
  return complete;
}

