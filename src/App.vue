<script>
import AppHeader from './components/Header.vue'
import { useUserStore } from './stores/user'
import { mapActions, mapWritableState } from 'pinia'

export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    AppHeader
  },
  computed: {
    ...mapWritableState(useUserStore, ['isLoading'])
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate'])
  },
  created() {
    const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, '$1')
    if (myToken) {
      this.authenticate(myToken)
    }
  }
}
</script>

<template>
  <AppHeader />
  <router-view></router-view>
</template>
