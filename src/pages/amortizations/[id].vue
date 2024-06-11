<script setup lang="ts">
const headers: Record<string, any>[] = [
  {
    align: 'start',
    key: 'id',
    title: 'Fecha',
  },
  {key: 'calories', title: 'Importe'},
  {key: 'fat', title: 'Saldo Utilizado'},
  {key: 'carbs', title: 'Intereses Devengados'},
  {key: 'actions', title: 'Total a Pagar'},
]
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
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table :headers="headers"></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">

</style>
