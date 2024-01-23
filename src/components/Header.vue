<script>
import { useUserStore } from '@/stores/user'
import { mapStores, mapState } from 'pinia'
import Loading from './Loading.vue'

export default {
  name: 'AppHeader',
  components: {
    Loading
  },
  computed: {
    ...mapStores(useUserStore),
    ...mapState(useUserStore, ['userLoggedIn'])
  },
  methods: {
    handleLogin() {
      if (this.userLoggedIn) {
        this.userStore.signOut()
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<template>
  <Loading />
  <nav class="navbar navbar-light bg-light border">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="/bootstrap-logo.svg"
          alt=""
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
        Header
      </a>
      <a href="#" @click.prevent="handleLogin" v-show="!$route.meta.isLoginPage">
        {{ `${userLoggedIn ? '登出' : '登入'}` }}
      </a>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
