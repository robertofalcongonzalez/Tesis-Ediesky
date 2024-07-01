// Utilities
import {defineStore} from 'pinia'

const simulationData = {
  amount: 0, duration: 0, type_inversion: '', payment_capacity: [
    {income: 0, expenses: 0, taxes: 0, debt: 0},
    {income: 0, expenses: 0, taxes: 0, debt: 0},
    {income: 0, expenses: 0, taxes: 0, debt: 0},
    {income: 0, expenses: 0, taxes: 0, debt: 0},
    {income: 0, expenses: 0, taxes: 0, debt: 0},
    {income: 0, expenses: 0, taxes: 0, debt: 0},
  ]
}
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
      {income: 0, expenses: 0, taxes: 0, debt: 0},
      {income: 0, expenses: 0, taxes: 0, debt: 0},
      {income: 0, expenses: 0, taxes: 0, debt: 0},
      {income: 0, expenses: 0, taxes: 0, debt: 0},
      {income: 0, expenses: 0, taxes: 0, debt: 0},
      {income: 0, expenses: 0, taxes: 0, debt: 0},
    ]
  })
  const saveSimulations = (simulationFromServer: { results: [] }) => simulations.value = simulationFromServer.results;
  const initializeSimulationData = () => toSaveSimulation.value = structuredClone(simulationData);

  const saveTypeInversion = (typeInversionFromServer: {
    results: []
  }) => typeInversions.value = typeInversionFromServer.results;

  function $resetSimulationToSave() {
    toSaveSimulation.value = {
      amount: 0, duration: 0, type_inversion: '', payment_capacity: [
        {income: 0, expenses: 0, taxes: 0, debt: 0},
        {income: 0, expenses: 0, taxes: 0, debt: 0},
        {income: 0, expenses: 0, taxes: 0, debt: 0},
        {income: 0, expenses: 0, taxes: 0, debt: 0},
        {income: 0, expenses: 0, taxes: 0, debt: 0},
        {income: 0, expenses: 0, taxes: 0, debt: 0},

      ]
    }
  }

  function $reset() {
    simulations.value = [];
  }

  return {
    saveSimulations,
    simulations,
    typeInversions,
    initializeSimulationData,
    toSaveSimulation,
    $resetSimulationToSave,
    saveTypeInversion,
    $reset,
    query
  }
})
