import {login, register} from "@/services/auth/auth-service";
import {Ref} from "vue";
import {LoginData, RegisterData} from "@/services/auth/types";

const cleanState = <T extends Record<string, any>>(state: Ref<T>) => {
  for (const stateKey in state.value) {
    state.value[stateKey] = '' as T[typeof stateKey];
  }
}

export function useAuthData() {
  const isRegister = ref(false)
  const router = useRouter();

  const registerObject: Ref<RegisterData> = ref({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    username: '',
    ci: '',
    economic_actor: '',
    type_actor: ''
  });
  const loginObject: Ref<LoginData> = ref({
    email: '',
    password: ''
  });
  const sendRegister = async () => {
    const dataToSend = unref(registerObject);
    const complete = await register(dataToSend);
    if (complete) {
      cleanState<RegisterData>(registerObject);
      isRegister.value = false;
    }
  };
  const sendLogin = async () => {
    const dataToSend = unref(loginObject);
    const complete = await login(dataToSend);
    if (complete) {
      cleanState<LoginData>(loginObject);
      router.push('/');
    }
  };
  const setEActor = (eA: number | string)=> registerObject.value.economic_actor = eA;
  return {sendRegister, sendLogin, registerRow: registerObject, loginRow: loginObject, isRegister, setEActor}
}
