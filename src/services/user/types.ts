export interface EconomicActor {
  id: string;
  name: string;
  description: string;
  type_actor: TypeActor[];

}

export interface TypeActor {
  id: string;
  name: string;
  description: string;
}

export interface User {
  username: string;
  first_name: string;
  last_name: string
  email: string
  id: number | string;
  phone: number;
}
