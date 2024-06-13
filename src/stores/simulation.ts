// Utilities
import {defineStore} from 'pinia'

export const useSimulationStore = defineStore('simulations', () => {
  const simulations = ref([''])
  const query = {
    filters: {},
    limit: 10,
    offset: 0,
  }
  const typeInversions = ref([''])
  const toSaveSimulation = ref({
    amount: 0, duration: 0, type_inversion: '', payment_capacity: [
      {income: 0, expenses: 0, taxes: 0},
      {income: 0, expenses: 0, taxes: 0},
      {income: 0, expenses: 0, taxes: 0},
      {income: 0, expenses: 0, taxes: 0},
      {income: 0, expenses: 0, taxes: 0},
      {income: 0, expenses: 0, taxes: 0},
    ]
  })
  const saveSimulations = (simulationFromServer: { results: [] }) => simulations.value = simulationFromServer.results;
  const saveTypeInversion = (typeInversionFromServer: {
    results: []
  }) => typeInversions.value = typeInversionFromServer.results;

  function $resetSimulationToSave() {
    toSaveSimulation.value = {
      amount: 0, duration: 0, type_inversion: '', payment_capacity: [
        {income: 0, expenses: 0, taxes: 0},
        {income: 0, expenses: 0, taxes: 0},
        {income: 0, expenses: 0, taxes: 0},
        {income: 0, expenses: 0, taxes: 0},
        {income: 0, expenses: 0, taxes: 0},
        {income: 0, expenses: 0, taxes: 0},
      ]
    }
  }

  function $reset() {
    simulations.value = [];
  }

  return {saveSimulations, simulations, typeInversions, toSaveSimulation,$resetSimulationToSave, saveTypeInversion, $reset, query}
})
