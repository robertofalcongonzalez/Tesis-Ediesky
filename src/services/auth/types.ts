export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  complete: boolean;
  token: string;
  user_id: number;
  modules: string[]
  title: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface RegisterResponse {
  complete: boolean;
  message: string;
  data: boolean;
}

export interface RegisterData extends LoginData {
  username: string;
  first_name: string;
  last_name: string;
  ci: string
}
