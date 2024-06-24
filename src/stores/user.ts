import {defineStore} from "pinia";
import {EconomicActor, User} from "@/services/user/types";
import {Ref} from "vue";

export const useUserStore = defineStore('user', () => {
  const economicActors: Ref<EconomicActor[]> = ref([])
  const users: Ref<User[]> = ref([])
  const saveEconomicActors = (data: EconomicActor[]) => {
    economicActors.value = [];
    economicActors.value.push(...data);
  };
  const userQuery = {
    filters: {},
    limit: 10,
    offset: 0,
  }
  const saveUsers = (data: User[]) => {
    users.value = [];
    users.value.push(...data);
  };

  function $reset() {
    economicActors.value = []
  }

  return {economicActors, users,userQuery, $reset, saveEconomicActors, saveUsers}
})
