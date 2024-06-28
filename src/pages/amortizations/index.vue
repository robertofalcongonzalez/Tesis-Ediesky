<script setup lang="ts">
import {useAmortizationData} from "@/composables/useAmortizationData";
import {useAmortizationStore} from "@/stores/amortization";

const amortizationData = useAmortizationData()
onMounted(async () => {
  await amortizationData.getAmortizations()
})
const amortizationStore = useAmortizationStore()
const headers: Record<string, any>[] = [

  {key: 'serial', title: 'Serial', align: 'start',},
  {key: 'created_at', title: 'Fecha'},
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
        <v-data-table density="compact" :items="amortizationStore.amortizations" :headers="headers">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="info" density="compact" :to="`${item.id}`" @click="showDetails(item)">Detalles</v-btn>
          </template>
          <template v-slot:[`item.created_at`]="{ item }">
            {{ item.created_at.split('T')[0] + ' ' + item.created_at.split('T')[1].split('.')[0] }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">

</style>
