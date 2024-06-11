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
