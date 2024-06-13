<script setup lang="ts">

import {useSimulationData} from "@/composables/useSimulationData";
import {useSimulationStore} from "@/stores/simulation";
import {definePage} from "unplugin-vue-router/runtime";


const simulationsData = useSimulationData()
const simulationsStore = useSimulationStore()

onMounted(async () => {
  await simulationsData.getSimulation()
  await simulationsData.getTypeInversion()
})
const headers: Record<string, any>[] = [
  {
    align: 'start',
    key: 'id',
    title: 'ID',
  },
  {key: 'type_inversion', title: 'Tipo de Inversión'},
  {key: 'duration', title: 'Duración(Meses)'},
  {key: 'amount', title: 'Monto'},
  {key: 'actions', title: 'Acciones'},
]
const cleanSimulation = () => {
  return simulationsStore.$resetSimulationToSave();
}
const showDetails = (item: any) => {
  simulationsStore.$resetSimulationToSave();
  simulationsData.mapToDetails(unref(item))
}
definePage({
  name: 'simulations'
})
</script>

<template>
  <v-container fluid>
    <v-row>
      <h3 class="ma-auto ml-3">Listado de simulaciones</h3>
      <v-divider class="ml-2" vertical></v-divider>
      <v-spacer></v-spacer>
      <v-col class="d-flex justify-end">
        <v-btn color="success" @click="cleanSimulation" :to="{ path: 'new'}">Generar</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="Array.isArray(simulationsStore.simulations)">
      <v-col>
        <v-data-table
          v-model:items-per-page="simulationsStore.query.limit"
          @update:options="simulationsData.getSimulation"
          :items="simulationsStore.simulations" :headers="headers">
          <template v-slot:[`item.type_inversion`]="{ item }">
            {{ `${simulationsStore.typeInversions.find((key) => key?.id === item?.type_inversion)?.name}` }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="info" :to="`${item.id}`" @click="showDetails(item)">Detalles</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">

</style>
