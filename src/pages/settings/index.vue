<script setup lang="ts">

import {definePage} from "unplugin-vue-router/runtime";
import {useSettingData} from "@/composables/useSettingData";
import {useSettingStore} from "@/stores/setting";
import {format} from "date-fns";

const settingsData = useSettingData()
const settingsStore = useSettingStore()
onMounted(async () => {
  await settingsData.getAllSettings()
})
const setDate = (field: 'start_date' | 'end_date', event: string) => {
  settingsStore.setting[field] = format(new Date(event), "yyyy-MM-dd");
}

definePage({
  name: 'settings'
})
</script>

<template>
  <v-container fluid>
    <v-row v-if="Object.keys(settingsStore.setting).length">
      <v-col cols="4">
        <v-text-field density="compact" label="Nombre" :rules="[(v)=> !!v || 'Requerido']"
                      v-model:model-value="settingsStore.setting.name"></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-menu persistent close-on-content-click>
          <template v-slot:activator="{props}">
            <v-text-field density="compact" label="Fecha de Inicio" :rules="[(v)=> !!v || 'Requerido']" v-bind="props"
                          readonly
                          v-model:model-value="settingsStore.setting.start_date"></v-text-field>
          </template>
          <v-date-picker
            @update:model-value="setDate('start_date', $event)"
          ></v-date-picker>
        </v-menu>

      </v-col>
      <v-col cols="4">
        <v-menu persistent close-on-content-click>
          <template v-slot:activator="{props}">
            <v-text-field density="compact" label="Fecha de Finalizacion" :rules="[(v)=> !!v || 'Requerido']"
                          v-bind="props" readonly
                          v-model:model-value="settingsStore.setting.end_date"></v-text-field>
          </template>
          <v-date-picker
            @update:model-value="setDate('end_date', $event)"
          ></v-date-picker>
        </v-menu>

      </v-col>
      <v-col cols="12">
        <v-textarea :rows="2" density="compact" label="Descripción" :rules="[(v)=> !!v || 'Requerido']"
                    v-model:model-value="settingsStore.setting.description"></v-textarea>
      </v-col>
      <template v-for="(_, key) in settingsStore.setting">

        <v-col v-if="key.startsWith('month')" cols="3" :key="key">
          <v-text-field density="compact" type="number" :rules="[(v)=> !!v || 'Requerido']"
                        :label="`Mes ${key.split('_')[1]}`"
                        v-model:model-value="settingsStore.setting[key]">
            <template v-slot:append-inner>
              {{ "%" }}
            </template>
          </v-text-field>

        </v-col>
      </template>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-btn @click="settingsData.saveSetting" color="success">Guardar</v-btn>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">

</style>
