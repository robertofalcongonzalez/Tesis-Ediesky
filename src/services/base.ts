import {MAIN_SERVICE} from "@/constants";
import {AuthenticationError, AuthorizationError, NotFoundError, ServerError, ValidationError} from "@/services/error";

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
export const severErrors: Record<number, any> = {
  400: ValidationError,
  401: AuthenticationError,
  403: AuthorizationError,
  404: NotFoundError,
  500: ServerError,
};
async function parseResponse<T>(res: Response) {
  if(res.status in severErrors) {
      return new severErrors[res.status](await res.json());
  }
  const {complete, error, ...data} = res.status !== 204 ? await res.json() : {complete: true, error: {message: null}};
  if (!complete) throw new Error(error.message);
  return {...data, complete} as T;
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
    const token = localStorage.getItem('token');
    Object.assign(reqOptions.headers,{Authorization: `Bearer ${token}`})
  }
  if (body) {
    reqOptions.body = typeof body === 'object' ? JSON.stringify(body) : body;
  }

  let queryString = '';
  if (query) {
   queryString = `?${btoa(JSON.stringify(query))}`
  }

  return fetch(`${host}${path}${queryString}`, reqOptions as RequestOptions).then(parseResponse<T>)
}
