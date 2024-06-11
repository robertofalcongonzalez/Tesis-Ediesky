import {defineStore} from "pinia";
import {EconomicActor} from "@/services/user/types";
import {Ref} from "vue";

export const useUserStore = defineStore('user', () => {
  const economicActors: Ref<EconomicActor[]> = ref([])
  const saveEconomicActors = (data: EconomicActor[]) => {
    economicActors.value = [];
    economicActors.value.push(...data);
  };
  function $reset() {
    economicActors.value = []
  }

  return {economicActors, $reset, saveEconomicActors}
})
