<script setup lang="ts">
import {definePage} from "unplugin-vue-router/runtime";
import {useAuthData} from "@/composables/useAuthData";
import {useUserData} from "@/composables/useUserData";
import {useUserStore} from "@/stores/user";
import {useAppStore} from "@/stores/app";
const appStore = useAppStore()
const isRegisterValid = ref(false);
const isLoginValid = ref(false);
onMounted(async ()=>{
  if(appStore.error){
    appStore.snackBarText = appStore.error
    appStore.snackBar = true;
  }
})
const rules = ref({
  email: [
    (v: string) => !!v || 'Correo Requerido',
    (v: string) => /.+@.+\..+/.test(v) || 'Debe ser un correo válido',
  ],
  password: [
    (v: string) => !!v || 'Contraseña Requerida',
    (v: string) => v.length >= 1 || 'Contraseña debe ser de mas de 1 caracteres',
  ],
});
const useAuth = useAuthData();
const useUser = useUserData();
const userStore = useUserStore();
if (localStorage.getItem('token')) {
  localStorage.removeItem('token')
}
const {sendRegister, sendLogin} = useAuth;
const {getActors, searchTypeActorByActorId, typeActorArray} = useUser;
await getActors();
const {loginRow, registerRow, isRegister} = useAuth;
registerRow.value.economic_actor = userStore.economicActors[0].id;
registerRow.value.type_actor = typeActorArray.value[0].id;
const economicActorChanged = (value: number | string) => {
  typeActorArray.value = userStore.economicActors[searchTypeActorByActorId(value)].type_actor
  registerRow.value.type_actor = typeActorArray.value[0].id;
}
definePage({
  meta: {
    layout: 'noLayout',
  },
})
</script>
<template>
  <v-container class="fill-height">
    <v-card v-if="isRegister" min-width="500px" class="ma-auto align-self-center">
      <v-card-title>Registrar</v-card-title>
      <v-card-text>
        <v-form v-model:model-value="isRegisterValid">
          <v-row>
            <v-col>
              <v-text-field
                :rules="[(v)=> (!!v && v.length <= 150 && v.length >= 3) || 'El nombre tiene que tener menos de 150 caracteres']"
                v-model:model-value="registerRow.first_name" label="Nombre*"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                :rules="[(v)=> (!!v && v.length <= 150 && v.length >= 3) || 'Los apellidos tiene que tener menos de 150 caracteres']"
                v-model:model-value="registerRow.last_name" label="Apellidos*"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                :rules="[(v)=> (!!v && /^[0-9]{11}$/.test(v))  || 'El Carnét de Identidad tiene que tener 11 caracteres']"
                v-model:model-value="registerRow.ci" type="number" min="0" step="1"
                label="Carnét de Identidad*"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select v-if="registerRow.economic_actor"
                        :rules="[(v)=> !!v   || 'El Actor Económico es Requerido']"
                        :items="userStore.economicActors"
                        item-title="name"
                        @update:modelValue="economicActorChanged"
                        item-value="id"
                        v-model:model-value="registerRow.economic_actor"
                        label="Actor Económico"></v-select>
            </v-col>
            <v-col>
              <v-select
                :rules="[(v)=> !!v   || 'El Tipo de Actor Económico es Requerido']"
                :items="typeActorArray"
                item-title="name"
                item-value="id"
                v-model:model-value="registerRow.type_actor"
                label="Tipo de Actor Económico"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field :rules="rules.email" autocomplete="email" v-model:model-value="registerRow.email"
                            label="Correo*"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field :rules="rules.password" autocomplete="password"
                            v-model:model-value="registerRow.password" label="Contraseña*"
                            type="password"></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn class="ml-6" color="info" @click="isRegister = false">Atrás</v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn @click="sendRegister" color="success" :disabled="!isRegisterValid" class="ml-6">Registrar</v-btn>
            </v-col>
          </v-row>
        </v-form>

      </v-card-text>
    </v-card>
    <v-card v-else min-width="500px" class="ma-auto align-self-center">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form v-model:model-value="isLoginValid">
          <v-row>
            <v-col>
              <v-text-field :rules="rules.email" v-model:model-value="loginRow.email" label="Correo"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field :rules="rules.password" v-model:model-value="loginRow.password" label="Contraseña"
                            type="password"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="space-around">
          <v-btn :disabled="!isLoginValid" color="success" @click="sendLogin">Aceptar</v-btn>
        </v-row>
        <v-divider class="mt-8 mb-4"></v-divider>
        <v-row justify="center">
          <v-col cols="auto">
            <h4>O crear una nueva cuenta</h4>
            <v-btn class="ml-6" color="orange" @click="isRegister = true">Registrar</v-btn>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped lang="sass">

</style>
