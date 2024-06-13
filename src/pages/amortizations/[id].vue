<script setup lang="ts">
import {useAmortizationStore} from "@/stores/amortization";
import {useAmortizationData} from "@/composables/useAmortizationData";

const route = useRoute();
const amortizationStore = useAmortizationStore()
const amortizationData = useAmortizationData()
const headers: Record<string, any>[] = [
  {
    align: 'start',
    key: 'date_at',
    title: 'Fecha',
  },
  {key: 'amount', title: 'Importe'},
  {key: 'balance', title: 'Saldo Utilizado'},
  {key: 'taxes', title: 'Intereses Devengados'},
  {key: 'total', title: 'Total a Pagar'},
]
onMounted(async()=> await amortizationData.getAmortizationDataById(route.params as {id: any}))
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
      <h2>Tipo de Inversión: {{data.type_inversion}}</h2>
    </v-row>
    <v-row>
      <h4 class="ma-auto ml-3">Descripción del tipo de inversión: {{data.description_inversion}}</h4>
      <v-spacer></v-spacer>
      <h4 class="ma-auto ml-3">Tasa de Interés: {{data.interest_rate}}</h4>
      <v-spacer></v-spacer>
      <h4 class="ma-auto ml-3">Capacidad de pago: {{data.payment_capacity}}</h4>


    </v-row>
    <v-row>
      <v-col>
        <v-data-table :items="data.reports" :headers="headers"></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">

</style>
