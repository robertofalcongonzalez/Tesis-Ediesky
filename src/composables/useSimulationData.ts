import {
  deleteSimulation,
  getSimulations,
  getTypeInversions,
  saveSimulation
} from "@/services/simulation/simulation-service";
import {useSimulationStore} from "@/stores/simulation";

export function useSimulationData() {
  const simulationStore = useSimulationStore();


  const getSimulation = async (query: any = simulationStore.query) => {
    simulationStore.query.limit = query.itemsPerPage;
    simulationStore.query.offset = (query.page - 1) * query.itemsPerPage;
    simulationStore.query.filters = {};
    const simulations = await getSimulations(simulationStore.query)
    const {saveSimulations} = simulationStore;
    saveSimulations(simulations);
    return true
  }

  const getTypeInversion = async () => {
    const typeInversion = await getTypeInversions()

    const {saveTypeInversion} = simulationStore;
    saveTypeInversion(typeInversion);
    return true
  }

  const sendDeleteSimulation = async (deleteElement: any) => {
    await deleteSimulation(deleteElement)
  }
  const sendSaveSimulation = async () => {
    const types: Record<string, any> = {
      income: 'INCOME',
      expenses: 'SPENT',
      taxes: 'TRIBUTE',
      debt: 'DEBT',
    }
    const newStructure: { type: string, [propName: string]: any }[] = [];
    let i = 0;
    for (const [names] of Object.entries(simulationStore.toSaveSimulation.payment_capacity[0])) {
      newStructure[i] = {
        type: `${types[names]}`,
        params_1: '',
        params_2: '',
        params_3: '',
        params_4: '',
        params_5: '',
        params_6: '',
      };
      for (const [indexO, values] of Object.entries(simulationStore.toSaveSimulation.payment_capacity)) {
        // @ts-ignore
        newStructure[i][`params_${+indexO + 1}`] = +values[names];
      }
      i++;
    }
    const dataToSend = JSON.parse(JSON.stringify(simulationStore.toSaveSimulation));
    dataToSend.payment_capacity = newStructure;
    const data = await saveSimulation(dataToSend)
    simulationStore.initializeSimulationData();
    return data;

  }

  const mapToDetails = (details: any) => {
    simulationStore.toSaveSimulation.amount = details.amount
    simulationStore.toSaveSimulation.duration = details.duration
    simulationStore.toSaveSimulation.type_inversion = details.type_inversion
    simulationStore.toSaveSimulation.payment_capacity = simulationStore.toSaveSimulation.payment_capacity.map((_, index) => {
      return {
        income: details.payment_capacity.find((pC: any) => pC.type === 'INCOME')[`params_${+index + 1}`],
        expenses: details.payment_capacity.find((pC: any) => pC.type === 'SPENT')[`params_${+index + 1}`],
        taxes: details.payment_capacity.find((pC: any) => pC.type === 'TRIBUTE')[`params_${+index + 1}`],
        debt: details.payment_capacity.find((pC: any) => pC.type === 'DEBT')[`params_${+index + 1}`],
      }
    })
  }

  return {getSimulation, sendSaveSimulation, getTypeInversion, mapToDetails, sendDeleteSimulation}
}
