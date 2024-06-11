import {MAIN_SERVICE} from "@/constants";
import {useAuthStore} from "@/stores/auth";

export interface FetchOptions {
  headers?: Record<string, string>,
  query?: Record<string, any>,
  method?: string,
  body?: string | Record<string, any>,
  host?: string,
  useAuth?: boolean

  [optName: string]: any
}

export interface RequestOptions extends FetchOptions {
  body: string
}

function requiredEnv(env: string) {
  throw new TypeError(`The ${env} environment variable is strictly required.`);
}

function assertPath(path: string) {
  const type = typeof path;
  if (type !== 'string') {
    throw new TypeError(`The path should be a string, instead received a ${type}`);
  }
}

export const hosts = {
  MAIN_SERVICE: MAIN_SERVICE || requiredEnv('MAIN_SERVICE'),
};

async function parseResponse<T>(res: Response) {
  const {complete, error, ...data} = res.status !== 204 ? await res.json() : {complete: true, error: {message: null}};

  if (!complete) throw new Error(error.message);
  return data as T;
}

export function request<T>(path: string, options: FetchOptions = {} as FetchOptions) {
  const {
    headers,
    useAuth = true,
    query = null,
    method = 'GET',
    body,
    host = hosts.MAIN_SERVICE,
    ...extraOpts
  } = options;
  assertPath(path);


  const reqOptions = {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...extraOpts
  };
  if (useAuth) {
    const authStore = useAuthStore()
    const token = authStore.getters.getToken;
    Object.assign(reqOptions, token && {Authorization: `Bearer ${token}`})
  }
  if (body) {
    reqOptions.body = typeof body === 'object' ? JSON.stringify(body) : body;
  }

  let queryString = '';
  if (query) {
    queryString = new URLSearchParams(query).toString();
    queryString = queryString && `?${queryString}`;
  }

  return fetch(`${host}${path}${queryString}`, reqOptions as RequestOptions).then(parseResponse<T>);
}
