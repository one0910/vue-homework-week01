<script>
import { useUserStore } from '@/stores/user';
import { useCartStore } from '@/stores/cart';
import { mapStores, mapState } from 'pinia';
import Loading from './Loading.vue';

export default {
  name: 'AppHeader',
  components: {
    Loading,
  },
  computed: {
    ...mapStores(useUserStore),
    ...mapState(useUserStore, ['userLoggedIn', 'isLoading']),
    ...mapState(useCartStore, ['cartOder']),
  },
  methods: {
    handleLogin() {
      if (this.userLoggedIn) {
        /*當this.userLoggedIn=true時, 表示現在的狀態是登入狀態，但header顯示的是登出
          因此這裡的要處理的是登出的邏輯
        */
        this.userStore.signOut();
        /*當目前頁面是處在需要登入才能看到的畫面時(透過meta來判定)，當執行登出邏輯時，則轉跳到首頁*/
        if (this.$route.meta.requiresAuth) {
          this.$router.push({ path: '/' });
        }
      } else {
        /*相反的當this.userLoggedIn=false時, 表示現在的狀態是登出狀態，header則顯示的是登入
          因此這裡的要處理的是登入的邏輯，跳到登入頁面
        */
        this.userStore.errorMessage = '';
        this.$router.push('/login');
      }
    },
  },
};
</script>

<template>
  <Loading :isActive="isLoading" />
  <!-- <nav class="navbar navbar-light bg-light border"> -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" href="#" :to="{ name: 'product' }">
        <img
          src="/bootstrap-logo.svg"
          alt=""
          width="30"
          height="24"
          class="d-inline-block align-text-top"
          @click="$router.push('/')"
        />
        Home
      </router-link>
      <div class="navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="handleLogin" v-show="!$route.meta.isLoginPage">
              {{ `${userLoggedIn ? '登出' : '登入'}` }}
            </a>
          </li>
          <li class="nav-item">
            <router-link href="#" class="nav-link" :to="{ name: 'productManage' }">後台管理 </router-link>
          </li>
        </ul>
      </div>
      <router-link class="navbar-brand position-relative" href="#" :to="{ name: 'cart' }">
        <span class="cartNumber" v-show="cartOder.length > 0">{{ cartOder.length }}</span>
        <i class="bi bi-cart"> </i>
      </router-link>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
