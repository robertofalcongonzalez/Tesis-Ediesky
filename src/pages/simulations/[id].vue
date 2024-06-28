<script setup lang="ts">
import {useSimulationData} from "@/composables/useSimulationData";
import {useSimulationStore} from "@/stores/simulation";
import {Ref} from "vue";

const route = useRoute();
const router = useRouter();
const isReadyToSend = ref(false);
const snackBar = ref(false);
const snackBarText = ref('');
const simulationsData = useSimulationData()
onMounted(async () => await simulationsData.getTypeInversion())
const simulationsStore = useSimulationStore()
const verticalHeaders: Ref<{
  income: 'Ingresos',
  expenses: 'Gastos',
  taxes: 'Impuestos',
}> = ref({
  income: 'Ingresos',
  expenses: 'Gastos',
  taxes: 'Impuestos',
})
const isReadOnly = ((route.params as Record<string, any>).id as string) !== 'new';
const sendSimulation = async () => {
  const saved = await simulationsData.sendSaveSimulation(simulationsStore.toSaveSimulation);
  if (('data' in saved)) {
    return router.replace({path: `/amortizations/${saved.data.id}`});
  }
  snackBarText.value = saved.message.name[0];
  snackBar.value = true;
}
let localStorageActor = localStorage.getItem('economic_actor') as 'Persona Jurídica' | 'Persona Natural';

enum userTypes {
  'Persona Natural' = 'Capacidad de pago',
  'Persona Jurídica' = 'Flujo de caja',
}

const formTitle = userTypes[localStorageActor];
</script>

<template>
  <v-snackbar close-delay="300" color="#e35555" absolute location="top center" v-model:model-value="snackBar"
              :text="snackBarText"></v-snackbar>
  <v-form v-model:model-value="isReadyToSend">
    <v-row>
      <h1 class="ma-auto ml-3" v-if="isReadOnly">Detalles Simulación</h1>
      <h1 class="ma-auto ml-3" v-if="!isReadOnly">Generar Simulación</h1>
      <v-divider class="ml-2" vertical></v-divider>
      <v-col>
        <v-text-field :readonly="isReadOnly"
                      :rules="[(v)=> (!!v && v.length <= 15) || 'Requerido']"
                      v-model:model-value="simulationsStore.toSaveSimulation.amount" type="number"
                      label="Monto a pedir*"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field :readonly="isReadOnly"
                      :rules="[(v)=> (!!v && v >= 3 && v <= 120) || 'Requerido']"
                      v-model:model-value="simulationsStore.toSaveSimulation.duration" type="number" min="3" step="1"
                      label="Tiempo Estimado de Pago(Meses)*"></v-text-field>
      </v-col>
      <v-col v-if="simulationsStore.typeInversions.length">
        <v-select item-title="name"
                  :rules="[(v)=> (!!v) || 'Requerido']"
                  :items="simulationsStore.typeInversions"
                  item-value="id" :readonly="isReadOnly"
                  item-text="name"
                  v-model:model-value="simulationsStore.toSaveSimulation.type_inversion"
                  label="Tipo de Crédito*"></v-select>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn color="success" :disabled="!isReadyToSend" @click="sendSimulation"
               v-if="!isReadOnly">Generar
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-table>
              <thead>
              <tr>
                <th> {{ formTitle }}</th>
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
                  <v-text-field :rules="[(v)=> !!v || 'Requerido']" :readonly="isReadOnly" type="number"
                                v-model:model-value="simulationsStore.toSaveSimulation.payment_capacity[index - 1][key]"></v-text-field>
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

<style>
</style>
