<script>
import { useUserStore } from '@/stores/user';
import { mapWritableState, mapState } from 'pinia';
import Loading from '@/components/Loading.vue';

export default {
  name: 'LogInPage',
  data() {
    return {
      loginSchema: {
        username: 'required|email',
        password: 'required|min:4|max:100|excluded:password',
      },
      errorMessage: '',
      enableLoading: false,
    };
  },
  components: {
    Loading,
  },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },

  methods: {
    async login(values) {
      try {
        const api = `${import.meta.env.VITE_APP_BASE_URL}`;
        this.enableLoading = true;
        let response = await this.$http.post(`${api}/admin/signin`, values);
        const { message, token, expired } = response.data;
        document.cookie = `myToken=${token}; expires=${new Date(expired)};`;
        this.$http.defaults.headers.common['Authorization'] = token;
        this.userLoggedIn = true;
        alert(message);
        this.enableLoading = false;
        this.$router.push('/');
      } catch (error) {
        const { message } = error.response.data;
        this.enableLoading = false;
        this.errorMessage = `${message} : ${error.response.data.error.message}`;
        return;
      }
    },
  },
};
</script>

<template>
  <Loading :isActive="enableLoading" />
  <div class="container">
    <div class="row justify-content-center py-3">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <!-- 錯誤警告訊息框 -->
        <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show mt-3" role="alert">
          {{ errorMessage }}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <vee-form id="form" class="form-signin" :validation-schema="loginSchema" v-on:submit="login">
          <div class="form-floating mb-3">
            <vee-field name="username" type="email" class="form-control" placeholder="name@example.com" />
            <label for="username">Email address</label>
            <ErrorMessage class="text-danger" name="username" />
          </div>
          <div class="form-floating">
            <vee-field name="password" type="password" class="form-control" placeholder="Password" />
            <label for="password">Password</label>
            <ErrorMessage class="text-danger" name="password" />
          </div>

          <button class="btn btn-lg btn-primary w-100 mt-3 mb-2" type="submit">登入</button>
          <span class="text-black-50 fst-italic">測試登入帳號: test1234_test1234@gmail.com</span>
          <br />
          <span class="text-black-50 fst-italic">測試登入密碼: test123456789</span>
        </vee-form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2021~∞ - 六角學院</p>
  </div>
</template>

<style lang="scss"></style>
