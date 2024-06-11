<script setup lang="ts">
const headers: Record<string, any>[] = [
  {
    align: 'start',
    key: 'id',
    title: 'ID',
  },
  {key: 'calories', title: 'Simulación'},
  {key: 'fat', title: 'Fecha'},
  {key: 'actions', title: 'Accion'},
]
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
        <v-data-table :headers="headers">
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="info" :to="{path: `/${item.id}`}">Detalles</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">

</style>
