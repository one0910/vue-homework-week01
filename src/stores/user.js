import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    isLoading: true,
    errorMessage: '',
  }),
  actions: {
    async authenticate(myToken) {
      axios.defaults.headers.common['Authorization'] = myToken;
      try {
        let response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/user/check`)
        const { success } = response.data
        if (success) {
          this.userLoggedIn = true
          this.isLoading = false
        }
      } catch (error) {
        console.dir('error.response => ', error.response)
        const { message } = error.response.data
        const { status, statusText } = error.response.request
        this.isLoading = false
        this.errorMessage = `${status} ${statusText} ${message}`
      }
    },
    signOut() {
      this.userLoggedIn = false
      const cookieString = (import.meta.env.MODE === 'development') ? `myToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;` : `myToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/vue-homework-week01;SameSite=None;Secure;`

      console.log('cookieString => ', cookieString)
      document.cookie = cookieString
      this.errorMessage = ''
    },
  }
})
