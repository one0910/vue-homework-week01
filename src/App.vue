<script>
import AppHeader from './components/Header.vue';
import { mapActions, mapWritableState } from 'pinia';
import { useUserStore } from './stores/user';

export default {
  data() {
    return {};
  },
  components: {
    AppHeader,
  },
  computed: {
    ...mapWritableState(useUserStore, ['isLoading']),
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),
  },
  created() {
    const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    if (myToken) {
      this.authenticate(myToken);
    } else {
      this.isLoading = false;
    }
  },
};
</script>

<template>
  <AppHeader />
  <router-view></router-view>
</template>

<style lang="scss" scoped></style>
