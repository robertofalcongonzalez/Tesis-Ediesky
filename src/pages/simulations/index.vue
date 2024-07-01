<script setup lang="ts">

import {useSimulationData} from "@/composables/useSimulationData";
import {useSimulationStore} from "@/stores/simulation";
import {definePage} from "unplugin-vue-router/runtime";
import {ref} from 'vue';


const simulationsData = useSimulationData()
const simulationsStore = useSimulationStore()

onMounted(async () => {
  await simulationsData.getSimulation()
  await simulationsData.getTypeInversion()
})
const groupName = localStorage.getItem('role')

const confirm = async (item: any) => {
  await simulationsData.sendDeleteSimulation(item.id)
  await simulationsData.getSimulation()
  showModal.value = false;

}

const closeModal = (item: any) => {
  showModal.value = false;
}

const get_headers = () => {
  let headers = [
    {key: 'type_inversion', title: 'Tipo de Inversión'},
    {key: 'duration', title: 'Duración(Meses)'},
    {key: 'amount', title: 'Monto'},
    {key: 'actions', title: 'Acciones'},
  ];
  if ("Admin" === groupName) {
    headers.unshift({key: 'email', title: 'Usuario', align: 'start'})
  }
  return headers
}
const selectedSimulation: object = ref({});
const cleanSimulation = () => {
  return simulationsStore.$resetSimulationToSave();
}
const showDetails = (item: any) => {
  simulationsStore.$resetSimulationToSave();
  simulationsData.mapToDetails(unref(item))
}
const showModal: boolean = ref(false);

const confirmModal = (item: any) => {
  showModal.value = true;
  selectedSimulation.value = item;
}

definePage({
  name: 'simulations'
})
</script>

<template>
  <v-container fluid>
    <Modal :showModal="showModal" :item="selectedSimulation" @update:showModal="val => showModal = val"
           @close="closeModal" @confirm="confirm"/>
    <v-row>
      <h3 class=" ma-auto ml-3
    ">Listado de simulaciones</h3>
      <v-divider class="ml-2" vertical></v-divider>
      <v-spacer></v-spacer>
      <v-col class="d-flex justify-end">
        <v-btn color="success" @click="cleanSimulation" :to="{ path: 'new'}">Generar</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="Array.isArray(simulationsStore.simulations)">
      <v-col>
        <v-data-table density="compact"
                      v-model:items-per-page="simulationsStore.query.limit"
                      @update:options="simulationsData.getSimulation"
                      :items="simulationsStore.simulations" :headers="get_headers()">
          <template v-slot:[`item.type_inversion`]="{ item }">
            {{ `${simulationsStore.typeInversions.find((key) => key.id === item.type_inversion)?.name}` }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="info" density="compact" :to="`${item.id}`" @click="showDetails(item)">Detalles</v-btn>
            <v-btn color="error" style="margin-left: 3%" density="compact" @click="confirmModal(item)">Eliminar
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">

</style>
