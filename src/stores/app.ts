// Utilities
import {defineStore} from 'pinia'

export const useAppStore = defineStore('app', () => {
  const error = ref('')
  const toLogin = ref(false)
  const snackBar = ref(false)
  const snackBarText = ref('')
  const setError = (serverError: any, sentToLogin: boolean = false) => {
    error.value = serverError;
    toLogin.value = sentToLogin;
    snackBar.value = true;
    snackBarText.value = error.value
  }
  return {error, snackBar,toLogin, snackBarText, setError}
})

