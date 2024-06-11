<script setup lang="ts">
import {definePage} from "unplugin-vue-router/runtime";
import {LoginData, RegisterData} from "@/services/auth/types";
import {login, register} from "@/services/auth/auth-service"
import {Ref} from "vue";

const router = useRouter();
const isRegister = ref(false)
const isRegisterValid = ref(false);
const isLoginValid = ref(false);
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
const registerObject: Ref<RegisterData> = ref({
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  username: '',
  ci: ''
});
const loginObject: Ref<LoginData> = ref({
  email: '',
  password: ''
});
const sendRegister = async () => {
  const dataToSend = unref(registerObject);
  const complete = await register(dataToSend);
  if (complete) {
    registerObject.value = {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      username: '',
      ci: ''
    }
    isRegister.value = false;
  }
};
const sendLogin = async () => {
  const dataToSend = unref(loginObject);
  const complete = await login(dataToSend);
  if (complete) {
    loginObject.value = {
      email: '',
      password: '',
    }
    router.push('/Simulations');
  }
};
definePage({
  meta: {
    layout: 'noLayout'
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
                :rules="[(v)=> (!!v && v.length <= 150) || 'El nombre de usuario tiene que tener menos de 150 caracteres']"
                v-model:model-value="registerObject.username" label="Nombre de Usuario"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                :rules="[(v)=> (!!v && v.length <= 150) || 'El nombre tiene que tener menos de 150 caracteres']"
                v-model:model-value="registerObject.first_name" label="Nombre"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                :rules="[(v)=> (!!v && v.length <= 150) || 'Los apellidos tiene que tener menos de 150 caracteres']"
                v-model:model-value="registerObject.last_name" label="Apellidos"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field :rules="[(v)=> (!!v && v.length === 11) || 'El CI tiene que tener 11 caracteres']"
                            v-model:model-value="registerObject.ci" label="CI"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field :rules="rules.email" v-model:model-value="registerObject.email"
                            label="Correo"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field :rules="rules.password" v-model:model-value="registerObject.password" label="Contraseña"
                            type="password"></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn @click="sendRegister" :disabled="!isRegisterValid" class="ml-6">Registrar</v-btn>
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
              <v-text-field :rules="rules.email" v-model:model-value="loginObject.email" label="Correo"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field :rules="rules.password" v-model:model-value="loginObject.password" label="Contraseña"
                            type="password"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-row justify="space-around">
          <v-btn :disabled="!isLoginValid" @click="sendLogin">Aceptar</v-btn>
        </v-row>
        <v-divider class="mt-8 mb-4"></v-divider>
        <v-row justify="center">
          <v-col cols="auto">
            <h4>O crear una nueva cuenta</h4>
            <v-btn class="ml-6" @click="isRegister = true">Registrar</v-btn>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>

  </v-container>
</template>

<style scoped lang="sass">

</style>
