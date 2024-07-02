<script setup lang="ts">

import {definePage} from "unplugin-vue-router/runtime";
import {useUserData} from "@/composables/useUserData";
import {useUserStore} from "@/stores/user";


const usersData = useUserData()
const usersStore = useUserStore()
onMounted(async () => {
  await usersData.getAllUsers()
})
const headers: Record<string, any>[] = [
  {
    align: 'start',
    key: 'id',
    title: 'ID',
  },
  {key: 'first_name', title: 'Nombre'},
  {key: 'last_name', title: 'Apellidos'},
  {key: 'email', title: 'Correo'},
  // {key: 'actions', title: 'Acciones'},
]

definePage({
  name: 'users'
})
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table density="compact"
                      v-model:items-per-page="usersStore.userQuery.limit"
                      :items="usersStore.users" :headers="headers">

        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">

</style>
