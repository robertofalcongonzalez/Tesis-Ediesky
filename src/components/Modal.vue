<script setup lang="ts">
import {defineEmits, defineProps, watch} from 'vue';

// Definir los props que recibirá el componente
const props = defineProps({
  item: Object,
  showModal: Boolean
});

const emit = defineEmits(['update:showModal', 'confirm', 'close']);

const closeModal = () => {
  emit('close');
};
// Watch para emitir el evento update:showModal cuando showModal cambia
watch(() => props.showModal, (newVal) => {
  emit('update:showModal', newVal);
});

const confirmAction = () => {
  emit('confirm', props.item);
  closeModal();
};
</script>

<template>
  <v-dialog
    :model-value="showModal"
    @update:model-value="val => emit('update:showModal', val)"
    max-width="400"
    persistent
  >
    <v-card
      prepend-icon="mdi-map-marker"
      text="¿Confirma que desea eliminar la simulación seleccionada?"
      title="Confirmar eliminar"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="closeModal">
          Cancelar
        </v-btn>

        <v-btn @click="confirmAction">
          Aceptar
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="sass">

</style>
