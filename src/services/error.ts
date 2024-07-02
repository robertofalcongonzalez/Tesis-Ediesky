import router from "@/router";
import {useAppStore} from "@/stores/app";

const routerInstance = router;
const store = useAppStore()
export enum networkErrors {
  network = 'NETWORK_ERROR',
  server = 'SERVER_ERROR',
  perms = 'AUTHORIZATION_ERROR',
  auth = 'AUTHENTICATION_ERROR',
  validation = 'VALIDATION_ERROR',
  notFound = 'NOT_FOUND_ERROR',
}

export interface ResProtocol {
  complete: boolean;
  data: Record<string, any>;
  message: any;
}

class CustomNetworkError extends Error {
  public response: ResProtocol;

  constructor(name: string, response: ResProtocol) {
    super(name);
    this.response = response;
  }
}

// tslint:disable-next-line:max-classes-per-file
export class NetworkError extends CustomNetworkError {
  constructor(response: ResProtocol) {
    super(networkErrors.network, response);
    store.setError(response.message.name);

  }
}

// tslint:disable-next-line:max-classes-per-file
export class ServerError extends CustomNetworkError {
  constructor(response: ResProtocol) {
    super(networkErrors.server, response);
    store.setError(response.message.name);

  }
}

// tslint:disable-next-line:max-classes-per-file
export class AuthorizationError extends CustomNetworkError {
  constructor(response: ResProtocol) {
    super(networkErrors.perms, response);
    store.setError(response.message.name);

  }
}

// tslint:disable-next-line:max-classes-per-file
export class ValidationError<T extends Partial<Record<string, string[]>>> extends CustomNetworkError {
  constructor(response: ResProtocol) {
    super(networkErrors.validation, response);
    store.setError(response.message.name);

  }

}

// tslint:disable-next-line:max-classes-per-file
export class AuthenticationError<T extends Partial<Record<string, string[]>>> extends CustomNetworkError {
 constructor(response: ResProtocol) {
    super(networkErrors.auth, response);
   // @ts-ignore
   store.setError(response.message.name, routerInstance.currentRoute._value.name !== '/Login');
    routerInstance.replace({name: '/Login'});
  }
}

// tslint:disable-next-line:max-classes-per-file
export class NotFoundError extends CustomNetworkError {
  constructor(response: ResProtocol) {
    super(networkErrors.notFound, response);
    store.setError(response.message.name);
    routerInstance.replace({name: 'simulations'});
  }
}
