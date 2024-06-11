<script setup lang="ts">
const headers: Record<string, any>[] = [
  {
    align: 'start',
    key: 'id',
    title: 'ID',
  },
  {key: 'calories', title: 'Tipo de Inversión'},
  {key: 'fat', title: 'Fecha'},
  {key: 'carbs', title: 'Capacidad de pagos'},
  {key: 'actions', title: 'Accion'},
]
</script>

<template>
  <v-container fluid>
    <v-row>
        <h3 class="ma-auto ml-3">Listado de simulaciones</h3>
      <v-divider class="ml-2" vertical></v-divider>
      <v-spacer></v-spacer>
      <v-col class="d-flex justify-end">
        <v-btn :to="{ path: 'new'}">Generar</v-btn>
      </v-col>
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
