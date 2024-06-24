import {useUserStore} from "@/stores/user";
import {getEconomicActors, getUsers} from "@/services/user/user-service";
import {useAuthData} from "@/composables/useAuthData";
import {Ref} from "vue";

export function useUserData() {
  const userStore = useUserStore();
  const auth = useAuthData();
  const typeActorArray: Ref<any> = ref([])
  const searchTypeActorByActorId = (id: string | number) => userStore.economicActors.findIndex((ea) => ea.id === id);

  const getActors = async () => {
    const actors = await getEconomicActors()

    const {saveEconomicActors} = userStore;
    saveEconomicActors(actors.results);
    auth.setEActor(actors.results[0].id);
    typeActorArray.value = userStore.economicActors[searchTypeActorByActorId(auth.registerRow.value.economic_actor)].type_actor
    return true
  }
  const getAllUsers = async () => {
    const users = await getUsers()

    const {saveUsers} = userStore;
    saveUsers(users.results);
    return true
  }


  return {getActors, getAllUsers, searchTypeActorByActorId, typeActorArray}
}
