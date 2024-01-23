import LogInVue from '@/views/LogIn.vue'
import ProductVue from '@/views/Product.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    name: 'product',
    path: '/',
    component: ProductVue,
    // beforeEnter: async (to, from, next) => {
    //   const store = useUserStore()
    //   console.log('store.userLoggedIn => ', store.userLoggedIn)
    //   if (store.userLoggedIn) {
    //     next()
    //   } else {
    //     next({ name: "login" })
    //   }
    // },
  },
  {
    name: 'login',
    path: '/login',
    component: LogInVue,
    meta: {
      isLoginPage: true
    }
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'product' }
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

// router.beforeEach((to, from, next) => {
//   const store = useUserStore()
//   const UserLoggedIn = store.userLoggedIn;
//   console.log('from => ', from)
//   console.log('to => ', to)
//   console.log('next => ', next)
//   // 如果用戶已登錄且嘗試訪問登錄頁面，則重定向到產品頁面
//   if (UserLoggedIn && to.path === 'login') {
//     next({ name: 'product' });
//     return;
//   }


//   // 在其他情況下，正常進行導航
//   next();

// })

export default router