<script setup lang="ts">
import {useAmortizationStore} from "@/stores/amortization";
import {useAmortizationData} from "@/composables/useAmortizationData";

const route = useRoute();
const amortizationStore = useAmortizationStore()
const amortizationData = useAmortizationData()
const headers: Record<string, any>[] = [
  {
    align: 'start',
    key: 'duration',
    title: 'Fecha',
  },
  {key: 'amount', title: 'Importe'},
  {key: 'money', title: 'Saldo Utilizado'},
  {key: 'interests', title: 'Intereses Devengados'},
  {key: 'total', title: 'Total a Pagar'},
]
onMounted(async()=> await amortizationData.getAmortizationById(route.query as {id: any}))
const data = computed(() => amortizationStore.amortization);
</script>

<template>
  <v-container fluid>
    <v-row>
      <h3 class="ma-auto ml-3">Detalles de Amortización</h3>
      <v-divider class="ml-2" vertical></v-divider>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <h2 class="ma-auto ml-3">Cronograma de Amortización</h2>
      <v-spacer></v-spacer>
      <h2>{{data.type_inversion}}</h2>
    </v-row>
    <v-row>
      {{data.description}}
      <v-spacer></v-spacer>
      {{data.interest_rate}}

    </v-row>
    <v-row>
      <v-col>
        <v-data-table :items="data.report" :headers="headers"></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">

</style>
