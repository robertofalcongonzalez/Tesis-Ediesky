// Utilities
import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const userId = ref(-1)
  const getToken = computed(() => token)
  const getLoggedUser = computed(() => userId)

  const saveToken = (tokenFromServer: string) => token.value = tokenFromServer;
  const saveLoggedUser = (id: number) => userId.value = id;

  function $reset() {
    token.value = ''
    userId.value = -1
    localStorage.deleteItem('token')
    localStorage.deleteItem('userId')
  }

  return {token, userId, getToken, getLoggedUser, saveToken, saveLoggedUser, $reset}
})
