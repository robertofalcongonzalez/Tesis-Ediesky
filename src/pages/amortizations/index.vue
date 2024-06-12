<script setup lang="ts">
import {useAmortizationData} from "@/composables/useAmortizationData";
import {useAmortizationStore} from "@/stores/amortization";

const amortizationData = useAmortizationData()
onMounted(async () => {
  await amortizationData.getAmortizations()
})
const amortizationStore = useAmortizationStore()
const headers: Record<string, any>[] = [
  {
    align: 'start',
    key: 'id',
    title: 'ID',
  },
  {key: 'simulation', title: 'Simulación'},
  {key: 'duration', title: 'Duracion(meses)'},
  {key: 'actions', title: 'Acciones'},
]
const showDetails = (item: any) => {
  amortizationData.mapToDetails(unref(item))
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <h3 class="my-4 ml-3">Listado de Amortizaciones</h3>
      <v-divider class="ml-2" vertical></v-divider>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :items="amortizationStore.amortizations" :headers="headers">
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
