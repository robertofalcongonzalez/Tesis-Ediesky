// Utilities
import {defineStore} from 'pinia'

export const useAmortizationStore = defineStore('amortization', () => {
  const amortizations = ref([])
  const amortization = ref({})
  const query = {
    filters: {},
    limit: 10,
    offset: 0,
  }
  const saveAmortizations = (amortizationFromServer: {
    results: []
  }) => amortizations.value = amortizationFromServer.results;

  function $reset() {
    amortizations.value = [];
  }

  return {saveAmortizations, amortizations, amortization, query, $reset}
})
