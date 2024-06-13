import {useAmortizationStore} from "@/stores/amortization";
import {getAmortization} from "@/services/amortization/amortization-service";

export function useAmortizationData() {
  const amortizationStore = useAmortizationStore();

  const getAmortizations = async (query: any = amortizationStore.query) => {
    amortizationStore.query.limit = query.itemsPerPage;
    amortizationStore.query.offset = (query.page -1)* query.itemsPerPage;
    amortizationStore.query.filters = {};
    const amortizations = await getAmortization(amortizationStore.query)

    const {saveAmortizations} = amortizationStore;
    saveAmortizations(amortizations);
    return true
  }
  const getAmortizationById = async (query: {id: any}) => {
    const amortization = await getAmortizationById(query)

    const {saveAmortization} = amortizationStore;
    saveAmortization(amortization);
    return true
  }
  const mapToDetails = (details: any) => {
    amortizationStore.amortization = details;
  }
  return {getAmortizations, mapToDetails, getAmortizationById}
}
