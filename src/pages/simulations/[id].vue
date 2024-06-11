<script setup lang="ts">
const sendData = ref({})
const route = useRoute();
const isReadyToSend = ref(false);
const tableValues = ref<Record<string, number>[]>([
  {income: 0, expenses: 0, taxes: 0},
  {income: 0, expenses: 0, taxes: 0},
  {income: 0, expenses: 0, taxes: 0},
  {income: 0, expenses: 0, taxes: 0},
  {income: 0, expenses: 0, taxes: 0},
  {income: 0, expenses: 0, taxes: 0},
])
const verticalHeaders = ref({
  income: 'Ingresos',
  expenses: 'Gastos',
  taxes: 'Impuestos',
})
const isReadOnly = ((route.params as Record<string, any>).id as string) !== 'new';
</script>

<template>
  <v-form v-model:model-value="isReadyToSend">
    <v-row>
      <h1 class="ma-auto ml-3">Generar Simulación</h1>
      <v-divider class="ml-2" vertical></v-divider>
      <v-col>
        <v-text-field
          :rules="[(v)=> (!!v && v.length <= 15) || 'Requerido']"
          v-model:model-value="sendData" type="number" label="Monto a pedir*"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          :rules="[(v)=> (!!v && v > 0 && v <= 120) || 'Requerido']"
          v-model:model-value="sendData" type="number" label="Tiempo Estimado de Pago(Meses)*"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          :rules="[(v)=> (!!v) || 'Requerido']"
          v-model:model-value="sendData" label="Tipo de Crédito*"></v-text-field>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn color="success" :disabled="!isReadyToSend" v-if="!isReadOnly">Generar</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-table>
              <thead>
              <tr>
                <th></th>
                <th v-for="key in 6" :key="key" class="text-center">
                  {{ key }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                v-for="(value, key) in verticalHeaders"
                :key="`tr${key}`"
              >
                <td>{{ value }}</td>
                <td v-for="index in 6" :key="index">
                  <v-text-field :rules="[(v)=> !!v || 'Requerido']"
                                v-model:model-value="tableValues[index - 1][key]"></v-text-field>
                </td>
              </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-form>

</template>

<style scoped lang="sass">

</style>
