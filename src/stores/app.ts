// Utilities
import {defineStore} from 'pinia'

export const useAppStore = defineStore('app', () => {
  const error = ref('')
  const snackBar = ref(false)
  const snackBarText = ref('')
  const setError = (serverError: any) => {
    error.value = serverError;
    snackBar.value = true;
    snackBarText.value = error.value
  }
  return {error, snackBar, snackBarText, setError}
})

