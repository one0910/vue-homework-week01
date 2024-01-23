import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async authenticate(myToken) {
      const url = "https://vue3-course-api.hexschool.io/v2"
      axios.defaults.headers.common['Authorization'] = myToken;
      let response = await axios.post(`${url}/api/user/check`)
      const { success } = response.data
      if (success) {
        this.userLoggedIn = true
        this.isLoading = false
      }
    },
    signOut() {
      this.userLoggedIn = false
      document.cookie = 'myToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
  }
})
