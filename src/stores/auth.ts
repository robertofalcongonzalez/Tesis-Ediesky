// Utilities
import {defineStore} from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const state = ({token: '', userId: -1})
  const getters = {
    getToken: computed(() => this.state.token),
    getLoggedUser: computed(() => this.state.userId)
  }
  const saveToken = (token: string) => this.state.token = token;
  const saveLoggedUser = (id: number) => this.state.userId = id;
  return {state, getters, saveToken, saveLoggedUser}
})
